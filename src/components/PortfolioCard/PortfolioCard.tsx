import { forwardRef, isValidElement, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/index.js';
import { Tag, type TagColor } from '../Tag/index.js';

/** Project image, rendered as an `<img>` cropped to the media frame (`object-fit: cover`). */
export interface PortfolioCardImage {
  src: string;
  /** Describes the project. Use `""` when the title already says everything the image does. */
  alt: string;
}

/** A service tag with an explicit Tag color. */
export interface PortfolioCardTag {
  /** Visible text, also the React key, so labels must be unique within a card. */
  label: string;
  /** Tag color. Defaults to `brand`. */
  color?: TagColor;
}

export interface PortfolioCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> {
  /** Link target. The whole card is clickable; the title is the link text. */
  href: string;
  /** Figma `Title`: project name, 1–2 lines (clamped at 2). */
  title: ReactNode;
  /** Figma `Client` / `Show client`: the client line is hidden when this is undefined. */
  client?: ReactNode;
  /** Visible label before the client name. */
  clientLabel?: string;
  /**
   * Media. `{ src, alt }` renders a cropped `<img>`; any other node (e.g. `<picture>` or a framework image
   * component) is rendered as-is inside the 360×220 frame. Omit for the camera placeholder.
   */
  image?: PortfolioCardImage | ReactNode;
  /**
   * Figma `Show tags`: service tags as labels or `{ label, color }`. Hidden when empty.
   * The design shows at most 3.
   */
  tags?: ReadonlyArray<string | PortfolioCardTag>;
  /** Accessible name of the tag list. */
  tagsLabel?: string;
  /** Heading level of the title, so the card fits the page outline. */
  headingLevel?: 2 | 3 | 4;
  /** Extra attributes for the `<a>` (e.g. `target`, `rel`, `onClick` for client-side routing). */
  linkProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;
}

function isImageSource(image: PortfolioCardProps['image']): image is PortfolioCardImage {
  return typeof image === 'object' && image !== null && !isValidElement(image) && 'src' in image;
}

function toTag(tag: string | PortfolioCardTag): PortfolioCardTag {
  return typeof tag === 'string' ? { label: tag } : tag;
}

/**
 * Portfolio / case-study card: media, title, service tags and client. Renders an `<article>` (the ref target)
 * whose title contains the one `<a>`; the link is stretched over the whole card, so every part of it is
 * clickable while the link's accessible name stays just the title.
 */
export const PortfolioCard = forwardRef<HTMLElement, PortfolioCardProps>(function PortfolioCard(
  {
    href,
    title,
    client,
    clientLabel = 'Client',
    image,
    tags = [],
    tagsLabel = 'Services',
    headingLevel = 3,
    linkProps,
    className,
    ...rest
  },
  ref,
) {
  const Heading = `h${headingLevel}` as const;
  const items = tags.map(toTag);

  return (
    <article ref={ref} className={cx('ns-portfolio-card', className)} {...rest}>
      <div className="ns-portfolio-card__media">
        {isImageSource(image) ? (
          <img className="ns-portfolio-card__image" src={image.src} alt={image.alt} />
        ) : image != null ? (
          image
        ) : (
          <Icon name="camera" size="xl" className="ns-portfolio-card__placeholder" />
        )}
      </div>
      <div className="ns-portfolio-card__body">
        <Heading className="ns-portfolio-card__title ns-text-secondary-body-xl-demi-bold">
          <a {...linkProps} href={href} className={cx('ns-portfolio-card__link', linkProps?.className)}>
            {title}
          </a>
        </Heading>
        {items.length > 0 && (
          <ul className="ns-portfolio-card__tags" aria-label={tagsLabel}>
            {items.map((tag) => (
              <li key={tag.label}>
                <Tag variant="outlined" size="sm" color={tag.color ?? 'brand'}>
                  {tag.label}
                </Tag>
              </li>
            ))}
          </ul>
        )}
        {client != null && (
          <p className="ns-portfolio-card__meta ns-text-secondary-body-md-regular">
            <span className="ns-portfolio-card__meta-label">{clientLabel}</span>{' '}
            <span className="ns-portfolio-card__separator" aria-hidden="true">
              |
            </span>{' '}
            <span className="ns-portfolio-card__client ns-text-secondary-body-md-demi-bold">{client}</span>
          </p>
        )}
      </div>
    </article>
  );
});
