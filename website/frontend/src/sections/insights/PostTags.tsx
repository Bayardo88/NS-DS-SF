import { SmartLink } from '../../layout/RouterLink';
import { tagHref } from './posts';
import './PostTags.css';

/**
 * Post tag chips (Figma "Label" 1:468): solid brand fill, Label Medium. With `linked`, each chip
 * opens the insights index filtered by that tag.
 */
export function PostTags({ tags, linked = false, className }: { tags: string[]; linked?: boolean; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={`post-tags ${className ?? ''}`} aria-label="Topics">
      {tags.map((tag) => (
        <li key={tag}>
          {linked ? (
            <SmartLink className="post-tags__chip post-tags__chip--link ns-text-web-label-medium" href={tagHref(tag)}>
              {tag}
            </SmartLink>
          ) : (
            <span className="post-tags__chip ns-text-web-label-medium">{tag}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
