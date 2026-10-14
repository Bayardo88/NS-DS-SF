import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepNumber, type StepNumberSize, type StepNumberTone } from './StepNumber.js';

const sizes: StepNumberSize[] = ['sm', 'md', 'lg'];
const tones: StepNumberTone[] = ['brand', 'highlight', 'accent'];

const meta = {
  title: 'Components/StepNumber',
  component: StepNumber,
  args: { value: 1, caption: 'We meet with you', size: 'lg', tone: 'brand' },
  argTypes: {
    size: { control: 'select', options: sizes },
    tone: { control: 'select', options: tones },
    value: { control: { type: 'number', min: 0, max: 99, step: 1 } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'An oversized two-digit numeral (Fira Code Bold) with an optional caption that structures "how it works" ' +
          'sections. `value` is zero-padded at render (`1` → "01"). Sizes S/M/L use Primary/Display SM, LG and 2XL ' +
          '(28/48/64px). Static, not interactive. Render it inside an `<ol>` item or the step heading so the order is ' +
          'semantic, and use one tone per section (Highlight on Web 2025 dark sections, Brand on light ones). Any ' +
          'scroll-in animation belongs to the page and must be skipped under `prefers-reduced-motion`.',
      },
    },
  },
} satisfies Meta<typeof StepNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const row = { display: 'flex', alignItems: 'flex-start', gap: 'var(--ns-spacing-48)', flexWrap: 'wrap' } as const;

/** Figma `Size`: S · M · L. */
export const Sizes: Story = {
  render: (args) => (
    <div style={row}>
      {sizes.map((size) => (
        <StepNumber key={size} {...args} size={size} caption={`Size ${size}`} />
      ))}
    </div>
  ),
};

/** Figma `Tone`: Brand · Highlight · Accent. */
export const Tones: Story = {
  render: (args) => (
    <div style={row}>
      {tones.map((tone) => (
        <StepNumber key={tone} {...args} tone={tone} caption={tone} />
      ))}
    </div>
  ),
};

const steps = [
  { value: 1, caption: 'We meet with you' },
  { value: 2, caption: 'We assemble your team' },
  { value: 3, caption: 'You approve and we start' },
];

/** Figma "Process example": three Large steps in one tone, inside an ordered list. */
export const ProcessExample: Story = {
  args: { tone: 'highlight' },
  render: (args) => (
    <ol aria-label="How it works" style={{ ...row, margin: 0, padding: 0, listStyle: 'none' }}>
      {steps.map((step) => (
        <li key={step.value}>
          <StepNumber size="lg" tone={args.tone} value={step.value} caption={step.caption} />
        </li>
      ))}
    </ol>
  ),
};
