import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check, Circle, Trash2, Edit2, Calendar, AlertCircle, GripVertical } from 'lucide-react';
import CategoryBadge from '../Categories/CategoryBadge';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { getRelativeDate, isOverdue } from '../../utils/dateHelpers';
import { PRIORITIES, CATEGORIES } from '../../utils/constants';
import PropTypes from 'prop-types';

export default function TodoItemDragDrop({ todo, onToggle, onDelete, onUpdate, darkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  const [editPriority, setEditPriority] = useState(todo.priority);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    onUpdate(todo.id, {
      text: editText,
      category: editCategory,
      dueDate: editDueDate || null,
      priority: editPriority
    });
    setIsEditing(false);
  };

  const priority = PRIORITIES[todo.priority.toUpperCase()];
  const isTaskOverdue = todo.dueDate && !todo.completed && isOverdue(todo.dueDate);

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`group p-4 rounded-xl backdrop-blur-lg ${
          darkMode ? 'bg-white/10 hover:bg-white/15' : 'bg-white/70 hover:bg-white'
        } shadow-lg border ${
          darkMode ? 'border-white/20' : 'border-purple-200'
        } transition-all hover:scale-[1.02] ${
          todo.completed ? 'opacity-60' : ''
        } ${isDragging ? 'shadow-2xl z-50' : ''} ${
          isTaskOverdue ? 'border-red-500 border-2' : ''
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className={`flex-shrink-0 cursor-grab active:cursor-grabbing p-1 rounded ${
              darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
            }`}
          >
            <GripVertical size={18} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
          </div>

          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-1 ${
              todo.completed
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-transparent'
                : darkMode
                  ? 'border-gray-600 hover:border-purple-400'
                  : 'border-gray-400 hover:border-purple-500'
            }`}
          >
            {todo.completed ? (
              <Check size={16} className="text-white" />
            ) : (
              <Circle size={16} className="opacity-0 group-hover:opacity-50" />
            )}
          </button>

          {/* Contenu */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className={`flex-1 ${
                todo.completed 
                  ? 'line-through opacity-60' 
                  : darkMode 
                    ? 'text-white' 
                    : 'text-gray-900'
              } transition-all break-words`}>
                {todo.text}
              </span>
              
              {/* Priorité */}
              {priority && (
                <span className={`flex-shrink-0 ${priority.color}`}>
                  <AlertCircle size={16} />
                </span>
              )}
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <CategoryBadge categoryId={todo.category} />
              
              {todo.dueDate && (
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                  isTaskOverdue
                    ? 'bg-red-500/20 text-red-400'
                    : darkMode
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-blue-100 text-blue-600'
                }`}>
                  <Calendar size={12} />
                  {getRelativeDate(todo.dueDate)}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className={`p-2 rounded-lg transition-all ${
                darkMode 
                  ? 'hover:bg-blue-500/20 text-blue-400' 
                  : 'hover:bg-blue-50 text-blue-600'
              }`}
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className={`p-2 rounded-lg transition-all ${
                darkMode 
                  ? 'hover:bg-red-500/20 text-red-400' 
                  : 'hover:bg-red-50 text-red-600'
              }`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal d'édition */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Modifier la tâche"
        darkMode={darkMode}
      >
        <div className="space-y-4">
          {/* Texte */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Tâche
            </label>
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              darkMode={darkMode}
              className="w-full"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Catégorie
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setEditCategory(cat.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    editCategory === cat.id
                      ? `${cat.color} text-white`
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Date d'échéance
            </label>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg ${
                darkMode 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-white text-gray-900'
              } border ${
                darkMode ? 'border-gray-600' : 'border-gray-300'
              }`}
            />
          </div>

          {/* Priorité */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Priorité
            </label>
            <div className="flex gap-2">
              {Object.values(PRIORITIES).map(p => (
                <button
                  key={p.id}
                  onClick={() => setEditPriority(p.id)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    editPriority === p.id
                      ? darkMode
                        ? 'bg-white/20 text-white'
                        : 'bg-purple-100 text-purple-700'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className={p.color}>●</span> {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Boutons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Sauvegarder
            </Button>
            <Button 
              onClick={() => setIsEditing(false)} 
              variant="secondary"
              className="flex-1"
            >
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

TodoItemDragDrop.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    category: PropTypes.oneOf(CATEGORIES.map(cat => cat.id)).isRequired,
    dueDate: PropTypes.string,
    priority: PropTypes.oneOf(Object.keys(PRIORITIES).map(key => key.toLowerCase())).isRequired
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired
};

TodoItemDragDrop.defaultProps = {
  darkMode: false
};