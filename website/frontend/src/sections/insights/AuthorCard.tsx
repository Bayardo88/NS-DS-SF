import type { Author } from './posts';

export interface AuthorCardProps {
  author: Author;
  /** `mini` opens the article (avatar + name + bio); `full` closes it (badges, expertise, role). */
  variant?: 'mini' | 'full';
}

/** Author cards (Figma 1:5394 mini, 1:5403 full). Data: the post's `author` meta. */
export function AuthorCard({ author, variant = 'mini' }: AuthorCardProps) {
  const initials = author.name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
  const avatar = author.avatar ? (
    <img className="author-card__avatar" src={author.avatar} alt="" />
  ) : (
    <span className="author-card__avatar author-card__avatar--initials ns-text-web-h4-black" aria-hidden="true">
      {initials}
    </span>
  );

  if (variant === 'mini') {
    return (
      <div className="author-card author-card--mini">
        {avatar}
        <div className="author-card__text">
          <p className="author-card__name ns-text-web-h4-black">By {author.name}</p>
          {author.role && <p className="author-card__bio ns-text-web-body-light">{author.role}</p>}
        </div>
      </div>
    );
  }

  return (
    <section className="author-card author-card--full" aria-label="About the author">
      {avatar}
      <div className="author-card__text">
        <p className="author-card__name ns-text-web-h4-black">By {author.name}</p>
        {Boolean(author.verified || author.years_experience) && (
          <ul className="author-card__badges ns-text-web-body-regular">
            {author.verified && (
              <li className="author-card__badge author-card__badge--verified">
                <span className="author-card__badge-icon" aria-hidden="true" />
                Verified Expert
              </li>
            )}
            {Boolean(author.years_experience) && (
              <li className="author-card__badge author-card__badge--years">
                <span className="author-card__badge-icon" aria-hidden="true" />
                {author.years_experience} Years of Experience
              </li>
            )}
          </ul>
        )}
        {author.bio && <p className="author-card__bio ns-text-web-body-regular">{author.bio}</p>}
        {author.expertise && author.expertise.length > 0 && (
          <div className="author-card__row">
            <p className="author-card__label ns-text-web-lead-medium">Expertise:</p>
            <ul className="author-card__pills">
              {author.expertise.map((skill) => (
                <li key={skill} className="author-card__pill ns-text-web-body-regular">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
        {author.role && (
          <p className="author-card__row">
            <span className="author-card__label ns-text-web-lead-medium">Role:</span>{' '}
            <span className="ns-text-web-body-regular">{author.role}</span>
          </p>
        )}
      </div>
    </section>
  );
}
