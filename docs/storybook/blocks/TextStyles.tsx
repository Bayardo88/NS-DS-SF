import { textStyles } from '../../../src/tokens/index.js';
import { textStyleEntries } from './tokenData.js';
import './blocks.css';

export type TextFamily = 'primary' | 'secondary' | 'web' | 'web-2023';

/** `ns-text-web-2023-…` also starts with `ns-text-web-`, so match the longer prefix first. */
function familyOf(className: string): TextFamily {
  if (className.startsWith('ns-text-web-2023-')) return 'web-2023';
  if (className.startsWith('ns-text-web-')) return 'web';
  if (className.startsWith('ns-text-secondary-')) return 'secondary';
  return 'primary';
}

const SAMPLES: Record<TextFamily, string> = {
  primary: 'Nearshore engineering, built to ship',
  secondary: 'Nearshore engineering, built to ship',
  web: 'We build software that moves your business',
  'web-2023': 'We build software that moves your business',
};

export interface TextStyleListProps {
  /** Which Figma family to list. */
  family: TextFamily;
  /** Override the sample sentence. */
  sample?: string;
}

/** Every `.ns-text-*` class in a family, rendered with its own class. Names come from Figma. */
export function TextStyleList({ family, sample }: TextStyleListProps) {
  const figmaNames = new Map(textStyleEntries().map((entry) => [entry.className, entry]));
  const classes = textStyles.filter((className) => familyOf(className) === family);
  return (
    <div className="sb-fd sb-unstyled">
      {classes.map((className) => {
        const entry = figmaNames.get(className);
        return (
          <div key={className} className="sb-fd__type">
            <div className="sb-fd__name">
              <code>.{className}</code>
              {entry && (
                <span className="sb-fd__meta">
                  {entry.figmaName} · {entry.font}
                </span>
              )}
            </div>
            <p className={`sb-fd__sample ${className}`}>{sample ?? SAMPLES[family]}</p>
          </div>
        );
      })}
    </div>
  );
}

/** Number of text-style classes per family, for the page summary. */
export function TextStyleCount() {
  const counts = textStyles.reduce<Record<TextFamily, number>>(
    (acc, className) => ({ ...acc, [familyOf(className)]: acc[familyOf(className)] + 1 }),
    { primary: 0, secondary: 0, web: 0, 'web-2023': 0 },
  );
  return (
    <span>
      {textStyles.length} styles: {counts.primary} Primary, {counts.secondary} Secondary, {counts.web} Web,{' '}
      {counts['web-2023']} Web 2023
    </span>
  );
}
