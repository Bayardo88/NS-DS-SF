import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { TextField } from './TextField.js';

describe('TextField', () => {
  it('renders a labelled input with no axe violations', async () => {
    const { container } = renderWithTheme(
      <TextField label="Full name" placeholder="Jane Doe" helperText="As it appears on your ID" />,
    );
    const input = screen.getByLabelText('Full name');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('placeholder', 'Jane Doe');
    expect(input).toHaveAccessibleDescription('As it appears on your ID');
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('has no axe violations in the error, success and disabled states', async () => {
    const { container } = renderWithTheme(
      <>
        <TextField label="Email" error="Enter a valid email address" defaultValue="tom@" />
        <TextField label="Username" success="Username available" defaultValue="tom" />
        <TextField label="Company" disabled defaultValue="Acme" />
      </>,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('forwards ref to the input, puts className/style on the root and ...rest on the input', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = renderWithTheme(
      <TextField ref={ref} label="Name" className="custom" style={{ maxWidth: 320 }} data-testid="field" name="name" />,
    );
    const root = container.querySelector('.ns-text-field');
    expect(root).toHaveClass('ns-text-field', 'custom');
    expect(root).toHaveStyle({ maxWidth: '320px' });
    const input = screen.getByTestId('field');
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute('name', 'name');
  });

  it('uses a provided id and merges a consumer aria-describedby', () => {
    renderWithTheme(
      <>
        <p id="extra">Extra hint</p>
        <TextField label="Name" id="name-input" helperText="Helper" aria-describedby="extra" />
      </>,
    );
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('id', 'name-input');
    expect(input).toHaveAccessibleDescription('Helper Extra hint');
  });

  it('error replaces the helper, sets aria-invalid and does not rely on color alone', () => {
    const { container } = renderWithTheme(
      <TextField label="Email" helperText="We never share it" error="Enter a valid email address" />,
    );
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Error: Enter a valid email address');
    expect(screen.queryByText('We never share it')).not.toBeInTheDocument();
    expect(container.querySelector('.ns-text-field')).toHaveClass('ns-text-field--error');
    expect(container.querySelector('.ns-text-field__status-icon')).toBeInTheDocument();
  });

  it('success shows the success modifier and optional message; error wins over success', () => {
    const { container, rerender } = renderWithTheme(
      <TextField label="Username" helperText="Pick one" success="Username available" />,
    );
    expect(container.querySelector('.ns-text-field')).toHaveClass('ns-text-field--success');
    expect(screen.getByLabelText('Username')).toHaveAccessibleDescription('Username available');
    expect(screen.getByLabelText('Username')).not.toHaveAttribute('aria-invalid');

    rerender(<TextField label="Username" helperText="Pick one" success />);
    expect(screen.getByLabelText('Username')).toHaveAccessibleDescription('Pick one');

    rerender(<TextField label="Username" success error="Taken" />);
    expect(container.querySelector('.ns-text-field')).not.toHaveClass('ns-text-field--success');
    expect(container.querySelector('.ns-text-field')).toHaveClass('ns-text-field--error');
  });

  it('marks required fields with the attribute and visible text, not color alone', () => {
    renderWithTheme(<TextField label="Full name" required />);
    const input = screen.getByRole('textbox', { name: /full name/i });
    expect(input).toBeRequired();
    expect(screen.getByText('(required)')).toBeInTheDocument();
  });

  it('hideLabel keeps the label accessible but visually hidden', () => {
    renderWithTheme(<TextField label="Search" hideLabel endIcon="search" />);
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByText('Search')).toHaveClass('ns-visually-hidden');
  });

  it('renders the trailing icon as decorative', () => {
    const { container } = renderWithTheme(<TextField label="Search" endIcon="search" />);
    expect(container.querySelector('.ns-text-field__icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('works uncontrolled with defaultValue', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    renderWithTheme(<TextField label="Name" defaultValue="Jane" onChange={handleChange} />);
    const input = screen.getByLabelText('Name');
    await user.type(input, ' Doe');
    expect(input).toHaveValue('Jane Doe');
    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it('works controlled with value + onChange', async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState('');
      return <TextField label="Name" value={value} onChange={(event) => setValue(event.target.value.toUpperCase())} />;
    }
    renderWithTheme(<Controlled />);
    await user.type(screen.getByLabelText('Name'), 'abc');
    expect(screen.getByLabelText('Name')).toHaveValue('ABC');
  });

  it('is reachable with Tab and focusable by clicking the label', async () => {
    const user = userEvent.setup();
    renderWithTheme(<TextField label="Name" />);
    await user.tab();
    expect(screen.getByLabelText('Name')).toHaveFocus();
    (document.activeElement as HTMLElement).blur();
    await user.click(screen.getByText('Name'));
    expect(screen.getByLabelText('Name')).toHaveFocus();
  });

  it('disabled blocks typing, focus and onChange', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { container } = renderWithTheme(<TextField label="Name" disabled onChange={handleChange} />);
    const input = screen.getByLabelText('Name');
    expect(input).toBeDisabled();
    expect(container.querySelector('.ns-text-field')).toHaveClass('ns-text-field--disabled');
    await user.tab();
    expect(input).not.toHaveFocus();
    await user.type(input, 'abc');
    expect(handleChange).not.toHaveBeenCalled();
    expect(input).toHaveValue('');
  });
});
