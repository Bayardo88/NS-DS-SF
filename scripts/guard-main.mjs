#!/usr/bin/env node
/**
 * Claude Code PreToolUse hook (see .claude/settings.json): stops AI agents from committing to
 * or pushing to `main` / `master`.
 *
 * Reads the hook payload from stdin:
 *   { "hook_event_name": "PreToolUse", "tool_name": "Bash", "cwd": "...",
 *     "tool_input": { "command": "git push origin main" } }
 *
 * Exit 0  → allow the command.
 * Exit 2  → block it; stderr is shown to the agent as the reason.
 *
 * Blocks:
 *   - `git commit …` while the current branch is main/master (or after a `git checkout main` /
 *     `git switch main` earlier in the same command line)
 *   - `git push` whose destination is main/master: `origin main`, `HEAD:main`, `+main`,
 *     `x:refs/heads/main`, `:main` (delete), `--force … main`, `--all`, `--mirror`
 *   - a bare `git push` / `git push origin` while the current branch is main/master
 *
 * There is deliberately no bypass for agents. Release maintainers push tags or merge PRs themselves.
 *
 * Self-test: node scripts/guard-main.mjs --test
 */
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const PROTECTED = new Set(['main', 'master']);

const HELP =
  'Work on a branch and open a pull request instead:\n' +
  '  git switch -c feature/<short-name>   # or fix/, chore/, tokens/, docs/\n' +
  '  git push -u origin HEAD\n' +
  '  gh pr create --fill\n' +
  'See CONTRIBUTING.md › Branches and CLAUDE.md › Git.';

/** Splits a shell command line into simple commands on ; && || | & and newlines (quote-aware). */
export function splitCommands(line) {
  const out = [];
  let cur = '';
  let quote = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quote) {
      if (c === quote) quote = null;
      else if (c === '\\' && quote === '"') cur += c + (line[++i] ?? '');
      else cur += c;
      if (quote === null) cur += c;
      continue;
    }
    if (c === "'" || c === '"') { quote = c; cur += c; continue; }
    if (c === '\\') { cur += c + (line[++i] ?? ''); continue; }
    if (c === ';' || c === '\n' || c === '|' || c === '&' || c === '(' || c === ')') {
      out.push(cur);
      cur = '';
      continue;
    }
    cur += c;
  }
  out.push(cur);
  return out.map((s) => s.trim()).filter(Boolean);
}

/** Tokenizes one simple command into words, removing quotes. */
export function words(cmd) {
  const out = [];
  const re = /"((?:[^"\\]|\\.)*)"|'([^']*)'|(\S+)/g;
  for (const m of cmd.matchAll(re)) out.push(m[1] ?? m[2] ?? m[3]);
  return out;
}

/** Parses `[ENV=x …] [sudo] git [-C dir] [-c k=v] <sub> args…`; returns null if not git. */
export function parseGit(cmd) {
  const w = words(cmd);
  let i = 0;
  while (i < w.length && (/^[A-Za-z_][A-Za-z0-9_]*=/.test(w[i]) || w[i] === 'sudo' || w[i] === 'env' || w[i] === 'command')) i++;
  if (!w[i] || !/(^|\/)git$/.test(w[i])) return null;
  i++;
  let dir = null;
  while (i < w.length && w[i].startsWith('-')) {
    if (w[i] === '-C') { dir = w[i + 1]; i += 2; continue; }
    if (w[i] === '-c' || w[i] === '--git-dir' || w[i] === '--work-tree') { i += 2; continue; }
    i++;
  }
  return { sub: w[i], args: w.slice(i + 1), dir };
}

