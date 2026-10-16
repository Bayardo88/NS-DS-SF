import { Rich } from './Rich';
import { SmartLink } from '../layout/RouterLink';
import type { Media } from '../lib/types';
import './OverlayCard.css';

export interface OverlayCardProps {
  href: string;
  title: string;
  image?: Media;
  tags?: string[];
  /** Heading size: `lg` for featured cards. */
  size?: 'md' | 'lg';
  headingLevel?: 2 | 3;
  className?: string;
}

/**
 * Photo card with tags on top and the title at the bottom over a scrim (blog bento, featured case
 * study, related posts). One link per card; the whole card is the hit area.
 */
export function OverlayCard({ href, title, image, tags = [], size = 'md', headingLevel = 3, className }: OverlayCardProps) {
  const H = `h${headingLevel}` as const;
  return (
    <article className={`overlay-card overlay-card--${size} ${className ?? ''}`}>
      {image && <img className="overlay-card__img" src={image.src} alt="" loading="lazy" />}
      {tags.length > 0 && (
        <ul className="overlay-card__tags" aria-label="Topics">
          {tags.map((tag) => (
            <li key={tag} className="overlay-card__tag ns-text-web-small-regular">
              {tag}
            </li>
          ))}
        </ul>
      )}
      <H className={`overlay-card__title ${size === 'lg' ? 'ns-text-web-h1-black' : 'ns-text-web-h4-black'}`}>
        <SmartLink className="overlay-card__link" href={href}>
          <Rich text={title} />
        </SmartLink>
      </H>
    </article>
  );
}
