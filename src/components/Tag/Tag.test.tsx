import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { Tag, type TagColor, type TagSize, type TagVariant } from './Tag.js';

describe('Tag', () => {
  it('renders a span with default modifiers and no axe violations', async () => {
    const { container } = renderWithTheme(
      <ul aria-label="Services">
        <li>
          <Tag>UI / UX</Tag>
        </li>
      </ul>,
    );
    const tag = screen.getByText('UI / UX');
    expect(tag.tagName).toBe('SPAN');
    expect(tag).toHaveClass('ns-tag', 'ns-tag--outlined', 'ns-tag--brand', 'ns-tag--md');
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('forwards ref, merges className and passes ...rest through', () => {
    const ref = createRef<HTMLSpanElement>();
    renderWithTheme(
      <Tag ref={ref} className="custom" data-testid="tag" title="Category">
        Tag
      </Tag>,
    );
    const tag = screen.getByTestId('tag');
    expect(ref.current).toBe(tag);
    expect(tag).toHaveClass('ns-tag', 'custom');
    expect(tag).toHaveAttribute('title', 'Category');
  });

  it.each<TagVariant>(['outlined', 'filled'])('variant=%s adds its modifier', (variant) => {
    renderWithTheme(<Tag variant={variant}>Tag</Tag>);
    expect(screen.getByText('Tag')).toHaveClass(`ns-tag--${variant}`);
  });

  it.each<TagColor>(['brand', 'highlight', 'accent', 'neutral'])('color=%s adds its modifier', (color) => {
    renderWithTheme(<Tag color={color}>Tag</Tag>);
    const tag = screen.getByText('Tag');
    expect(tag).toHaveClass(`ns-tag--${color}`);
    expect(tag).not.toHaveAttribute('color');
  });

  it.each<TagSize>(['sm', 'md'])('size=%s adds its modifier', (size) => {
    renderWithTheme(<Tag size={size}>Tag</Tag>);
    expect(screen.getByText('Tag')).toHaveClass(`ns-tag--${size}`);
  });

  it('is not interactive (not focusable, no role)', () => {
    renderWithTheme(<Tag>Tag</Tag>);
    const tag = screen.getByText('Tag');
    expect(tag).not.toHaveAttribute('tabindex');
    expect(tag).not.toHaveAttribute('role');
  });
});
