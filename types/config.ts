/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Defines the structure for CSS theme variables.
 * Keys should be valid CSS custom property names (e.g., "--okto-body-background").
 * Values are the corresponding CSS values (e.g., "#ffffff", "12px").
 */
export interface ThemeVariables {
  [key: string]: string; // Allows any string key starting with --, value is string
}

/**
 * Configuration related to the visual appearance.
 */
export interface AppearanceConfig {
  themeName?: string; // Optional: Name of the predefined theme to use as a base
  theme?: ThemeVariables; // Optional: Specific overrides for the theme variables
}

/**
 * Configuration related to the vendor/client information.
 */
export interface VendorConfig {
  name?: string;
  iconUrl?: string;
}

/**
 * Configuration for login options.
 */
export interface LoginOptionsConfig {
  socialLogins?: string[];
  topLoginOptions?: string[];
  externalWallets?: string[];
}

/**
 * The main configuration object structure passed from the native environment.
 */
export interface Config {
  version?: string;
  appearance?: AppearanceConfig;
  vendor?: VendorConfig;
  loginOptions?: LoginOptionsConfig;
  // Add other potential top-level config keys here
}

/**
 * Structure for the configuration message received via postMessage.
 */
export interface ConfigMessageData {
    type: 'CONFIG'; // Ensure this matches the type sent by the native side
    payload: Config;
}

/**
 * Type guard to check if an object is a valid ConfigMessageData payload.
 */
export function isConfigMessageData(data: any): data is ConfigMessageData {
    // Check the type property value and ensure payload is an object
    return data && data.type === 'CONFIG' && typeof data.payload === 'object' && data.payload !== null;
} 