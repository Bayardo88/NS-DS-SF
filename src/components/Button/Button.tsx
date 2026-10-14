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

export type ButtonVariant = 'filled' | 'outlined' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Figma component set. `filled` is the primary action (use at most one per view), `outlined` the
   * secondary one, `text` tertiary actions and "Learn more" links inside content.
   */
  variant?: ButtonVariant;
  /** Height `control/sm|md|lg`: 32 / 40 / 48px. Prefer `md` or `lg` on touch layouts. */
  size?: ButtonSize;
  /**
   * Show the NS arrow bubble. It trails the label at rest and slides in front of it on hover,
   * focus and press. Keep it for navigation-like actions, turn it off for in-place ones ("Save").
   */
  arrow?: boolean;
  /** Icon inside the bubble (Figma `Icon` instance swap). */
  icon?: IconName;
  /**
   * Async action pending: the bubble shows a spinning loader, `aria-busy="true"` is set and clicks
   * are ignored. The button stays focusable.
   */
  loading?: boolean;
  /**
   * Render the single child element instead of a `<button>`, e.g. an `<a>` for navigation:
   * `<Button asChild><a href="/contact">Contact us</a></Button>`.
   */
  asChild?: boolean;
  /** Label: sentence case, 1–3 words, verb first. */
  children?: ReactNode;
}

const iconSizes: Record<ButtonSize, IconSize> = { sm: 'sm', md: 'md', lg: 'lg' };

/**
 * A pill label paired with the round NicaSource arrow bubble. Renders a `<button type="button">`
 * by default, or its child element with `asChild`.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'filled',
    size = 'md',
    arrow = true,
    icon = 'arrow-right',
    loading = false,
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
  const showBubble = arrow || loading;
  const blocked = loading || disabled;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (blocked) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  }

  const classes = cx(
    'ns-button',
    `ns-button--${variant}`,
    `ns-button--${size}`,
    showBubble && 'ns-button--with-bubble',
    loading && 'ns-button--loading',
    className,
  );

  const renderContent = (label: ReactNode) => (
    <>
      <span className="ns-button__pill">
        <span className="ns-button__label">{label}</span>
      </span>
      {showBubble && (
        <span className="ns-button__bubble" aria-hidden="true">
          <Icon
            name={loading ? 'loader' : icon}
            size={iconSizes[size]}
            className={cx('ns-button__icon', loading && 'ns-button__spinner')}
          />
        </span>
      )}
    </>
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ children?: ReactNode }>;
    return (
      <Slot
        ref={ref as Ref<HTMLElement>}
        className={classes}
        aria-busy={loading || undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={handleClick as (event: MouseEvent<HTMLElement>) => void}
        {...rest}
      >
        {cloneElement(child, undefined, renderContent(child.props.children))}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled}
      aria-busy={loading || undefined}
      onClick={handleClick}
      {...rest}
    >
      {renderContent(children)}
    </button>
  );
});
