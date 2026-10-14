import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { formatStepNumber, StepNumber, type StepNumberSize, type StepNumberTone } from './StepNumber.js';

describe('StepNumber', () => {
  it('renders the padded number and caption with no axe violations', async () => {
    const { container } = renderWithTheme(
      <ol>
        <li>
          <StepNumber value={1} caption="We meet with you" />
        </li>
      </ol>,
    );
    expect(screen.getByText('01')).toHaveClass('ns-step-number__value');
    expect(screen.getByText('We meet with you')).toHaveClass('ns-step-number__caption');
    expect(container.querySelector('.ns-step-number')).toHaveClass('ns-step-number--sm', 'ns-step-number--brand');
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('pads to two digits without mutating the value', () => {
    expect(formatStepNumber(0)).toBe('00');
    expect(formatStepNumber(3)).toBe('03');
    expect(formatStepNumber(12)).toBe('12');
    expect(formatStepNumber(123)).toBe('123');
    expect(formatStepNumber(4.7)).toBe('04');
  });

  it('forwards ref, merges className and passes ...rest through', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<StepNumber ref={ref} value={2} className="custom" data-testid="step" />);
    const root = screen.getByTestId('step');
    expect(ref.current).toBe(root);
    expect(root).toHaveClass('ns-step-number', 'custom');
  });

  it('hides the caption when it is omitted', () => {
    const { container } = renderWithTheme(<StepNumber value={2} />);
    expect(container.querySelector('.ns-step-number__caption')).toBeNull();
  });

  it.each<StepNumberSize>(['sm', 'md', 'lg'])('size=%s adds its modifier', (size) => {
    renderWithTheme(<StepNumber value={1} size={size} data-testid="step" />);
    expect(screen.getByTestId('step')).toHaveClass(`ns-step-number--${size}`);
  });

  it.each<StepNumberTone>(['brand', 'highlight', 'accent'])('tone=%s adds its modifier', (tone) => {
    renderWithTheme(<StepNumber value={1} tone={tone} data-testid="step" />);
    expect(screen.getByTestId('step')).toHaveClass(`ns-step-number--${tone}`);
  });
});
