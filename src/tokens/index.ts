export { tokens, textStyles, type Tokens, type TextStyle } from './generated.js';

/** The three color modes from the Figma `Color` collection. */
export const themes = ['light', 'dark', 'web-2025'] as const;
export type Theme = (typeof themes)[number];
