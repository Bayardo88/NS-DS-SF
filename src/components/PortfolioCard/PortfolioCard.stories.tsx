import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { PortfolioCard } from './PortfolioCard.js';

/** Token-colored placeholder artwork, so stories never load network images. */
function Artwork({ label }: { label?: string }) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  return (
    <div
      {...a11y}
      style={{
        inlineSize: '100%',
        blockSize: '100%',
        background:
          'linear-gradient(135deg, var(--ns-color-bg-brand-subtle), var(--ns-color-bg-highlight-subtle) 60%, var(--ns-color-bg-accent-subtle))',
      }}
    />
  );
}

const meta = {
  title: 'Components/PortfolioCard',
  component: PortfolioCard,
  args: {
    href: '#struck',
    title: 'Struck redesign',
    client: 'Struck',
    tags: [{ label: 'UI / UX', color: 'highlight' }, { label: 'WordPress Development' }],
    headingLevel: 3,
  },
  argTypes: {
    headingLevel: { control: 'select', options: [2, 3, 4] },
    image: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Portfolio / case-study card from the v1 website: media (360×220 crop), title, service tags and client line. ' +
          'The whole card is one link: the title’s `<a>` is stretched over the card, so the link name is just the ' +
          'title and there are no nested interactive elements. Hover (pointer anywhere on the card) swaps the border ' +
          'for Elevation/LG, lifts 2px and underlines the title; keyboard focus draws a 2px focus ring 2px outside the ' +
          'card. Tags and client hide when empty. Grid: 3 columns on desktop with `spacing/32` gaps, 2 on tablet, 1 on mobile.',
      },
    },
  },
} satisfies Meta<typeof PortfolioCard>;
export default meta;

type Story = StoryObj<typeof meta>;

/** Figma width: 360px. */
const singleCard: Decorator = (Story) => (
  <div style={{ maxInlineSize: '22.5rem' }}>
    <Story />
  </div>
);

export const Default: Story = {
  args: { image: <Artwork label="Struck website on a laptop" /> },
  decorators: [singleCard],
};

export const WithoutTags: Story = {
  args: { tags: [] },
  decorators: [singleCard],
};

export const WithoutClient: Story = {
  args: { client: undefined },
  decorators: [singleCard],
};

const PROJECTS = [
  { href: '#struck', title: 'Struck redesign', client: 'Struck', tags: ['UI / UX', 'WordPress Development'] },
  {
    href: '#fintech',
    title: 'A payments dashboard for a fast-growing fintech team, rebuilt end to end',
    client: 'Acme Pay',
    tags: ['Product Design', 'React', 'Node.js'],
  },
  { href: '#health', title: 'Patient portal', client: 'CareCo', tags: ['QA Automation'] },
];

/** Three columns with `spacing/32` gaps; cards stretch to the column and keep equal heights. */
export const Grid: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
          gap: 'var(--ns-spacing-32)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      {PROJECTS.map((project) => (
        <PortfolioCard key={project.href} {...args} {...project} image={<Artwork />} />
      ))}
    </>
  ),
};
