#!/usr/bin/env node
// Points git at .githooks/ so the main-branch guard runs for every contributor.
// Runs from `prepare`; does nothing when the package is installed as a dependency
// (no .git here) so consumers are never affected.
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
if (!existsSync(join(root, '.git')) || !existsSync(join(root, '.githooks'))) process.exit(0);
try {
  execSync('git config core.hooksPath .githooks', { cwd: root, stdio: 'ignore' });
  console.log('git hooks: core.hooksPath -> .githooks (main is protected locally)');
} catch {
  // Not fatal: CI and branch protection still guard main.
}
