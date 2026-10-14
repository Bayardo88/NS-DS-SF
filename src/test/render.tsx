import { render, type RenderOptions } from '@testing-library/react';
import { axe } from 'jest-axe';
import type { ReactElement } from 'react';
import { ThemeProvider } from '../theme/ThemeProvider.js';
import type { Theme } from '../tokens/index.js';

/** Renders inside a ThemeProvider, the way consumers do. */
export function renderWithTheme(ui: ReactElement, theme: Theme = 'light', options?: RenderOptions) {
  return render(ui, { wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>, ...options });
}

/** Runs axe on a rendered container: `expect(await checkA11y(container)).toHaveNoViolations()`. */
export const checkA11y = (container: Element): ReturnType<typeof axe> => axe(container);
