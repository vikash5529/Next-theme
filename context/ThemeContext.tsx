'use client';

import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, useMemo, useEffect } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderWrapperProps {
  initialTheme?: Theme; // Allow passing an initial theme
  children: ReactNode;
}

export const ThemeProviderWrapper = ({ children, initialTheme = 'light' }: ThemeProviderWrapperProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Update data-theme attribute whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    // Optional: Store preference in localStorage
    try {
        localStorage.setItem('app-theme', theme);
    } catch (error) {
        console.warn("Could not save theme preference to localStorage", error);
    }
  }, [theme]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProviderWrapper');
  }
  return context;
}; 