import { Icon, type IconName } from '@nicasource/ds';
import type { Link, Media } from '../../lib/types';
import { Rich } from '../../components/Rich';
import { Cta } from '../../components/Cta';
import { SmartLink } from '../../layout/RouterLink';
import './ServiceCard.css';

export interface TechChip {
  label: string;
  logo?: string;
}

export interface ServiceCardProps {
  eyebrow?: string;
  heading?: string;
  /** DS icon name for the 80px outlined tile. */
  icon?: IconName;
  title: string;
  description?: string;
  /** Sub-services / technologies shown as chips. */
  techLabel?: string;
  tech?: TechChip[];
  cta?: Link;
  /** Links to the other services. Desktop: a 3-column list; mobile: outlined pills. */
  exploreLabel?: string;
  explore?: Link[];
  media?: Media;
}

/**
 * Services module (annotations 57:103322 / 57:103438): header, then a light (inverse) card with
 * icon, title, description, chips, optional CTA and links to the rest of the services beside a
 * media slot. On mobile the media goes first.
 */
export function ServiceCard({
  eyebrow,
  heading,
  icon = 'code',
  title,
  description,
  techLabel,
  tech,
  cta,
  exploreLabel,
  explore,
  media,
}: ServiceCardProps) {
  return (
    <section className="section service-card">
      <div className="container stack">
        {eyebrow && <p className="eyebrow ns-text-web-eyebrow-black">{eyebrow}</p>}
        {heading && <Rich as="h2" className="heading ns-text-web-h2-light" text={heading} />}
        <article className="service-card__card">
          <div className="service-card__copy">
            <header className="service-card__head">
              <span className="service-card__icon" aria-hidden="true">
                <Icon name={icon} size="xl" />
              </span>
              <Rich as="h3" className="service-card__title ns-text-web-h3-black" text={title} />
            </header>
            {description && <Rich as="p" className="ns-text-web-body-light" text={description} />}
            {tech && tech.length > 0 && (
              <div className="service-card__group">
                {techLabel && <p className="service-card__label ns-text-web-body-regular">{techLabel}</p>}
                <ul className="service-card__chips" aria-label={techLabel ?? 'Technologies'}>
                  {tech.map((chip) => (
                    <li key={chip.label} className="service-card__chip ns-text-web-small-regular">
                      {chip.label}
                      {chip.logo && <img src={chip.logo} alt="" />}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Cta className="service-card__cta" cta={cta} size="lg" />
            {explore && explore.length > 0 && (
              <nav className="service-card__group" aria-label={exploreLabel ?? 'Other services'}>
                {exploreLabel && <p className="service-card__label ns-text-web-body-regular">{exploreLabel}</p>}
                <ul className="service-card__explore">
                  {explore.map((link) => (
                    <li key={link.label}>
                      <SmartLink className="service-card__link ns-text-web-small-regular" href={link.href}>
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
          {media && (
            <div className="service-card__media">
              <img src={media.src} alt={media.alt} loading="lazy" />
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
