import { Rich } from '../../components/Rich';
import './InfoCard.css';

export interface InfoCardItem {
  id?: string;
  title: string;
  body?: string;
}

/**
 * Outlined text card (Figma "Card" in Benefits): Black H2 title over a light paragraph. Used by the
 * careers benefits grid and the job description benefits row.
 */
export function InfoCard({ title, body }: InfoCardItem) {
  return (
    <li className="info-card">
      <Rich as="h3" className="info-card__title ns-text-web-h2-black" text={title} />
      {body && <Rich as="p" className="info-card__body ns-text-web-body-light" text={body} />}
    </li>
  );
}

/** 3-up grid of InfoCards (1 column on mobile). */
export function InfoCardGrid({ items, label }: { items: InfoCardItem[]; label?: string }) {
  return (
    <ul className="info-card-grid" aria-label={label}>
      {items.map((item) => (
        <InfoCard key={item.id ?? item.title} {...item} />
      ))}
    </ul>
  );
}
