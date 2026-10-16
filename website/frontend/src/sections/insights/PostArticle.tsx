import { useEffect, useMemo, useRef, useState } from 'react';
import type { Link, Media } from '../../lib/types';
import { useEntry } from '../../lib/EntryContext';
import { metaString } from '../../lib/entries';
import { Rich } from '../../components/Rich';
import { Cta } from '../../components/Cta';
import { postAuthor } from './posts';
import { buildToc } from './toc';
import { PostToc } from './PostToc';
import { PostShare } from './PostShare';
import { AuthorCard } from './AuthorCard';
import './PostArticle.css';

export interface PostArticleProps {
  /** Optional sidebar banner (ACF `show_banner` + heading/image/CTA). Omit to hide it. */
  banner?: { heading: string; cta?: Link; image?: Media };
}

/**
 * Blog post body (Figma Bento Grid-03 Main Content 1:5349), a template section reading the post via
 * `useEntry()`. Sidebar: TOC generated from the body's h2/h3 with smooth scroll + scroll-spy, share
 * links and an optional banner; the TOC block sticks under the nav. Article: mini author card,
 * rich-text body (`meta.body`, else WP `content`), full author card.
 */
export function PostArticle({ banner }: PostArticleProps) {
  const post = useEntry();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>();

  const source = post ? (metaString(post, 'body') ?? post.content) : '';
  const { html, toc } = useMemo(() => buildToc(source), [source]);

  // Scroll-spy: the last heading that crossed the top third of the viewport is the active one.
  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;
    const headings = Array.from(root.querySelectorAll<HTMLElement>('h2[id], h3[id]'));
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = headings.find((h) => visible.has(h.id));
        if (first) setActiveId(first.id);
      },
      { rootMargin: '-15% 0px -60% 0px' },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [html]);

  if (!post) return null;
  const author = postAuthor(post);
  const url = typeof window === 'undefined' ? `/insights/${post.slug}` : window.location.origin + window.location.pathname;

  return (
    <section className="post-article">
      <div className="container post-article__inner">
        <aside className="post-article__side" aria-label="Article tools">
          <div className="post-article__sticky-track">
            <div className="post-article__sticky">
              <PostToc items={toc} activeId={activeId} />
              <PostShare url={url} title={post.title} />
            </div>
          </div>
          {banner && (
            <div className="post-banner">
              {banner.image && <img className="post-banner__img" src={banner.image.src} alt={banner.image.alt} loading="lazy" />}
              <Rich as="p" className="post-banner__heading ns-text-web-h3-black" text={banner.heading} />
              <Cta cta={banner.cta} size="lg" className="post-banner__cta" />
            </div>
          )}
        </aside>

        <article className="post-article__main" aria-label={post.title}>
          {author && <AuthorCard author={author} variant="mini" />}
          <div ref={bodyRef} className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
          {author && <AuthorCard author={author} variant="full" />}
        </article>
      </div>
    </section>
  );
}
