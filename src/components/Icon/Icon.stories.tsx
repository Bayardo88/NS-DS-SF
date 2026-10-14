import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { iconNames } from '../../icons/generated.js';
import { Icon } from './Icon.js';

const row: CSSProperties = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--ns-spacing-24)' };
const caption: CSSProperties = {
  display: 'grid',
  justifyItems: 'center',
  gap: 'var(--ns-spacing-8)',
  fontSize: 'var(--ns-font-size-label-sm)',
  color: 'var(--ns-color-text-secondary)',
};

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: { name: 'arrow-right', size: 'md', spin: false },
  argTypes: {
    name: { control: 'select', options: iconNames },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: {
      control: 'select',
      options: [
        undefined,
        'primary',
        'secondary',
        'brand',
        'accent',
        'success',
        'warning',
        'error',
        'inverse',
        'disabled',
        'highlight',
      ],
    },
    label: { control: 'text' },
    spin: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'A single 24px filled-outline icon family (180 icons, 11 categories) exported from the Figma **Icons** page. Every Figma component `Icons/<Category>/<name>` maps to `<Icon name="<name>" />`. Browse them all in **Foundations/Icons**.',
          '',
          '- Icons draw with `currentColor`, so they take the text color of their parent. Override only with an `icon/*` token: `color="brand"` (or CSS `color: var(--ns-color-icon-brand)`); never raw hex.',
          "- Sizes follow `size/icon/*`: xs 12 · sm 16 · md 20 · lg 24 · xl 32. Scale only to these sizes; don't stretch, rotate or add strokes.",
          '- Keep at least 8px between an icon and adjacent text. Pick icons by meaning (`trash` for delete), not by look. Social logos (Contact + Social) are not generic UI icons.',
          '- **Loader**: `<Icon name="loader" spin />` rotates 360° in 800ms, linear, infinite (Button uses it for its loading state). The animation stops under `prefers-reduced-motion`.',
          '',
          '**Accessibility:** icons are decorative by default (`aria-hidden="true"`). When an icon is the only content of a control, put the accessible name on the control (`<button aria-label="Delete">`); pass `label` only when the icon itself must convey meaning (it then renders `role="img"` with that name).',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The five `size/icon/*` sizes. */
export const Sizes: Story = {
  render: (args) => (
    <div style={row}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <span key={size} style={caption}>
          <Icon {...args} size={size} />
          {size}
        </span>
      ))}
    </div>
  ),
};

/** `icon/*` color tokens. Default (no `color`) inherits the parent's text color. */
export const Colors: Story = {
  render: (args) => (
    <div style={row}>
      {(['primary', 'secondary', 'brand', 'accent', 'success', 'warning', 'error', 'disabled'] as const).map(
        (color) => (
          <span key={color} style={caption}>
            <Icon {...args} color={color} size="lg" />
            {color}
          </span>
        ),
      )}
    </div>
  ),
};

/** The Loader icon as a spinner (`spin`). */
export const Spinner: Story = {
  args: { name: 'loader', spin: true, size: 'lg', label: 'Loading' },
};
