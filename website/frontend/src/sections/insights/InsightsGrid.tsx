import { useId, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@nicasource/ds';
import { fetchCollection } from '../../lib/wp';
import { useAsync } from '../../lib/useAsync';
import { metaList } from '../../lib/entries';
import { featuredPost, newestFirst, tagsInUse } from './posts';
import { PostCard, type PostCardProps } from './PostCard';
import './InsightsGrid.css';

export interface InsightsGridProps {
  /** Filter chips in this order; defaults to every tag used by the posts, most used first. */
  tags?: string[];
  /** Posts shown before "Load more". */
  pageSize?: number;
  /** Leave the featured post out of the grid (it already sits above it). */
  excludeFeatured?: boolean;
}

/** Card shapes cycled through the masonry so real posts don't look uniform (Figma heights 240–545). */
const SHAPES: NonNullable<PostCardProps['shape']>[] = ['short', 'portrait', 'landscape', 'tall', 'square', 'wide'];

/**
 * Bento Grid-03 (Figma 1:4870): single-select tag filter (toggle buttons, `aria-pressed`, synced to
 * `?tag=` so post chips can deep-link) above a 3-column masonry of post cards, with load-more and an
 * empty state (not designed).
 */
export function InsightsGrid({ tags, pageSize = 9, excludeFeatured = true }: InsightsGridProps) {
  const posts = useAsync('posts', fetchCollection);
  const [params, setParams] = useSearchParams();
  const [limit, setLimit] = useState(pageSize);
  const gridId = useId();

  const all = posts.data ?? [];
  const featured = excludeFeatured ? featuredPost(all) : undefined;
  const pool = newestFirst(all.filter((p) => p !== featured));
  const filters = tags ?? tagsInUse(all);
  const active = params.get('tag');
  const matching = active ? newestFirst(all).filter((p) => metaList(p, 'tags').includes(active)) : pool;
  const visible = matching.slice(0, limit);

  function handleFilter(tag: string | null) {
    setLimit(pageSize);
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (tag) next.set('tag', tag);
        else next.delete('tag');
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  }

  return (
    <section className="insights-grid" aria-label="All articles">
      <div className="container insights-grid__inner">
        <div className="insights-grid__filters" role="group" aria-label="Filter articles by topic" aria-controls={gridId}>
          <button
            type="button"
            className="insights-grid__chip ns-text-web-label-medium"
            aria-pressed={active === null}
            onClick={() => handleFilter(null)}
          >
            All
          </button>
          {filters.map((tag) => (
            <button
              key={tag}
              type="button"
              className="insights-grid__chip ns-text-web-label-medium"
              aria-pressed={active === tag}
              onClick={() => handleFilter(active === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <p className="insights-grid__count ns-text-web-caption-light" role="status">
          {posts.status === 'ready' &&
            (active ? `${matching.length} article${matching.length === 1 ? '' : 's'} tagged “${active}”` : '')}
        </p>

        {posts.status === 'ready' && matching.length === 0 ? (
          <div className="insights-grid__empty">
            <p className="ns-text-web-h4-black">No articles on this topic yet.</p>
            <Button variant="outlined" onClick={() => handleFilter(null)}>
              Show all articles
            </Button>
          </div>
        ) : (
          <ul id={gridId} className="insights-grid__list" aria-busy={posts.status === 'loading'}>
            {visible.map((post, i) => (
              <li key={post.slug} className="insights-grid__item">
                <PostCard post={post} shape={SHAPES[i % SHAPES.length]} />
              </li>
            ))}
          </ul>
        )}

        {matching.length > limit && (
          <Button className="insights-grid__more" variant="outlined" size="lg" onClick={() => setLimit((n) => n + pageSize)}>
            Load more
          </Button>
        )}
      </div>
    </section>
  );
}
