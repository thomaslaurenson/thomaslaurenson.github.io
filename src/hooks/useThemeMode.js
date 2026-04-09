import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

export const useThemeMode = () => {
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [userHasToggled, setUserHasToggled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(systemPrefersDark);

  useEffect(() => {
    if (userHasToggled) return;
    setIsDarkTheme(systemPrefersDark);
  }, [systemPrefersDark, userHasToggled]);

  const toggleTheme = () => {
    setUserHasToggled(true);
    setIsDarkTheme((prev) => !prev);
  };

  return { isDarkTheme, toggleTheme };
};
