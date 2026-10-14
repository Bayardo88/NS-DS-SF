import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag, type TagColor, type TagSize, type TagVariant } from './Tag.js';

const variants: TagVariant[] = ['outlined', 'filled'];
const colors: TagColor[] = ['brand', 'highlight', 'accent', 'neutral'];
const sizes: TagSize[] = ['sm', 'md'];

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: { children: 'UI / UX', variant: 'outlined', color: 'brand', size: 'md' },
  argTypes: {
    variant: { control: 'select', options: variants },
    color: { control: 'select', options: colors },
    size: { control: 'select', options: sizes },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A small, non-interactive pill (`<span>`) that labels a category, technology or service, e.g. on portfolio and ' +
          'job cards. Outlined draws a 1px stroke in the label color; Filled uses the matching `*-subtle` background. ' +
          'Brand for services, Highlight for disciplines, Accent for recognition and sub-brands, Neutral for metadata. ' +
          'Keep labels to 1–3 words, let tags wrap with an 8px gap, never truncate. Group related tags in a `<ul>` with an ' +
          'accessible name. Tags have no hover, focus or click: use a Button if it must be actionable.',
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const listStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--ns-spacing-8)',
  margin: 0,
  padding: 0,
  listStyle: 'none',
} as const;

/** Figma `Style` × `Color`. */
export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ns-spacing-16)' }}>
      {variants.map((variant) => (
        <ul key={variant} aria-label={`${variant} tags`} style={listStyle}>
          {colors.map((color) => (
            <li key={color}>
              <Tag {...args} variant={variant} color={color}>
                {color}
              </Tag>
            </li>
          ))}
        </ul>
      ))}
    </div>
  ),
};

/** Figma `Size`: S (24px) and M (28px). */
export const Sizes: Story = {
  render: (args) => (
    <ul aria-label="Tag sizes" style={listStyle}>
      {sizes.map((size) => (
        <li key={size}>
          <Tag {...args} size={size}>
            Size {size}
          </Tag>
        </li>
      ))}
    </ul>
  ),
};
