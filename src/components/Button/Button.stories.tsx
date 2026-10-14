import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { iconNames } from '../../icons/generated.js';
import { Button } from './Button.js';

const row: CSSProperties = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--ns-spacing-24)' };
const column: CSSProperties = { display: 'grid', gap: 'var(--ns-spacing-24)' };
const caption: CSSProperties = {
  minWidth: '6rem',
  font: 'inherit',
  fontSize: 'var(--ns-font-size-label-sm)',
  color: 'var(--ns-color-text-secondary)',
};

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={row}>
      <span style={caption}>{label}</span>
      {children}
    </div>
  );
}

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Contact us',
    variant: 'filled',
    size: 'md',
    arrow: true,
    icon: 'arrow-right',
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'text'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    icon: { control: 'select', options: iconNames },
    children: { control: 'text' },
    asChild: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Buttons trigger actions. The NicaSource button is a pill label paired with a round arrow **bubble**: at rest the arrow trails the label, and on hover, keyboard focus or press it slides in front of it (200ms, `cubic-bezier(0.2, 0.8, 0.2, 1)`; instant with `prefers-reduced-motion`).',
          '',
          '- **Filled** is the primary, highest-emphasis action. **Use at most one Filled button per view** and pair it with **Outlined** for the secondary action. This is a usage rule; the component does not enforce it.',
          '- **Text** is for tertiary actions and "Learn more" style links inside content. Hover underlines the label and tints the bubble.',
          '- Keep `arrow` for navigation-like actions ("Contact us", "Next"); set `arrow={false}` for in-place actions ("Save", "Cancel").',
          "- Labels are sentence case, 1–3 words, verb first. Don't use a disabled button to hide validation errors — explain what is missing.",
          '- Sizes S/M/L are 32/40/48px (`--ns-size-control-*`). On touch layouts prefer M or L.',
          '',
          '**States** are not props: hover, focus and pressed come from `:hover`, `:focus-visible` and `:active`; disabled is the native `disabled` attribute; `loading` sets `aria-busy="true"`, swaps the arrow for a spinning loader and ignores clicks while keeping the button focusable. Announce completion through your own `aria-live` region.',
          '',
          '**Accessibility:** use `<button>` for actions and `<a>` for navigation (`asChild`). The label is the accessible name; the bubble icon is `aria-hidden`. Prefer `aria-disabled` over `disabled` when the button must stay discoverable by keyboard.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The three Figma component sets: Button / Filled, Outlined and Text. */
export const Variants: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} variant="filled">
        Contact us
      </Button>
      <Button {...args} variant="outlined">
        Our work
      </Button>
      <Button {...args} variant="text">
        Learn more
      </Button>
    </div>
  ),
};

/** S / M / L = 32 / 40 / 48px. */
export const Sizes: Story = {
  render: (args) => (
    <div style={column}>
      {(['filled', 'outlined', 'text'] as const).map((variant) => (
        <Row key={variant} label={variant}>
          <Button {...args} variant={variant} size="sm">
            Small
          </Button>
          <Button {...args} variant={variant} size="md">
            Medium
          </Button>
          <Button {...args} variant={variant} size="lg">
            Large
          </Button>
        </Row>
      ))}
    </div>
  ),
};

/**
 * Default, Disabled and Loading rendered statically. Hover, Focused and Pressed are interaction
 * states: hover a button, Tab to it, or hold the pointer down to see the arrow lead and the colors
 * change.
 */
export const States: Story = {
  render: (args) => (
    <div style={column}>
      {(['filled', 'outlined', 'text'] as const).map((variant) => (
        <Row key={variant} label={variant}>
          <Button {...args} variant={variant}>
            Default
          </Button>
          <Button {...args} variant={variant} disabled>
            Disabled
          </Button>
          <Button {...args} variant={variant} loading>
            Loading
          </Button>
        </Row>
      ))}
    </div>
  ),
};

/** Swap the bubble icon (Figma `Icon` instance swap). */
export const WithIcon: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} icon="download">
        Download
      </Button>
      <Button {...args} variant="outlined" icon="external-link">
        Visit site
      </Button>
      <Button {...args} variant="text" icon="arrow-up-right">
        Read case study
      </Button>
    </div>
  ),
};

/** `arrow={false}` for in-place actions such as Save or Cancel. */
export const WithoutArrow: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} arrow={false}>
        Save
      </Button>
      <Button {...args} variant="outlined" arrow={false}>
        Cancel
      </Button>
      <Button {...args} variant="text" arrow={false}>
        Skip
      </Button>
    </div>
  ),
};

/** `asChild` renders a single styled `<a>` for navigation. */
export const AsLink: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} asChild>
        <a href="#contact">Contact us</a>
      </Button>
      <Button {...args} variant="text" asChild>
        <a href="#work">See our work</a>
      </Button>
    </div>
  ),
};