/** Destination branch name of a push refspec, or null. */
export function refspecDestination(spec) {
  const s = spec.replace(/^\+/, '');
  const dst = s.includes(':') ? s.slice(s.lastIndexOf(':') + 1) : s;
  return dst.replace(/^refs\/heads\//, '');
}

function currentBranch(cwd) {
  // symbolic-ref also works on an unborn branch (a repo with no commits yet).
  try {
    return execFileSync('git', ['symbolic-ref', '--short', '-q', 'HEAD'], { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null; // detached HEAD or not a repository
  }
}

// Options of `git push` that take a separate value argument.
const PUSH_OPTS_WITH_VALUE = new Set(['--repo', '--receive-pack', '--exec', '-o', '--push-option', '--signed']);

/**
 * Returns a block reason for the whole command line, or null to allow it.
 * `branchOf(dir)` returns the current branch for a working directory (injectable for tests).
 */
export function check(commandLine, cwd, branchOf = currentBranch) {
  let switchedTo = null; // a `git checkout main` / `git switch main` earlier on the same line
  for (const cmd of splitCommands(commandLine)) {
    const git = parseGit(cmd);
    if (!git || !git.sub) continue;
    const dir = git.dir ? resolve(cwd, git.dir) : cwd;
    const branch = () => switchedTo ?? branchOf(dir);

    if (git.sub === 'checkout' || git.sub === 'switch') {
      const target = git.args.filter((a) => !a.startsWith('-')).at(-1);
      const creates = git.args.some((a) => ['-b', '-B', '-c', '-C', '--create', '--orphan'].includes(a));
      if (target && !creates) switchedTo = target;
      else if (creates && target) switchedTo = target;
      continue;
    }

    if (git.sub === 'commit') {
      const b = branch();
      if (b && PROTECTED.has(b)) {
        return `Blocked: \`git commit\` on \`${b}\`. Never commit to ${b} in this repo.`;
      }
      continue;
    }

    if (git.sub === 'push') {
      const positional = [];
      for (let i = 0; i < git.args.length; i++) {
        const a = git.args[i];
        if (a === '--all' || a === '--mirror' || a === '--branches') {
          return `Blocked: \`git push ${a}\` would update ${[...PROTECTED].join('/')}. Push your branch only.`;
        }
        if (PUSH_OPTS_WITH_VALUE.has(a)) { i++; continue; }
        if (a.startsWith('-')) continue;
        positional.push(a);
      }
      const [, ...refspecs] = positional; // first positional is the remote
      if (refspecs.length === 0) {
        // `git push` / `git push origin` pushes the current branch (push.default=simple/current).
        const b = branch();
        if (b && PROTECTED.has(b)) return `Blocked: \`git push\` from \`${b}\` would push to ${b}.`;
        continue;
      }
      for (const spec of refspecs) {
        if (spec.startsWith('refs/tags/') || /^v\d/.test(spec)) continue; // tags are fine
        const dst = spec === 'HEAD' ? branch() : refspecDestination(spec);
        if (dst && PROTECTED.has(dst)) return `Blocked: \`git push … ${spec}\` targets \`${dst}\`.`;
      }
    }
  }
  return null;
}

function selfTest() {
  const on = (b) => () => b;
  const cases = [
    // [command, branch, shouldBlock]
    ['git push origin main', 'feature/x', true],
    ['git push origin HEAD:main', 'feature/x', true],
    ['git push --force origin main', 'feature/x', true],
    ['git push -f origin +main', 'feature/x', true],
    ['git push origin feature/x:refs/heads/main', 'feature/x', true],
    ['git push origin :main', 'feature/x', true],
    ['git push origin master', 'feature/x', true],
    ['git push --all origin', 'feature/x', true],
    ['git push', 'main', true],
    ['git push -u origin HEAD', 'main', true],
    ['git commit -m "x"', 'main', true],
    ['npm run verify && git commit -am "x"', 'main', true],
    ['git checkout main && git commit -m x', 'feature/x', true],
    ['cd repo; git -C . push origin main', 'feature/x', true],
    ['git push origin feature/x', 'feature/x', false],
    ['git push -u origin HEAD', 'feature/x', false],
    ['git push', 'feature/x', false],
    ['git push origin v0.1.0', 'main', false],
    ['git push origin refs/tags/v0.1.0', 'main', false],
    ['git commit -m "fix main menu"', 'feature/x', false],
    ['git switch -c feature/y && git commit -m x', 'main', false],
    ['git checkout main && git pull', 'feature/x', false],
    ['echo "git push origin main"', 'feature/x', false],
    ['git log main..HEAD', 'main', false],
    ['ls -la', 'main', false],
  ];
  let failed = 0;
  for (const [cmd, b, expected] of cases) {
    const got = check(cmd, process.cwd(), on(b)) !== null;
    const ok = got === expected;
    if (!ok) failed++;
    console.log(`${ok ? 'ok  ' : 'FAIL'}  [${b}] ${cmd}  → ${got ? 'block' : 'allow'}`);
  }
  console.log(failed ? `\n${failed} failing case(s)` : `\nall ${cases.length} cases pass`);
  process.exit(failed ? 1 : 0);
}

async function main() {
  if (process.argv.includes('--test')) return selfTest();
  let raw = '';
  for await (const chunk of process.stdin) raw += chunk;
  let payload;
  try {
    payload = JSON.parse(raw || '{}');
  } catch {
    process.exit(0); // never break the session on malformed input
  }
  if (payload.tool_name && payload.tool_name !== 'Bash') process.exit(0);
  const command = payload.tool_input?.command;
  if (typeof command !== 'string' || !/\bgit\b/.test(command)) process.exit(0);

  const reason = check(command, payload.cwd || process.cwd());
  if (reason) {
    process.stderr.write(`${reason}\n${HELP}\n`);
    process.exit(2);
  }
  process.exit(0);
}

main();
