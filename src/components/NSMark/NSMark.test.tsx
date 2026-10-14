import { createRef } from 'react';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { NSMark, type NSMarkColor } from './NSMark.js';

const colors: NSMarkColor[] = ['red', 'navy', 'yellow', 'wine', 'salmon', 'cyan'];

describe('NSMark', () => {
  it('renders a decorative red mark with no axe violations', async () => {
    const { container } = renderWithTheme(<NSMark />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveClass('ns-ns-mark', 'ns-ns-mark--red');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('viewBox', '0 0 41 27');
    expect(svg).toHaveAttribute('width', '24');
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it.each(['light', 'dark', 'web-2025'] as const)('has no axe violations in %s', async (theme) => {
    const { container } = renderWithTheme(
      <>
        {colors.map((color) => (
          <NSMark key={color} color={color} />
        ))}
        <NSMark label="NicaSource" />
      </>,
      theme,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('forwards ref, merges className and passes ...rest', () => {
    const ref = createRef<SVGSVGElement>();
    renderWithTheme(<NSMark ref={ref} className="custom" data-testid="mark" />);
    const svg = screen.getByTestId('mark');
    expect(ref.current).toBe(svg);
    expect(svg).toHaveClass('ns-ns-mark', 'custom');
  });

  it.each(colors)('color %s adds its modifier class', (color) => {
    const { container } = renderWithTheme(<NSMark color={color} />);
    expect(container.querySelector('svg')).toHaveClass(`ns-ns-mark--${color}`);
  });

  it('sets the width from size', () => {
    const { container } = renderWithTheme(<NSMark size={48} />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '48');
  });

  it('exposes role="img" with the label when labelled', () => {
    renderWithTheme(<NSMark label="NicaSource" />);
    expect(screen.getByRole('img', { name: 'NicaSource' })).not.toHaveAttribute('aria-hidden');
  });
});
