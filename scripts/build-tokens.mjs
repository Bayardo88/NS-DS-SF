#!/usr/bin/env node
// Builds the code tokens from the Figma snapshot in tokens/figma/.
//
//   tokens/figma/*.json  ->  tokens/tokens.json           (W3C DTCG 2025.10)
//                        ->  tokens/css/tokens.css        (custom properties)
//                        ->  tokens/css/text-styles.css   (text-style utility classes)
//
// CSS custom property names come from each Figma variable's WEB code syntax
// (`var(--ns-…)`), so code and Figma stay 1:1. Usage: node scripts/build-tokens.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const write = (p, s) => {
  mkdirSync(dirname(join(root, p)), { recursive: true });
  writeFileSync(join(root, p), s);
};

const snapshot = read('tokens/figma/variables.json');
const { effects, gradients } = read('tokens/figma/effects.json');
const { textStyles } = read('tokens/figma/text-styles.json');

// CSS-only fallback stacks appended after the Figma family. Plus Jakarta Sans is
// the stand-in Figma uses until Greycliff CF is installed.
const FONT_FALLBACKS = {
  'Fira Code': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  'Greycliff CF': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
};

const GROUP = {
  Primitives: 'primitives',
  Color: 'color',
  Spacing: 'spacing',
  Shape: 'shape',
  Size: 'size',
  Typography: 'typography',
};

const kebab = (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const round = (n, d = 4) => Math.round(n * 10 ** d) / 10 ** d;
const cssName = (codeSyntax) => {
  const m = /^var\((--[a-z0-9-]+)\)$/.exec(codeSyntax);
  if (!m) throw new Error(`Unexpected code syntax: ${codeSyntax}`);
  return m[1];
};

// ---------------------------------------------------------------------------
// Variables -> flat token list

const tokens = []; // { path, collection, name, type, scopes, css, values: { mode: raw } }
const byFigmaRef = new Map(); // "Collection/name" -> token

for (const [collection, { modes, variables }] of Object.entries(snapshot.collections)) {
  const group = GROUP[collection];
  if (!group) throw new Error(`No DTCG group for collection ${collection}`);
  for (const [name, type, codeSyntax, scopes, valuesByMode] of variables) {
    const segments = name.split('/').map(kebab);
    if (segments[0] === group) segments.shift(); // spacing/spacing/8 -> spacing/8
    const token = {
      path: [group, ...segments],
      collection,
      name,
      type,
      scopes,
      css: cssName(codeSyntax),
      codeSyntax,
      values: Object.fromEntries(modes.map((m, i) => [m, valuesByMode[i]])),
      modes,
    };
    tokens.push(token);
    byFigmaRef.set(`${collection}/${name}`, token);
  }
}

const resolveAlias = (value) => {
  if (typeof value !== 'string' || !value.startsWith('@')) return null;
  const target = byFigmaRef.get(value.slice(1));
  if (!target) throw new Error(`Unresolved alias ${value}`);
  return target;
};

const dtcgType = (t) => {
  if (t.type === 'COLOR') return 'color';
  if (t.type === 'STRING' && t.scopes.includes('FONT_FAMILY')) return 'fontFamily';
  if (t.type === 'FLOAT' && t.scopes.includes('FONT_WEIGHT')) return 'fontWeight';
  if (t.type === 'FLOAT') return 'dimension';
  throw new Error(`No DTCG type for ${t.collection}/${t.name}`);
};

const parseHex = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
const toDtcgColor = (raw) => {
  const hex = typeof raw === 'string' ? raw : raw.hex;
  const alpha = typeof raw === 'string' ? 1 : raw.alpha;
  const color = { colorSpace: 'srgb', components: parseHex(hex).map((c) => round(c)) };
  if (alpha !== 1) color.alpha = alpha;
  color.hex = hex;
  return color;
};
const toCssColor = (raw) => {
  if (typeof raw === 'string') return raw;
  const [r, g, b] = parseHex(raw.hex).map((c) => Math.round(c * 255));
  return `rgb(${r} ${g} ${b} / ${raw.alpha})`;
};

const ref = (t) => `{${t.path.join('.')}}`;
const px = (n) => ({ value: n, unit: 'px' });

const dtcgValue = (t, raw) => {
  const alias = resolveAlias(raw);
  if (alias) return ref(alias);
  switch (dtcgType(t)) {
    case 'color': return toDtcgColor(raw);
    case 'dimension': return px(raw);
    default: return raw;
  }
};

const cssValue = (t, raw) => {
  const alias = resolveAlias(raw);
  if (alias) return `var(${alias.css})`;
  switch (dtcgType(t)) {
    case 'color': return toCssColor(raw);
    case 'dimension': return `${raw}px`;
    case 'fontFamily': return [raw, ...(FONT_FALLBACKS[raw] || [])].map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', ');
    default: return String(raw);
  }
};

