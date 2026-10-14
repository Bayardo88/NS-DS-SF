// Reads tokens/tokens.json (generated from Figma) for the Foundations pages: CSS names, values and
// per-theme aliases. Docs-only helper; never imported by the package.
import tokensJson from '../../../tokens/tokens.json';

type Json = { [key: string]: unknown };

export interface TokenEntry {
  /** Token key inside its group, e.g. `brand-hover` or `16`. */
  key: string;
  /** CSS custom property, e.g. `--ns-color-bg-brand-hover`. */
  cssVar: string;
  /** `var(--ns-…)` reference. */
  ref: string;
  /** Human-readable default value, e.g. `16px` or `blue/600`. */
  value: string;
  /** Per-mode aliases for multi-mode collections, e.g. `{ Light: 'blue/600', … }`. */
  modes?: Record<string, string>;
  description?: string;
}

const root = tokensJson as unknown as Json;

/** Returns the object at a dotted path in tokens.json. */
export function groupAt(path: string): Json {
  return path.split('.').reduce<Json>((node, part) => (node[part] ?? {}) as Json, root);
}

/** `{primitives.blue.600}` → `blue/600`. */
function aliasLabel(alias: string): string {
  return alias.replace(/^\{|\}$/g, '').replace(/^(primitives|palette)\./, '').replace(/\./g, '/');
}

/** Follows `{a.b.c}` aliases to a concrete `$value`. */
function resolveValue(value: unknown, depth = 0): unknown {
  if (typeof value === 'string' && value.startsWith('{') && depth < 10) {
    const target = groupAt(value.slice(1, -1));
    return resolveValue(target.$value, depth + 1);
  }
  return value;
}

function formatValue(raw: unknown): string {
  const value = resolveValue(raw);
  if (value && typeof value === 'object' && 'value' in value && 'unit' in value) {
    const dim = value as { value: number; unit: string };
    return `${dim.value}${dim.unit}`;
  }
  if (value && typeof value === 'object' && 'hex' in value) return String((value as { hex: string }).hex);
  if (typeof raw === 'string' && raw.startsWith('{')) return aliasLabel(raw);
  return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
}

function cssVarOf(node: Json): string | undefined {
  const ext = node.$extensions as Json | undefined;
  const figma = ext?.['com.figma'] as Json | undefined;
  const css = ext?.['com.nicasource.css'] as Json | undefined;
  const web = (figma?.codeSyntax as Json | undefined)?.WEB as string | undefined;
  if (web) return web.replace(/^var\(|\)$/g, '');
  return css?.customProperty as string | undefined;
}

/** Leaf tokens directly under a group path, in tokens.json order (which is Figma's order). */
export function tokensIn(path: string): TokenEntry[] {
  const group = groupAt(path);
  return Object.entries(group)
    .filter(([key, node]) => !key.startsWith('$') && node && typeof node === 'object' && '$value' in (node as Json))
    .map(([key, node]) => {
      const leaf = node as Json;
      const cssVar = cssVarOf(leaf) ?? `--ns-${path.replace(/\./g, '-')}-${key}`;
      const figma = (leaf.$extensions as Json | undefined)?.['com.figma'] as Json | undefined;
      const modes = figma?.modes as Record<string, string> | undefined;
      return {
        key,
        cssVar,
        ref: `var(${cssVar})`,
        value: formatValue(leaf.$value),
        modes: modes
          ? Object.fromEntries(Object.entries(modes).map(([mode, alias]) => [mode, aliasLabel(alias)]))
          : undefined,
        description: (leaf.$description as string | undefined) ?? (figma?.description as string | undefined),
      };
    });
}

export interface TextStyleEntry {
  className: string;
  figmaName: string;
  font: string;
}

/** Every text style with its Figma name, in Figma order. */
export function textStyleEntries(): TextStyleEntry[] {
  const out: TextStyleEntry[] = [];
  const walk = (node: Json) => {
    if ('$value' in node) {
      const ext = node.$extensions as Json;
      const figma = ext['com.figma'] as Json;
      const fontName = figma.fontName as { family: string; style: string } | undefined;
      out.push({
        className: (ext['com.nicasource.css'] as Json).className as string,
        figmaName: figma.textStyle as string,
        font: fontName ? `${fontName.family} ${fontName.style}` : '',
      });
      return;
    }
    for (const [key, child] of Object.entries(node)) {
      if (!key.startsWith('$') && child && typeof child === 'object') walk(child as Json);
    }
  };
  walk(groupAt('text-style'));
  return out;
}
