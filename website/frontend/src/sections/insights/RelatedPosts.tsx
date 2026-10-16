import { fetchCollection } from '../../lib/wp';
import { useAsync } from '../../lib/useAsync';
import { useEntry } from '../../lib/EntryContext';
import { Rich } from '../../components/Rich';
import { newestFirst, relatedPosts } from './posts';
import { PostCard } from './PostCard';
import './RelatedPosts.css';

export interface RelatedPostsProps {
  heading?: string;
  /** Pin specific posts by slug (ACF relationship override); otherwise top 3 by shared tags. */
  slugs?: string[];
}

/** "Wanna go down the rabbit hole?" (Figma 1:5437): 3 related posts as insights cards. */
export function RelatedPosts({ heading, slugs }: RelatedPostsProps) {
  const current = useEntry();
  const posts = useAsync('posts', fetchCollection);
  const all = posts.data ?? [];
  const picked = slugs?.length
    ? slugs.map((slug) => all.find((p) => p.slug === slug)).filter((p) => p !== undefined)
    : current
      ? relatedPosts(current, all)
      : newestFirst(all).slice(0, 3);

  return (
    <section className="related-posts">
      <div className="container related-posts__inner">
        {heading && <Rich as="h2" className="related-posts__heading ns-text-web-h2-light" text={heading} />}
        <ul className="related-posts__list" aria-busy={posts.status === 'loading'}>
          {picked.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
