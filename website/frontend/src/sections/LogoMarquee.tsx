import type { Media } from '../lib/types';
import { Rich } from '../components/Rich';
import './LogoMarquee.css';

export interface LogoMarqueeProps {
  heading?: string;
  logos: Media[];
}

/**
 * Credibility statement + client logos scrolling right to left (annotation 54:102992). The list is
 * rendered twice for a seamless loop; the copy is hidden from assistive tech. Static under reduced motion.
 */
export function LogoMarquee({ heading, logos }: LogoMarqueeProps) {
  return (
    <section className="marquee-section">
      {heading && (
        <div className="container">
          <Rich as="h2" className="marquee-section__heading ns-text-web-h2-black" text={heading} />
        </div>
      )}
      <div className="marquee" role="region" aria-label="Clients">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee__list" aria-hidden={copy === 1 ? 'true' : undefined}>
              {logos.map((logo) => (
                <li key={logo.src} className="marquee__item">
                  <img src={logo.src} alt={copy === 1 ? '' : logo.alt} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
