import { useId, useState } from 'react';
import { Icon } from '@nicasource/ds';
import { Rich } from '../../components/Rich';
import './ComparisonCards.css';

export interface ComparisonCard {
  title: string;
  /** Bullet list (preferred) or a paragraph. */
  items?: string[];
  body?: string;
}

export interface ComparisonCardsProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  cards: ComparisonCard[];
  /** Desktop default. Services shows all expanded; the service-detail pages start collapsed. Mobile always starts collapsed. */
  desktopExpanded?: boolean;
}

const MOBILE_QUERY = '(max-width: 767px)';

function isMobile() {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;
}

/**
 * Comparative module (annotations 57:103272 / 57:103282): three collapsible columns (disclosure
 * pattern). Expanded by default on desktop, collapsed on mobile; on mobile one card is open at a time.
 */
export function ComparisonCards({ eyebrow, heading, subheading, cards, desktopExpanded = true }: ComparisonCardsProps) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(() =>
    desktopExpanded && !isMobile() ? cards.map((c) => c.title) : [],
  );

  function handleToggle(title: string) {
    setOpen((prev) => {
      if (prev.includes(title)) return prev.filter((t) => t !== title);
      return isMobile() ? [title] : [...prev, title];
    });
  }

  return (
    <section className="section comparison">
      <div className="container comparison__inner">
        <header className="comparison__header">
          {eyebrow && <p className="eyebrow ns-text-web-caption-light">{eyebrow}</p>}
          <Rich as="h2" className="heading ns-text-web-h2-light" text={heading} />
          {subheading && <Rich as="p" className="comparison__sub ns-text-web-body-light" text={subheading} />}
        </header>
        <ul className="comparison__cards">
          {cards.map((card, i) => {
            const expanded = open.includes(card.title);
            const panelId = `${baseId}-panel-${i}`;
            return (
              <li key={card.title} className={`comparison__card${expanded ? ' comparison__card--open' : ''}`}>
                <h3 className="comparison__title-wrap">
                  <button
                    type="button"
                    className="comparison__trigger"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => handleToggle(card.title)}
                  >
                    <span className="comparison__title ns-text-web-h4-black">{card.title}</span>
                    <Icon name="chevron-down" size="lg" className="comparison__chevron" />
                  </button>
                </h3>
                <div id={panelId} className="comparison__panel ns-text-web-body-light" hidden={!expanded}>
                  {card.items ? (
                    <ul className="comparison__list">
                      {card.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    card.body && <Rich as="p" text={card.body} />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
