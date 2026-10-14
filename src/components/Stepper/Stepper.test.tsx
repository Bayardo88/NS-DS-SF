import { createRef } from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { Stepper } from './Stepper.js';

const STEPS = ['Personal', 'Mailing', 'Docs', 'Payroll', 'Review'];

describe('Stepper', () => {
  it('renders a labelled nav with an ordered list and no axe violations', async () => {
    const { container } = renderWithTheme(<Stepper steps={STEPS} current={2} />);
    const nav = screen.getByRole('navigation', { name: 'Progress' });
    const list = within(nav).getByRole('list');
    expect(list.tagName).toBe('OL');
    expect(within(list).getAllByRole('listitem')).toHaveLength(5);
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it.each(['light', 'dark', 'web-2025'] as const)('has no axe violations in %s', async (theme) => {
    const { container } = renderWithTheme(<Stepper steps={STEPS} current={3} onStepClick={() => {}} />, theme);
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('forwards ref to the nav, merges className and passes rest props', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<Stepper ref={ref} steps={STEPS} current={1} className="extra" data-testid="stepper" />);
    const nav = screen.getByTestId('stepper');
    expect(ref.current).toBe(nav);
    expect(nav).toHaveClass('ns-stepper', 'extra');
  });

  it('lets aria-label be overridden', () => {
    renderWithTheme(<Stepper steps={STEPS} current={1} aria-label="Application progress" />);
    expect(screen.getByRole('navigation', { name: 'Application progress' })).toBeInTheDocument();
  });

  it('derives Done / Current / Upcoming and First / Middle from current and index', () => {
    renderWithTheme(<Stepper steps={STEPS} current={3} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('ns-stepper__step--first', 'ns-stepper__step--done');
    expect(items[1]).toHaveClass('ns-stepper__step--middle', 'ns-stepper__step--done');
    expect(items[2]).toHaveClass('ns-stepper__step--middle', 'ns-stepper__step--current');
    expect(items[2]).toHaveAttribute('aria-current', 'step');
    expect(items[3]).toHaveClass('ns-stepper__step--upcoming');
    expect(items[3]).not.toHaveAttribute('aria-current');
    expect(items[4]).toHaveClass('ns-stepper__step--upcoming');
  });

  it('replaces Done labels with a check and keeps them for screen readers', () => {
    renderWithTheme(<Stepper steps={STEPS} current={2} />);
    const [done] = screen.getAllByRole('listitem');
    expect(done).toHaveTextContent('Completed: Personal');
    expect(done!.querySelector('.ns-visually-hidden')).toHaveTextContent('Completed: Personal');
    expect(done!.querySelector('svg.ns-icon')).toHaveAttribute('aria-hidden', 'true');
    expect(done!.querySelector('.ns-stepper__label')).toBeNull();
  });

  it('accepts { id, label } steps and a custom completed label', () => {
    renderWithTheme(
      <Stepper
        steps={[
          { id: 'a', label: 'Same' },
          { id: 'b', label: 'Same' },
        ]}
        current={2}
        completedLabel="Listo"
      />,
    );
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Listo: Same');
  });

  it('only makes Done steps clickable, and activates them with the keyboard', async () => {
    const user = userEvent.setup();
    const handleStepClick = vi.fn();
    renderWithTheme(<Stepper steps={STEPS} current={3} onStepClick={handleStepClick} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveAccessibleName('Completed: Personal');

    await user.tab();
    expect(buttons[0]).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(handleStepClick).toHaveBeenLastCalledWith(1, { label: 'Personal' });
    await user.tab();
    expect(buttons[1]).toHaveFocus();
    await user.keyboard(' ');
    expect(handleStepClick).toHaveBeenLastCalledWith(2, { label: 'Mailing' });
    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it('renders no buttons without onStepClick', () => {
    renderWithTheme(<Stepper steps={STEPS} current={4} />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('collapses to a text summary with more than 5 steps or when compact', () => {
    const { rerender } = renderWithTheme(<Stepper steps={[...STEPS, 'Sign', 'Done']} current={2} />);
    expect(screen.getByRole('navigation')).toHaveClass('ns-stepper--compact');
    expect(screen.getByText('Step 2 of 7 · Mailing')).toBeInTheDocument();

    rerender(<Stepper steps={STEPS} current={1} />);
    expect(screen.getByRole('navigation')).not.toHaveClass('ns-stepper--compact');

    rerender(<Stepper steps={STEPS} current={1} compact formatSummary={(c, t, l) => `${l} (${c}/${t})`} />);
    expect(screen.getByRole('navigation')).toHaveClass('ns-stepper--compact');
    expect(screen.getByText('Personal (1/5)')).toBeInTheDocument();
  });

  it('shows every step as Done when current is past the end', () => {
    renderWithTheme(<Stepper steps={STEPS} current={6} />);
    for (const item of screen.getAllByRole('listitem')) expect(item).toHaveClass('ns-stepper__step--done');
    expect(screen.getByText('Step 5 of 5 · Review')).toBeInTheDocument();
  });
});
