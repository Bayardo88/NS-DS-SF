import { createRef, forwardRef, type AnchorHTMLAttributes } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { NavLink } from './NavLink.js';

/** Stand-in for a router link (Next.js / React Router) that forwards props and ref to its <a>. */
const RouterLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }>(
  function RouterLink({ to, children, ...props }, ref) {
    return (
      <a ref={ref} href={to} data-router="" {...props}>
        {children}
      </a>
    );
  },
);

describe('NavLink', () => {
  it.each(['light', 'dark', 'web-2025'] as const)('renders a link with no axe violations in %s', async (theme) => {
    const { container } = renderWithTheme(
      <nav aria-label="Main">
        <NavLink href="/about">About us</NavLink>
        <NavLink href="/services" active>
          Services
        </NavLink>
      </nav>,
      theme,
    );
    expect(screen.getByRole('link', { name: 'About us' })).toHaveClass('ns-nav-link');
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('sets aria-current="page" and the active modifier only when active', () => {
    renderWithTheme(
      <>
        <NavLink href="/about">About us</NavLink>
        <NavLink href="/services" active>
          Services
        </NavLink>
      </>,
    );
    const active = screen.getByRole('link', { name: 'Services' });
    const idle = screen.getByRole('link', { name: 'About us' });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active).toHaveClass('ns-nav-link--active');
    expect(idle).not.toHaveAttribute('aria-current');
    expect(idle).not.toHaveClass('ns-nav-link--active');
  });

  it('renders the label with the overline text style and a decorative indicator', () => {
    renderWithTheme(<NavLink href="/about">About us</NavLink>);
    const link = screen.getByRole('link');
    expect(link.querySelector('.ns-nav-link__label')).toHaveClass('ns-text-secondary-overline-sm-demi-bold');
    expect(link.querySelector('.ns-nav-link__indicator')).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards ref, merges className and passes ...rest', () => {
    const ref = createRef<HTMLAnchorElement>();
    renderWithTheme(
      <NavLink ref={ref} href="/about" className="custom" data-testid="nl" target="_self">
        About us
      </NavLink>,
    );
    const link = screen.getByTestId('nl');
    expect(ref.current).toBe(link);
    expect(link).toHaveClass('ns-nav-link', 'custom');
    expect(link).toHaveAttribute('target', '_self');
    expect(link).toHaveAttribute('href', '/about');
  });

  it('asChild renders the router link as the single styled element', async () => {
    const ref = createRef<HTMLAnchorElement>();
    const { container } = renderWithTheme(
      <NavLink asChild active ref={ref} className="extra">
        <RouterLink to="/services">Services</RouterLink>
      </NavLink>,
    );
    const link = screen.getByRole('link', { name: 'Services' });
    expect(container.querySelectorAll('a')).toHaveLength(1);
    expect(link).toHaveAttribute('data-router');
    expect(link).toHaveAttribute('href', '/services');
    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveClass('ns-nav-link', 'ns-nav-link--active', 'extra');
    expect(link.querySelector('.ns-nav-link__label')).toHaveTextContent('Services');
    expect(ref.current).toBe(link);
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('is reachable with Tab and activated by Enter', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn((event: { preventDefault: () => void }) => event.preventDefault());
    renderWithTheme(
      <NavLink href="/about" onClick={onClick}>
        About us
      </NavLink>,
    );
    await user.tab();
    expect(screen.getByRole('link')).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
