import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { Logo, type LogoProps, type LogoVariant } from './Logo.js';

/*
 * Story backgrounds show each variant on the surface it is meant for. They are fixed brand
 * surfaces (like the logo itself), so they intentionally don't follow the theme toolbar.
 */
const tile = (background: string): CSSProperties => ({
  display: 'grid',
  gap: 'var(--ns-spacing-12)',
  justifyItems: 'start',
  padding: 'var(--ns-spacing-32)',
  borderRadius: 'var(--ns-radius-sm)',
  background,
});
const caption: CSSProperties = { fontSize: 'var(--ns-font-size-label-sm)', color: 'var(--ns-color-text-secondary)' };

const backgrounds: Record<LogoVariant, { label: string; bg: string }> = {
  main: { label: 'Main · white, cream and light surfaces', bg: 'var(--ns-color-cream-900)' },
  'on-dark': { label: 'On dark · navy, night, chalk, dark photos', bg: 'var(--ns-color-blue-600)' },
  'mono-light': { label: 'Mono light · saturated fills and busy photos', bg: 'var(--ns-color-red-500)' },
};

/** Puts the story on the background its `variant` arg is meant for. */
const onVariantBackground: Decorator<LogoProps> = (Story, context) => (
  <div style={tile(backgrounds[context.args.variant ?? 'main'].bg)}>
    <Story />
  </div>
);

const meta = {
  title: 'Components/Logo',
  component: Logo,
  args: { variant: 'main', width: 148 },
  argTypes: {
    variant: { control: 'select', options: ['main', 'on-dark', 'mono-light'] },
    width: { control: { type: 'number', min: 96, step: 4 } },
    label: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'The NicaSource logo: the two-line "nica / source" wordmark plus the red chevron (NS Mark). Its colors are **fixed brand primitives** and never follow Light / Dark / Web 2025; choose the variant by the background instead:',
          '',
          '- **Main** (blue/600 wordmark, red/500 mark): white, cream and light surfaces.',
          '- **On dark** (cream/900 wordmark, red/500 mark): navy (blue/600–900), night, chalk and photos with a dark overlay.',
          '- **Mono light** (all cream/900): saturated fills (brand red, coral, sub-brand colors) and busy photos.',
          '',
          "Scale proportionally only (set `width`; height follows). Minimum width 96px on screen. Clear space on every side equals the height of the chevron. Don't recolor, stretch, outline, add effects or rebuild it with live text.",
          '',
          '**Accessibility:** renders `role="img"` named "NicaSource". In navigation, wrap it in a link named "NicaSource home" and pass `label=""` so it isn\'t announced twice: `<a href="/" aria-label="NicaSource home"><Logo label="" /></a>`.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { decorators: [onVariantBackground] };

/** Every Figma variant on its intended background. */
export const Variants: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
        gap: 'var(--ns-spacing-16)',
      }}
    >
      {(['main', 'on-dark', 'mono-light'] as const).map((variant) => (
        <figure key={variant} style={{ display: 'grid', gap: 'var(--ns-spacing-8)', margin: 0 }}>
          <div style={tile(backgrounds[variant].bg)}>
            <Logo {...args} variant={variant} />
          </div>
          <figcaption style={caption}>{backgrounds[variant].label}</figcaption>
        </figure>
      ))}
    </div>
  ),
};

/** Minimum (96px), default (148px) and large widths. */
export const Sizes: Story = {
  decorators: [onVariantBackground],
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', gap: 'var(--ns-spacing-32)' }}>
      {[96, 148, 240].map((width) => (
        <Logo key={width} {...args} width={width} />
      ))}
    </div>
  ),
};
