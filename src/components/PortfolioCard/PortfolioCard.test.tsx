import { createRef } from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/render.js';
import { PortfolioCard } from './PortfolioCard.js';

const base = { href: '/case-studies/struck', title: 'Struck redesign' };

describe('PortfolioCard', () => {
  it('renders an article whose title is the one link, with no axe violations', async () => {
    const { container } = renderWithTheme(
      <PortfolioCard {...base} client="Struck" tags={['UI / UX', 'WordPress Development']} />,
    );
    const article = screen.getByRole('article');
    const links = within(article).getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName('Struck redesign');
    expect(links[0]).toHaveAttribute('href', '/case-studies/struck');
    expect(screen.getByRole('heading', { level: 3, name: 'Struck redesign' })).toContainElement(links[0]!);
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it.each(['light', 'dark', 'web-2025'] as const)('has no axe violations in %s', async (theme) => {
    const { container } = renderWithTheme(
      <PortfolioCard {...base} client="Struck" image={{ src: 'data:,', alt: 'Struck homepage' }} tags={['UI / UX']} />,
      theme,
    );
    expect(await checkA11y(container)).toHaveNoViolations();
  });

  it('forwards ref to the article, merges className and passes rest props', () => {
    const ref = createRef<HTMLElement>();
    renderWithTheme(<PortfolioCard ref={ref} {...base} className="extra" data-testid="card" />);
    const card = screen.getByTestId('card');
    expect(ref.current).toBe(card);
    expect(card.tagName).toBe('ARTICLE');
    expect(card).toHaveClass('ns-portfolio-card', 'extra');
  });

  it('supports headingLevel', () => {
    renderWithTheme(<PortfolioCard {...base} headingLevel={2} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Struck redesign');
  });

  it('renders { src, alt } as a cropped img, a node as-is, and a placeholder otherwise', () => {
    const { rerender, container } = renderWithTheme(
      <PortfolioCard {...base} image={{ src: '/img/struck.jpg', alt: 'Struck homepage' }} />,
    );
    expect(screen.getByRole('img', { name: 'Struck homepage' })).toHaveAttribute('src', '/img/struck.jpg');

    rerender(<PortfolioCard {...base} image={<span data-testid="custom-media" />} />);
    expect(screen.getByTestId('custom-media')).toBeInTheDocument();

    rerender(<PortfolioCard {...base} />);
    expect(container.querySelector('.ns-portfolio-card__placeholder')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders tags as a labelled list of outlined small Tags, hidden when empty', () => {
    const { rerender } = renderWithTheme(
      <PortfolioCard {...base} tags={['UI / UX', { label: 'WordPress', color: 'highlight' }]} />,
    );
    const list = screen.getByRole('list', { name: 'Services' });
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(within(list).getByText('UI / UX')).toHaveClass('ns-tag--outlined', 'ns-tag--sm', 'ns-tag--brand');
    expect(within(list).getByText('WordPress')).toHaveClass('ns-tag--highlight');

    rerender(<PortfolioCard {...base} tags={[]} />);
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('shows the client line only when client is set', () => {
    const { rerender, container } = renderWithTheme(<PortfolioCard {...base} client="Struck" />);
    const meta = container.querySelector('.ns-portfolio-card__meta');
    expect(meta).toHaveTextContent('Client | Struck');
    expect(meta!.querySelector('[aria-hidden="true"]')).toHaveTextContent('|');

    rerender(<PortfolioCard {...base} client="Struck" clientLabel="Cliente" />);
    expect(container.querySelector('.ns-portfolio-card__meta')).toHaveTextContent('Cliente | Struck');

    rerender(<PortfolioCard {...base} />);
    expect(container.querySelector('.ns-portfolio-card__meta')).toBeNull();
  });

  it('is reached with Tab and activated with Enter', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn((event: { preventDefault: () => void }) => event.preventDefault());
    renderWithTheme(<PortfolioCard {...base} linkProps={{ onClick: handleClick, target: '_self' }} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_self');
    expect(link).toHaveClass('ns-portfolio-card__link');
    await user.tab();
    expect(link).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
