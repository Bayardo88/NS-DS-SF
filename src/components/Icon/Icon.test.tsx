import { createRef } from 'react';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { iconCategories, iconNames, iconSvgs } from '../../icons/generated.js';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { Icon, type IconColor, type IconSize } from './Icon.js';

describe('Icon', () => {
  it('renders a decorative 24×24 svg with no axe violations', async () => {
    const { container } = renderWithTheme(<Icon name="arrow-right" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveClass('ns-icon', 'ns-icon--md');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
    expect(svg.querySelector('path')).not.toBeNull();
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it.each(['light', 'dark', 'web-2025'] as const)('has no axe violations in %s', async (theme) => {
    const { container } = renderWithTheme(
      <>
        <Icon name="check" />
        <Icon name="warning" label="Warning" color="warning" />
        <Icon name="loader" spin label="Loading" />
      </>,
      theme,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('forwards ref, merges className and passes ...rest', () => {
    const ref = createRef<SVGSVGElement>();
    renderWithTheme(<Icon ref={ref} name="home" className="custom" data-testid="icon" />);
    const svg = screen.getByTestId('icon');
    expect(ref.current).toBe(svg);
    expect(svg).toHaveClass('ns-icon', 'custom');
  });

  it('exposes role="img" and the label as its accessible name when labelled', () => {
    renderWithTheme(<Icon name="trash" label="Delete" />);
    const img = screen.getByRole('img', { name: 'Delete' });
    expect(img).not.toHaveAttribute('aria-hidden');
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as IconSize[])('size %s adds its modifier class', (size) => {
    const { container } = renderWithTheme(<Icon name="star" size={size} />);
    expect(container.querySelector('svg')).toHaveClass(`ns-icon--${size}`);
  });

  it.each(['primary', 'brand', 'error', 'inverse'] as IconColor[])('color %s adds its modifier class', (color) => {
    const { container } = renderWithTheme(<Icon name="star" color={color} />);
    expect(container.querySelector('svg')).toHaveClass(`ns-icon--${color}`);
  });

  it('inherits currentColor by default (no color modifier)', () => {
    const { container } = renderWithTheme(<Icon name="star" />);
    expect(container.querySelector('svg')!.getAttribute('class')).toBe('ns-icon ns-icon--md');
  });

  it('spin adds the spinner class', () => {
    const { container } = renderWithTheme(<Icon name="loader" spin />);
    expect(container.querySelector('svg')).toHaveClass('ns-icon--spin');
  });

  it('ships all 180 Figma icons, each categorized and drawn with currentColor', () => {
    expect(iconNames).toHaveLength(180);
    expect(new Set(iconNames).size).toBe(180);
    for (const name of iconNames) {
      expect(iconCategories[name], name).toBeTruthy();
      expect(iconSvgs[name], name).toMatch(/^<path /);
      expect(iconSvgs[name], name).not.toMatch(/#[0-9a-f]{3,6}|\sid=|\swidth=|<svg/i);
      expect(iconSvgs[name], name).toContain('fill="currentColor"');
    }
  });
});
