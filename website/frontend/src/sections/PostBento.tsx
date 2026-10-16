import { fetchCollection } from '../lib/wp';
import { useAsync } from '../lib/useAsync';
import { entryHref, metaList, metaMedia, metaString } from '../lib/entries';
import type { Entry } from '../lib/types';
import { Rich } from '../components/Rich';
import { OverlayCard } from '../components/OverlayCard';
import './PostBento.css';

export interface PostBentoProps {
  eyebrow?: string;
  heading?: string;
}

function bySlot(posts: Entry[]) {
  const flagged = posts.filter((p) => metaString(p, 'home_slot'));
  const main = flagged.find((p) => metaString(p, 'home_slot') === 'main') ?? posts[0];
  const secondary = (flagged.length ? flagged : posts).filter((p) => p !== main).slice(0, 4);
  return { main, secondary };
}

/**
 * NS Insights bento (annotation 57:103172): 5 posts flagged in WordPress (`home_slot` = main |
 * secondary); the main post sits in the tall center tile. Mobile shows 3, stacked.
 */
export function PostBento({ eyebrow, heading }: PostBentoProps) {
  const posts = useAsync('posts', fetchCollection);
  const { main, secondary } = bySlot(posts.data ?? []);
  const ordered = main ? [secondary[0], main, secondary[1], secondary[2], secondary[3]] : [];

  return (
    <section className="section">
      <div className="container stack">
        {eyebrow && <p className="eyebrow eyebrow--brand ns-text-web-eyebrow-black">{eyebrow}</p>}
        {heading && <Rich as="h2" className="heading ns-text-web-h2-light" text={heading} />}
        <div className="post-bento" aria-busy={posts.status === 'loading'}>
          {ordered.map(
            (post, i) =>
              post && (
                <OverlayCard
                  key={post.slug}
                  className={`post-bento__item post-bento__item--${i}`}
                  href={entryHref.post(post.slug)}
                  title={post.title}
                  image={metaMedia(post)}
                  tags={metaList(post, 'tags')}
                />
              ),
          )}
        </div>
      </div>
    </section>
  );
}
