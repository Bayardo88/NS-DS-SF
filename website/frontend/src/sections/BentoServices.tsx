import type { Link, Media } from '../lib/types';
import { Rich } from '../components/Rich';
import { SmartLink } from '../layout/RouterLink';
import './BentoServices.css';

export interface BentoTile extends Link {
  /** Revealed on hover / focus (desktop) and press (touch). */
  image?: Media;
  /** Grid footprint: tall = 2 rows, wide = 2 columns. */
  span?: 'tall' | 'wide' | 'single';
}

export interface BentoServicesProps {
  eyebrow?: string;
  heading?: string;
  tiles: BentoTile[];
}

/**
 * Services bento (annotation 54:103012): a 3-column CSS grid of outlined tiles; each tile is one
 * link to its service page and reveals a photo on hover, focus and press.
 */
export function BentoServices({ eyebrow, heading, tiles }: BentoServicesProps) {
  return (
    <section className="section">
      <div className="container stack">
        {eyebrow && <p className="eyebrow eyebrow--brand ns-text-web-eyebrow-black">{eyebrow}</p>}
        {heading && <Rich as="h2" className="heading ns-text-web-h2-light" text={heading} />}
        <ul className="bento-services">
          {tiles.map((tile) => (
            <li key={tile.href + tile.label} className={`bento-services__item bento-services__item--${tile.span ?? 'single'}`}>
              <SmartLink className="bento-tile" href={tile.href}>
                {tile.image && <img className="bento-tile__img" src={tile.image.src} alt="" loading="lazy" />}
                <Rich className="bento-tile__label ns-text-web-lead-medium" text={tile.label} />
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
