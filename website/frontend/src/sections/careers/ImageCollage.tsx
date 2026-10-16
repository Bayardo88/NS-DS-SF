import type { Media } from '../../lib/types';
import './ImageCollage.css';

export interface ImageCollageProps {
  image: Media;
  /** Visible caption under the collage (optional). */
  caption?: string;
}

/**
 * Moodboard module (annotation 57:103568): ships as one flattened image first, centred at up to
 * the container width. The image carries meaningful text, so `alt` must describe it.
 */
export function ImageCollage({ image, caption }: ImageCollageProps) {
  return (
    <section className="image-collage">
      <figure className="container image-collage__figure">
        <img
          className="image-collage__img"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
        />
        {caption && <figcaption className="image-collage__caption ns-text-web-caption-light">{caption}</figcaption>}
      </figure>
    </section>
  );
}
