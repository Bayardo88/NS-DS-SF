import './CaseStudyTags.css';

/**
 * Solid brand chips (industry / service terms). Figma uses light text on coral; the DS pair
 * `bg-brand` + `text-on-brand` keeps AA contrast in every theme, so we follow the DS.
 */
export function CaseStudyTags({ tags, className }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={`cs-tags ${className ?? ''}`} aria-label="Industry and services">
      {tags.map((tag) => (
        <li key={tag} className="cs-tags__tag ns-text-web-label-medium">
          {tag}
        </li>
      ))}
    </ul>
  );
}
