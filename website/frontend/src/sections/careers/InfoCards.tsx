import { Rich } from '../../components/Rich';
import { InfoCardGrid, type InfoCardItem } from './InfoCard';
import './InfoCards.css';

export interface InfoCardsProps {
  eyebrow?: string;
  heading?: string;
  /** `center`: the centred statement band (Careers "Benefits intro"). */
  align?: 'start' | 'center';
  /** Omit for a heading-only statement. */
  items?: InfoCardItem[];
}

/**
 * Eyebrow + H2 header with an optional 3-up row of outlined InfoCards (Careers "Benefits" 2132:12896
 * and the centred "Built for Your Career" statement 1:1710).
 */
export function InfoCards({ eyebrow, heading, align = 'start', items = [] }: InfoCardsProps) {
  return (
    <section className={`info-cards info-cards--${align}`}>
      <div className="container info-cards__inner">
        {(eyebrow || heading) && (
          <header className="info-cards__head">
            {eyebrow && <p className="eyebrow ns-text-web-eyebrow-black">{eyebrow}</p>}
            {heading && <Rich as="h2" className="heading ns-text-web-h2-light" text={heading} />}
          </header>
        )}
        {items.length > 0 && <InfoCardGrid items={items} />}
      </div>
    </section>
  );
}
