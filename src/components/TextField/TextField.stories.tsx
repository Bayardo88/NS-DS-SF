import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconNames } from '../../icons/generated.js';
import { TextField } from './TextField.js';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    label: 'Full name',
    placeholder: 'Jane Doe',
    helperText: 'As it appears on your ID',
    required: false,
    disabled: false,
    hideLabel: false,
  },
  argTypes: {
    endIcon: { control: 'select', options: [undefined, ...iconNames] },
    type: { control: 'select', options: ['text', 'email', 'tel', 'url', 'search', 'password'] },
    error: { control: 'text' },
    success: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A labelled single-line input for forms (contact, careers, new-hire questionnaire). 48px high (`control/lg`), ' +
          '`radius/sm`, resting outline `border/input` (≥3:1 in every mode). Hover turns the outline brand, focus shows a 2px ' +
          '`border/focus` outline, Filled is just a value. Success and Error add a status icon and replace the helper with ' +
          'their message; Error also sets `aria-invalid`. The label is always rendered (`hideLabel` only hides it visually). ' +
          '`ref` and native props (`value`, `defaultValue`, `onChange`, `type`, `name`…) go to the `<input>`; `className` and ' +
          '`style` go to the root wrapper. Validate on blur and submit, then re-validate on every change after an error.',
      },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const stack = { display: 'flex', flexDirection: 'column', gap: 'var(--ns-spacing-24)' } as const;

/** Figma `State`: Default · Hover · Focused · Filled · Success · Error · Disabled. Hover and Focused are live CSS states: point at or tab into the fields. */
export const States: Story = {
  render: () => (
    <div style={stack}>
      <TextField label="Default" placeholder="Placeholder" helperText="Helper text" />
      <TextField label="Hover (point at it)" placeholder="Placeholder" helperText="Helper text" />
      <TextField label="Focused (tab into it)" placeholder="Placeholder" helperText="Helper text" />
      <TextField label="Filled" defaultValue="Jane Doe" helperText="Helper text" />
      <TextField label="Success" defaultValue="Jane Doe" success="Looks good" />
      <TextField label="Error" defaultValue="Jane Doe" error="This field is required" />
      <TextField label="Disabled" defaultValue="Jane Doe" helperText="Helper text" disabled />
    </div>
  ),
};

export const WithEndIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search projects',
    helperText: undefined,
    endIcon: 'search',
    type: 'search',
  },
};

/** Figma "Contact form example": required name, an email with an error, an optional company. */
export const ContactForm: Story = {
  render: () => (
    <form style={stack} noValidate onSubmit={(event) => event.preventDefault()} aria-label="Contact">
      <TextField
        label="Full name"
        name="name"
        autoComplete="name"
        defaultValue="Tom Riddle"
        helperText="As it appears on your ID"
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        defaultValue="tom@"
        error="Enter a valid email address"
        required
      />
      <TextField
        label="Company"
        name="company"
        autoComplete="organization"
        placeholder="Your company"
        helperText="Optional"
      />
    </form>
  ),
};
