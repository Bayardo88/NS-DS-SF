import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteFooter } from './SiteFooter.js';

const mobileViewport = { viewport: { value: 'mobile1', isRotated: false } };

const meta = {
  title: 'Site/SiteFooter',
  component: SiteFooter,
  args: {
    social: {
      facebook: 'https://www.facebook.com/nicasource',
      instagram: 'https://www.instagram.com/nicasource',
      linkedin: 'https://www.linkedin.com/company/nicasource',
    },
    legal: [
      { label: 'Terms and Conditions', href: '#terms' },
      { label: 'Privacy Policy', href: '#privacy' },
    ],
    copyright: '© 2025 NicaSource, LLC',
    logoHref: '#',
  },
  argTypes: {
    logoVariant: { control: 'select', options: ['on-dark', 'main', 'mono-light'] },
    surface: { control: 'select', options: [undefined, 'inverse', 'canvas'] },
    copyright: { control: 'text' },
    renderLink: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'The site footer (Figma **Footer**): On-dark logo, social Icon Buttons (Facebook, Instagram, LinkedIn), copyright and legal links.',
          '',
          '- **Breakpoints are CSS**: a row from 768px up, stacked and centered below.',
          '- **Surface**: navy `bg/inverse` with `text/inverse` in Light. In Dark and Web 2025 `bg/inverse` turns light, so the footer switches to `bg/canvas` with `text/secondary` (Figma example). Force one with `surface`.',
          '- **Social** (`social`, Figma *Show social*): Icon Button / Text M rendered as `<a target="_blank" rel="noopener noreferrer">`, named "NicaSource on LinkedIn" etc. and described as "(opens in new tab)". Networks without a URL are left out; with none the row is hidden.',
          '- **Legal**: a `<nav aria-label="Legal">` of underlined links; hover removes the underline.',
          '- `copyright` defaults to `© <current year> NicaSource, LLC`. `renderLink` plugs in router links (same contract as `SiteHeader`).',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Controls-driven. Switch the theme toolbar to see the inverse → canvas surface swap. */
export const Default: Story = {};

/** Figma `Breakpoint=Desktop`: one row. */
export const Desktop: Story = {};

/** Figma `Breakpoint=Mobile`: stacked and centered. */
export const Mobile: Story = {
  globals: mobileViewport,
};

/** Figma `Show social` off. */
export const WithoutSocial: Story = {
  args: { social: undefined },
};
