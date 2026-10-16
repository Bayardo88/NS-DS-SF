import type { Link, Media } from '../../lib/types';
import { Rich, Paragraphs } from '../../components/Rich';
import { Cta } from '../../components/Cta';
import { Breadcrumb } from '../../components/Breadcrumb';
import './InsightsHero.css';

export interface InsightsHeroProps {
  breadcrumb?: Link[];
  eyebrow?: string;
  heading?: string;
  body?: string | string[];
  cta?: Link;
  media?: Media;
}

/**
 * NS Insights page header (Figma General Module, hero use): breadcrumb, then copy beside a cropped
 * illustration. Every copy part is optional (annotation 57:103618). Stacks on mobile, copy first.
 */
export function InsightsHero({ breadcrumb, eyebrow, heading, body, cta, media }: InsightsHeroProps) {
  return (
    <section className="insights-hero">
      <div className="container insights-hero__inner">
        {breadcrumb && <Breadcrumb className="insights-hero__breadcrumb" items={breadcrumb} />}
        <div className="insights-hero__row">
          <div className="insights-hero__copy">
            {eyebrow && <p className="insights-hero__eyebrow ns-text-web-eyebrow-black">{eyebrow}</p>}
            {heading && <Rich as="h1" className="insights-hero__heading ns-text-web-h2-black" text={heading} />}
            <Paragraphs className="insights-hero__body ns-text-web-body-light" body={body} />
            <Cta cta={cta} size="lg" className="insights-hero__cta" />
          </div>
          {media && (
            <div className="insights-hero__media">
              <img src={media.src} alt={media.alt} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
