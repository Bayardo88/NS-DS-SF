import { Icon } from '@nicasource/ds';
import type { Media } from '../lib/types';
import { Rich } from '../components/Rich';
import './TimezoneBento.css';

export interface Zone {
  name: string;
  countries: string[];
  utc: string;
  image: Media;
  span?: 'tall' | 'single';
}

export interface TimezoneBentoProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  zones: Zone[];
}

/** Bento grid with a 2-column header (annotation 54:103102): US time zones ↔ LATAM countries. */
export function TimezoneBento({ eyebrow, heading, body, zones }: TimezoneBentoProps) {
  return (
    <section className="section">
      <div className="container stack">
        <header className="tz__head">
          <div className="stack">
            {eyebrow && <p className="eyebrow ns-text-web-eyebrow-black">{eyebrow}</p>}
            <Rich as="h2" className="heading ns-text-web-h2-light" text={heading} />
          </div>
          {body && <Rich as="p" className="body-copy ns-text-web-body-light" text={body} />}
        </header>
        <ul className="tz">
          {zones.map((zone) => (
            <li key={zone.name} className={`tz__card tz__card--${zone.span ?? 'single'}`}>
              <img className="tz__img" src={zone.image.src} alt="" loading="lazy" />
              <h3 className="tz__name ns-text-web-h3-black">{zone.name}</h3>
              <ul className="tz__facts ns-text-web-body-light">
                {zone.countries.map((country) => (
                  <li key={country}>
                    <Icon name="shield-check" size="md" color="accent" />
                    {country}
                  </li>
                ))}
                <li>
                  <Icon name="clock" size="md" color="accent" />
                  {zone.utc}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
