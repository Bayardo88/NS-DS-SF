# Contributing to @nicasource/ds

Three kinds of people change this repo: **developers**, **designers** and **AI agents**. Each has a
section below. The shared rules come first.

## Shared rules

| Rule | Detail |
| --- | --- |
| Figma is the source of truth | Tokens and component specs live in **Design System V2** (`JdINnstfRHeLRPZjeEla4U`). Code follows Figma, never the other way round. |
| Never commit or push to `main` | Every change goes through a branch and a pull request. Git hooks, a Claude Code hook and GitHub branch protection enforce this. |
| One review | Every PR needs one approving review from a code owner (`.github/CODEOWNERS`) and a green `verify` check. |
| The contract | [AI-GUIDE.md](AI-GUIDE.md) (rules, React checklist, token tables) and [docs/component-contract.md](docs/component-contract.md). |

### Branches

Branch from an up-to-date `main`:

```bash
git switch main && git pull
git switch -c feature/icon-button-loading
```

| Prefix | For | Example |
| --- | --- | --- |
| `feature/` | New component, prop or capability | `feature/site-footer` |
| `fix/` | Bug fix | `fix/textfield-error-announcement` |
| `tokens/` | Token update exported from Figma | `tokens/web-2025-honey-ramp` |
| `docs/` | Documentation and Storybook MDX only | `docs/foundations-effects` |
| `chore/` | Tooling, CI, dependencies, refactors with no API change | `chore/storybook-10-7` |

Use lowercase kebab case. Delete the branch after it merges.

### Commits

- Imperative first line under 72 characters: "Add loading state to IconButton", not "added loading".
- Optional body after a blank line: why, not what.
- One logical change per commit. Commit generated token files together with the snapshot that produced them.
- Never `--no-verify`. If the pre-commit hook fails, fix the violation.

### Pull requests

1. `npm run verify` passes locally (gen:tokens, typecheck, token lint, ESLint, tests).
2. Push: `git push -u origin HEAD`. Open the PR (`gh pr create --fill` or GitHub). Fill in the template:
   Figma link, screenshots in **Light, Dark and Web 2025**, the contract and React checklists.
3. Add a line to `CHANGELOG.md` under **Unreleased** (Added / Changed / Fixed / Removed). Skip for docs- or tooling-only PRs.
4. CI runs `verify`, `build` and `build-storybook`. It must be green.
5. One approving review from a code owner. New commits dismiss earlier approvals.
6. Squash-merge. Storybook redeploys to <https://bayardo88.github.io/NS-DS-SF/> from `main`.

### Releases and versioning

The package is consumed from git tags, so a release is a tag on `main`.

| Change | Bump | Examples |
| --- | --- | --- |
| Breaking | major (`1.0.0` → `2.0.0`; while `0.x`, minor) | prop renamed or removed, token removed or renamed, default changed |
| Backwards-compatible addition | minor | new component, new prop, new token |
| Fix | patch | bug fix, contrast fix, docs |

1. Open a `chore/release-vX.Y.Z` PR that bumps `version` in `package.json` and moves the
   **Unreleased** entries in `CHANGELOG.md` under `## [X.Y.Z] - YYYY-MM-DD`.
2. After it merges, tag the merge commit and push the tag (tags are allowed; only `refs/heads/main` is blocked):

   ```bash
   git switch main && git pull
   git tag -a vX.Y.Z -m "vX.Y.Z"
   git push origin vX.Y.Z
   ```

3. Consumers pin the tag: `npm install github:Bayardo88/NS-DS-SF#vX.Y.Z`. Never tell anyone to install a branch.

A deprecated prop keeps working for one minor release, with `@deprecated` in its JSDoc, before it's removed.

### The `NS_DS_ALLOW_MAIN` escape hatch

The local hooks refuse commits on `main` and pushes to `main`. Release maintainers can set
`NS_DS_ALLOW_MAIN=1` for one command when they have to (for example, to commit a local merge while
repairing a release):

```bash
NS_DS_ALLOW_MAIN=1 git commit -m "…"
```

It only switches off the local hooks. GitHub branch protection still rejects direct pushes to `main`,
for administrators too. Developers, designers and AI agents never use it.

---

## Developers

### Setup

```bash
git clone git@github.com:Bayardo88/NS-DS-SF.git && cd NS-DS-SF
npm install          # also runs `prepare`: points git at .githooks/ and builds dist/
npm run storybook    # http://localhost:6006
```

Check the hooks are active: `git config core.hooksPath` prints `.githooks`.

### Commands

| Command | What it does |
| --- | --- |
| `npm run verify` | gen:tokens, typecheck, `lint:tokens`, ESLint, tests. Must pass before a PR. |
| `npm run lint:tokens` | Token contract: no raw hex/rgb/hsl, no px except 0/1px, no primitives or palettes in components, every `var(--ns-…)` resolves |
| `npm test` / `npm run test:watch` | Vitest + Testing Library + jest-axe |
| `npm run build` | `dist/` (ESM + `.d.ts`) and `dist/styles.css` |
| `npm run build:tokens` | Rebuild tokens from the Figma snapshot in `tokens/figma/` |
| `npm run storybook` / `build-storybook` | Storybook dev server / static build |

