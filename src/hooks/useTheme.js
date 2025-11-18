import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

export function useTheme() {
  const [darkMode, setDarkMode] = useLocalStorage(STORAGE_KEYS.THEME, true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return { darkMode, toggleTheme };
}