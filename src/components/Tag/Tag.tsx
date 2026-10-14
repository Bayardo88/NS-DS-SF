import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';

export type TagVariant = 'outlined' | 'filled';
export type TagColor = 'brand' | 'highlight' | 'accent' | 'neutral';
export type TagSize = 'sm' | 'md';

/** `color` is the Figma Color variant, so the (deprecated) native HTML `color` attribute is omitted. */
export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Figma `Style`: Outlined (1px stroke in the label color, no fill) or Filled (`*-subtle` background). */
  variant?: TagVariant;
  /**
   * Figma `Color`. Brand: services, primary categories. Highlight: disciplines and featured categories.
   * Accent: recognition and sub-brand moments (Awards, Careers). Neutral: metadata (location, seniority, contract type).
   */
  color?: TagColor;
  /** Figma `Size`: `sm` 24px (Label XS) or `md` 28px (Label SM). */
  size?: TagSize;
}

/**
 * Small, non-interactive pill that labels a category, technology or service. Renders a `<span>`; group related tags
 * in a `<ul>` with an accessible name. If it must be clickable or removable, use a Button instead.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { variant = 'outlined', color = 'brand', size = 'md', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('ns-tag', `ns-tag--${variant}`, `ns-tag--${color}`, `ns-tag--${size}`, className)}
      {...rest}
    />
  );
});
