import { useEffect } from 'react';

export function useKeyboardShortcuts({
  onSearch = () => {},
  onShowHelp = () => {},
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K ou Cmd+K pour la recherche
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onSearch();
      }

      // Ctrl+/ pour afficher l'aide
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        onShowHelp();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSearch, onShowHelp]);
}