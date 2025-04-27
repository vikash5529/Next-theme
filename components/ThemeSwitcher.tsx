'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Basic styling, adapt as needed
  const buttonStyle: React.CSSProperties = {
    padding: '8px 15px',
    cursor: 'pointer',
    border: '1px solid var(--okto-button-border-color)', // Use theme variable
    backgroundColor: 'var(--okto-body-background-secondary)', // Use theme variable
    color: 'var(--okto-body-color)', // Use theme variable
    borderRadius: 'var(--okto-rounded-md)',
    position: 'fixed', // Example positioning
    top: '10px',
    right: '10px',
    zIndex: 1000,
  };

  return (
    <button onClick={toggleTheme} style={buttonStyle}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
} 