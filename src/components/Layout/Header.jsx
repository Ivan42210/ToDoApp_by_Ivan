
import { Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Input from '../UI/Input';
import PropTypes from 'prop-types';

export default function Header({ darkMode, onToggleTheme, searchTerm, onSearchChange, searchRef }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-4xl font-bold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Mes Tâches ✨
        </h1>
        <ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} />
      </div>
      
      {/* Barre de recherche */}
      <div className="relative">
        <Search 
          size={20} 
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        />
        <Input
          ref={searchRef}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher une tâche... (Ctrl+K)"
          darkMode={darkMode}
          className="w-full pl-12"
        />
      </div>
    </div>
  );
}

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    searchRef: PropTypes.object.isRequired
};  