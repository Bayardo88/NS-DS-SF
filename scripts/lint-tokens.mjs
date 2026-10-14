#!/usr/bin/env node
/**
 * Token-contract linter for @nicasource/ds. No dependencies.
 *
 * Enforces the parts of AI-GUIDE.md and docs/component-contract.md a reviewer can't reliably
 * check by eye:
 *
 *   R2  No raw colors in component CSS: hex, rgb()/rgba(), hsl()/hsla().
 *   R3  No raw px in component CSS other than 0 and 1px hairlines (px inside @media / @container
 *       preludes is allowed: breakpoints aren't tokens).
 *   R1  No primitive color tokens (--ns-color-<ramp>-<n>, --ns-color-base-*, --ns-color-alpha-*)
 *       and no brand palettes (--ns-palette-*) in components, except Logo and NSMark.
 *   R2  No hex / rgb() / hsl() colors inside JSX `style={{ … }}` objects in src/components.
 *   --  Every var(--ns-…) reference resolves to a declared custom property (catches typos).
 *
 * Usage:
 *   node scripts/lint-tokens.mjs            lint src/components (and resolve refs in src/, docs/storybook/)
 *   node scripts/lint-tokens.mjs <dir>      lint <dir> as if it were src/components (used to test the linter)
 *
 * Exits 1 and prints file:line for every violation.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = process.argv[2] ? resolve(process.argv[2]) : join(root, 'src/components');

/** Components whose colors are fixed brand colors by design (AI-GUIDE R1 exception). */
const BRAND_EXCEPTIONS = ['Logo', 'NSMark'];

const PRIMITIVE_RAMPS = 'red|blue|golden|cream|gray|orange|green|night|slate|coral|honey';
const PRIMITIVE_RE = new RegExp(`--ns-color-(?:(?:${PRIMITIVE_RAMPS})-\\d+|base-[a-z]+|alpha-[a-z0-9-]+)\\b`, 'g');
const PALETTE_RE = /--ns-palette-[a-z0-9-]+/g;
const HEX_RE = /(^|[\s:,(])(#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4}))\b/g;
const COLOR_FN_RE = /\b(?:rgba?|hsla?)\(/g;
const PX_RE = /(^|[^\w.-])(-?\d*\.?\d+)px\b/g;
const ALLOWED_PX = new Set([0, 1]);
const VAR_RE = /var\(\s*(--ns-[a-z0-9-]+)\s*(?=[),])/g;

const walk = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry);
        return statSync(full).isDirectory() ? walk(full) : [full];
      })
    : [];

