import type { Link } from '../lib/types';
import { Rich } from '../components/Rich';
import { Cta } from '../components/Cta';
import './Columns.css';

export interface ColumnItem {
  id?: string;
  /** Big outlined number ("01") or a DS icon name shown on top. Optional. */
  number?: string;
  title?: string;
  body?: string;
  cta?: Link;
}

export interface ColumnsProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  columns?: 1 | 2 | 3;
  /** `card`: outlined cards (process steps). `plain`: text only. */
  appearance?: 'card' | 'plain';
  items: ColumnItem[];
}

/**
 * Columns module (annotation 54:103142): 1–3 columns of number/title/description, every part
 * optional. Stacks on mobile.
 */
export function Columns({ eyebrow, heading, body, columns = 3, appearance = 'card', items }: ColumnsProps) {
  return (
    <section className="section">
      <div className="container stack">
        {(eyebrow || heading || body) && (
          <header className="columns__head">
            {eyebrow && <p className="eyebrow ns-text-web-eyebrow-black">{eyebrow}</p>}
            {heading && <Rich as="h2" className="heading ns-text-web-h2-light" text={heading} />}
            {body && <Rich as="p" className="body-copy ns-text-web-body-light" text={body} />}
          </header>
        )}
        <ol className={`columns columns--${columns} columns--${appearance}`}>
          {items.map((item) => (
            <li key={item.id ?? item.title ?? item.number} className="columns__item">
              {item.number && (
                <span className="columns__number ns-text-web-numbers-extralight" aria-hidden="true">
                  {item.number}
                </span>
              )}
              {item.title && <Rich as="h3" className={`columns__title ${appearance === 'card' ? 'ns-text-web-h2-black' : 'ns-text-web-h3-black'}`} text={item.title} />}
              {item.body && <Rich as="p" className="columns__body ns-text-web-body-light" text={item.body} />}
              <Cta cta={item.cta} variant="outlined" size="sm" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
