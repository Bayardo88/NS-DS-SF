import { createRef } from 'react';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { Logo, type LogoVariant } from './Logo.js';

describe('Logo', () => {
  it('renders an img named "NicaSource" with no axe violations', async () => {
    const { container } = renderWithTheme(<Logo />);
    const logo = screen.getByRole('img', { name: 'NicaSource' });
    expect(logo).toHaveClass('ns-logo', 'ns-logo--main');
    expect(logo).toHaveAttribute('viewBox', '0 0 149 63');
    expect(logo).toHaveAttribute('width', '148');
    expect(logo.querySelector('.ns-logo__wordmark')).not.toBeNull();
    expect(logo.querySelector('.ns-logo__mark')).not.toBeNull();
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it.each(['light', 'dark', 'web-2025'] as const)('has no axe violations in %s', async (theme) => {
    const { container } = renderWithTheme(
      <>
        <Logo variant="main" />
        <Logo variant="on-dark" />
        <Logo variant="mono-light" />
      </>,
      theme,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('forwards ref, merges className and passes ...rest', () => {
    const ref = createRef<SVGSVGElement>();
    renderWithTheme(<Logo ref={ref} className="custom" data-testid="logo" />);
    const logo = screen.getByTestId('logo');
    expect(ref.current).toBe(logo);
    expect(logo).toHaveClass('ns-logo', 'custom');
  });

  it.each(['main', 'on-dark', 'mono-light'] as LogoVariant[])('variant %s adds its modifier class', (variant) => {
    renderWithTheme(<Logo variant={variant} />);
    expect(screen.getByRole('img')).toHaveClass(`ns-logo--${variant}`);
  });

  it('accepts a custom width and label', () => {
    renderWithTheme(<Logo width={200} label="NicaSource logo" />);
    expect(screen.getByRole('img', { name: 'NicaSource logo' })).toHaveAttribute('width', '200');
  });

  it('is hidden from assistive tech with label="" inside a named link', async () => {
    const { container } = renderWithTheme(
      <a href="/" aria-label="NicaSource home">
        <Logo label="" />
      </a>,
    );
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('link', { name: 'NicaSource home' })).toBeInTheDocument();
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
