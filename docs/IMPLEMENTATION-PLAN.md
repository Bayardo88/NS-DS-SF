# React component library: implementation plan

Turns the **Design System V2** Figma file (`JdINnstfRHeLRPZjeEla4U`) into a React + TypeScript
package, `@nicasource/ds`, with a Storybook that documents every token and component. Product teams
install it straight from this repository.

## 1. Goals

1. Every Figma component exists in React with the props its Figma documentation panel specifies.
2. Every token is usable three ways: CSS custom properties, `.ns-text-*` classes, and a typed TS API.
3. Storybook shows every component in all three color modes (Light, Dark, Web 2025), plus
   foundations pages for color, type, spacing, shape, elevation and icons.
4. Guardrails stop anyone (developer, designer or AI agent) from pushing straight to `main`, and stop
   token or contract drift from getting merged.

## 2. Inventory from Figma

| Figma page | Component sets | Variants | React export(s) | Wave |
| --- | --- | ---: | --- | :---: |
| Icons | 180 `Icons/<Category>/<name>` components | 180 | `Icon`, `IconName`, `iconNames` | A1 |
| Brand | `Logo`, `NS Mark` | 9 | `Logo`, `NSMark` | A1 |
| Button | `Button / Filled`, `/ Outlined`, `/ Text` | 54 | `Button` | A2 |
| Icon Button | `Icon Button / Filled`, `/ Outlined`, `/ Text` | 45 | `IconButton` | A2 |
| Text Field | `Text Field` | 7 | `TextField` | A3 |
| Tag | `Tag` | 16 | `Tag` | A3 |
| Step Number | `Step Number` | 9 | `StepNumber` | A3 |
| Card | `Card / Portfolio` | 3 | `PortfolioCard` | A4 |
| Stepper | `Stepper / Step`, `Stepper` | 11 | `Stepper` | A4 |
| Navigation Bar | `Navigation Bar / Link`, `Navigation Bar` | 6 | `SiteHeader`, `NavLink` | B |
| Footer | `Footer` | 2 | `SiteFooter` | B |

Interaction states in Figma (Hover, Focused, Pressed, Disabled, Loading) are **not** props. They come
from `:hover`, `:focus-visible`, `:active`, `disabled`, and the `loading` prop.

## 3. Repository structure

```
NS-DS-SF/
├── tokens/                     # SOURCE OF TRUTH, generated from Figma (don't hand-edit)
│   ├── figma/*.json            #   raw Figma snapshot
│   ├── tokens.json             #   W3C DTCG tokens
│   └── css/                    #   tokens.css + text-styles.css
├── scripts/
│   ├── figma-export.js         # read-only Figma plugin script → tokens/figma
│   ├── build-tokens.mjs        # tokens/figma → tokens/{tokens.json,css}
│   ├── gen-tokens-ts.mjs       # tokens.json → src/tokens/generated.ts
│   ├── build-css.mjs           # tokens + base + every component .css → dist/styles.css
│   ├── lint-tokens.mjs         # token-contract linter (no raw hex/px, no primitives in components)
│   └── install-hooks.mjs       # points git at .githooks/ (blocks commits/pushes to main)
├── src/
│   ├── index.ts                # public barrel, the only import path consumers use
│   ├── tokens/                 # typed token API (generated.ts + index.ts)
│   ├── theme/                  # ThemeProvider, useTheme
│   ├── utils/                  # cx, Slot (asChild), composeRefs
│   ├── styles/base.css         # focus ring, reduced motion, box-sizing
│   ├── test/                   # vitest setup + helpers
│   └── components/<Name>/      # ONE FOLDER PER COMPONENT
│       ├── <Name>.tsx          #   component + exported props type
│       ├── <Name>.css          #   styles, semantic tokens only, class prefix ns-<name>
│       ├── <Name>.test.tsx     #   axe + keyboard + ref/className/...rest passthrough
│       ├── <Name>.stories.tsx  #   CSF3 stories, autodocs, one story per Figma variant axis
│       └── index.ts            #   re-exports
├── docs/storybook/*.mdx        # Storybook intro + foundations pages
├── .storybook/                 # Storybook config with a theme toolbar (light | dark | web-2025)
├── .githooks/                  # pre-commit / pre-push: refuse main
├── .claude/settings.json       # AI-agent hook: refuse git commit/push on main
└── .github/                    # CI, CODEOWNERS, PR template
```

## 4. Engineering contract (every component)

Follows the React guidelines in [`AI-GUIDE.md`](../AI-GUIDE.md) and the contract in
[`docs/component-contract.md`](component-contract.md):

- Pure function components, `forwardRef`, defined at module top level, never nested.
- Native props spread with `...rest`, `className` merged with `cx()`, exported `<Name>Props` type.
- Hooks at the top level only; no derived state; effects only for external sync, always cleaned up.
- Event props named `on*`, handler implementations named `handle*`.
- Styles in `<Name>.css` with BEM-style classes (`ns-button`, `ns-button--filled`, `ns-button__label`)
  that use **semantic** tokens only. No raw hex or px, no primitives (`--ns-color-red-500`), and no
  brand palettes except in Brand components.
- Keyboard and screen-reader behavior matches the Figma docs panel's accessibility section, and it's tested.

## 5. Execution plan and agents

| Step | Owner | Output | Depends on |
| --- | --- | --- | --- |
| 0. Foundation | lead | tooling, token TS API, ThemeProvider, utils, Storybook shell, `Icon` contract stub | — |
| A1. Icons + Brand | agent | 180 SVG icons exported from Figma, `Icon`, `Logo`, `NSMark` | 0 |
| A2. Actions | agent | `Button`, `IconButton` | 0 (uses `Icon` contract) |
| A3. Form + display | agent | `TextField`, `Tag`, `StepNumber` | 0 |
| A4. Content + progress | agent | `PortfolioCard`, `Stepper` | 0 |
| A5. Governance + docs | agent | rules, guardrails, CI, token linter, foundations MDX | 0 |
| B. Site chrome | agent | `SiteHeader` / `NavLink`, `SiteFooter` | A1, A2 |
| C. Integration | lead | barrel exports, `npm run verify`, Storybook build, review | all |

Agents in the same wave only write inside their own component folders. Shared files (`src/index.ts`,
`package.json`, `.storybook/*`) belong to the lead, so parallel work never conflicts.

## 6. Definition of done

- `npm run verify` passes: typecheck, token lint, ESLint (hooks + a11y rules as errors), unit tests.
- `npm run build` produces `dist/` (ESM + `.d.ts`) and `dist/styles.css`.
- `npm run build-storybook` succeeds, and every story passes the a11y addon in all three themes.
- Every Figma component set and variant axis is covered by a story.

## 7. Consuming the package

```bash
npm install github:Bayardo88/NS-DS-SF#v0.1.0   # pin a tag, never a branch
```

```tsx
import '@nicasource/ds/styles.css';
import { ThemeProvider, Button } from '@nicasource/ds';

<ThemeProvider theme="light">
  <Button variant="filled">Contact us</Button>
</ThemeProvider>
```

`prepare` builds `dist/` on install, so consumers get compiled output without a registry.

## 8. Later

- Code Connect mappings (`*.figma.tsx`) so Figma Dev Mode shows the real React snippet.
- Publish to GitHub Packages once there's more than one consumer.
- Visual regression (Chromatic or Playwright screenshots) per theme.
- Font files (Fira Code, Greycliff CF, Public Sans) bundled or documented as a CDN.