/** Replaces comments with spaces, keeping newlines so line numbers stay right. */
const blankComments = (text, re) => text.replace(re, (c) => c.replace(/[^\n]/g, ' '));
const stripCss = (css) => blankComments(css, /\/\*[\s\S]*?\*\//g);
const stripTs = (ts) => blankComments(ts, /\/\*[\s\S]*?\*\/|(^|[^:])\/\/[^\n]*/g);
const lineOf = (text, index) => text.slice(0, index).split('\n').length;
const rel = (file) => relative(root, file).split(sep).join('/');
const isBrandException = (file) =>
  BRAND_EXCEPTIONS.some((name) => rel(file).includes(`/${name}/`) || file.includes(`${sep}${name}${sep}`));

/* ---------- Declared custom properties (what a var() may reference) ---------- */
const declared = new Set();
const declarationSources = [
  join(root, 'tokens/css/tokens.css'),
  join(root, 'tokens/css/text-styles.css'),
  join(root, 'src/styles/base.css'),
  ...walk(join(root, 'src')).filter((f) => f.endsWith('.css')),
  ...walk(componentsDir).filter((f) => f.endsWith('.css')),
];
for (const file of declarationSources) {
  if (!existsSync(file)) continue;
  for (const m of stripCss(readFileSync(file, 'utf8')).matchAll(/(--ns-[a-z0-9-]+)\s*:/g)) declared.add(m[1]);
}
const tokenCount = [...declared].length;

const errors = [];
const report = (file, line, message) => errors.push({ where: `${rel(file)}:${line}`, message });

/* ---------- Component CSS ---------- */
const componentFiles = walk(componentsDir);

for (const file of componentFiles.filter((f) => extname(f) === '.css')) {
  const css = stripCss(readFileSync(file, 'utf8'));
  const brand = isBrandException(file);

  css.split('\n').forEach((rawLine, i) => {
    const line = i + 1;
    // Only look at declaration values: drop a selector before `{` on the same line.
    const text = rawLine.includes('{') ? rawLine.slice(rawLine.lastIndexOf('{') + 1) : rawLine;
    const isAtRulePrelude = /@(?:media|container|supports)\b/.test(rawLine);

    for (const m of text.matchAll(HEX_RE)) {
      report(file, line, `raw hex color "${m[2]}"; use a semantic --ns-color-* token (R2)`);
    }
    for (const m of text.matchAll(COLOR_FN_RE)) {
      report(file, line, `raw color function "${m[0]}…)"; use a semantic --ns-color-* token (R2)`);
    }
    if (!isAtRulePrelude) {
      for (const m of text.matchAll(PX_RE)) {
        if (!ALLOWED_PX.has(Math.abs(Number(m[2])))) {
          report(file, line, `raw px value "${m[2]}px"; use a spacing/size/radius/border-width token (R3)`);
        }
      }
    }
    if (!brand) {
      for (const m of rawLine.matchAll(PRIMITIVE_RE)) {
        report(file, line, `primitive token ${m[0]}; use a semantic --ns-color-{bg,text,border,icon}-* token (R1)`);
      }
      for (const m of rawLine.matchAll(PALETTE_RE)) {
        report(file, line, `brand palette ${m[0]} outside Logo/NSMark; use a semantic token (R1)`);
      }
    }
  });
}

/* ---------- Component TSX: inline style colors and primitives ---------- */
for (const file of componentFiles.filter((f) => extname(f) === '.tsx')) {
  const text = stripTs(readFileSync(file, 'utf8'));
  const brand = isBrandException(file);
  for (const m of text.matchAll(/style=\{\{([\s\S]*?)\}\}/g)) {
    const body = m[1];
    const start = m.index + m[0].indexOf(body);
    for (const c of body.matchAll(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b|\b(?:rgba?|hsla?)\(/g)) {
      report(file, lineOf(text, start + c.index), `raw color "${c[0]}" in inline style; use a semantic token (R2)`);
    }
    if (!brand) {
      for (const c of body.matchAll(PRIMITIVE_RE)) {
        report(file, lineOf(text, start + c.index), `primitive token ${c[0]} in inline style (R1)`);
      }
      for (const c of body.matchAll(PALETTE_RE)) {
        report(file, lineOf(text, start + c.index), `brand palette ${c[0]} in inline style outside Logo/NSMark (R1)`);
      }
    }
  }
}

/* ---------- Unresolved var(--ns-…) references ---------- */
const referenceFiles = [
  ...componentFiles,
  ...(process.argv[2] ? [] : walk(join(root, 'src')).filter((f) => !f.startsWith(componentsDir))),
  ...(process.argv[2] ? [] : walk(join(root, 'docs/storybook'))),
].filter((f) => ['.css', '.ts', '.tsx', '.mdx'].includes(extname(f)));

for (const file of new Set(referenceFiles)) {
  const raw = readFileSync(file, 'utf8');
  const text = extname(file) === '.css' ? stripCss(raw) : raw;
  // VAR_RE needs `)` or `,` after the name, so a template literal such as
  // `var(--ns-size-icon-${size})` isn't read as a static reference.
  for (const m of text.matchAll(VAR_RE)) {
    if (!declared.has(m[1])) report(file, lineOf(text, m.index), `var(${m[1]}) is not defined in tokens.css, text-styles.css or a component stylesheet`);
  }
}

if (errors.length) {
  console.error(`lint:tokens: ${errors.length} token-contract violation(s)\n`);
  for (const e of errors) console.error(`  ${e.where}  ${e.message}`);
  console.error('\nSee AI-GUIDE.md §2 (hard rules) and §4 (decision tables).');
  process.exit(1);
}
const cssCount = componentFiles.filter((f) => f.endsWith('.css')).length;
console.log(`lint:tokens: OK (${cssCount} component stylesheet(s), ${tokenCount} declared custom properties, all references resolve)`);
