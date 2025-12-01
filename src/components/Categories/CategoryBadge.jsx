import { CATEGORIES } from '../../utils/constants';
import PropTypes from 'prop-types';

export default function CategoryBadge({ categoryId, size = 'sm' }) {
    const category = CATEGORIES.find(cat => cat.id === categoryId);

    if (!category) return null;

    const sizes = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1.5'
    };

    return (
        <span className={`inline-flex items-center gap-1 rounded-full ${category.color} bg-opacity-20 text-white ${sizes[size]} font-medium`}>
            <span>{category.icon}</span>
            <span>{category.name}</span>
        </span>
    );
}


CategoryBadge.propTypes = {
    categoryId: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['sm', 'md'])
};