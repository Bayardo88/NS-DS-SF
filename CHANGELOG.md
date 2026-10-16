# Changelog

All notable changes to `@nicasource/ds`. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the package uses [Semantic Versioning](https://semver.org/). Releases are git tags (`vX.Y.Z`);
see CONTRIBUTING.md › Releases.

## [Unreleased]

#### Added (repo, not the package)

- `website/`: headless WordPress (Playground) + React reference build of the NS 2025 website on the
  `web-2025` theme, 9 pages + post/job/case-study templates, 34 section types. `website/DESIGN.md`
  documents it for AI agents; the `ns-website-screens` Claude skill builds new screens with it.

### 0.1.0 (first release, not tagged yet)

#### Added

- Design tokens from the Design System V2 Figma file: 521 variables, 105 text styles, effects and
  gradients, as DTCG JSON (`tokens/tokens.json`), CSS custom properties (`tokens/css/tokens.css`),
  text-style classes (`tokens/css/text-styles.css`) and a typed TS API (`tokens`, `textStyles`, `themes`).
- Three color themes: `light`, `dark`, `web-2025`, with `ThemeProvider` and `useTheme`.
- React components from Figma: `Icon` (180 icons), `Logo`, `NSMark`, `Button`, `IconButton`,
  `TextField`, `Tag`, `StepNumber`, `PortfolioCard`, `Stepper`, `SiteHeader`, `NavLink`, `SiteFooter`.
- `dist/styles.css`: one stylesheet with tokens, text styles, base layer and every component.
- Storybook with Foundations pages (Colors, Typography, Spacing, Effects) and a theme toolbar.
- Governance: `AI-GUIDE.md`, `CLAUDE.md`, `AGENTS.md`, `CONTRIBUTING.md`, the token-contract linter
  (`npm run lint:tokens`), git hooks and a Claude Code hook that refuse commits and pushes to `main`,
  CI, CODEOWNERS and a PR template.

#### Fixed

- WCAG 2.1 AA contrast in the semantic color tokens.
