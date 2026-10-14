import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { NSMark } from './NSMark.js';

const row: CSSProperties = { display: 'flex', flexWrap: 'wrap', alignItems: 'end', gap: 'var(--ns-spacing-24)' };
const caption: CSSProperties = {
  display: 'grid',
  justifyItems: 'center',
  gap: 'var(--ns-spacing-8)',
  fontSize: 'var(--ns-font-size-label-sm)',
  color: 'var(--ns-color-text-secondary)',
};

const meta = {
  title: 'Components/NSMark',
  component: NSMark,
  args: { color: 'red', size: 24 },
  argTypes: {
    color: { control: 'select', options: ['red', 'navy', 'yellow', 'wine', 'salmon', 'cyan'] },
    size: { control: { type: 'number', min: 16, step: 4 } },
    label: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "The NS Mark is the chevron from the logo, used alone as an avatar, favicon, bullet or graphic accent. Its colors are **fixed brand colors** that don't change with the color mode: red = red/500, navy = blue/600, yellow = yellow/900, wine = wine/900, salmon = salmon/500, cyan = cyan/500. Careers uses yellow, wine, salmon and cyan.",
          '',
          'Proportions are locked at 41 × 27: set `size` (the width) and the height follows. Minimum 16px. Pick a color that contrasts with the background.',
          '',
          '**Accessibility:** decorative by default (`aria-hidden`). Pass `label` when the mark stands alone as the brand (e.g. an avatar) so it renders `role="img"` with that name.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof NSMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The six Figma colors. */
export const Colors: Story = {
  render: (args) => (
    <div style={row}>
      {(['red', 'navy', 'yellow', 'wine', 'salmon', 'cyan'] as const).map((color) => (
        <span key={color} style={caption}>
          <NSMark {...args} color={color} size={48} />
          {color}
        </span>
      ))}
    </div>
  ),
};

/** Minimum (16px) up to large sizes. */
export const Sizes: Story = {
  render: (args) => (
    <div style={row}>
      {[16, 24, 41, 64].map((size) => (
        <span key={size} style={caption}>
          <NSMark {...args} size={size} />
          {size}px
        </span>
      ))}
    </div>
  ),
};
