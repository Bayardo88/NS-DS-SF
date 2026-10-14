import { tokensIn } from './tokenData.js';
import './blocks.css';

/** Spacing scale as bars whose width is the token itself. */
export function SpacingScale() {
  return (
    <div className="sb-fd sb-unstyled">
      {tokensIn('spacing').map((token) => (
        <div key={token.cssVar} className="sb-fd__scale">
          <code className="sb-fd__name">{token.cssVar}</code>
          <span className="sb-fd__meta">{token.value}</span>
          <div className="sb-fd__bar" style={{ width: token.ref }} />
        </div>
      ))}
    </div>
  );
}

/** Corner radius tokens on a square. */
export function RadiusScale() {
  return (
    <div className="sb-fd__tiles sb-unstyled">
      {tokensIn('shape.radius').map((token) => (
        <div key={token.cssVar} className="sb-fd__tile">
          <div className="sb-fd__box" style={{ borderRadius: token.ref }} />
          <code>{token.cssVar}</code>
          <span className="sb-fd__meta">{token.value}</span>
        </div>
      ))}
    </div>
  );
}

/** Border width tokens as outlined squares. */
export function BorderWidthScale() {
  return (
    <div className="sb-fd__tiles sb-unstyled">
      {tokensIn('shape.border-width').map((token) => (
        <div key={token.cssVar} className="sb-fd__tile">
          <div className="sb-fd__box" style={{ borderWidth: token.ref, borderColor: 'var(--ns-color-border-strong)' }} />
          <code>{token.cssVar}</code>
          <span className="sb-fd__meta">{token.value}</span>
        </div>
      ))}
    </div>
  );
}

export interface SizeScaleProps {
  /** `icon` (width and height of icons) or `control` (height of buttons and fields). */
  kind: 'icon' | 'control';
}

/** Size tokens: squares for icons, full-width bars at the control height for controls. */
export function SizeScale({ kind }: SizeScaleProps) {
  return (
    <div className="sb-fd__tiles sb-unstyled">
      {tokensIn(`size.${kind}`).map((token) => (
        <div key={token.cssVar} className="sb-fd__tile">
          <div
            className="sb-fd__box"
            style={kind === 'icon' ? { width: token.ref, height: token.ref } : { width: '100%', height: token.ref }}
          />
          <code>{token.cssVar}</code>
          <span className="sb-fd__meta">{token.value}</span>
        </div>
      ))}
    </div>
  );
}
