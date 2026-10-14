import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Stepper } from './Stepper.js';

const STEPS = ['Personal', 'Mailing', 'Docs', 'Payroll', 'Review'];

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  args: { steps: STEPS, current: 2 },
  argTypes: {
    current: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    compact: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Chevron progress bar for multi-step forms (new-hire questionnaire, job application). `current` is 1-based: ' +
          'earlier steps render Done (check icon, label kept as visually hidden "Completed: …" text), the current step ' +
          'is solid brand with `aria-current="step"`, later steps are tinted. Position (flat first edge, notched middle) ' +
          'and State are derived from the index and `current`; there is no public Step component. The stepper only ' +
          'reflects progress — navigate with the form’s Previous / Next buttons, or pass `onStepClick` to make Done ' +
          'steps jump back. With more than 5 steps, or below 600px of container width, it collapses to "Step 2 of 7 · Mailing".',
      },
    },
  },
} satisfies Meta<typeof Stepper>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Figma `Stepper › Current` 1…5, plus everything Done. */
export const AllPositions: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--ns-spacing-16)' }}>
      {[1, 2, 3, 4, 5, 6].map((current) => (
        <Stepper key={current} {...args} current={current} aria-label={`Progress, current ${current}`} />
      ))}
    </div>
  ),
};

/** Longer labels grow their chevrons; narrow containers (< 600px) and > 5 steps collapse to text. */
export const LongLabels: Story = {
  args: {
    steps: ['Personal information', 'Mailing address', 'Documents', 'Payroll setup', 'Review & sign'],
    current: 3,
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--ns-spacing-24)' }}>
      <Stepper {...args} aria-label="Progress, full width" />
      <div style={{ maxInlineSize: '28rem' }}>
        <Stepper {...args} aria-label="Progress, narrow container" />
      </div>
      <Stepper
        {...args}
        steps={['Personal', 'Mailing', 'Docs', 'Payroll', 'Benefits', 'Equipment', 'Review']}
        aria-label="Progress, seven steps"
      />
    </div>
  ),
};

/** Done steps as buttons that jump back to edit. */
export const ClickableDoneSteps: Story = {
  args: { current: 4, onStepClick: fn() },
};
