import { createRef, forwardRef, useState, type AnchorHTMLAttributes } from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { SiteHeader, type SiteHeaderProps } from './SiteHeader.js';

const links = [
  { label: 'About us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
];
const cta = { label: 'Contact us', href: '/contact' };

function renderHeader(props: Partial<SiteHeaderProps> = {}, theme?: 'light' | 'dark' | 'web-2025') {
  return renderWithTheme(<SiteHeader links={links} current="/services" cta={cta} {...props} />, theme);
}

const getToggle = () => screen.getByRole('button', { name: 'Menu' });
const getPanel = () => document.getElementById(getToggle().getAttribute('aria-controls') ?? '') as HTMLElement;

/** Stand-in for a router link that forwards props and ref to its <a>. */
const RouterLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }>(
  function RouterLink({ to, children, ...props }, ref) {
    return (
      <a ref={ref} href={to} data-router="" {...props}>
        {children}
      </a>
    );
  },
);

describe('SiteHeader', () => {
  it.each(['light', 'dark', 'web-2025'] as const)('has no axe violations in %s (closed and open)', async (theme) => {
    const user = userEvent.setup();
    const { container } = renderHeader({}, theme);
    expect(await checkA11y(container)).toHaveNoViolations();
    await user.click(getToggle());
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('renders a <header> banner with one <nav aria-label="Main"> landmark', () => {
    renderHeader();
    const header = screen.getByRole('banner');
    expect(header.tagName).toBe('HEADER');
    expect(header).toHaveClass('ns-site-header');
    const navs = within(header).getAllByRole('navigation');
    expect(navs).toHaveLength(1);
    expect(navs[0]).toHaveAccessibleName('Main');
  });

  it('marks the link matching `current` with aria-current="page"', () => {
    renderHeader();
    const nav = screen.getByRole('navigation', { name: 'Main' });
    const services = within(nav).getByRole('link', { name: 'Services' });
    expect(services).toHaveAttribute('aria-current', 'page');
    expect(services).toHaveClass('ns-nav-link--active');
    for (const name of ['About us', 'Careers', 'Blog']) {
      expect(within(nav).getByRole('link', { name })).not.toHaveAttribute('aria-current');
    }
  });

  it('renders the logo link home and the CTA', () => {
    renderHeader({ logoHref: '/home' });
    expect(screen.getByRole('link', { name: 'NicaSource home' })).toHaveAttribute('href', '/home');
    const ctaLink = screen.getByRole('link', { name: 'Contact us' });
    expect(ctaLink).toHaveAttribute('href', '/contact');
    expect(ctaLink).toHaveClass('ns-button', 'ns-button--filled', 'ns-button--sm');
  });

  it('renders an optional skip link as the first focusable element', async () => {
    const user = userEvent.setup();
    renderHeader({ skipLinkHref: '#main' });
    await user.tab();
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveFocus();
  });

  it('mobile toggle: Enter opens, Escape closes and returns focus to the toggle', async () => {
    const user = userEvent.setup();
    renderHeader();
    const toggle = getToggle();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(getPanel()).not.toBeVisible();

    toggle.focus();
    await user.keyboard('{Enter}');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(getPanel()).toBeVisible();
    expect(within(getPanel()).getByRole('link', { name: 'Services' })).toHaveAttribute('aria-current', 'page');
    expect(document.body.style.overflow).toBe('hidden');

    // Move focus into the menu, then Escape.
    await user.tab();
    expect(within(getPanel()).getByRole('link', { name: 'About us' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(getPanel()).not.toBeVisible();
    expect(toggle).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
  });

  it('traps focus between the toggle and the menu while open', async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(getToggle());
    const panel = getPanel();
    const lastFocusable = within(panel).getByRole('link', { name: 'Contact us' });
    lastFocusable.focus();
    await user.tab();
    expect(getToggle()).toHaveFocus();
    await user.tab({ shift: true });
    expect(lastFocusable).toHaveFocus();
  });

  it('closes when a menu link is clicked', async () => {
    const user = userEvent.setup();
    const onMenuOpenChange = vi.fn();
    renderHeader({ onMenuOpenChange });
    await user.click(getToggle());
    const link = within(getPanel()).getByRole('link', { name: 'Careers' });
    link.addEventListener('click', (event) => event.preventDefault());
    await user.click(link);
    expect(getToggle()).toHaveAttribute('aria-expanded', 'false');
    expect(onMenuOpenChange.mock.calls).toEqual([[true], [false]]);
  });

  it('restores body scroll on unmount while open', () => {
    document.body.style.overflow = 'auto';
    const { unmount } = renderHeader({ defaultMenuOpen: true });
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('auto');
    document.body.style.overflow = '';
  });

  it('supports controlled mode: menuOpen + onMenuOpenChange', async () => {
    const user = userEvent.setup();
    const onMenuOpenChange = vi.fn();
    const { rerender } = renderWithTheme(
      <SiteHeader links={links} menuOpen={false} onMenuOpenChange={onMenuOpenChange} />,
    );
    await user.click(getToggle());
    expect(onMenuOpenChange).toHaveBeenCalledWith(true);
    // Parent hasn't changed the prop: still closed.
    expect(getToggle()).toHaveAttribute('aria-expanded', 'false');
    rerender(<SiteHeader links={links} menuOpen onMenuOpenChange={onMenuOpenChange} />);
    expect(getToggle()).toHaveAttribute('aria-expanded', 'true');
  });

  it('works with a parent that owns the state', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <span data-testid="state">{String(open)}</span>
          <SiteHeader links={links} menuOpen={open} onMenuOpenChange={setOpen} />
        </>
      );
    }
    renderWithTheme(<Controlled />);
    await user.click(getToggle());
    expect(screen.getByTestId('state')).toHaveTextContent('true');
    await user.keyboard('{Escape}');
    expect(screen.getByTestId('state')).toHaveTextContent('false');
  });

  it('picks the On dark logo in dark and web-2025 unless logoVariant is set', () => {
    const { unmount } = renderHeader({}, 'dark');
    expect(document.querySelector('.ns-site-header__logo-mark')).toHaveClass('ns-logo--on-dark');
    unmount();
    renderHeader({}, 'light');
    expect(document.querySelector('.ns-site-header__logo-mark')).toHaveClass('ns-logo--main');
  });

  it('respects an explicit logoVariant', () => {
    renderHeader({ logoVariant: 'mono-light' }, 'dark');
    expect(document.querySelector('.ns-site-header__logo-mark')).toHaveClass('ns-logo--mono-light');
  });

  it('renderLink wires router links into the logo, nav links and CTA', () => {
    renderHeader({ renderLink: ({ href, children }) => <RouterLink to={href}>{children}</RouterLink> });
    const nav = screen.getByRole('navigation', { name: 'Main' });
    const services = within(nav).getByRole('link', { name: 'Services' });
    expect(services).toHaveAttribute('data-router');
    expect(services).toHaveClass('ns-nav-link');
    expect(services).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'NicaSource home' })).toHaveAttribute('data-router');
    expect(screen.getAllByRole('link', { name: 'Contact us' })[0]).toHaveAttribute('data-router');
  });

  it('forwards ref, merges className and passes ...rest', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<SiteHeader ref={ref} links={links} className="custom" data-testid="hdr" id="top" />);
    const header = screen.getByTestId('hdr');
    expect(ref.current).toBe(header);
    expect(header).toHaveClass('ns-site-header', 'custom');
    expect(header).toHaveAttribute('id', 'top');
  });
});
