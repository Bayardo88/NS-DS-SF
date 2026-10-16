import type { Entry } from '../../lib/types';
import { entryHref, metaList, metaMedia } from '../../lib/entries';
import { OverlayCard } from '../../components/OverlayCard';
import './PostCard.css';

export interface PostCardProps {
  post: Entry;
  /** Masonry shape (insights grid); `fixed` = the related-posts card. */
  shape?: 'fixed' | 'wide' | 'tall' | 'square' | 'portrait' | 'landscape' | 'short';
}

/**
 * Insights card (Figma Bento Grid-03 card): the shared OverlayCard with the 2xl radius, 32px padding
 * and 1px subtle border of the blog grid and related posts.
 */
export function PostCard({ post, shape = 'fixed' }: PostCardProps) {
  return (
    <OverlayCard
      className={`post-card post-card--${shape}`}
      href={entryHref.post(post.slug)}
      title={post.title}
      image={metaMedia(post)}
      tags={metaList(post, 'tags')}
    />
  );
}
