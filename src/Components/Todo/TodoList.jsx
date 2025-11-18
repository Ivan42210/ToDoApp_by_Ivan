import React from 'react';
import { Filter } from 'lucide-react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onUpdate, darkMode }) {
    if (todos.length === 0) {
        return (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                <Filter size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Aucune tâche à afficher</p>
                <p className="text-sm mt-2">Ajoutez votre première tâche pour commencer !</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    darkMode={darkMode}
                />
            ))}
        </div>
    );
}