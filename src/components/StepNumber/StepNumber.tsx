import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';

export type StepNumberSize = 'sm' | 'md' | 'lg';
export type StepNumberTone = 'brand' | 'highlight' | 'accent';

export interface StepNumberProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Figma `Number`. Rendered zero-padded to two digits: `1` → "01", `12` → "12". */
  value: number;
  /** Figma `Caption`: optional step title under the number. Omit it to hide the caption (Figma `Show caption` = false). */
  caption?: ReactNode;
  /** Figma `Size`: `sm` 28px (Primary/Display SM), `md` 48px (Display LG), `lg` 64px (Display 2XL). */
  size?: StepNumberSize;
  /** Figma `Tone`: color of the numeral. Use one tone per section; Highlight reads best on Web 2025 dark sections. */
  tone?: StepNumberTone;
}

/** Zero-pads a step number to two digits. Pure. */
export function formatStepNumber(value: number): string {
  const n = Math.trunc(value);
  return n < 0 ? `-${String(-n).padStart(2, '0')}` : String(n).padStart(2, '0');
}

/**
 * Oversized two-digit numeral with an optional caption for "how it works" sections. Static, not interactive.
 * Put it inside an `<ol>` item or the step heading so the order is semantic, not only visual.
 */
export const StepNumber = forwardRef<HTMLDivElement, StepNumberProps>(function StepNumber(
  { value, caption, size = 'sm', tone = 'brand', className, ...rest },
  ref,
) {
  const hasCaption = caption != null && caption !== false && caption !== '';
  return (
    <div
      ref={ref}
      className={cx('ns-step-number', `ns-step-number--${size}`, `ns-step-number--${tone}`, className)}
      {...rest}
    >
      <span className="ns-step-number__value">{formatStepNumber(value)}</span>
      {hasCaption && <span className="ns-step-number__caption">{caption}</span>}
    </div>
  );
});
