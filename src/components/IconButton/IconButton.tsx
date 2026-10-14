import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { Icon, type IconName, type IconSize } from '../Icon/Icon.js';
import { Slot } from '../../utils/Slot.js';
import { cx } from '../../utils/cx.js';

export type IconButtonVariant = 'filled' | 'outlined' | 'text';
export type IconButtonSize = 'sm' | 'md' | 'lg';

/** An icon-only button has no visible label, so an accessible name is required. */
export type IconButtonLabelProps =
  | {
      /** Accessible name, e.g. "Next slide" or "Close dialog". Required unless `aria-labelledby` is set. */
      'aria-label': string;
      /** Id of an element that names the button. Alternative to `aria-label`. */
      'aria-labelledby'?: string;
    }
  | {
      'aria-label'?: string;
      'aria-labelledby': string;
    };

export interface IconButtonBaseProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-label' | 'aria-labelledby' | 'children'
> {
  /** Figma component set: `filled` (brand fill), `outlined` (brand border) or `text` (no container). */
  variant?: IconButtonVariant;
  /** Diameter `control/sm|md|lg`: 32 / 40 / 48px. Prefer `lg` on touch screens. */
  size?: IconButtonSize;
  /** Icon to show (Figma `Icon` instance swap). It is decorative; the name comes from `aria-label`. */
  icon?: IconName;
  /**
   * Render the single child element instead of a `<button>`, e.g. a social link:
   * `<IconButton asChild icon="linkedin" aria-label="LinkedIn"><a href="…">LinkedIn</a></IconButton>`.
   * The child's own content is replaced by the icon; the accessible name comes from `aria-label`.
   */
  asChild?: boolean;
  /** Only used with `asChild`: the element to render. */
  children?: ReactNode;
}

export type IconButtonProps = IconButtonBaseProps & IconButtonLabelProps;

const iconSizes: Record<IconButtonSize, IconSize> = { sm: 'sm', md: 'md', lg: 'lg' };

/**
 * A round, icon-only button for compact actions: carousel arrows, close, share and social links.
 * Mirrors Button's variants, sizes and states.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    variant = 'filled',
    size = 'md',
    icon = 'arrow-right',
    asChild = false,
    disabled = false,
    type = 'button',
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  }

  const classes = cx('ns-icon-button', `ns-icon-button--${variant}`, `ns-icon-button--${size}`, className);
  const glyph = <Icon name={icon} size={iconSizes[size]} className="ns-icon-button__icon" />;

  if (asChild && isValidElement(children)) {
    return (
      <Slot
        ref={ref as Ref<HTMLElement>}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={handleClick as (event: MouseEvent<HTMLElement>) => void}
        {...rest}
      >
        {cloneElement(children as ReactElement<{ children?: ReactNode }>, undefined, glyph)}
      </Slot>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} disabled={disabled} onClick={handleClick} {...rest}>
      {glyph}
    </button>
  );
});
