/// <reference types="vite/client" />
import type { Preview } from '@storybook/react-vite';
import '../tokens/css/tokens.css';
import '../tokens/css/text-styles.css';
import '../src/styles/base.css';
import { ThemeProvider } from '../src/theme/ThemeProvider.js';
import type { Theme } from '../src/tokens/index.js';

// Every component stylesheet, the same set scripts/build-css.mjs bundles into dist/styles.css.
import.meta.glob('../src/components/**/*.css', { eager: true });

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Figma color mode',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'web-2025', title: 'Web 2025' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => (
      <ThemeProvider
        theme={(context.globals.theme as Theme) ?? 'light'}
        style={{ padding: 'var(--ns-spacing-24)', minHeight: '100vh' }}
      >
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
    controls: { expanded: true },
    options: {
      storySort: { order: ['Introduction', 'Contributing', 'Foundations', 'Components', 'Site'] },
    },
  },
  tags: ['autodocs'],
};
export default preview;
