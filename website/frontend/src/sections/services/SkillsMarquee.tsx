import { Rich } from '../../components/Rich';
import './SkillsMarquee.css';

export interface SkillsMarqueeProps {
  heading?: string;
  tags: string[];
  /** Number of rows (default 3). Rows alternate direction: odd rows right→left, even rows left→right. */
  rows?: number;
}

/**
 * Chips module (annotation 57:103408): rows of tech tags scrolling as a marquee in alternating
 * directions. The first row's first copy is the accessible list; the rest is decorative. Under
 * reduced motion it becomes one static, wrapped list.
 */
export function SkillsMarquee({ heading, tags, rows = 3 }: SkillsMarqueeProps) {
  const rowIds = Array.from({ length: rows }, (_, i) => i);
  return (
    <section className="section skills">
      {heading && (
        <div className="container">
          <Rich as="h2" className="heading skills__heading ns-text-web-h2-light" text={heading} />
        </div>
      )}
      <div className="skills__rows">
        {rowIds.map((row) => (
          <div
            key={row}
            className={`skills__row skills__row--${row % 2 === 0 ? 'rtl' : 'ltr'}`}
            aria-hidden={row > 0 ? 'true' : undefined}
          >
            <div className="skills__track">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  className="skills__list"
                  aria-label={row === 0 && copy === 0 ? 'Skills' : undefined}
                  aria-hidden={copy === 1 ? 'true' : undefined}
                >
                  {tags.map((tag) => (
                    <li key={tag} className="skills__tag ns-text-web-lead-medium">
                      {tag}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
