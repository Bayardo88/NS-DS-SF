import { Rich } from '../components/Rich';
import './SeoStates.css';

export interface SeoStatesProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  columns: { heading: string; items: string[] }[];
}

/**
 * SEO Module (annotation 57:103192): independent, keyboard-scrollable city/state lists whose top
 * and bottom fade out to focus the middle.
 */
export function SeoStates({ eyebrow, heading, subheading, columns }: SeoStatesProps) {
  return (
    <section className="section">
      <div className="container stack">
        {eyebrow && <p className="eyebrow ns-text-web-eyebrow-black">{eyebrow}</p>}
        <Rich as="h2" className="heading ns-text-web-h2-light" text={heading} />
        {subheading && <Rich as="p" className="body-copy ns-text-web-body-light" text={subheading} />}
        <div className="seo">
          {columns.map((col) => (
            <div key={col.heading} className="seo__col">
              <h3 className="seo__heading ns-text-web-h4-black">{col.heading}</h3>
              {/* tabIndex makes the scroll region reachable by keyboard. */}
              <ul className="seo__list ns-text-web-body-regular" tabIndex={0} aria-label={`${col.heading} locations`}>
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
