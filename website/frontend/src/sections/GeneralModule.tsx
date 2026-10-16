import type { Link, Media } from '../lib/types';
import { Rich, Paragraphs } from '../components/Rich';
import { Cta } from '../components/Cta';
import { TestimonialCarousel, type Testimonial } from '../components/TestimonialCarousel';
import './GeneralModule.css';

export interface GeneralModuleProps {
  eyebrow?: string;
  eyebrowTone?: 'accent' | 'brand';
  heading?: string;
  /** `md` = H2 Light (default), `lg` = H1 Light. */
  headingSize?: 'md' | 'lg';
  body?: string | string[];
  cta?: Link;
  /** Media in the other column, or `background` when it fills the whole module. */
  media?: Media;
  mediaMode?: 'column' | 'background';
  /** Which column holds the text (annotation 54:103082). */
  contentSide?: 'left' | 'right';
  /** Put a testimonial carousel in the media column instead (annotation 57:103162). */
  testimonials?: Testimonial[];
  /** Mobile: media before or after the copy. */
  mobileMediaFirst?: boolean;
}

/**
 * General Module — the site's workhorse: two columns (copy + media). Every copy part is optional;
 * the media can sit in a column or fill the module as a background. Stacks on mobile.
 */
export function GeneralModule({
  eyebrow,
  eyebrowTone = 'accent',
  heading,
  headingSize = 'md',
  body,
  cta,
  media,
  mediaMode = 'column',
  contentSide = 'left',
  testimonials,
  mobileMediaFirst = false,
}: GeneralModuleProps) {
  const classes = [
    'general',
    `general--content-${contentSide}`,
    `general--media-${mediaMode}`,
    mobileMediaFirst ? 'general--mobile-media-first' : '',
  ].join(' ');

  return (
    <section className={classes}>
      {media && mediaMode === 'background' && (
        <img className="general__bg" src={media.src} alt={media.alt} loading="lazy" />
      )}
      <div className="general__inner container">
        <div className="general__copy">
          {eyebrow && <p className={`eyebrow eyebrow--${eyebrowTone} ns-text-web-eyebrow-black`}>{eyebrow}</p>}
          {heading && (
            <Rich
              as="h2"
              className={`heading ${headingSize === 'lg' ? 'ns-text-web-h1-light' : 'ns-text-web-h2-light'}`}
              text={heading}
            />
          )}
          <Paragraphs className="body-copy ns-text-web-body-light" body={body} />
          <Cta className="general__cta" cta={cta} size="lg" />
        </div>
        {testimonials ? (
          <div className="general__media">
            <TestimonialCarousel items={testimonials} />
          </div>
        ) : (
          media &&
          mediaMode === 'column' && (
            <div className="general__media">
              <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" />
            </div>
          )
        )}
      </div>
    </section>
  );
}
