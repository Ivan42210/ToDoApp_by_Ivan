import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, FILTERS } from '../utils/constants';
import { isToday, isUpcoming, isOverdue } from '../utils/dateHelpers';

export function useTodos() {
    const [todos, setTodos] = useLocalStorage(STORAGE_KEYS.TODOS, []);
    const [filter, setFilter] = useLocalStorage(STORAGE_KEYS.FILTER, FILTERS.ALL);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const addTodo = (text, category = 'other', dueDate = null, priority = 'medium') => {
        if (text.trim() === '') return;

        const newTodo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            category,
            dueDate,
            priority,
            createdAt: new Date().toISOString()
        };

        setTodos([newTodo, ...todos]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const updateTodo = (id, updates) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, ...updates } : todo
        ));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const reorderTodos = (startIndex, endIndex) => {
        const result = Array.from(todos);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setTodos(result);
    };

    const getFilteredTodos = () => {
        let filtered = [...todos];

        if (selectedCategory) {
            filtered = filtered.filter(todo => todo.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(todo =>
                todo.text.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        switch (filter) {
            case FILTERS.ACTIVE:
                filtered = filtered.filter(todo => !todo.completed);
                break;
            case FILTERS.COMPLETED:
                filtered = filtered.filter(todo => todo.completed);
                break;
            case FILTERS.TODAY:
                filtered = filtered.filter(todo => !todo.completed && isToday(todo.dueDate));
                break;
            case FILTERS.UPCOMING:
                filtered = filtered.filter(todo => !todo.completed && isUpcoming(todo.dueDate));
                break;
            case FILTERS.OVERDUE:
                filtered = filtered.filter(todo => !todo.completed && isOverdue(todo.dueDate));
                break;
            default:
                break;
        }

        return filtered;
    };

    const stats = {
        total: todos.length,
        active: todos.filter(todo => !todo.completed).length,
        completed: todos.filter(todo => todo.completed).length,
        today: todos.filter(todo => !todo.completed && isToday(todo.dueDate)).length,
        overdue: todos.filter(todo => !todo.completed && isOverdue(todo.dueDate)).length
    };

    return {
        todos: getFilteredTodos(),
        allTodos: todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        clearCompleted,
        reorderTodos,
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        stats
    };
}
