import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { NavLink } from './NavLink.js';

const row: CSSProperties = { display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 'var(--ns-spacing-32)' };
const caption: CSSProperties = {
  display: 'block',
  marginBottom: 'var(--ns-spacing-8)',
  fontSize: 'var(--ns-font-size-label-sm)',
  color: 'var(--ns-color-text-secondary)',
};

const meta = {
  title: 'Site/NavLink',
  component: NavLink,
  args: { href: '#about', active: false, children: 'About us' },
  argTypes: {
    active: { control: 'boolean' },
    href: { control: 'text' },
    children: { control: 'text' },
    asChild: { control: false },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Top-level site navigation link (Figma **Navigation Bar / Link**): an uppercase Secondary/Overline SM label with 4% tracking over a 2px indicator. `SiteHeader` composes it; use it on its own only for custom headers.',
          '',
          '- `active` marks the current page: brand text, a solid brand indicator and `aria-current="page"`.',
          '- Hover (brand text + tinted indicator, 120ms) and Focused (2px focus ring, offset 2px) come from `:hover` and `:focus-visible`.',
          '- Router links: `<NavLink asChild active><Link href="/services">Services</Link></NavLink>` renders a single `<a>`. The child must forward `className`, `aria-current` and its ref.',
          '',
          'Works in Light, Dark and Web 2025: every color is a semantic token (`text/primary`, `text/brand`, `bg/brand`, `bg/brand-subtle`).',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Figma `State` axis. Hover and Focused are CSS states: hover or Tab to a link to see them. */
export const States: Story = {
  render: () => (
    <nav aria-label="States" style={row}>
      <div>
        <span style={caption}>Default</span>
        <NavLink href="#default">About us</NavLink>
      </div>
      <div>
        <span style={caption}>Active (current page)</span>
        <NavLink href="#active" active>
          Services
        </NavLink>
      </div>
      <div>
        <span style={caption}>Hover / Focused: interact</span>
        <NavLink href="#hover">Careers</NavLink>
      </div>
    </nav>
  ),
};

/** `asChild` with a router-style link element. */
export const AsChild: Story = {
  render: () => (
    <nav aria-label="As child">
      <NavLink asChild active>
        <a href="#services" data-router-link="">
          Services
        </a>
      </NavLink>
    </nav>
  ),
};
