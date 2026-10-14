#!/usr/bin/env node
// Builds dist/styles.css: tokens, text styles, base layer, then every component stylesheet
// (src/components/*/*.css, alphabetical). Components never import their CSS from TS, so the
// package works in any bundler and in plain <link> setups.
import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = join(root, 'src/components');
const componentCss = readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()
  .flatMap((name) =>
    readdirSync(join(componentsDir, name))
      .filter((f) => f.endsWith('.css'))
      .sort()
      .map((f) => `src/components/${name}/${f}`),
  );

const parts = ['tokens/css/tokens.css', 'tokens/css/text-styles.css', 'src/styles/base.css', ...componentCss];
const css = parts
  .filter((p) => existsSync(join(root, p)))
  .map((p) => `/* ${p} */\n${readFileSync(join(root, p), 'utf8')}`)
  .join('\n\n');
mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/styles.css'), css);
console.log(`dist/styles.css: ${parts.length} files, ${(css.length / 1024).toFixed(1)} KB`);
