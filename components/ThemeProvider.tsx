'use client';

import React, { useEffect, FC, ReactNode } from 'react';
import { ThemeVariables } from '@/types/config';
// No longer needs predefinedThemes or defaultThemeName from '@/themes'

interface ThemeProviderProps {
  // Only accepts overrides now
  themeOverrides?: ThemeVariables;
  children: ReactNode;
}

/**
 * Applies dynamic theme variable overrides received from configuration
 * to the document root (<html> element). Base theme ('light'/'dark')
 * is handled by SCSS and the data-theme attribute.
 */
const ThemeProvider: FC<ThemeProviderProps> = ({
  themeOverrides,
  children,
}) => {

  useEffect(() => {
    // Apply only the overrides
    const themeToApply = themeOverrides;

    if (themeToApply && typeof themeToApply === 'object' && Object.keys(themeToApply).length > 0 && typeof document !== 'undefined') {
      const root = document.documentElement;
      const previousStyles: { [key: string]: string | null } = {};

      // Store previous values for keys being overridden
      Object.keys(themeToApply).forEach((key) => {
         if (key.startsWith('--')) {
            previousStyles[key] = root.style.getPropertyValue(key);
         }
      });

      // Apply the overrides
      Object.entries(themeToApply).forEach(([key, value]) => {
        if (key.startsWith('--') && typeof value === 'string') {
          root.style.setProperty(key, value);
          // console.log(`Applying override: ${key}: ${value}`);
        }
      });

      // Cleanup: Reset only the overridden styles
      return () => {
        Object.keys(themeToApply).forEach(key => {
          if (key.startsWith('--')) {
            const previousValue = previousStyles[key];
            if (previousValue !== null && previousValue !== '') {
              root.style.setProperty(key, previousValue);
              // console.log(`Restoring override: ${key}: ${previousValue}`);
            } else {
              // Remove the property if it wasn't set before this override
              root.style.removeProperty(key);
              // console.log(`Removing override: ${key}`);
            }
          }
        });
      };
    }
  }, [themeOverrides]); // Re-run only if overrides change

  // Render children - ThemeProvider itself doesn't add DOM nodes
  return <>{children}</>;
};

export default ThemeProvider; 