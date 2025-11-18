import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ darkMode, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className={`p-3 rounded-full transition-all duration-300 ${darkMode
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                    : 'bg-white text-purple-600 hover:bg-gray-100'
                } shadow-lg`}
            aria-label="Toggle theme"
        >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}