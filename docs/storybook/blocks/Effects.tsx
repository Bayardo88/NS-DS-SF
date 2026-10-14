import { themes } from '../../../src/tokens/index.js';
import { tokensIn } from './tokenData.js';
import './blocks.css';

const THEME_LABELS = { light: 'Light', dark: 'Dark', 'web-2025': 'Web 2025' } as const;

export interface ShadowTilesProps {
  /** tokens.json group: `elevation`, `shadow` or `inset`. */
  group: 'elevation' | 'shadow' | 'inset';
}

/** Shadow tokens on surfaces in all three themes (shadows read differently on dark canvases). */
export function ShadowTiles({ group }: ShadowTilesProps) {
  const entries = tokensIn(group);
  return (
    <div className="sb-fd sb-unstyled">
      {themes.map((theme) => (
        <div key={theme} className="sb-fd__stage" data-theme={theme}>
          {entries.map((token) => (
            <div key={token.cssVar} className="sb-fd__tile">
              <div className="sb-fd__panel" style={{ boxShadow: token.ref }}>
                {THEME_LABELS[theme]}
              </div>
              <code>{token.cssVar}</code>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Glass panels (`--ns-color-bg-glass` + `backdrop-filter`) over a gradient, in each theme. */
export function GlassTiles() {
  const entries = tokensIn('glass').filter((token) => !token.key.endsWith('shadow'));
  return (
    <div className="sb-fd sb-unstyled">
      {themes.map((theme) => (
        <div key={theme} className="sb-fd__glass-stage" data-theme={theme}>
          {entries.map((token) => (
            <div
              key={token.cssVar}
              className="sb-fd__glass"
              style={{
                backdropFilter: token.ref,
                boxShadow: token.key === 'xl' ? 'var(--ns-glass-xl-shadow)' : undefined,
              }}
            >
              <strong>{THEME_LABELS[theme]}</strong>
              <code>{token.cssVar}</code>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Every gradient paint style as a swatch. */
export function GradientSwatches() {
  return (
    <div className="sb-fd__tiles sb-unstyled">
      {tokensIn('gradient').map((token) => (
        <div key={token.cssVar} className="sb-fd__tile">
          <div className="sb-fd__gradient" style={{ background: token.ref }} />
          <code>{token.cssVar}</code>
        </div>
      ))}
    </div>
  );
}

/** Blur and glow values. */
export function BlurList() {
  const rows = [...tokensIn('effects.blur'), ...tokensIn('glow')];
  return (
    <div className="sb-fd sb-unstyled">
      {rows.map((token) => (
        <div key={token.cssVar} className="sb-fd__scale">
          <code className="sb-fd__name">{token.cssVar}</code>
          <span className="sb-fd__meta">{token.value}</span>
          <span className="sb-fd__meta">{token.description}</span>
        </div>
      ))}
    </div>
  );
}
