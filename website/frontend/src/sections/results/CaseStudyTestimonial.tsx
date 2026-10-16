import type { Media } from '../../lib/types';
import { useEntry } from '../../lib/EntryContext';
import { caseStudyFields } from './caseStudy';
import './CaseStudyTestimonial.css';

export interface CaseStudyTestimonialProps {
  /** Overrides; by default the quote comes from the entry's `testimonial` meta field. */
  quote?: string;
  name?: string;
  role?: string;
  photo?: Media;
}

/**
 * Client testimonial (Figma 7:5573): one light quote card with the author row, the quote in H3
 * Light and the client photo. Renders nothing when the case study has no testimonial.
 */
export function CaseStudyTestimonial(props: CaseStudyTestimonialProps) {
  const entry = useEntry();
  const fromEntry = entry ? caseStudyFields(entry).testimonial : undefined;
  const quote = props.quote ?? fromEntry?.quote;
  const name = props.name ?? fromEntry?.name;
  const role = props.role ?? fromEntry?.role;
  const photo = props.photo ?? fromEntry?.photo;
  if (!quote || !name) return null;

  return (
    <section className="cs-quote">
      <div className="container">
        <figure className="cs-quote__card">
          <div className="cs-quote__text">
            <figcaption className="cs-quote__author">
              <span className="cs-quote__icon" aria-hidden="true" />
              <span className="ns-text-web-eyebrow-black">{name}</span>
              {role && <span className="cs-quote__role ns-text-web-body-regular">{role}</span>}
            </figcaption>
            <blockquote className="cs-quote__quote ns-text-web-h3-light">
              <p>“{quote}”</p>
            </blockquote>
          </div>
          {photo && <img className="cs-quote__photo" src={photo.src} alt={photo.alt} loading="lazy" />}
        </figure>
      </div>
    </section>
  );
}
