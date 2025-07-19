import { useState, useEffect } from 'react';

export function useThemeToggle(storageKey = 'mep-theme', defaultTheme = 'light') {
  // Initialize theme from localStorage or default
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(storageKey);
      
      if (savedTheme) {
        return savedTheme;
      }
      
      // Check for system preference
      if (defaultTheme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    }
    
    return defaultTheme;
  });

  // Update theme in localStorage and apply to document
  const setTheme = (newTheme) => {
    const root = window.document.documentElement;
    const resolvedTheme = newTheme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : newTheme;
    
    // Save to state and localStorage
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
    
    // Apply theme class to document
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Apply theme on initial load and when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    const resolvedTheme = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      if (mediaQuery.matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return { theme, setTheme };
}