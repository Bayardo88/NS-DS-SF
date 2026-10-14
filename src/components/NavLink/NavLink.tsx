import {
  cloneElement,
  forwardRef,
  isValidElement,
  type AnchorHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { Slot } from '../../utils/Slot.js';
import { cx } from '../../utils/cx.js';

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Destination. Ignored with `asChild` (the child element carries its own `href` / `to`). */
  href?: string;
  /**
   * The link points to the current page (Figma `State=Active`): brand text, a solid 2px brand
   * indicator and `aria-current="page"`. Hover and focus come from CSS, not props.
   */
  active?: boolean;
  /**
   * Render the single child element instead of an `<a>`, so router links keep client-side
   * navigation: `<NavLink asChild active><Link href="/services">Services</Link></NavLink>`.
   * The child must forward `className`, `aria-current` and its ref to the underlying `<a>`.
   */
  asChild?: boolean;
  /** Label. Rendered uppercase (Secondary/Overline SM/Demi Bold, 4% tracking). Keep it to 1–2 words. */
  children?: ReactNode;
}

function renderContent(label: ReactNode) {
  return (
    <>
      <span className="ns-nav-link__label ns-text-secondary-overline-sm-demi-bold">{label}</span>
      <span className="ns-nav-link__indicator" aria-hidden="true" />
    </>
  );
}

/**
 * A top-level site navigation link (Figma "Navigation Bar / Link"): an uppercase label over a
 * 2px indicator. Renders an `<a>`, or its child element with `asChild`.
 */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { active = false, asChild = false, className, children, ...rest },
  ref,
) {
  const classes = cx('ns-nav-link', active && 'ns-nav-link--active', className);
  const ariaCurrent = active ? ('page' as const) : undefined;

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ children?: ReactNode }>;
    return (
      <Slot ref={ref as Ref<HTMLElement>} className={classes} aria-current={ariaCurrent} {...rest}>
        {cloneElement(child, undefined, renderContent(child.props.children))}
      </Slot>
    );
  }

  return (
    <a ref={ref} className={classes} aria-current={ariaCurrent} {...rest}>
      {renderContent(children)}
    </a>
  );
});
