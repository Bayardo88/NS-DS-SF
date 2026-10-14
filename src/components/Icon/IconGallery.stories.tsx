import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { iconCategories, iconNames, type IconName } from '../../icons/generated.js';
import { Icon, type IconSize } from './Icon.js';

const categories = [...new Set(iconNames.map((name) => iconCategories[name]))];

const styles = {
  page: { display: 'grid', gap: 'var(--ns-spacing-32)', color: 'var(--ns-color-text-primary)' },
  toolbar: { display: 'flex', flexWrap: 'wrap', gap: 'var(--ns-spacing-16)', alignItems: 'end' },
  field: { display: 'grid', gap: 'var(--ns-spacing-4)', fontSize: 'var(--ns-font-size-label-sm)' },
  input: {
    font: 'inherit',
    fontSize: 'var(--ns-font-size-body-md)',
    padding: 'var(--ns-spacing-8) var(--ns-spacing-12)',
    minWidth: '16rem',
    color: 'var(--ns-color-text-primary)',
    background: 'var(--ns-color-bg-surface)',
    border: '1px solid var(--ns-color-border-default)',
    borderRadius: 'var(--ns-radius-sm)',
  },
  heading: { margin: 0, fontSize: 'var(--ns-font-size-label-lg)' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(7.5rem, 1fr))',
    gap: 'var(--ns-spacing-8)',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  item: {
    display: 'grid',
    justifyItems: 'center',
    gap: 'var(--ns-spacing-8)',
    padding: 'var(--ns-spacing-16) var(--ns-spacing-8)',
    border: '1px solid var(--ns-color-border-subtle)',
    borderRadius: 'var(--ns-radius-sm)',
    fontSize: 'var(--ns-font-size-label-sm)',
    color: 'var(--ns-color-text-secondary)',
    textAlign: 'center',
    wordBreak: 'break-word',
  },
  count: { fontSize: 'var(--ns-font-size-label-sm)', color: 'var(--ns-color-text-secondary)' },
} satisfies Record<string, CSSProperties>;

function IconGallery({ size = 'lg' }: { size?: IconSize }) {
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const matches = (name: IconName) =>
    !needle || name.includes(needle) || iconCategories[name].toLowerCase().includes(needle);
  const visible = iconNames.filter(matches);

  return (
    <div style={styles.page}>
      <div style={styles.toolbar}>
        <label style={styles.field}>
          Search icons
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. arrow, file, calendar"
            style={styles.input}
          />
        </label>
        <span style={styles.count} aria-live="polite">
          {visible.length} of {iconNames.length} icons
        </span>
      </div>
      {categories.map((category) => {
        const names = visible.filter((name) => iconCategories[name] === category);
        if (names.length === 0) return null;
        return (
          <section key={category} aria-label={category} style={{ display: 'grid', gap: 'var(--ns-spacing-12)' }}>
            <h3 style={styles.heading}>
              {category} <span style={styles.count}>({names.length})</span>
            </h3>
            <ul style={styles.grid}>
              {names.map((name) => (
                <li key={name} style={styles.item} title={`<Icon name="${name}" />`}>
                  <Icon name={name} size={size} />
                  <code>{name}</code>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

const meta = {
  title: 'Foundations/Icons',
  component: IconGallery,
  args: { size: 'lg' },
  argTypes: { size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] } },
  parameters: {
    docs: {
      description: {
        component:
          'All 180 icons from the Figma **Icons** page, grouped by Figma category. Search by name or category; use the name with `<Icon name="…" />`. Icons inherit `currentColor`, so they follow the active theme.',
      },
    },
  },
} satisfies Meta<typeof IconGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {};
