import { createContext, forwardRef, useContext, type HTMLAttributes } from 'react';
import type { Theme } from '../tokens/index.js';
import { cx } from '../utils/cx.js';

const ThemeContext = createContext<Theme>('light');

/** The color mode of the nearest ThemeProvider (`light` when there is none). */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma color mode: Light, Dark or Web 2025. Only semantic colors change between themes. */
  theme?: Theme;
}

/**
 * Applies a color mode to its subtree by setting `data-theme`, which re-points every semantic
 * `--ns-color-*` token. Nest providers to theme a section differently from the page. To theme
 * the whole document instead, set `data-theme` on `<html>`.
 */
export const ThemeProvider = forwardRef<HTMLDivElement, ThemeProviderProps>(function ThemeProvider(
  { theme = 'light', className, children, ...rest },
  ref,
) {
  return (
    <ThemeContext.Provider value={theme}>
      <div ref={ref} data-theme={theme} className={cx('ns-theme', className)} {...rest}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
});
