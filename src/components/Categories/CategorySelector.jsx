import { CATEGORIES } from '../../utils/constants';

export default function CategorySelector({ selectedCategory, onSelect, darkMode }) {
  return (
    <div className="mb-6">
      <h3 className={`text-sm font-medium mb-3 ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Filtrer par catégorie
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : darkMode
                ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                : 'bg-white/70 text-gray-700 hover:bg-white'
          }`}
        >
          Toutes
        </button>
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedCategory === category.id
                ? `${category.color} text-white shadow-lg`
                : darkMode
                  ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                  : 'bg-white/70 text-gray-700 hover:bg-white'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
