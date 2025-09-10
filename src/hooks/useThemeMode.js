import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

export const useThemeMode = () => {
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkTheme, setIsDarkTheme] = useState(systemPrefersDark);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      setIsDarkTheme(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return { isDarkTheme, toggleTheme };
};
