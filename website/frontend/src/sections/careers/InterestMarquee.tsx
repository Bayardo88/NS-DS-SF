import { Rich } from '../../components/Rich';
import './InterestMarquee.css';

export interface InterestMarqueeProps {
  heading?: string;
  body?: string;
  /** Up to 3 rows of chips. Rows 1 and 3 scroll right-to-left, row 2 left-to-right (annotation 57:103518). */
  rows: string[][];
}

function MarqueeRow({ items, index }: { items: string[]; index: number }) {
  return (
    <div className={`interest-marquee__row interest-marquee__row--${index % 2 === 0 ? 'rtl' : 'ltr'}`}>
      <div className="interest-marquee__track">
        <ul className="interest-marquee__list">
          {items.map((item) => (
            <li key={item} className="interest-marquee__chip ns-text-web-lead-medium">
              {item}
            </li>
          ))}
        </ul>
        {/* Second copy makes the loop seamless; screen readers get the list once. */}
        <ul className="interest-marquee__list" aria-hidden="true">
          {items.map((item) => (
            <li key={item} className="interest-marquee__chip ns-text-web-lead-medium">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Chips module (Careers "The Way We Work", 1:1718): heading + body, then rows of interest chips
 * moving as an infinite marquee. Pauses on hover; static under reduced motion.
 */
export function InterestMarquee({ heading, body, rows }: InterestMarqueeProps) {
  return (
    <section className="interest-marquee">
      {(heading || body) && (
        <div className="container interest-marquee__copy">
          {heading && <Rich as="h2" className="interest-marquee__heading ns-text-web-h2-light" text={heading} />}
          {body && <Rich as="p" className="interest-marquee__body ns-text-web-body-light" text={body} />}
        </div>
      )}
      <div className="interest-marquee__rows">
        {rows.map((row, i) => (
          <MarqueeRow key={row.join('|')} items={row} index={i} />
        ))}
      </div>
    </section>
  );
}
