import { useId, useState } from 'react';
import { Icon } from '@nicasource/ds';
import { Rich } from '../../components/Rich';
import './FaqAccordion.css';

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqAccordionProps {
  heading?: string;
  items: FaqItem[];
  /** How many items go in the left column (default: half, rounded up). */
  split?: number;
  /** Questions open on first render (default: the first). */
  defaultOpen?: number[];
}

/**
 * FAQ module (annotations 57:103418 / 57:103428): two columns of independent disclosures on desktop,
 * one column on mobile (left column first). Emits FAQPage JSON-LD for search engines.
 */
export function FaqAccordion({ heading, items, split, defaultOpen = [0] }: FaqAccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(() => defaultOpen.map((i) => items[i]?.q).filter(Boolean) as string[]);
  const leftCount = split ?? Math.ceil(items.length / 2);
  const columns = [items.slice(0, leftCount), items.slice(leftCount)];
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  });

  function handleToggle(q: string) {
    setOpen((prev) => (prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q]));
  }

  return (
    <section className="section faq">
      <div className="container faq__inner">
        {heading && <Rich as="h2" className="heading faq__heading ns-text-web-h2-black" text={heading} />}
        <div className="faq__columns">
          {columns.map((col, c) => (
            <ul key={c} className="faq__col">
              {col.map((item) => {
                const expanded = open.includes(item.q);
                const panelId = `${baseId}-${items.indexOf(item)}`;
                return (
                  <li key={item.q} className={`faq__item${expanded ? ' faq__item--open' : ''}`}>
                    <h3 className="faq__q-wrap">
                      <button
                        type="button"
                        className="faq__trigger"
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() => handleToggle(item.q)}
                      >
                        <span className="faq__q ns-text-web-h4-black">{item.q}</span>
                        <Icon name="chevron-down" size="lg" className="faq__chevron" />
                      </button>
                    </h3>
                    <div id={panelId} className="faq__a" hidden={!expanded}>
                      <Rich as="p" className="ns-text-web-body-light" text={item.a} />
                    </div>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd.replace(/</g, '\\u003c') }} />
    </section>
  );
}
