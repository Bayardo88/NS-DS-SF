import { useEffect, useState } from 'react';
import type { Media } from '../lib/types';
import './TestimonialCarousel.css';

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  logo?: Media;
}

const INTERVAL_MS = 6000;

function prefersReducedMotion() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Testimonial card that auto-advances (annotation 57:103162). Pauses while hovered or focused and
 * never auto-plays under reduced motion; the dots are real buttons.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  useEffect(() => {
    if (paused || count < 2 || prefersReducedMotion()) return undefined;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const current = items[index % count];
  if (!current) return null;

  function handlePause() {
    setPaused(true);
  }
  function handleResume() {
    setPaused(false);
  }

  return (
    <figure
      className="testimonial"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocus={handlePause}
      onBlur={handleResume}
    >
      <div className="testimonial__head">
        {current.logo && <img className="testimonial__logo" src={current.logo.src} alt={current.logo.alt} />}
        <figcaption className="testimonial__who ns-text-web-caption-light">
          <strong>{current.name}</strong> {current.role}
        </figcaption>
      </div>
      <blockquote className="testimonial__quote ns-text-web-body-regular" aria-live={paused ? 'polite' : 'off'}>
        “{current.quote}”
      </blockquote>
      {count > 1 && (
        <div className="testimonial__dots" role="group" aria-label="Choose testimonial">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className="testimonial__dot"
              aria-label={`Testimonial ${i + 1} of ${count}: ${item.name}`}
              aria-current={i === index % count ? 'true' : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </figure>
  );
}
