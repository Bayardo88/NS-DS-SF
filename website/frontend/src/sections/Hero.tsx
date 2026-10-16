import type { Link, Media } from '../lib/types';
import { Rich, Paragraphs } from '../components/Rich';
import { Cta } from '../components/Cta';
import { Breadcrumb } from '../components/Breadcrumb';
import './Hero.css';

export interface HeroProps {
  /** `center`: home-style centered stack. `start`: inner pages, left-aligned. */
  align?: 'center' | 'start';
  eyebrow?: string;
  heading: string;
  body?: string | string[];
  /** `lead`: the body reads as a subtitle in H3 Light (About Us). Default `body`. */
  bodySize?: 'body' | 'lead';
  cta?: Link;
  background?: Media;
  /** Inner pages show a breadcrumb under the nav. */
  breadcrumb?: Link[];
}

/**
 * Hero (Figma "Hero Section"): full-bleed 843px band with a background image that fades into the
 * canvas from the middle down (annotation 54:102972). CTA goes full width on mobile.
 */
export function Hero({ align = 'start', eyebrow, heading, body, bodySize = 'body', cta, background, breadcrumb }: HeroProps) {
  return (
    <section className={`hero hero--${align}`}>
      {background && <img className="hero__bg" src={background.src} alt={background.alt} />}
      <div className="hero__scrim" aria-hidden="true" />
      {breadcrumb && <Breadcrumb className="hero__breadcrumb container" items={breadcrumb} />}
      <div className="hero__content container">
        {eyebrow && <p className="eyebrow ns-text-web-eyebrow-black">{eyebrow}</p>}
        <Rich as="h1" className="hero__heading ns-text-web-h1-light" text={heading} />
        <Paragraphs className={`hero__body ${bodySize === 'lead' ? 'ns-text-web-h3-light' : 'ns-text-web-body-light'}`} body={body} />
        <Cta className="hero__cta" cta={cta} size="lg" />
      </div>
    </section>
  );
}
