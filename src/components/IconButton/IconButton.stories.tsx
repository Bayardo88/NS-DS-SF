import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { iconNames } from '../../icons/generated.js';
import { IconButton } from './IconButton.js';

const row: CSSProperties = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--ns-spacing-12)' };
const column: CSSProperties = { display: 'grid', gap: 'var(--ns-spacing-24)' };
const caption: CSSProperties = {
  minWidth: '6rem',
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

const variants = ['filled', 'outlined', 'text'] as const;

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    variant: 'filled',
    size: 'md',
    icon: 'arrow-right',
    'aria-label': 'Next slide',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'text'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    icon: { control: 'select', options: iconNames },
    'aria-label': { control: 'text' },
    asChild: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "A round, icon-only button for compact actions where a visible label would not fit: carousel arrows, close, share and social links. It mirrors Button's variants, sizes (32/40/48px) and states.",
          '',
          '- **An accessible name is required**: pass `aria-label` (e.g. "Next slide", "Close dialog") or `aria-labelledby`. The TypeScript props reject an IconButton without one. The icon itself is `aria-hidden`.',
          '- Use it only when the icon meaning is obvious; otherwise use `Button` with a label. Add a tooltip with the same text when the meaning could be ambiguous.',
          "- Group related icon buttons with 8–12px gaps (`--ns-spacing-8` / `--ns-spacing-12`). Don't put more than one Filled icon button in a group or use it for the primary page action.",
          '- Toggle buttons (play/pause) set `aria-pressed` and swap the `icon`.',
          '- Prefer `lg` (48px) on touch screens, or extend the hit area to 44×44px.',
          '',
          'Hover, focus and pressed come from `:hover`, `:focus-visible` and `:active`; disabled is the native `disabled` attribute.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The three Figma component sets: Icon Button / Filled, Outlined and Text. */
export const Variants: Story = {
  render: (args) => (
    <div style={row}>
      {variants.map((variant) => (
        <IconButton key={variant} {...args} variant={variant} aria-label={`Next slide (${variant})`} />
      ))}
    </div>
  ),
};

/** S / M / L = 32 / 40 / 48px with 16 / 20 / 24px icons. */
export const Sizes: Story = {
  render: (args) => (
    <div style={column}>
      {variants.map((variant) => (
        <Row key={variant} label={variant}>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <IconButton key={size} {...args} variant={variant} size={size} aria-label={`Next slide, ${size}`} />
          ))}
        </Row>
      ))}
    </div>
  ),
};

/**
 * Default and Disabled rendered statically. Hover, Focused and Pressed are interaction states:
 * hover a button, Tab to it, or hold the pointer down.
 */
export const States: Story = {
  render: (args) => (
    <div style={column}>
      {variants.map((variant) => (
        <Row key={variant} label={variant}>
          <IconButton {...args} variant={variant} aria-label="Next slide" />
          <IconButton {...args} variant={variant} disabled aria-label="Next slide (disabled)" />
        </Row>
      ))}
    </div>
  ),
};

/** Swap the icon (Figma `Icon` instance swap). */
export const WithIcon: Story = {
  render: (args) => (
    <div style={row}>
      <IconButton {...args} variant="outlined" icon="arrow-left" aria-label="Previous slide" />
      <IconButton {...args} variant="filled" icon="arrow-right" aria-label="Next slide" />
      <IconButton {...args} variant="text" icon="close" aria-label="Close" />
      <IconButton {...args} variant="text" icon="share" aria-label="Share" />
    </div>
  ),
};

/** `asChild` renders a single styled `<a>`, e.g. for social links. */
export const AsLink: Story = {
  render: (args) => (
    <div style={row}>
      <IconButton {...args} asChild variant="outlined" icon="linkedin" aria-label="NicaSource on LinkedIn">
        <a href="https://www.linkedin.com/company/nicasource">LinkedIn</a>
      </IconButton>
      <IconButton {...args} asChild variant="outlined" icon="github" aria-label="NicaSource on GitHub">
        <a href="https://github.com/nicasource">GitHub</a>
      </IconButton>
    </div>
  ),
};
