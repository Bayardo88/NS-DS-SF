import type { Link, Media } from '../lib/types';
import { Rich } from '../components/Rich';
import { Cta } from '../components/Cta';
import './Banner.css';

export interface BannerProps {
  heading: string;
  subheading?: string;
  cta?: Link;
  /** Photo/animation background. Without it the banner uses the surface color. */
  background?: Media;
}

/** Banner Module (annotation 57:103182): full-bleed, title + optional subtitle and CTA. */
export function Banner({ heading, subheading, cta, background }: BannerProps) {
  return (
    <section className={`banner${background ? ' banner--image' : ''}`}>
      {background && <img className="banner__bg" src={background.src} alt={background.alt} loading="lazy" />}
      <div className="banner__content container">
        <Rich as="h2" className="banner__heading ns-text-web-banner-black" text={heading} />
        {subheading && <Rich as="p" className="banner__sub ns-text-web-lead-medium" text={subheading} />}
        <Cta cta={cta} size="lg" className="banner__cta" />
      </div>
    </section>
  );
}
