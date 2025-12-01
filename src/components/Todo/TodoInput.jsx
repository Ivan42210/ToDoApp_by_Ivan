import  { useState } from 'react';
import { Plus, Calendar, Tag, AlertCircle } from 'lucide-react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { CATEGORIES, PRIORITIES } from '../../utils/constants';
import PropTypes from 'prop-types';

export default function TodoInput({ onAdd, darkMode }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('other');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = () => {
    if (text.trim() === '') return;
    
    onAdd(text, category, dueDate || null, priority);
    
    // Reset
    setText('');
    setCategory('other');
    setDueDate('');
    setPriority('medium');
    setShowOptions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      setShowOptions(false);
      setText('');
    }
  };

  return (
    <div className={`mb-6 p-6 rounded-2xl backdrop-blur-lg ${
      darkMode ? 'bg-white/10' : 'bg-white/70'
    } shadow-xl border ${
      darkMode ? 'border-white/20' : 'border-purple-200'
    }`}>
      {/* Input principal */}
      <div className="flex gap-3 mb-4">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ajouter une nouvelle tâche..."
          darkMode={darkMode}
          className="flex-1"
        />
        <Button onClick={handleSubmit} size="lg">
          <Plus size={20} />
          Ajouter
        </Button>
      </div>

      {/* Bouton pour afficher les options */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`text-sm flex items-center gap-2 ${
          darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        } transition-colors`}
      >
        <Tag size={16} />
        {showOptions ? 'Masquer les options' : 'Options avancées'}
      </button>

      {/* Options avancées */}
      {showOptions && (
        <div className="mt-4 space-y-4 pt-4 border-t border-white/10">
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
                  onClick={() => setCategory(cat.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    category === cat.id
                      ? `${cat.color} text-white`
                      : darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date d'échéance */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Calendar size={16} className="inline mr-2" />
              Date d'échéance
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg ${
                darkMode 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-white text-gray-900'
              } border ${
                darkMode ? 'border-gray-700' : 'border-gray-300'
              }`}
            />
          </div>

          {/* Priorité */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <AlertCircle size={16} className="inline mr-2" />
              Priorité
            </label>
            <div className="flex gap-2">
              {Object.values(PRIORITIES).map(p => (
                <button
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    priority === p.id
                      ? darkMode
                        ? 'bg-white/20 text-white'
                        : 'bg-purple-100 text-purple-700'
                      : darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className={p.color}>●</span> {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

TodoInput.propTypes = {
  onAdd: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired
};