// ---------------------------------------------------------------------------
// Styles

const primitiveByHex = new Map();
for (const t of tokens) {
  if (t.collection === 'Primitives' && typeof t.values.Value === 'string' && !primitiveByHex.has(t.values.Value)) {
    primitiveByHex.set(t.values.Value, t);
  }
}
// Style colors are either bound variables ("@…") or literals; literals that equal
// a primitive are expressed as references to it.
const styleColor = (raw) => resolveAlias(raw) || primitiveByHex.get(raw) || null;

const elevation = effects
  .filter((s) => s.name.startsWith('Elevation/'))
  .map((s) => {
    const key = kebab(s.name.slice('Elevation/'.length));
    const css = s.description && /^var\(--/.test(s.description) ? cssName(s.description) : `--ns-elevation-${key}`;
    const layers = s.effects.filter((e) => e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW');
    return { key, style: s.name, description: s.description, css, layers };
  });

// Figma's gradientTransform maps node space to gradient space, where the gradient
// runs from (0, 0.5) to (1, 0.5). Invert it to get the direction in node space.
const gradientAngle = ([[a, b, c], [d, e, f]]) => {
  const det = a * e - b * d;
  const inv = (x, y) => [(e * (x - c) - b * (y - f)) / det, (a * (y - f) - d * (x - c)) / det];
  const [x0, y0] = inv(0, 0.5);
  const [x1, y1] = inv(1, 0.5);
  const deg = (Math.atan2(x1 - x0, -(y1 - y0)) * 180) / Math.PI;
  return round((deg + 360) % 360, 2);
};

const gradient = gradients.map((g) => {
  if (g.type !== 'GRADIENT_LINEAR') throw new Error(`Unsupported gradient type ${g.type} in ${g.name}`);
  const key = kebab(g.name.replace(/^Gradient\//, ''));
  return { key, style: g.name, css: `--ns-gradient-${key}`, angle: gradientAngle(g.transform), stops: g.stops, transform: g.transform };
});

const WEIGHT_BY_STYLE = {
  Regular: 'regular',
  Medium: 'medium',
  SemiBold: 'semibold',
  'Demi Bold': 'semibold',
  Bold: 'bold',
  Heavy: 'heavy',
};
const FAMILY_BY_GROUP = { Primary: 'font-family/primary', Secondary: 'font-family/secondary' };

const textStyle = textStyles.map(([name, family, fontStyle, fontSize, lineHeight, letterSpacing, bound]) => {
  const [groupName, size, weightName] = name.split('/');
  const weight = WEIGHT_BY_STYLE[weightName];
  if (!weight || !FAMILY_BY_GROUP[groupName]) throw new Error(`Cannot map text style ${name}`);
  const typo = (n) => {
    const t = byFigmaRef.get(`Typography/${n}`);
    if (!t) throw new Error(`Text style ${name} needs missing variable Typography/${n}`);
    return t;
  };
  const sizeKey = kebab(size);
  const pick = (prop, fallback) => resolveAlias(bound[prop]) || typo(fallback);
  const parts = {
    fontFamily: pick('fontFamily', FAMILY_BY_GROUP[groupName]),
    fontSize: pick('fontSize', `font-size/${sizeKey}`),
    fontWeight: typo(`font-weight/${weight}`),
    lineHeight: pick('lineHeight', `line-height/${sizeKey}`),
    letterSpacing: pick('letterSpacing', 'letter-spacing/default'),
  };
  // Guard against the snapshot and the referenced variables drifting apart.
  const resolved = (t) => t.values[t.modes[0]];
  if (resolved(parts.fontSize) !== fontSize || resolved(parts.lineHeight) !== lineHeight || resolved(parts.letterSpacing) !== letterSpacing) {
    throw new Error(`Text style ${name} does not match its typography variables`);
  }
  const standIn = family !== resolved(parts.fontFamily);
  return {
    path: [kebab(groupName), sizeKey, kebab(weightName)],
    name,
    className: `ns-text-${kebab(groupName)}-${sizeKey}-${kebab(weightName)}`,
    parts,
    figmaFont: { family, style: fontStyle },
    standIn,
  };
});

// ---------------------------------------------------------------------------
// tokens.json (DTCG)

const json = {
  $description:
    'NicaSource Design System V2 tokens. Generated from Figma file JdINnstfRHeLRPZjeEla4U by scripts/build-tokens.mjs — do not edit by hand.',
};
const setPath = (obj, path, value) => {
  let node = obj;
  for (const seg of path.slice(0, -1)) node = node[seg] ??= {};
  if (node[path.at(-1)]) throw new Error(`Duplicate token path ${path.join('.')}`);
  node[path.at(-1)] = value;
};

for (const t of tokens) {
  const figmaExt = { collection: t.collection, variable: t.name, scopes: t.scopes, codeSyntax: { WEB: t.codeSyntax } };
  if (t.modes.length > 1) figmaExt.modes = Object.fromEntries(t.modes.map((m) => [m, dtcgValue(t, t.values[m])]));
  setPath(json, t.path, {
    $type: dtcgType(t),
    $value: dtcgValue(t, t.values[t.modes[0]]),
    $extensions: { 'com.figma': figmaExt },
  });
}

for (const e of elevation) {
  setPath(json, ['elevation', e.key], {
    $type: 'shadow',
    $value: e.layers.map((l) => ({
      color: styleColor(l.color) ? ref(styleColor(l.color)) : toDtcgColor(l.color),
      offsetX: px(l.x),
      offsetY: px(l.y),
      blur: px(l.blur),
      spread: px(l.spread),
      inset: l.type === 'INNER_SHADOW',
    })),
    $extensions: {
      'com.figma': { effectStyle: e.style, description: e.description },
      'com.nicasource.css': { customProperty: e.css },
    },
  });
}

for (const g of gradient) {
  setPath(json, ['gradient', g.key], {
    $type: 'gradient',
    $value: g.stops.map((s) => ({
      color: styleColor(s.color) ? ref(styleColor(s.color)) : toDtcgColor(s.color),
      position: s.position,
    })),
    $extensions: {
      'com.figma': { paintStyle: g.style, gradientTransform: g.transform },
      'com.nicasource.css': { customProperty: g.css, angle: `${g.angle}deg` },
    },
  });
}

for (const s of textStyle) {
  const figmaExt = { textStyle: s.name, fontName: s.figmaFont };
  if (s.standIn) figmaExt.standInFor = s.parts.fontFamily.values.Value;
  setPath(json, ['text-style', ...s.path], {
    $type: 'typography',
    $value: Object.fromEntries(Object.entries(s.parts).map(([k, t]) => [k, ref(t)])),
    $extensions: { 'com.figma': figmaExt, 'com.nicasource.css': { className: s.className } },
  });
}

write('tokens/tokens.json', JSON.stringify(json, null, 2) + '\n');

// ---------------------------------------------------------------------------
// CSS

const header = (...extra) => `/*
 * NicaSource Design System V2 — design tokens
 * Generated from Figma (file JdINnstfRHeLRPZjeEla4U) by scripts/build-tokens.mjs.
 * Do not edit by hand.${extra.map((l) => (l ? `\n * ${l}` : '\n *')).join('')}
 */
`;

const cssNames = new Set();
const decl = (name, value, indent = '  ') => `${indent}${name}: ${value};`;
const section = (title, lines, indent = '  ') => [`${indent}/* ${title} */`, ...lines, ''];

const rootLines = ['  color-scheme: light;', ''];
const darkLines = [];
for (const [collection, title] of [
  ['Primitives', 'Primitives — raw palette; prefer semantic tokens in components'],
  ['Color', 'Semantic color — light mode'],
  ['Spacing', 'Spacing'],
  ['Shape', 'Shape — radius and border width'],
  ['Size', 'Size — icons and controls'],
  ['Typography', 'Typography'],
]) {
  const group = tokens.filter((t) => t.collection === collection);
  for (const t of group) {
    if (cssNames.has(t.css)) throw new Error(`Duplicate CSS name ${t.css}`);
    cssNames.add(t.css);
  }
  rootLines.push(...section(title, group.map((t) => decl(t.css, cssValue(t, t.values[t.modes[0]])))));
  if (collection === 'Color') {
    for (const t of group) darkLines.push(decl(t.css, cssValue(t, t.values.Dark), '    '));
  }
}

const len = (n) => (n === 0 ? '0' : `${n}px`);
const shadowCss = (l) => {
  const c = styleColor(l.color);
  const color = c ? `var(${c.css})` : toCssColor(l.color);
  return `${l.type === 'INNER_SHADOW' ? 'inset ' : ''}${[l.x, l.y, l.blur, l.spread].map(len).join(' ')} ${color}`;
};
rootLines.push(...section('Elevation', elevation.map((e) => decl(e.css, e.layers.map(shadowCss).join(', ')))));

const gradientCss = (g) => {
  const stops = g.stops.map((s) => {
    const c = styleColor(s.color);
    return `${c ? `var(${c.css})` : toCssColor(s.color)} ${round(s.position * 100, 2)}%`;
  });
  return `linear-gradient(${g.angle}deg, ${stops.join(', ')})`;
};
rootLines.push(...section('Gradient', gradient.map((g) => decl(g.css, gradientCss(g)))));
for (const e of [...elevation, ...gradient]) {
  if (cssNames.has(e.css)) throw new Error(`Duplicate CSS name ${e.css}`);
  cssNames.add(e.css);
}
while (rootLines.at(-1) === '') rootLines.pop();

const darkBlock = (indent) => darkLines.map((l) => l.replace(/^ {4}/, indent)).join('\n');
const tokensCss = `${header()}
:root {
${rootLines.join('\n')}
}

/* Semantic color — dark mode (explicit opt-in) */
[data-theme="dark"] {
  color-scheme: dark;
${darkBlock('  ')}
}

/* Semantic color — dark mode (system preference, unless light is forced) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
${darkBlock('    ')}
  }
}
`;
write('tokens/css/tokens.css', tokensCss);

const textCss = `${header('', 'Text-style utility classes mirroring the Figma text styles. Requires tokens.css.')}
${textStyle
  .map((s) => {
    const p = s.parts;
    return `/* ${s.name} */
.${s.className} {
  font-family: var(${p.fontFamily.css});
  font-size: var(${p.fontSize.css});
  font-weight: var(${p.fontWeight.css});
  line-height: var(${p.lineHeight.css});
  letter-spacing: var(${p.letterSpacing.css});
}`;
  })
  .join('\n\n')}
`;
write('tokens/css/text-styles.css', textCss);

// ---------------------------------------------------------------------------
// Summary

const counts = Object.fromEntries(Object.keys(snapshot.collections).map((c) => [c, tokens.filter((t) => t.collection === c).length]));
console.log('Variables per collection:', counts, `(total ${tokens.length})`);
console.log(`Elevation: ${elevation.length}, gradients: ${gradient.length}, text styles: ${textStyle.length}`);
console.log(`CSS custom properties: ${cssNames.size}`);
