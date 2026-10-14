import { forwardRef, type HTMLAttributes, type MouseEvent } from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/index.js';

/** One step of a `Stepper`, when a plain string label isn't enough. */
export interface StepperStep {
  /** Stable key. Falls back to `label`, so labels must be unique when `id` is omitted. */
  id?: string;
  /** Short, visible step name ("Personal", "STEP 2"). Shown uppercase. */
  label: string;
}

/** Figma `Stepper / Step › State`, derived from `current` during render. */
export type StepperStepState = 'done' | 'current' | 'upcoming';

export interface StepperProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Ordered steps, as labels or `{ id, label }` objects. Figma shows up to 5. */
  steps: ReadonlyArray<string | StepperStep>;
  /**
   * 1-based number of the step in progress (Figma `Current`). Earlier steps are Done, later steps
   * Upcoming. Pass `steps.length + 1` to show every step as Done.
   */
  current: number;
  /**
   * Makes Done steps buttons that jump back to edit them. Receives the 1-based step number and the step.
   * Current and Upcoming steps are never clickable.
   */
  onStepClick?: (step: number, item: StepperStep) => void;
  /** Visually hidden prefix announced before a Done step's label. */
  completedLabel?: string;
  /**
   * Text shown instead of the chevrons when the stepper collapses (more than 5 steps, or narrower
   * than 600px). Defaults to `Step 2 of 7 · Mailing`.
   */
  formatSummary?: (current: number, total: number, label: string) => string;
  /** Always show the text summary. Defaults to `true` when there are more than 5 steps. */
  compact?: boolean;
}

const MAX_CHEVRONS = 5;

function toStep(step: string | StepperStep): StepperStep {
  return typeof step === 'string' ? { label: step } : step;
}

function stateOf(stepNumber: number, current: number): StepperStepState {
  if (stepNumber < current) return 'done';
  return stepNumber === current ? 'current' : 'upcoming';
}

function defaultSummary(current: number, total: number, label: string): string {
  return `Step ${current} of ${total} · ${label}`;
}

/**
 * Chevron progress bar for multi-step forms. Renders `<nav aria-label="Progress">` with an ordered list;
 * the current step has `aria-current="step"`. The ref points at the `<nav>`.
 */
export const Stepper = forwardRef<HTMLElement, StepperProps>(function Stepper(
  {
    steps,
    current,
    onStepClick,
    completedLabel = 'Completed',
    formatSummary = defaultSummary,
    compact,
    className,
    ...rest
  },
  ref,
) {
  const items = steps.map(toStep);
  const total = items.length;
  const isCompact = compact ?? total > MAX_CHEVRONS;
  const summaryStep = Math.min(Math.max(current, 1), total);
  const summaryLabel = items[summaryStep - 1]?.label ?? '';

  function handleStepClick(event: MouseEvent<HTMLButtonElement>) {
    const stepNumber = Number(event.currentTarget.dataset.step);
    const item = items[stepNumber - 1];
    if (onStepClick && item) onStepClick(stepNumber, item);
  }

  return (
    <nav
      ref={ref}
      aria-label="Progress"
      className={cx('ns-stepper', isCompact && 'ns-stepper--compact', className)}
      {...rest}
    >
      <ol className="ns-stepper__list">
        {items.map((item, index) => {
          const stepNumber = index + 1;
          const state = stateOf(stepNumber, current);
          const content =
            state === 'done' ? (
              <>
                <Icon name="check" size="sm" className="ns-stepper__check" />
                <span className="ns-visually-hidden">
                  {completedLabel}: {item.label}
                </span>
              </>
            ) : (
              <span className="ns-stepper__label ns-text-secondary-label-xs-demi-bold">{item.label}</span>
            );
          return (
            <li
              key={item.id ?? item.label}
              className={cx(
                'ns-stepper__step',
                `ns-stepper__step--${index === 0 ? 'first' : 'middle'}`,
                `ns-stepper__step--${state}`,
              )}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {state === 'done' && onStepClick ? (
                <button
                  type="button"
                  className="ns-stepper__shape ns-stepper__action"
                  data-step={stepNumber}
                  onClick={handleStepClick}
                >
                  {content}
                </button>
              ) : (
                <span className="ns-stepper__shape">{content}</span>
              )}
            </li>
          );
        })}
      </ol>
      {total > 0 && (
        <p className="ns-stepper__summary ns-text-secondary-body-sm-demi-bold">
          {formatSummary(summaryStep, total, summaryLabel)}
        </p>
      )}
    </nav>
  );
});
