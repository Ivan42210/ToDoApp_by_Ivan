import React from 'react';
import { X, Keyboard } from 'lucide-react';

export default function KeyboardShortcutsHelp({ isOpen, onClose, darkMode }) {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ['Entrée'], description: 'Ajouter une tâche' },
    { keys: ['Échap'], description: 'Fermer les modales/options' },
    { keys: ['Ctrl', 'K'], description: 'Focus sur la recherche', mac: ['⌘', 'K'] },
    { keys: ['Ctrl', '/'], description: 'Afficher cette aide', mac: ['⌘', '/'] },
  ];

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } p-6 animate-in fade-in zoom-in duration-200`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Keyboard size={24} className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
            <h2 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Raccourcis clavier
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => {
            const keys = isMac && shortcut.mac ? shortcut.mac : shortcut.keys;
            
            return (
              <div 
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}
              >
                <span className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {shortcut.description}
                </span>
                <div className="flex gap-1">
                  {keys.map((key, i) => (
                    <React.Fragment key={i}>
                      <kbd className={`px-2 py-1 text-xs font-semibold rounded ${
                        darkMode 
                          ? 'bg-gray-600 text-gray-200 border border-gray-500' 
                          : 'bg-white text-gray-700 border border-gray-300 shadow-sm'
                      }`}>
                        {key}
                      </kbd>
                      {i < keys.length - 1 && (
                        <span className={`mx-1 ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className={`mt-6 pt-4 border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className={`text-xs text-center ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Appuyez sur <kbd className={`px-1 text-xs font-semibold rounded ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>Échap</kbd> pour fermer
          </p>
        </div>
      </div>
    </div>
  );
}