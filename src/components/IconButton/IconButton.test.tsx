import { createRef } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { IconButton } from './IconButton.js';

describe('IconButton', () => {
  it('renders a named type="button" with no axe violations', async () => {
    const { container } = renderWithTheme(<IconButton aria-label="Next slide" />);
    const button = screen.getByRole('button', { name: 'Next slide' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('ns-icon-button', 'ns-icon-button--filled', 'ns-icon-button--md');
    expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it.each(['light', 'dark', 'web-2025'] as const)('has no axe violations in %s', async (theme) => {
    const { container } = renderWithTheme(
      <>
        <IconButton variant="filled" icon="arrow-left" aria-label="Previous" />
        <IconButton variant="outlined" icon="arrow-right" aria-label="Next" />
        <IconButton variant="text" icon="close" aria-label="Close" />
        <IconButton disabled aria-label="Share" icon="share" />
      </>,
      theme,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('accepts aria-labelledby instead of aria-label', () => {
    renderWithTheme(
      <>
        <span id="lbl">Play video</span>
        <IconButton icon="play" aria-labelledby="lbl" />
      </>,
    );
    expect(screen.getByRole('button', { name: 'Play video' })).toBeInTheDocument();
  });

  it('forwards ref, merges className and passes ...rest', () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTheme(
      <IconButton ref={ref} aria-label="Close" className="custom" data-testid="ib" aria-pressed="false" />,
    );
    const button = screen.getByTestId('ib');
    expect(ref.current).toBe(button);
    expect(button).toHaveClass('ns-icon-button', 'custom');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it.each(['filled', 'outlined', 'text'] as const)('applies the %s variant class', (variant) => {
    renderWithTheme(<IconButton variant={variant} aria-label="Next" />);
    expect(screen.getByRole('button')).toHaveClass(`ns-icon-button--${variant}`);
  });

  it.each(['sm', 'md', 'lg'] as const)('applies the %s size class and icon size', (size) => {
    renderWithTheme(<IconButton size={size} aria-label="Next" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(`ns-icon-button--${size}`);
    expect(button.querySelector('svg')).toHaveClass(`ns-icon--${size}`);
  });

  it('is reachable with Tab and activated by Enter and Space', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(<IconButton aria-label="Next" onClick={onClick} />);
    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('disabled blocks onClick and leaves the tab order', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(<IconButton aria-label="Next" disabled onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await user.click(button);
    await user.tab();
    expect(button).not.toHaveFocus();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('asChild renders one styled <a> with the icon as its content', async () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = renderWithTheme(
      <IconButton asChild ref={ref} variant="outlined" icon="linkedin" aria-label="NicaSource on LinkedIn">
        <a href="https://www.linkedin.com/company/nicasource">LinkedIn</a>
      </IconButton>,
    );
    const link = screen.getByRole('link', { name: 'NicaSource on LinkedIn' });
    expect(container.querySelectorAll('button')).toHaveLength(0);
    expect(link).toHaveClass('ns-icon-button', 'ns-icon-button--outlined');
    expect(link).not.toHaveAttribute('type');
    expect(link.querySelector('svg')).not.toBeNull();
    expect(link).not.toHaveTextContent('LinkedIn');
    expect(ref.current).toBe(link);
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('asChild disabled sets aria-disabled and blocks clicks', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <IconButton asChild disabled aria-label="Share" onClick={onClick}>
        <a href="#share">Share</a>
      </IconButton>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
    await user.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });
});

// Type-level check: an IconButton without an accessible name must not compile.
// @ts-expect-error aria-label or aria-labelledby is required
export const missingLabel = <IconButton icon="close" />;
