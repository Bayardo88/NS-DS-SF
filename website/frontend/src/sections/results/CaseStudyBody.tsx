import type { Media } from '../../lib/types';
import { useEntry } from '../../lib/EntryContext';
import { Rich, Paragraphs } from '../../components/Rich';
import { caseStudyFields } from './caseStudy';
import './CaseStudyBody.css';

/** Intro header (Figma 2a): eyebrow + headline + client logo tile. Defaults come from the entry. */
export interface IntroBlock {
  kind: 'intro';
  eyebrow?: string;
  title?: string;
  logo?: Media;
}

/** Copy + two images (2b "Overview", 4 "Development"). `reverse` puts the tall image on the left. */
export interface SplitBlock {
  kind: 'split';
  title?: string;
  body?: string | string[];
  image: Media;
  tallImage: Media;
  reverse?: boolean;
}

/** Title column + body column (2c "Strategy", 2e "Design", or Challenge / Solution). */
export interface TextBlock {
  kind: 'text';
  title: string;
  body: string | string[];
}

/** Full-width image, 430 (`md`) or 700 (`lg`) tall at desktop. */
export interface ImageBlock {
  kind: 'image';
  image: Media;
  size?: 'md' | 'lg';
}

/**
 * Two images side by side (2:1 or 1:2), any further images full width below (2f, 4). On mobile
 * `scroll` turns all of them into a swipe row; `stack` stacks them.
 */
export interface GalleryBlock {
  kind: 'gallery';
  images: Media[];
  layout?: 'wide-narrow' | 'narrow-wide';
  mobile?: 'scroll' | 'stack';
}

/** Results strip (field `results_metrics`; not in the Figma design, optional). */
export interface MetricsBlock {
  kind: 'metrics';
  title?: string;
  items: { value: string; label: string }[];
}

export type CaseStudyBlock = (IntroBlock | SplitBlock | TextBlock | ImageBlock | GalleryBlock | MetricsBlock) & {
  id?: string;
};

export interface CaseStudyBodyProps {
  /** Flexible content blocks (ACF `content_blocks`), rendered in order with a 40px rhythm. */
  blocks: CaseStudyBlock[];
}

function Figure({ media, className }: { media: Media; className?: string }) {
  return (
    <figure className={`cs-body__figure ${className ?? ''}`}>
      <img src={media.src} alt={media.alt} loading="lazy" />
    </figure>
  );
}

function Intro({ block }: { block: IntroBlock }) {
  const entry = useEntry();
  const fields = entry ? caseStudyFields(entry) : undefined;
  const eyebrow = block.eyebrow ?? fields?.client;
  const title = block.title ?? fields?.headline ?? entry?.title;
  const logo = block.logo ?? fields?.logo;
  return (
    <header className={`cs-body__intro${logo ? ' cs-body__intro--logo' : ''}`}>
      {eyebrow && <p className="eyebrow ns-text-web-eyebrow-black cs-body__intro-eyebrow">{eyebrow}</p>}
      {title && <Rich as="h2" className="heading ns-text-web-h2-black cs-body__intro-title" text={title} />}
      {logo && (
        <img
          className="cs-body__logo"
          src={logo.src}
          alt={logo.alt || (eyebrow ? `${eyebrow} logo` : '')}
          loading="lazy"
        />
      )}
    </header>
  );
}

function Split({ block }: { block: SplitBlock }) {
  return (
    <div className={`cs-body__split${block.reverse ? ' cs-body__split--reverse' : ''}`}>
      <div className="cs-body__split-col">
        <div className="cs-body__split-copy">
          {block.title && <Rich as="h3" className="heading ns-text-web-h2-black" text={block.title} />}
          <Paragraphs className="body-copy ns-text-web-body-light" body={block.body} />
        </div>
        <Figure media={block.image} className="cs-body__figure--small" />
      </div>
      <Figure media={block.tallImage} className="cs-body__figure--tall" />
    </div>
  );
}

function Text({ block }: { block: TextBlock }) {
  return (
    <div className="cs-body__text">
      <Rich as="h3" className="heading ns-text-web-h2-black" text={block.title} />
      <Paragraphs className="body-copy ns-text-web-body-light" body={block.body} />
    </div>
  );
}

function Gallery({ block }: { block: GalleryBlock }) {
  const [first, second, ...more] = block.images;
  const scroll = (block.mobile ?? 'scroll') === 'scroll';
  return (
    <div
      className={`cs-body__gallery cs-body__gallery--${block.layout ?? 'wide-narrow'}${scroll ? ' cs-body__gallery--scroll' : ''}`}
      role={scroll ? 'region' : undefined}
      aria-label={scroll ? 'Project images' : undefined}
      tabIndex={scroll ? 0 : undefined}
    >
      {first && <Figure media={first} className="cs-body__gallery-item" />}
      {second && <Figure media={second} className="cs-body__gallery-item" />}
      {more.map((media) => (
        <Figure key={media.src + media.alt} media={media} className="cs-body__gallery-item cs-body__gallery-item--full" />
      ))}
    </div>
  );
}

function Metrics({ block }: { block: MetricsBlock }) {
  return (
    <div className="cs-body__metrics">
      {block.title && <Rich as="h3" className="heading ns-text-web-h2-black" text={block.title} />}
      <dl className="cs-body__metrics-list">
        {block.items.map((item) => (
          <div key={item.label} className="cs-body__metric">
            <dt className="cs-body__metric-label ns-text-web-body-light">{item.label}</dt>
            <dd className="cs-body__metric-value ns-text-web-numbers-extralight">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Block({ block }: { block: CaseStudyBlock }) {
  switch (block.kind) {
    case 'intro':
      return <Intro block={block} />;
    case 'split':
      return <Split block={block} />;
    case 'text':
      return <Text block={block} />;
    case 'image':
      return <Figure media={block.image} className={`cs-body__figure--${block.size ?? 'md'}`} />;
    case 'gallery':
      return <Gallery block={block} />;
    case 'metrics':
      return <Metrics block={block} />;
    default:
      return null;
  }
}

/**
 * Case-study body (Figma 1:3925 and 1:3970, annotation 57:103468): a flexible-content renderer
 * for the CPT's ordered blocks (intro, overview, strategy, images, design, development…).
 */
export function CaseStudyBody({ blocks }: CaseStudyBodyProps) {
  return (
    <section className="cs-body">
      <div className="container cs-body__inner">
        {blocks.map((block, i) => (
          <Block key={block.id ?? `${block.kind}-${i}`} block={block} />
        ))}
      </div>
    </section>
  );
}
