import { useEffect, useRef } from 'react';
import './ReadingProgress.css';

export interface ReadingProgressProps {
  /** CSS selector of the element whose scroll progress is shown. */
  target?: string;
}

/**
 * Reader-Loader (Figma 1:5345): a 4px bar under the post hero that sticks under the nav and fills
 * with the reader's progress through the article. Decorative (`aria-hidden`): the TOC already
 * tells assistive tech where the reader is. Written to the DOM in rAF, not React state, so
 * scrolling doesn't re-render.
 */
export function ReadingProgress({ target = '.post-article' }: ReadingProgressProps) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const el = document.querySelector<HTMLElement>(target);
      const fill = fillRef.current;
      if (!el || !fill) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight / 2;
      const progress = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      fill.style.transform = `scaleX(${progress})`;
    }
    function handleScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [target]);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div ref={fillRef} className="reading-progress__fill" />
    </div>
  );
}
