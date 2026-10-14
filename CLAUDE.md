# NicaSource Design System V2: working in this repo

This repo is `@nicasource/ds`: the design tokens and React + TypeScript components generated from the
**Design System V2** Figma file (`JdINnstfRHeLRPZjeEla4U`), plus a Storybook that documents them.
It is a package, not an app. Product teams install it from a git tag.

## Before writing any code here

Read **[AI-GUIDE.md](AI-GUIDE.md)**. It is the contract: hard rules R1–R14, the React rules and the
7-point pre-emit checklist, decision tables for color / spacing / type, the component API and an
anti-pattern list. It applies to code in this repo and to any UI built on the package.

## Git: never commit or push to `main`

Always work on a branch (`feature/`, `fix/`, `chore/`, `tokens/`, `docs/`) and open a pull request.
Never `git commit` while on `main`, never `git push` to `main` (including `HEAD:main` or `--force`),
never `--no-verify`. A PreToolUse hook (`scripts/guard-main.mjs`) blocks these, the git hooks in
`.githooks/` block them for humans, and branch protection requires a reviewed PR with green CI.
If you find yourself on `main`, run `git switch -c <type>/<name>` first; your changes come with you.

## Non-negotiables

1. **Semantic tokens only** in components: `--ns-color-{bg,text,border,icon}-*`, `--ns-spacing-*`,
   `--ns-size-*`, `--ns-radius-*`, `--ns-border-width-*`, text styles. No primitives
   (`--ns-color-blue-600`), no `--ns-palette-*` (except `Logo` / `NSMark`), no raw hex or px.
2. **Three themes:** `light`, `dark`, `web-2025`. Check every change in all three (Storybook Theme toolbar).
3. **Tokens change in Figma first.** Generated files are never hand-edited: `tokens/**`,
   `src/tokens/generated.ts`, `src/icons/generated.ts`, `dist/`.
4. **WCAG 2.1 AA**, visible `:focus-visible` ring, color never carries meaning alone.
5. **`npm run verify` must pass** before a PR: gen:tokens, typecheck, token lint, ESLint
   (Rules of Hooks and exhaustive deps are errors), tests.

## Changing a token

Change the variable in Figma and publish, then:

```bash
# run scripts/figma-export.js for PART=variables|effects|text, save over tokens/figma/*.json
npm run build:tokens     # tokens/tokens.json, tokens/css/*, src/tokens/generated.ts
npm run verify
```

Commit the snapshot and the generated files together on a `tokens/<name>` branch.

## Adding or changing a component

Follow **[docs/component-contract.md](docs/component-contract.md)**. One folder per component:
`src/components/<Name>/{<Name>.tsx, <Name>.css, <Name>.test.tsx, <Name>.stories.tsx, index.ts}`.
`forwardRef`, native props + `...rest`, `className` merged with `cx()`, exported `<Name>Props`,
props named as in the Figma docs panel, states in CSS. Export it from `src/index.ts`.
Add a line to `CHANGELOG.md` under Unreleased.

## Layout

| Path | What it is |
| --- | --- |
| `tokens/` | Generated from Figma: `figma/*.json` snapshot, `tokens.json` (DTCG), `css/tokens.css`, `css/text-styles.css` |
| `src/index.ts` | Public barrel, the only import path consumers use |
| `src/components/<Name>/` | One folder per Figma component |
| `src/tokens/` | Typed token API (`generated.ts` is generated) |
| `src/theme/` | `ThemeProvider`, `useTheme` |
| `src/utils/` | `cx`, `Slot` (`asChild`), ref helpers |
| `src/styles/base.css` | Focus ring, box-sizing, reduced motion |
| `docs/storybook/` | Storybook Introduction, Contributing and Foundations pages |
| `scripts/` | Token build, CSS bundle, `lint-tokens.mjs`, `guard-main.mjs`, `install-hooks.mjs` |
| `.githooks/` | pre-commit / pre-push: refuse `main` |
| `.claude/settings.json` | PreToolUse hook that blocks commits/pushes to `main` |
| `.github/` | CI, Storybook Pages deploy, CODEOWNERS, PR template |
