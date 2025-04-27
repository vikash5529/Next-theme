import { ThemeVariables } from '@/types/config';

// Light theme definition (can be removed if purely in SCSS, but useful for reference/lookup)
export const lightTheme: ThemeVariables = {
  "--okto-overlay-background": "rgba(0, 0, 0, 0.4)",
  "--okto-overlay-backdrop-filter": "blur(4px)",
  "--okto-modal-box-shadow": "0px 4px 12px rgba(0, 0, 0, 0.15)",
  "--okto-body-background": "#ffffff",
  "--okto-body-background-secondary": "#f8f9fa",
  "--okto-body-background-tertiary": "#e9ecef",
  "--okto-body-color": "#212529",
  "--okto-body-color-secondary": "#495057",
  "--okto-body-color-tertiary": "#adb5bd",
  "--okto-body-action-color": "#007bff",
  "--okto-accent-color": "#007bff",
  "--okto-focus-color": "#007bff",
  "--okto-button-font-weight": "500",
  "--okto-button-hover-shadow": "none",
  "--okto-button-border-color": "#ced4da",
  "--okto-primary-button-color": "#ffffff",
  "--okto-primary-button-background": "#007bff",
  "--okto-primary-button-hover-background": "#0056b3",
  "--okto-font-family": `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
  "--okto-rounded-sm": "4px",
  "--okto-rounded-md": "8px",
  "--okto-rounded-lg": "12px",
  "--okto-rounded-xl": "16px",
  "--okto-rounded-full": "9999px",
  "--okto-success-color": "#28a745",
  "--okto-warning-color": "#ffc107",
  "--okto-error-color": "#dc3545",
  "--okto-wallet-label-color": "#495057",
};

// Dark theme definition (can be removed if purely in SCSS, but useful for reference/lookup)
export const darkTheme: ThemeVariables = {
  "--okto-overlay-background": "rgba(0, 0, 0, 0.7)",
  "--okto-overlay-backdrop-filter": "blur(5px)",
  "--okto-modal-box-shadow": "0px 4px 12px rgba(0, 0, 0, 0.5)",
  "--okto-body-background": "#121212",
  "--okto-body-background-secondary": "#1e1e1e",
  "--okto-body-background-tertiary": "#2c2c2c",
  "--okto-body-color": "#e0e0e0",
  "--okto-body-color-secondary": "#b0b0b0",
  "--okto-body-color-tertiary": "#757575",
  "--okto-body-action-color": "#bb86fc",
  "--okto-accent-color": "#bb86fc",
  "--okto-focus-color": "#bb86fc",
  "--okto-button-font-weight": "500",
  "--okto-button-hover-shadow": "none",
  "--okto-button-border-color": "#424242",
  "--okto-primary-button-color": "#121212",
  "--okto-primary-button-background": "#bb86fc",
  "--okto-primary-button-hover-background": "#a050f0",
  "--okto-font-family": `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
  "--okto-rounded-sm": "4px",
  "--okto-rounded-md": "8px",
  "--okto-rounded-lg": "12px",
  "--okto-rounded-xl": "16px",
  "--okto-rounded-full": "9999px",
  "--okto-success-color": "#4caf50",
  "--okto-warning-color": "#ff9800",
  "--okto-error-color": "#f44336",
  "--okto-wallet-label-color": "#b0b0b0",
};

// Your original green theme, maybe call it 'matrix' or 'hacker'
export const matrixTheme: ThemeVariables = {
    "--okto-overlay-background": "rgba(0, 0, 0, 0.85)",
    "--okto-overlay-backdrop-filter": "blur(8px)",
    "--okto-modal-box-shadow": "0px 0px 12px rgba(0, 255, 0, 0.5)",
    "--okto-body-background": "#001f00",
    "--okto-body-background-secondary": "#002800",
    "--okto-body-background-tertiary": "#003300",
    "--okto-body-color": "#00ff00",
    "--okto-body-color-secondary": "#00cc00",
    "--okto-body-color-tertiary": "#009900",
    "--okto-body-action-color": "#00ff00",
    "--okto-accent-color": "#00ff00",
    "--okto-focus-color": "#00ff00",
    "--okto-button-font-weight": "500",
    "--okto-button-hover-shadow": "0px 0px 8px rgba(0, 255, 0, 0.5)",
    "--okto-button-border-color": "#00ff00",
    "--okto-primary-button-color": "#000000",
    "--okto-primary-button-background": "#00ff00",
    "--okto-primary-button-hover-background": "#00cc00",
    "--okto-font-family": `monospace, 'Courier New', Courier, 'Segoe UI', Helvetica, Arial, sans-serif`,
    "--okto-rounded-sm": "6px",
    "--okto-rounded-md": "12px",
    "--okto-rounded-lg": "18px",
    "--okto-rounded-xl": "24px",
    "--okto-rounded-full": "9999px",
    "--okto-success-color": "#00ff00",
    "--okto-warning-color": "#ffcc00",
    "--okto-error-color": "#ff0000",
    "--okto-wallet-label-color": "#00ff00",
};

// A map to easily access themes by name - USED BY AppInitializer
export const predefinedThemes: Record<string, ThemeVariables> = {
  light: lightTheme, // Keep for potential reference?
  dark: darkTheme,   // Keep for potential reference?
  matrix: matrixTheme,
  // Add more custom vendor themes here
};

// Default theme name (less critical now, as default is handled in SCSS/:root)
// export const defaultThemeName = 'light'; 