import React, { useRef, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useTodos } from './hooks/useTodo';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import Header from './components/Layout/Header';
import StatsCards from './components/Stats/StatsCards';
import CategorySelector from './components/Categories/CategorySelector';
import TodoInput from './components/Todo/TodoInput';
import TodoFilters from './components/Todo/TodoFilters';
import TodoListDragDrop from './components/Todo/TodoListDragDrop';
import Button from './components/UI/Button';
import KeyboardShortcutsHelp from './components/UI/KeyboardShortcutsHelp';

export default function App() {
  const { darkMode, toggleTheme } = useTheme();
  const searchInputRef = useRef(null);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const {
    todos,
    allTodos,
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
  } = useTodos();

  // Raccourcis clavier
  useKeyboardShortcuts({
    onSearch: () => searchInputRef.current?.focus(),
    onShowHelp: () => setShowShortcutsHelp(true),
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 flex items-center justify-center ${darkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl w-full">

        {/* Header avec recherche */}
        <Header
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchRef={searchInputRef}
        />

        {/* Statistiques */}
        <StatsCards stats={stats} darkMode={darkMode} />

        {/* Input pour ajouter des tâches */}
        <TodoInput onAdd={addTodo} darkMode={darkMode} />

        {/* Sélecteur de catégories */}
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
          darkMode={darkMode}
        />

        {/* Filtres */}
        <TodoFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          darkMode={darkMode}
        />

        {/* Liste des tâches avec Drag & Drop */}
        <TodoListDragDrop
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          onReorder={(newTodos) => {
            reorderTodos(newTodos);
          }}
          darkMode={darkMode}
        />

        {/* Bouton pour supprimer les tâches terminées */}
        {stats.completed > 0 && (
          <Button
            onClick={clearCompleted}
            variant="danger"
            className="mt-6 w-full"
          >
            Supprimer les tâches terminées ({stats.completed})
          </Button>
        )}

        {/* Footer */}
        <div className={`mt-12 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
          <p>Créé avec ❤️ • To-Do App Moderne</p>
        </div>
      </div>
    </div>
  );
}