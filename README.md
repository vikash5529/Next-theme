# Next.js Dynamic Theme System

This project demonstrates a robust, scalable theme system for a Next.js app using the App Router, SCSS, and dynamic runtime configuration.  
It supports:

- **Light and Dark themes** (defined in SCSS)
- **Theme switching at runtime** (via a UI button)
- **Vendor or runtime overrides** (via a `config` object, passed from native or injected at runtime)
- **Custom themes** (e.g., "matrix" theme, or any vendor-defined theme)

---

## How It Works

### 1. **Base Themes in SCSS**

- The default (light) theme is defined in `:root` in `styles/globals.scss`.
- The dark theme is defined in `[data-theme='dark']`.
- All themeable values are CSS variables (e.g., `--okto-body-background`).

### 2. **Theme Switching**

- The current theme (`light` or `dark`) is managed by React context (`ThemeContext`).
- The `<ThemeSwitcher />` component allows users to toggle between light and dark themes.
- The current theme is set on the `<html>` element as a `data-theme` attribute, which triggers the correct SCSS variables.

### 3. **Dynamic Vendor/Runtime Overrides**

- At runtime, a `config` object can be injected (via `window.config` or `postMessage`).
- The config can specify:
  - `appearance.themeName`: Use a custom theme as a base (e.g., `"matrix"`)
  - `appearance.theme`: An object of CSS variable overrides (e.g., `{ "--okto-accent-color": "#ff00ff" }`)
- These overrides are applied on top of the base theme using inline styles on `<html>`, taking precedence over SCSS.

### 4. **Custom Themes**

- You can define additional themes in `themes/index.ts` (e.g., `"matrix"`).
- Vendors can pass their own theme name and/or overrides in the config.

---

## Usage

### 1. **Theme Switching in the UI**

The `ThemeSwitcher` component is always available (top-right corner by default).  
Click it to toggle between light and dark themes.

### 2. **Injecting a Config at Runtime**

You can inject a config object in two ways:

#### a) **Via `window.config` (before the app loads):**

```js
window.config = {
  appearance: {
    themeName: "matrix", // or "light", "dark", or any custom theme in themes/index.ts
    theme: {
      "--okto-accent-color": "#ff00ff", // override any CSS variable
      "--okto-primary-button-background": "#ff00ff"
    }
  },
  vendor: {
    name: "YourVendor",
    iconUrl: "https://yourdomain.com/icon.png"
  }
  // ...other config fields
};
```

#### b) **Via `postMessage` (after the app loads):**

```js
window.postMessage({
  type: "CONFIG",
  payload: {
    appearance: {
      themeName: "matrix",
      theme: {
        "--okto-accent-color": "#ff00ff"
      }
    }
    // ...other config fields
  }
}, "*");
```

### 3. **Adding a Custom Theme**

1. Add your theme to `themes/index.ts`:

    ```ts
    export const myCustomTheme: ThemeVariables = {
      "--okto-body-background": "#222244",
      "--okto-body-color": "#fff",
      // ...etc
    };

    export const predefinedThemes: Record<string, ThemeVariables> = {
      ...,
      myCustom: myCustomTheme,
    };
    ```

2. Pass `themeName: "myCustom"` in your config.

---

## File Structure

- `styles/globals.scss` — SCSS variables for light/dark themes
- `themes/index.ts` — Predefined theme objects (for custom themes and vendor themes)
- `context/ThemeContext.tsx` — React context for theme switching
- `components/ThemeProvider.tsx` — Applies runtime CSS variable overrides
- `components/AppInitializer.tsx` — Loads config, sets up theme context and overrides
- `components/ThemeSwitcher.tsx` — UI button to toggle light/dark mode
- `app/layout.tsx` — Root layout, wraps app in theme providers

---

## Example: Vendor Customization

A vendor can pass a config like:

```js
window.config = {
  appearance: {
    themeName: "matrix",
    theme: {
      "--okto-accent-color": "#ff00ff",
      "--okto-primary-button-background": "#ff00ff"
    }
  },
  vendor: {
    name: "Acme Corp",
    iconUrl: "https://acme.com/icon.png"
  }
};
```

This will:
- Use the "matrix" theme as a base
- Override the accent and button background color
- Display vendor info wherever you use it in your app

---

## Notes

- All theme variables must be defined as CSS variables (`--okto-...`) in SCSS and/or in your theme objects.
- Inline overrides always take precedence over SCSS.
- The system is fully TypeScript-typed for safety and DX.
- You can extend the config object with more fields as needed.

---

## License

MIT
