'use client'; // <-- This component needs to be a Client Component

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ReactNode, useMemo } from 'react';
import { Config, isConfigMessageData, ThemeVariables } from '@/types/config';
import { ThemeProviderWrapper, Theme } from '@/context/ThemeContext'; // Import context wrapper
import ThemeProvider from '@/components/ThemeProvider'; // Import the override provider
import { predefinedThemes } from '@/themes'; // Still needed for override lookup

// --- Example Configuration (Used as fallback or initial state) ---
const configExample: Config = {
  appearance: {
    // themeName: 'dark', // Example: Start with dark
    // themeName: 'matrix', // Example: Start with matrix overrides on light
    theme: {
      // Example overrides if needed initially
    }
  },
  // ... other default/fallback config ...
};
// --- End Example Configuration ---

interface AppInitializerProps {
  children: ReactNode;
}

// Helper to get initial theme preference
const getInitialTheme = (configThemeName?: string): Theme => {
    // 1. Check config first
    if (configThemeName === 'light' || configThemeName === 'dark') {
        return configThemeName;
    }
    // 2. Check localStorage (optional)
    if (typeof window !== 'undefined') {
        try {
            const storedTheme = localStorage.getItem('app-theme');
            if (storedTheme === 'light' || storedTheme === 'dark') {
                return storedTheme;
            }
        } catch (error) {
             console.warn("Could not read theme preference from localStorage", error);
        }
    }
    // 3. Check system preference (optional)
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    // 4. Default to light
    return 'light';
};

export default function AppInitializer({ children }: AppInitializerProps) {
  const [config, setConfig] = useState<Config | null>(null);
  const [isConfigLoaded, setIsConfigLoaded] = useState(false); // Track config loading specifically

  // Determine initial theme *once* based on potential config/storage/system
  const initialTheme = useMemo(() => getInitialTheme(config?.appearance?.themeName), [config]); // Recalculate if config changes *before* first render potentially

  useEffect(() => {
    let didLoadFromWindow = false;
    // --- Dynamic Config Loading Logic ---
    if (typeof window !== 'undefined' && (window as any).particleAuthConfig) {
       setConfig((window as any).particleAuthConfig as Config);
       console.log("Initialized config from window.particleAuthConfig");
       didLoadFromWindow = true;
       setIsConfigLoaded(true); // Mark config as loaded
    }

    const handleMessage = (event: MessageEvent) => {
      // Add origin validation!
      if (isConfigMessageData(event.data)) {
        console.log("Received config via postMessage:", event.data.payload);
        setConfig(event.data.payload);
        setIsConfigLoaded(true); // Mark config as loaded
      }
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('message', handleMessage);
    }

    // Set fallback config *only if* nothing loaded after a delay
    const fallbackTimer = setTimeout(() => {
        if (!didLoadFromWindow && !isConfigLoaded) {
            console.log("Using fallback example config after timeout.");
            setConfig(configExample);
            setIsConfigLoaded(true); // Mark config as loaded (with fallback)
        } else if (!isConfigLoaded) {
            // If loaded from window but state wasn't updated yet
             setIsConfigLoaded(true);
        }
    }, 150); // Slightly longer delay maybe

    return () => {
        clearTimeout(fallbackTimer);
        if (typeof window !== 'undefined') {
            window.removeEventListener('message', handleMessage);
        }
    };
  }, [isConfigLoaded]); // Depend on loading state

  // Calculate overrides based on the loaded config
  const themeOverrides = useMemo(() => {
    let baseOverrides: ThemeVariables = {};
    const explicitOverrides = config?.appearance?.theme || {};
    const configThemeName = config?.appearance?.themeName;

    // If themeName is specified and *not* light/dark, look it up for base overrides
    if (configThemeName && configThemeName !== 'light' && configThemeName !== 'dark' && predefinedThemes[configThemeName]) {
        baseOverrides = predefinedThemes[configThemeName];
    }

    // Merge explicit overrides onto the base (if any)
    return {
        ...baseOverrides,
        ...explicitOverrides,
    };
  }, [config]); // Recalculate when config changes

  // Render wrappers only after config is potentially loaded
  // This prevents applying overrides based on fallback config too early
  if (!isConfigLoaded) {
      // Optional: Render loading state or null
      return null; // Or <LoadingSpinner />;
  }

  return (
    // Provide the theme switching context
    <ThemeProviderWrapper initialTheme={initialTheme}>
        {/* Apply the dynamic overrides */}
        <ThemeProvider themeOverrides={themeOverrides}>
            {children}
        </ThemeProvider>
    </ThemeProviderWrapper>
  );
} 