import { createRef } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { Button } from './Button.js';

describe('Button', () => {
  it('renders a type="button" with no axe violations', async () => {
    const { container } = renderWithTheme(<Button>Contact us</Button>);
    const button = screen.getByRole('button', { name: 'Contact us' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('ns-button', 'ns-button--filled', 'ns-button--md', 'ns-button--with-bubble');
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it.each(['light', 'dark', 'web-2025'] as const)('has no axe violations in %s', async (theme) => {
    const { container } = renderWithTheme(
      <>
        <Button variant="filled">Filled</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Sending</Button>
      </>,
      theme,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('forwards ref, merges className and passes ...rest', () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTheme(
      <Button ref={ref} className="custom" data-testid="btn" type="submit">
        Send
      </Button>,
    );
    const button = screen.getByTestId('btn');
    expect(ref.current).toBe(button);
    expect(button).toHaveClass('ns-button', 'custom');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it.each(['filled', 'outlined', 'text'] as const)('applies the %s variant class', (variant) => {
    renderWithTheme(<Button variant={variant}>Go</Button>);
    expect(screen.getByRole('button')).toHaveClass(`ns-button--${variant}`);
  });

  it.each(['sm', 'md', 'lg'] as const)('applies the %s size class', (size) => {
    renderWithTheme(<Button size={size}>Go</Button>);
    expect(screen.getByRole('button')).toHaveClass(`ns-button--${size}`);
  });

  it('hides the decorative arrow bubble from assistive tech and drops it with arrow={false}', () => {
    const { container, rerender } = renderWithTheme(<Button>Next</Button>);
    const bubble = container.querySelector('.ns-button__bubble');
    expect(bubble).toHaveAttribute('aria-hidden', 'true');
    rerender(<Button arrow={false}>Save</Button>);
    expect(container.querySelector('.ns-button__bubble')).toBeNull();
    expect(screen.getByRole('button')).not.toHaveClass('ns-button--with-bubble');
  });

  it('is reachable with Tab and activated by Enter and Space', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(<Button onClick={onClick}>Go</Button>);
    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('disabled blocks onClick and leaves the tab order', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <Button disabled onClick={onClick}>
        Go
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await user.click(button);
    await user.tab();
    expect(button).not.toHaveFocus();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('loading sets aria-busy, shows a spinner, stays focusable and blocks onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = renderWithTheme(
      <Button loading arrow={false} onClick={onClick}>
        Sending
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Sending' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).not.toBeDisabled();
    expect(container.querySelector('.ns-button__spinner')).not.toBeNull();
    await user.click(button);
    expect(button).toHaveFocus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('asChild renders one styled <a> and forwards the ref to it', async () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = renderWithTheme(
      <Button asChild ref={ref} variant="outlined" className="extra">
        <a href="/contact">Contact us</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Contact us' });
    expect(container.querySelectorAll('button')).toHaveLength(0);
    expect(link).toHaveClass('ns-button', 'ns-button--outlined', 'extra');
    expect(link).toHaveAttribute('href', '/contact');
    expect(link).not.toHaveAttribute('type');
    expect(link.querySelector('.ns-button__label')).toHaveTextContent('Contact us');
    expect(ref.current).toBe(link);
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('asChild disabled sets aria-disabled, leaves the tab order and blocks clicks', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithTheme(
      <Button asChild disabled onClick={onClick}>
        <a href="#contact">Contact us</a>
      </Button>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
    await user.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('Button asChild + disabled', () => {
  it("does not run the child link's own onClick (router navigation)", async () => {
    const navigate = vi.fn();
    renderWithTheme(
      <Button asChild disabled>
        <a href="/contact" onClick={navigate}>
          Contact
        </a>
      </Button>,
    );
    await userEvent.click(screen.getByRole('link'));
    expect(navigate).not.toHaveBeenCalled();
  });
});
