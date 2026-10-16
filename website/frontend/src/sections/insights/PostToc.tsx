import type { MouseEvent } from 'react';
import type { TocItem } from './toc';

export interface PostTocProps {
  items: TocItem[];
  activeId?: string;
}

function handleJump(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  target.focus({ preventScroll: true });
  window.history.replaceState(window.history.state, '', `#${id}`);
}

/** "Content" topic breakdown (Figma 1:5380, note 57:103735): generated from the body's h2/h3. */
export function PostToc({ items, activeId }: PostTocProps) {
  if (items.length === 0) return null;
  return (
    <nav className="post-toc" aria-labelledby="post-toc-title">
      <p id="post-toc-title" className="post-article__side-title ns-text-web-h4-black">
        Content
      </p>
      <ol className="post-toc__list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              className="post-toc__link ns-text-web-nav-medium"
              href={`#${item.id}`}
              aria-current={activeId === item.id ? 'location' : undefined}
              onClick={(event) => handleJump(event, item.id)}
            >
              {item.label}
            </a>
            {item.children.length > 0 && (
              <ul className="post-toc__sub">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <a
                      className="post-toc__link ns-text-web-nav-medium"
                      href={`#${child.id}`}
                      aria-current={activeId === child.id ? 'location' : undefined}
                      onClick={(event) => handleJump(event, child.id)}
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