### Building a component

1. Read the component's Figma page documentation panel: anatomy, properties → props, states,
   accessibility, React example, JSON spec.
2. Create `src/components/<Name>/` with `<Name>.tsx`, `<Name>.css`, `<Name>.test.tsx`,
   `<Name>.stories.tsx`, `index.ts`, following [docs/component-contract.md](docs/component-contract.md).
3. Style with semantic tokens only (AI-GUIDE.md §4 tells you which). States are CSS.
4. Run the React pre-emit checklist (AI-GUIDE.md §3).
5. Export it from `src/index.ts`.
6. Check every story in Light, Dark and Web 2025 with the a11y panel open.

### Code review: what reviewers check

- The PR template checklists are honestly ticked, and screenshots cover all three themes.
- Prop names and values match Figma. No interaction-state props.
- No hand edits to generated files. Token changes come with a Figma export.
- Tests cover keyboard behavior, not only rendering.

---

## Designers

Figma is the source of truth. You change design in Figma; code follows through a pull request.

### How a token change flows

```
Figma: edit the variable/style ─▶ publish the library
   ─▶ export: run scripts/figma-export.js (PART = variables, effects, text) and save over tokens/figma/*.json
   ─▶ npm run build:tokens   (tokens/tokens.json, tokens/css/*, src/tokens/generated.ts)
   ─▶ npm run verify
   ─▶ PR on a tokens/<name> branch, with before/after screenshots in all three themes
```

README › Regenerating from Figma has the export details (the 20 KB `use_figma` limit, `ONLY` and `SLICE`).
If you don't run code, open an issue with the Figma link and a developer runs the export.

### How a component change flows

1. Change the component in Figma and update its documentation panel (properties, states,
   accessibility, React example, JSON spec). The panel is the spec developers build from.
2. Publish the library.
3. Open a dev ticket (GitHub issue) with the Figma link and a one-line summary of what changed.

### What needs a dev ticket

| Change in Figma | Needs a dev ticket? |
| --- | --- |
| A token value (color, spacing, radius…) | No code by hand, but someone runs the export and opens a `tokens/` PR. Open an issue if you can't. |
| A new, renamed or removed variable or text style | Yes. Renames and removals are breaking for consumers. |
| A new variant, property or state on a component | Yes |
| A new component | Yes, and it needs a documentation panel first |
| Layout or spacing inside a component that uses existing tokens | Yes (the CSS changes) |
| Documentation panel text only | No |

### Naming conventions

| Thing | Convention | Example |
| --- | --- | --- |
| Semantic color variable | `role/variant` in the `Color` collection, WEB code syntax `var(--ns-color-<role>-<variant>)` | `bg/brand-hover` → `--ns-color-bg-brand-hover` |
| Primitive | `ramp/step` | `blue/600` → `--ns-color-blue-600` |
| Spacing / shape / size | name is the scale step | `spacing/16`, `radius/lg`, `icon/md` |
| Text style | `Family/Size/Weight` | `Primary/Body MD/Regular` → `.ns-text-primary-body-md-regular` |
| Component property | Figma property name = prop name; values become lowercase kebab (`S/M/L` → `sm/md/lg`, `On dark` → `on-dark`) | `Variant = Filled` → `variant="filled"` |
| Interaction states | Variants named `Hover`, `Focused`, `Pressed`, `Disabled`, `Loading` | they become CSS states, not props |

Every variable needs WEB code syntax set in Figma: the build uses it as the CSS name and never invents one.
Every semantic color needs a value in Light, Dark and Web 2025, and the pair must pass AA in each.

---

## AI agents

Claude Code, Codex, Cursor, Copilot and others follow the same rules as developers, plus these:

1. Read [AI-GUIDE.md](AI-GUIDE.md), then [CLAUDE.md](CLAUDE.md) (or [AGENTS.md](AGENTS.md)) before writing code.
2. **Never commit to or push to `main`.** Check the branch first (`git branch --show-current`). If it's
   `main`, create a branch before changing anything. Never use `--no-verify` or `NS_DS_ALLOW_MAIN`.
   In Claude Code, `.claude/settings.json` runs `scripts/guard-main.mjs` before every Bash command and
   blocks `git commit` on `main` and any `git push` that targets `main`.
3. Run the React pre-emit checklist (AI-GUIDE.md §3) on every component before emitting it.
4. Stay inside your task's folders. When several agents work at once, each owns its own
   `src/components/<Name>/`; shared files (`src/index.ts`, `package.json`, `.storybook/*`) belong to the lead.
5. Never edit generated files or token values. If a token seems missing or wrong, say so in the PR
   description; don't work around it with a literal.
6. `npm run verify` must pass before you say the work is done. Report what you ran and what failed.
7. Open the PR with the template filled in. A human reviews and merges; agents never merge their own PRs.
