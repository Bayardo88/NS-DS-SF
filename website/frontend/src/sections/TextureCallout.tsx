import './TextureCallout.css';

export interface TextureCalloutProps {
  /** One string per visual line. Rendered uppercase when `uppercase` is set. */
  lines: string[];
  /** Image clipped to the letterforms (annotation 54:103052). */
  texture: string;
  size?: 'lg' | 'xl';
  uppercase?: boolean;
  align?: 'start' | 'center';
}

/**
 * Call-out: huge display text used as a mask over an image. Real text, so it stays selectable and
 * readable by screen readers; the clip is purely visual and falls back to solid text.
 */
export function TextureCallout({ lines, texture, size = 'lg', uppercase = false, align = 'start' }: TextureCalloutProps) {
  return (
    <section className={`callout callout--${align}`}>
      <div className="container">
        <h2
          className={`callout__text texture-text ${size === 'xl' ? 'ns-text-web-callout-xl-black' : 'ns-text-web-callout-lg-black'}`}
          style={{ backgroundImage: `url(${texture})`, textTransform: uppercase ? 'uppercase' : undefined }}
        >
          {lines.map((line, i) => (
            <span key={line + i} className="callout__line">
              {line}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
