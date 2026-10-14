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
  'Public Sans': ['system-ui', 'sans-serif'],
};

const GROUP = {
  Primitives: 'primitives',
  Color: 'color',
  Spacing: 'spacing',
  Shape: 'shape',
  Size: 'size',
  Typography: 'typography',
  Effects: 'effects',
};

// The first mode of every collection is the :root default. Each other mode needs an
// entry here saying where its overrides go; an unmapped mode fails the build.
//   selector  rule that applies the mode explicitly
//   media     [query, selector, note] rule that applies it from a media query
//   changed   only emit variables whose value differs from the default mode
const MODE_CSS = {
  Color: {
    Dark: {
      selector: '[data-theme="dark"]',
      media: ['(prefers-color-scheme: dark)', ':root:not([data-theme])', 'system preference, when no data-theme is set'],
    },
    'Web 2025': { selector: '[data-theme="web-2025"]' },
  },
  Typography: {
    Mobile: { media: ['(max-width: 767px)', ':root', 'viewports up to 767px'], changed: true },
  },
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

const defaultValue = (t) => t.values[t.modes[0]];

const primitiveByHex = new Map();
for (const t of tokens) {
  const value = defaultValue(t);
  if (t.collection === 'Primitives' && typeof value === 'string' && !primitiveByHex.has(value)) {
    primitiveByHex.set(value, t);
  }
}
// Style colors are either bound variables ("@…") or literals; literals that equal
// a primitive are expressed as references to it.
const styleColor = (raw) => resolveAlias(raw) || primitiveByHex.get(raw) || null;

// Effect styles are named <Group>/<Key> and become DTCG tokens at <group>.<key>.
// Shadow styles map to box-shadow; a single blur maps to a CSS blur() filter value.
const isShadow = (e) => e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW';
const BLUR_PROPERTY = { BACKGROUND_BLUR: 'backdrop-filter', LAYER_BLUR: 'filter' };
const effectStyle = effects.map((s) => {
  const [groupName, ...rest] = s.name.split('/');
  const group = kebab(groupName);
  const key = kebab(rest.join('-'));
  const css = /^var\(--[a-z0-9-]+\)$/.test(s.description) ? cssName(s.description) : `--ns-${group}-${key}`;
  const base = { group, groupName, key, style: s.name, description: s.description, css };
  if (s.effects.every(isShadow)) return { ...base, kind: 'shadow', layers: s.effects };
  if (s.effects.length === 1 && BLUR_PROPERTY[s.effects[0].type]) {
    const { type, radius } = s.effects[0];
    return { ...base, kind: 'blur', effectType: type, cssProperty: BLUR_PROPERTY[type], radius };
  }
  throw new Error(`Unsupported effect combination in ${s.name}`);
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
  ExtraLight: 'extralight',
  Light: 'light',
  Regular: 'regular',
  Medium: 'medium',
  SemiBold: 'semibold',
  'Demi Bold': 'semibold',
  Bold: 'bold',
  Heavy: 'heavy',
  Black: 'black',
};
const FAMILY_BY_GROUP = { Primary: 'font-family/primary', Secondary: 'font-family/secondary', Web: 'font-family/web' };

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
  // Guard against the snapshot and the referenced variables drifting apart. Figma
  // shows text styles in the default (Desktop) mode.
  const resolved = defaultValue;
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

for (const e of effectStyle) {
  const figmaExt = { effectStyle: e.style, description: e.description };
  if (e.kind === 'shadow') {
    setPath(json, [e.group, e.key], {
      $type: 'shadow',
      $value: e.layers.map((l) => ({
        color: styleColor(l.color) ? ref(styleColor(l.color)) : toDtcgColor(l.color),
        offsetX: px(l.x),
        offsetY: px(l.y),
        blur: px(l.blur),
        spread: px(l.spread),
        inset: l.type === 'INNER_SHADOW',
      })),
      $extensions: { 'com.figma': figmaExt, 'com.nicasource.css': { customProperty: e.css } },
    });
  } else {
    // DTCG has no filter type: the token is the blur radius, the CSS wraps it in blur().
    const radius = resolveAlias(e.radius);
    setPath(json, [e.group, e.key], {
      $type: 'dimension',
      $value: radius ? ref(radius) : px(e.radius),
      $extensions: {
        'com.figma': { ...figmaExt, effectType: e.effectType },
        'com.nicasource.css': { customProperty: e.css, property: e.cssProperty, function: 'blur' },
      },
    });
  }
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
  if (s.standIn) figmaExt.standInFor = defaultValue(s.parts.fontFamily);
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

const SECTIONS = [
  ['Primitives', 'Primitives — raw palette; prefer semantic tokens in components'],
  ['Color', 'Semantic color'],
  ['Spacing', 'Spacing'],
  ['Shape', 'Shape — radius and border width'],
  ['Size', 'Size — icons and controls'],
  ['Typography', 'Typography'],
  ['Effects', 'Effects — blur radii'],
];
for (const c of Object.keys(snapshot.collections)) {
  if (!SECTIONS.some(([name]) => name === c)) throw new Error(`No CSS section for collection ${c}`);
}

// color-scheme follows the lightness of each mode's canvas color.
const resolveColor = (t, mode) => {
  let raw = t.values[mode];
  for (let alias = resolveAlias(raw); alias; alias = resolveAlias(raw)) raw = defaultValue(alias);
  return typeof raw === 'string' ? raw : raw.hex;
};
const canvas = byFigmaRef.get('Color/bg/canvas');
const colorScheme = (mode) => {
  const [r, g, b] = parseHex(resolveColor(canvas, mode));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.5 ? 'dark' : 'light';
};

const rootLines = [`  color-scheme: ${colorScheme(snapshot.collections.Color.modes[0])};`, ''];
const modeBlocks = []; // { comment, selector, media?, lines }
for (const [collection, title] of SECTIONS) {
  const group = tokens.filter((t) => t.collection === collection);
  for (const t of group) {
    if (cssNames.has(t.css)) throw new Error(`Duplicate CSS name ${t.css}`);
    cssNames.add(t.css);
  }
  const [defaultMode, ...otherModes] = snapshot.collections[collection].modes;
  const label = otherModes.length ? ` — ${defaultMode.toLowerCase()} (default)` : '';
  rootLines.push(...section(title + label, group.map((t) => decl(t.css, cssValue(t, defaultValue(t))))));

  for (const mode of otherModes) {
    const config = MODE_CSS[collection]?.[mode];
    if (!config) throw new Error(`No CSS output configured for ${collection} mode "${mode}"`);
    const changed = group.filter((t) => !config.changed || cssValue(t, t.values[mode]) !== cssValue(t, defaultValue(t)));
    const lines = changed.map((t) => decl(t.css, cssValue(t, t.values[mode]), ''));
    if (collection === 'Color') lines.unshift(`color-scheme: ${colorScheme(mode)};`);
    const what = `${title} — ${mode.toLowerCase()}`;
    if (config.selector) modeBlocks.push({ comment: `${what} (explicit opt-in)`, selector: config.selector, lines });
    if (config.media) {
      const [query, selector, note] = config.media;
      const only = config.changed ? `; only the ${changed.length} values that differ` : '';
      modeBlocks.push({ comment: `${what} (${note}${only})`, media: query, selector, lines });
    }
  }
}

const len = (n) => (n === 0 ? '0' : `${n}px`);
const shadowCss = (l) => {
  const c = styleColor(l.color);
  const color = c ? `var(${c.css})` : toCssColor(l.color);
  return `${l.type === 'INNER_SHADOW' ? 'inset ' : ''}${[l.x, l.y, l.blur, l.spread].map(len).join(' ')} ${color}`;
};
const effectCss = (e) => {
  if (e.kind === 'shadow') return e.layers.map(shadowCss).join(', ');
  const radius = resolveAlias(e.radius);
  return `blur(${radius ? `var(${radius.css})` : len(e.radius)})`;
};
const effectGroups = [...new Set(effectStyle.map((e) => e.group))];
for (const group of effectGroups) {
  const styles = effectStyle.filter((e) => e.group === group);
  const props = [...new Set(styles.map((e) => (e.kind === 'shadow' ? 'box-shadow' : e.cssProperty)))];
  rootLines.push(...section(`${styles[0].groupName} — for ${props.join(', ')}`, styles.map((e) => decl(e.css, effectCss(e)))));
}

const gradientCss = (g) => {
  const stops = g.stops.map((s) => {
    const c = styleColor(s.color);
    return `${c ? `var(${c.css})` : toCssColor(s.color)} ${round(s.position * 100, 2)}%`;
  });
  return `linear-gradient(${g.angle}deg, ${stops.join(', ')})`;
};
rootLines.push(...section('Gradient', gradient.map((g) => decl(g.css, gradientCss(g)))));
for (const e of [...effectStyle, ...gradient]) {
  if (cssNames.has(e.css)) throw new Error(`Duplicate CSS name ${e.css}`);
  cssNames.add(e.css);
}
while (rootLines.at(-1) === '') rootLines.pop();

const indent = (lines, pad) => lines.map((l) => pad + l).join('\n');
const blockCss = (b) =>
  b.media
    ? `/* ${b.comment} */\n@media ${b.media} {\n  ${b.selector} {\n${indent(b.lines, '    ')}\n  }\n}`
    : `/* ${b.comment} */\n${b.selector} {\n${indent(b.lines, '  ')}\n}`;

const tokensCss = `${header()}
:root {
${rootLines.join('\n')}
}

${modeBlocks.map(blockCss).join('\n\n')}
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
console.log(`Effect styles: ${effectStyle.length}, gradients: ${gradient.length}, text styles: ${textStyle.length}`);
console.log(`CSS custom properties: ${cssNames.size}`);
