import { useTheme } from './hooks/useTheme';
import { useTodos } from './hooks/useTodo';
import Header from './components/Layout/Header';
import StatsCards from './components/Stats/StatsCards';
import CategorySelector from './components/Categories/CategorySelector';
import TodoInput from './components/Todo/TodoInput';
//import TodoFilters from './components/Todo/TodoFilters';
import TodoList from './components/Todo/TodoList';
import Button from './components/UI/Button';

export default function App() {
  const { darkMode, toggleTheme } = useTheme();
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    //filter,
    //setFilter,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    stats
  } = useTodos();

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

        {/* Filtres 
        <TodoFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          darkMode={darkMode}
        />*/}

        {/* Liste des tâches */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
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