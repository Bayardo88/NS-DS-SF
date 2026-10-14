import type { CSSProperties } from 'react';
import { Icon } from '../../../src/components/Icon/Icon.js';
import { themes, type Theme } from '../../../src/tokens/index.js';
import { tokensIn, type TokenEntry } from './tokenData.js';
import './blocks.css';

export type ColorGroup = 'bg' | 'text' | 'border' | 'icon';

const THEME_LABELS: Record<Theme, string> = { light: 'Light', dark: 'Dark', 'web-2025': 'Web 2025' };
const FIGMA_MODES: Record<Theme, string> = { light: 'Light', dark: 'Dark', 'web-2025': 'Web 2025' };

function chipStyle(group: ColorGroup, ref: string): CSSProperties {
  switch (group) {
    case 'bg':
      return { background: ref };
    case 'text':
      return { color: ref };
    case 'border':
      return { borderColor: ref };
    case 'icon':
      return { color: ref };
  }
}

function chipClass(group: ColorGroup): string {
  if (group === 'bg') return 'sb-fd__chip';
  return `sb-fd__chip sb-fd__chip--${group}`;
}

interface SwatchCellProps {
  group: ColorGroup;
  token: TokenEntry;
  theme: Theme;
}

/** One token in one theme. The cell sets `data-theme`, so `var()` resolves to that theme's value. */
function SwatchCell({ group, token, theme }: SwatchCellProps) {
  return (
    <div className="sb-fd__cell" data-theme={theme}>
      <div className={chipClass(group)} style={chipStyle(group, token.ref)}>
        {group === 'text' && 'Aa'}
        {group === 'icon' && <Icon name="star" size="lg" />}
      </div>
      <span>{token.modes?.[FIGMA_MODES[theme]] ?? token.value}</span>
    </div>
  );
}

export interface ColorSwatchesProps {
  /** Semantic color role: `bg`, `text`, `border` or `icon`. */
  group: ColorGroup;
}

/**
 * Every semantic color in a role, rendered in all three themes side by side. Each cell is its own
 * themed canvas, so you see the token on the background it will actually sit on.
 */
export function ColorSwatches({ group }: ColorSwatchesProps) {
  const entries = tokensIn(`color.${group}`);
  return (
    <div className="sb-fd sb-unstyled" role="table" aria-label={`${group} color tokens`}>
      <div className="sb-fd__row" role="row">
        <span className="sb-fd__head" role="columnheader">
          Token
        </span>
        {themes.map((theme) => (
          <span key={theme} className="sb-fd__head" role="columnheader">
            {THEME_LABELS[theme]}
          </span>
        ))}
      </div>
      {entries.map((token) => (
        <div key={token.cssVar} className="sb-fd__row" role="row">
          <div className="sb-fd__name" role="rowheader">
            <code>{token.cssVar}</code>
            {token.description && <span className="sb-fd__meta">{token.description}</span>}
          </div>
          {themes.map((theme) => (
            <div key={theme} role="cell">
              <SwatchCell group={group} token={token} theme={theme} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
