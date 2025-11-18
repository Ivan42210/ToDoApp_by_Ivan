// Catégories disponibles
export const CATEGORIES = [
    { id: 'personal', name: 'Personnel', color: 'bg-blue-500', icon: '👤' },
    { id: 'work', name: 'Travail', color: 'bg-purple-500', icon: '💼' },
    { id: 'shopping', name: 'Courses', color: 'bg-green-500', icon: '🛒' },
    { id: 'health', name: 'Santé', color: 'bg-red-500', icon: '❤️' },
    { id: 'study', name: 'Études', color: 'bg-yellow-500', icon: '📚' },
    { id: 'other', name: 'Autre', color: 'bg-gray-500', icon: '📌' }
];

// Filtres disponibles
export const FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    TODAY: 'today',
    UPCOMING: 'upcoming',
    OVERDUE: 'overdue'
};

// Priorités
export const PRIORITIES = {
    LOW: { id: 'low', name: 'Basse', color: 'text-green-500' },
    MEDIUM: { id: 'medium', name: 'Moyenne', color: 'text-yellow-500' },
    HIGH: { id: 'high', name: 'Haute', color: 'text-red-500' }
};

// Clés localStorage
export const STORAGE_KEYS = {
    TODOS: 'todos',
    THEME: 'theme',
    FILTER: 'filter'
};