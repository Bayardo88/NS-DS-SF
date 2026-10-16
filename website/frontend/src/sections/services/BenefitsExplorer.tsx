import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Icon } from '@nicasource/ds';
import type { Media } from '../../lib/types';
import { Rich } from '../../components/Rich';
import './BenefitsExplorer.css';

export interface Benefit {
  title: string;
  body: string;
  image?: Media;
}

export interface BenefitsExplorerProps {
  eyebrow?: string;
  heading?: string;
  items: Benefit[];
  /** Benefit selected (desktop) and expanded (mobile) first. */
  defaultIndex?: number;
}

/**
 * Descriptive module (annotations 57:103262 / 57:103292): on desktop two columns of vertical ARIA
 * tabs drive a detail panel (title, paragraph, image); on mobile the same benefits are a
 * single-open accordion with the first item expanded. Both views are in the DOM and swapped by CSS.
 */
export function BenefitsExplorer({ eyebrow, heading, items, defaultIndex = 0 }: BenefitsExplorerProps) {
  const [active, setActive] = useState(defaultIndex);
  const [open, setOpen] = useState<number | null>(defaultIndex);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const current = items[active];

  function handleSelect(index: number) {
    setActive(index);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | null = null;
    if (event.key in keys) next = (active + keys[event.key]! + items.length) % items.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = items.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function handleToggle(index: number) {
    setOpen((prev) => (prev === index ? null : index));
  }

  return (
    <section className="section benefits">
      <div className="container stack">
        {eyebrow && <p className="eyebrow ns-text-web-caption-light">{eyebrow}</p>}
        {heading && <Rich as="h2" className="heading ns-text-web-h2-light" text={heading} />}

        {/* Desktop: vertical tabs in two columns + detail panel. */}
        <div className="benefits__tabs">
          <div
            className="benefits__tablist"
            role="tablist"
            aria-orientation="vertical"
            aria-label={eyebrow ?? 'Benefits'}
            style={{ '--benefits-rows': Math.ceil(items.length / 2) } as CSSProperties}
          >
            {items.map((item, i) => (
              <button
                key={item.title}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`${baseId}-panel`}
                tabIndex={i === active ? 0 : -1}
                className="benefits__tab"
                onClick={() => handleSelect(i)}
                onMouseEnter={() => handleSelect(i)}
                onKeyDown={handleTabKeyDown}
              >
                <span className="benefits__tab-title ns-text-web-h4-black">{item.title}</span>
                <Icon name="eye" size="lg" className="benefits__icon" />
              </button>
            ))}
          </div>
          {current && (
            <div
              className="benefits__panel"
              role="tabpanel"
              id={`${baseId}-panel`}
              aria-labelledby={`${baseId}-tab-${active}`}
              tabIndex={0}
            >
              <h3 className="benefits__panel-title ns-text-web-h4-black">{current.title}</h3>
              <Rich as="p" className="benefits__body ns-text-web-body-light" text={current.body} />
              {current.image && (
                <img className="benefits__img" src={current.image.src} alt={current.image.alt} loading="lazy" />
              )}
            </div>
          )}
        </div>

        {/* Mobile: single-open accordion. */}
        <ul className="benefits__accordion">
          {items.map((item, i) => {
            const expanded = open === i;
            return (
              <li key={item.title} className={`benefits__item${expanded ? ' benefits__item--open' : ''}`}>
                <h3 className="benefits__item-heading">
                  <button
                    type="button"
                    className="benefits__trigger"
                    aria-expanded={expanded}
                    aria-controls={`${baseId}-acc-${i}`}
                    onClick={() => handleToggle(i)}
                  >
                    <span className="benefits__tab-title ns-text-web-h4-black">{item.title}</span>
                    <Icon name="chevron-down" size="lg" className="benefits__icon benefits__chevron" />
                  </button>
                </h3>
                <div id={`${baseId}-acc-${i}`} className="benefits__content" hidden={!expanded}>
                  <Rich as="p" className="benefits__body ns-text-web-body-light" text={item.body} />
                  {item.image && (
                    <img className="benefits__img" src={item.image.src} alt={item.image.alt} loading="lazy" />
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
