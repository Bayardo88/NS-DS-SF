import { createRef, forwardRef, type AnchorHTMLAttributes } from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { SiteFooter } from './SiteFooter.js';

const social = {
  facebook: 'https://www.facebook.com/nicasource',
  instagram: 'https://www.instagram.com/nicasource',
  linkedin: 'https://www.linkedin.com/company/nicasource',
};
const legal = [
  { label: 'Terms and Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];

const RouterLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }>(
  function RouterLink({ to, children, ...props }, ref) {
    return (
      <a ref={ref} href={to} data-router="" {...props}>
        {children}
      </a>
    );
  },
);

describe('SiteFooter', () => {
  it.each(['light', 'dark', 'web-2025'] as const)('has no axe violations in %s', async (theme) => {
    const { container } = renderWithTheme(
      <SiteFooter social={social} legal={legal} copyright="© 2025 NicaSource, LLC" />,
      theme,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('renders a <footer> contentinfo landmark with a Legal nav', () => {
    renderWithTheme(<SiteFooter social={social} legal={legal} />);
    const footer = screen.getByRole('contentinfo');
    expect(footer.tagName).toBe('FOOTER');
    const nav = within(footer).getByRole('navigation', { name: 'Legal' });
    expect(within(nav).getByRole('link', { name: 'Terms and Conditions' })).toHaveAttribute('href', '/terms');
    expect(within(nav).getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
  });

  it('renders social IconButton links that open in a new tab', () => {
    renderWithTheme(<SiteFooter social={social} />);
    for (const [name, href] of [
      ['Facebook', social.facebook],
      ['Instagram', social.instagram],
      ['LinkedIn', social.linkedin],
    ]) {
      const link = screen.getByRole('link', { name: `NicaSource on ${name}` });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveClass('ns-icon-button', 'ns-icon-button--text', 'ns-icon-button--md');
      expect(link).toHaveAccessibleDescription('(opens in new tab)');
    }
  });

  it('only renders the networks it gets, and hides the row when social is empty', () => {
    const { rerender } = renderWithTheme(<SiteFooter social={{ linkedin: social.linkedin }} />);
    expect(screen.getAllByRole('link', { name: /^NicaSource on/ })).toHaveLength(1);
    rerender(<SiteFooter />);
    expect(screen.queryByRole('link', { name: /^NicaSource on/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('shows the copyright, defaulting to the current year', () => {
    const { rerender } = renderWithTheme(<SiteFooter copyright="© 2025 NicaSource, LLC" />);
    expect(screen.getByText('© 2025 NicaSource, LLC')).toBeInTheDocument();
    rerender(<SiteFooter />);
    expect(screen.getByText(`© ${new Date().getFullYear()} NicaSource, LLC`)).toBeInTheDocument();
  });

  it('uses the inverse surface in light and the canvas surface in dark and web-2025', () => {
    const { unmount } = renderWithTheme(<SiteFooter />, 'light');
    expect(screen.getByRole('contentinfo')).toHaveClass('ns-site-footer--inverse');
    unmount();
    renderWithTheme(<SiteFooter />, 'web-2025');
    expect(screen.getByRole('contentinfo')).toHaveClass('ns-site-footer--canvas');
  });

  it('accepts an explicit surface and logoVariant', () => {
    renderWithTheme(<SiteFooter surface="canvas" logoVariant="main" />, 'light');
    expect(screen.getByRole('contentinfo')).toHaveClass('ns-site-footer--canvas');
    expect(document.querySelector('.ns-site-footer__logo-mark')).toHaveClass('ns-logo--main');
  });

  it('logo links home with an accessible name', () => {
    renderWithTheme(<SiteFooter logoHref="/en" />);
    expect(screen.getByRole('link', { name: 'NicaSource home' })).toHaveAttribute('href', '/en');
  });

  it('renderLink wires router links into the logo and legal links', () => {
    renderWithTheme(
      <SiteFooter legal={legal} renderLink={({ href, children }) => <RouterLink to={href}>{children}</RouterLink>} />,
    );
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('data-router');
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveClass('ns-site-footer__legal-link');
    expect(screen.getByRole('link', { name: 'NicaSource home' })).toHaveAttribute('data-router');
  });

  it('links are reachable with Tab in reading order', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SiteFooter social={{ linkedin: social.linkedin }} legal={legal} />);
    await user.tab();
    expect(screen.getByRole('link', { name: 'NicaSource home' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('link', { name: 'NicaSource on LinkedIn' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('link', { name: 'Terms and Conditions' })).toHaveFocus();
  });

  it('forwards ref, merges className and passes ...rest', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<SiteFooter ref={ref} className="custom" data-testid="ftr" id="footer" />);
    const footer = screen.getByTestId('ftr');
    expect(ref.current).toBe(footer);
    expect(footer).toHaveClass('ns-site-footer', 'custom');
    expect(footer).toHaveAttribute('id', 'footer');
  });
});
