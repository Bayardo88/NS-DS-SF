import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteHeader } from './SiteHeader.js';

const links = [
  { label: 'About us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Careers', href: '#careers' },
  { label: 'Blog', href: '#blog' },
];

const mobileViewport = { viewport: { value: 'mobile1', isRotated: false } };

const meta = {
  title: 'Site/SiteHeader',
  component: SiteHeader,
  args: {
    links,
    current: '#services',
    cta: { label: 'Contact us', href: '#contact' },
    logoHref: '#',
  },
  argTypes: {
    logoVariant: { control: 'select', options: [undefined, 'main', 'on-dark', 'mono-light'] },
    current: { control: 'select', options: [undefined, ...links.map((link) => link.href)] },
    menuOpen: { control: 'boolean' },
    renderLink: { control: false },
    onMenuOpenChange: { action: 'menu open change' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'The site header (Figma **Navigation Bar**): logo on the left, 4–6 uppercase links and one Contact CTA on the right. Sticky at the top on `bg/surface` with a 1px `border/subtle` bottom edge; after 8px of scroll it gets `Elevation/SM`.',
          '',
          '- **Breakpoints are CSS** (`min-width: 1024px`). Below it the bar shows the logo and a menu button that opens a full-screen menu. Both layouts are in the markup and the inactive one is `display: none`, so only one is exposed to assistive tech and SSR output is identical.',
          '- **Mobile menu**: the button has `aria-expanded` + `aria-controls`; Escape closes it and returns focus to the button; focus is trapped in the menu while open; page scroll is locked; clicking a link closes it. Control it with `menuOpen` / `onMenuOpenChange`, or leave it uncontrolled (`defaultMenuOpen`).',
          '- **Active page**: pass `current` (an `href`). The matching link gets `aria-current="page"`.',
          '- **Router links**: `renderLink={({ href, children }) => <Link href={href}>{children}</Link>}` (Next.js) or `<Link to={href}>` (React Router). The element is used with `asChild`, so it must forward `className`, `aria-*`, `onClick` and its ref to the `<a>`.',
          '- **Logo**: defaults to *On dark* when the nearest `ThemeProvider` is Dark or Web 2025, *Main* otherwise. Override with `logoVariant`.',
          '- Landmarks: `<header>` with `<nav aria-label="Main">`. Pass `skipLinkHref="#main"` to add a "Skip to content" link as the first focusable element.',
          '',
          'Use the toolbar to switch Light, Dark and Web 2025, and the viewport toolbar (or the Mobile stories) to see the mobile bar.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Controls-driven. Resize the viewport below 1024px to see the mobile bar. */
export const Default: Story = {};

/** Figma `Breakpoint=Desktop` (≥1024px): logo, links, CTA. */
export const Desktop: Story = {
  args: { skipLinkHref: '#main' },
};

/** Figma `Breakpoint=Mobile`: logo + menu button. */
export const Mobile: Story = {
  globals: mobileViewport,
};

/** The full-screen mobile menu, open. Press Escape or the close button to dismiss it. */
export const MobileMenuOpen: Story = {
  args: { defaultMenuOpen: true },
  globals: mobileViewport,
};
