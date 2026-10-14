import { forwardRef, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx.js';

export type NSMarkColor = 'red' | 'navy' | 'yellow' | 'wine' | 'salmon' | 'cyan';

export interface NSMarkProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'color'> {
  /**
   * Figma `Color`. Fixed brand colors: red = red/500, navy = blue/600, yellow = yellow/900,
   * wine = wine/900, salmon = salmon/500, cyan = cyan/500. Careers uses yellow, wine, salmon and cyan.
   */
  color?: NSMarkColor;
  /** Rendered width in px (or any CSS length). Height follows the 41 × 27 proportions. Minimum 16px. */
  size?: number | string;
  /** Accessible name. Omit for decorative use (the default): the mark gets `aria-hidden`. */
  label?: string;
}

const MARK_PATH = 'M40.6 17.2L20.3 0L0 17.2L8.3 26.5L20.3 16.3L32.3 26.5L40.6 17.2Z';

/**
 * The NS Mark: the chevron from the logo, used alone as an avatar, favicon, bullet or sub-brand
 * accent. Its color is a fixed brand color and does not change with the color mode.
 */
export const NSMark = forwardRef<SVGSVGElement, NSMarkProps>(function NSMark(
  { color = 'red', size = 24, label, className, ...rest },
  ref,
) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 41 27"
      width={size}
      fill="none"
      focusable="false"
      className={cx('ns-ns-mark', `ns-ns-mark--${color}`, className)}
      {...a11y}
      {...rest}
    >
      <path className="ns-ns-mark__shape" d={MARK_PATH} />
    </svg>
  );
});
