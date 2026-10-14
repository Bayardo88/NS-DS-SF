import { forwardRef, type SVGAttributes } from 'react';
import { iconSvgs, type IconName } from '../../icons/generated.js';
import { cx } from '../../utils/cx.js';

export type { IconName } from '../../icons/generated.js';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** `icon/*` semantic color tokens from the Figma docs panel. */
export type IconColor =
  'primary' | 'secondary' | 'brand' | 'accent' | 'success' | 'warning' | 'error' | 'inverse' | 'disabled' | 'highlight';

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'color'> {
  /** Figma icon name, e.g. `arrow-right` for `Icons/Navigation/arrow-right`. */
  name: IconName;
  /** `size/icon/*` token: xs 12 · sm 16 · md 20 · lg 24 · xl 32. */
  size?: IconSize;
  /**
   * Accessible name. Omit for decorative icons (the default): they get `aria-hidden`.
   * Pass it when the icon is the only thing that conveys meaning.
   */
  label?: string;
  /**
   * Optional `--ns-color-icon-*` token. Omit to inherit the parent's text color (`currentColor`),
   * which is what icons inside buttons, links and fields should do.
   */
  color?: IconColor;
  /**
   * Rotates the icon 360° every 800ms, linear and infinite (the Figma Loader spec). Use with
   * `name="loader"` for pending states. Stops under `prefers-reduced-motion`.
   */
  spin?: boolean;
}

/**
 * An icon from the Figma Icons page. Colored with `currentColor`, so it takes the text color of
 * its parent; set `color` (or a CSS `color` with an `--ns-color-icon-*` token) to override.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 'md', label, color, spin = false, className, ...rest },
  ref,
) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      focusable="false"
      className={cx('ns-icon', `ns-icon--${size}`, color && `ns-icon--${color}`, spin && 'ns-icon--spin', className)}
      {...a11y}
      {...rest}
      dangerouslySetInnerHTML={{ __html: iconSvgs[name] }}
    />
  );
});
