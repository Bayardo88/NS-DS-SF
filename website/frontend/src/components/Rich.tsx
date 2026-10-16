import { Fragment, type ElementType, type HTMLAttributes } from 'react';

/**
 * Renders CMS text where `**bold**` marks emphasis and `\n` a line break — the site mixes Light and
 * Black weights inside one heading ("Our **track record** speaks for itself."). `{{x}}` colors a run
 * with the brand color (the coral `<Code/>` glyphs in the service-detail hero).
 */
export function Rich({
  text,
  as: Tag = 'span',
  ...rest
}: { text: string; as?: ElementType } & HTMLAttributes<HTMLElement>) {
  const lines = text.split('\n');
  return (
    <Tag {...rest}>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split(/(\*\*[^*]+\*\*|\{\{[^}]+\}\})/g).map((part, pi) => {
            if (part.startsWith('**') && part.endsWith('**')) return <strong key={pi}>{part.slice(2, -2)}</strong>;
            // `{{x}}` = brand-colored run (decorative; meaning never depends on it).
            if (part.startsWith('{{') && part.endsWith('}}'))
              return (
                <span key={pi} style={{ color: 'var(--ns-color-text-brand)' }}>
                  {part.slice(2, -2)}
                </span>
              );
            return part;
          })}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Body copy: a string or a list of paragraphs. */
export function Paragraphs({ body, className }: { body?: string | string[]; className?: string }) {
  if (!body) return null;
  const paragraphs = Array.isArray(body) ? body : [body];
  return (
    <div className={className}>
      {paragraphs.map((p) => (
        <Rich key={p} as="p" text={p} />
      ))}
    </div>
  );
}
