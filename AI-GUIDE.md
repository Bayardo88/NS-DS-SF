# NicaSource Design System V2: build guide for AI agents and developers

**Read this before writing UI with `@nicasource/ds` or code inside this repo.** It is the contract:
setup, the hard rules, the React rules, decision tables for tokens, and the component API. If a
screenshot, an older page or another repo disagrees with this file, this file wins.

- **Source of truth:** the Figma file **Design System V2** (`JdINnstfRHeLRPZjeEla4U`). Tokens and
  components change in Figma first, then flow into code.
- **Scale:** 521 variables (67 semantic colors, 3 color modes), 105 text styles, 11 component pages.
- **Themes:** `light` (default), `dark`, `web-2025`. Everything must work in all three.
- **Storybook:** <https://bayardo88.github.io/NS-DS-SF/> (built from `main`).
- **Verify your work:** `npm run verify` (gen:tokens, typecheck, token lint, ESLint, tests).

Contents: [§1 Setup](#1-setup) · [§2 Hard rules](#2-hard-rules) · [§3 React rules](#3-react-rules) ·
[§4 Decision tables](#4-decision-tables) · [§5 Component API](#5-component-api) ·
[§6 Anti-patterns](#6-anti-patterns) · [§7 Working in this repo](#7-working-in-this-repo)

---

## 1. Setup

### Install

The package is installed from GitHub, pinned to a release tag. Never depend on a branch.

```bash
npm install github:Bayardo88/NS-DS-SF#v0.1.0
```

`prepare` builds `dist/` on install, so you get compiled ESM, `.d.ts` files and `styles.css`.

### Import the styles once

```tsx
// app entry (main.tsx, _app.tsx, layout.tsx)
import '@nicasource/ds/styles.css'; // tokens + text styles + base layer + every component
```

`styles.css` is the only stylesheet you need. Load the fonts yourself (Fira Code, Public Sans,
Open Sans, Plus Jakarta Sans as the Greycliff CF stand-in; see README › Fonts).

### Pick a theme

```tsx
import { ThemeProvider, Button } from '@nicasource/ds';

export function App() {
  return (
    <ThemeProvider theme="web-2025">
      <Button variant="filled">Contact us</Button>
    </ThemeProvider>
  );
}
```

| Want | Do |
| --- | --- |
| One theme for the whole page | `<html data-theme="light \| dark \| web-2025">` |
| A themed subtree (or a section in a different theme) | `<ThemeProvider theme="dark">…</ThemeProvider>` (renders a `div` with `data-theme`); providers nest |
| Read the current theme in a component | `useTheme()` |
| Follow the OS dark preference | Set no `data-theme` on `<html>`; `prefers-color-scheme: dark` applies Dark |

Only semantic colors change between themes. Spacing, radius, type and effects are the same in every theme.

### Everything else imports from the package root

```tsx
import { Button, Icon, Tag, tokens, textStyles, type IconName } from '@nicasource/ds';
```

Never import from `@nicasource/ds/dist/...` or from `src/`. Typed token references live on `tokens`
(`tokens.color.bg.brand` is the string `'var(--ns-color-bg-brand)'`).

---

## 2. Hard rules

Breaking one is a bug, not a style preference. `npm run lint:tokens` and ESLint catch the ones marked **(lint)**.

| # | Rule |
| --- | --- |
| **R1** | **Semantic tokens only.** Use `--ns-color-{bg,text,border,icon}-*`. Never use a primitive (`--ns-color-blue-600`, `--ns-color-night-900`, `--ns-color-base-white`, `--ns-color-alpha-*`): primitives don't change with the theme. Never use a brand palette (`--ns-palette-*`) in a component; the **only** exceptions are `Logo` and `NSMark`, whose colors are fixed brand colors. Sub-brand campaign pages may use palettes in product code, never in this package. **(lint)** |
| **R2** | **No raw colors.** No hex, `rgb()`, `rgba()`, `hsl()` in CSS or in `style={{ }}`. If no semantic token fits, the token is missing: ask for it in Figma (R9). **(lint)** |
| **R3** | **No raw px.** Spacing, size, radius, border width, type and effects come from tokens. Allowed literals: `0`, `1px` hairlines, `100%`/`50%`, and px in `@media` queries. **(lint)** |
| **R4** | **Every interactive element shows a focus ring** on `:focus-visible`: `outline: var(--ns-border-width-medium) solid var(--ns-color-border-focus); outline-offset: var(--ns-spacing-2);`. Never `outline: none` without an equal replacement. Never a colored `box-shadow` as the only indicator. |
| **R5** | **All three themes must work.** Check Light, Dark and Web 2025 in Storybook (Theme toolbar) before calling anything done. Never hard-code a theme or write theme-specific CSS (`[data-theme='dark'] .x { … }`); if a value differs by theme, it is a semantic token. |
| **R6** | **WCAG 2.1 AA.** Text ≥ 4.5:1 (large text ≥ 3:1), icons, input borders and focus rings ≥ 3:1, in every theme. Use the token pairs from §4: every filled `bg-*` has its `text-on-*`. Keyboard: everything clickable is reachable with Tab and operable with Enter/Space. Every control has an accessible name. |
| **R7** | **Color never carries meaning alone.** Status needs an icon or words next to the color. Links in running text keep an underline. Errors say what's wrong in text. |
| **R8** | **Interaction states are CSS, not props.** Hover → `:hover`, Focused → `:focus-visible`, Pressed → `:active`, Disabled → native `disabled`. Only `loading` is a prop. Hover/pressed colors come from `*-hover` / `*-pressed` tokens, never `filter`, `opacity` or `brightness()`. |
| **R9** | **Tokens change in Figma first.** Never add, rename or re-value a token in code. Change the variable in Figma, publish, export, run `npm run build:tokens`, open a PR (CONTRIBUTING.md › Designers). |
| **R10** | **Generated files are never hand-edited:** `tokens/tokens.json`, `tokens/css/*.css`, `tokens/figma/*.json`, `src/tokens/generated.ts`, `src/icons/generated.ts`, `dist/`. Regenerate them. |
| **R11** | **Type comes from text styles.** Use an `.ns-text-*` class or the matching `--ns-font-*` / `--ns-line-height-*` / `--ns-letter-spacing-*` set together. Never invent a font size or mix a size from one style with a line height from another. |
| **R12** | **Never commit or push to `main`.** Work on a branch (`feature/`, `fix/`, `chore/`, `tokens/`, `docs/`) and open a PR. Git hooks and the Claude Code hook enforce this; branch protection backs them up. Never bypass with `--no-verify`. |
| **R13** | **Public API is the package root.** Everything a consumer uses is exported from `src/index.ts`. A prop rename or removal is a breaking change (CHANGELOG + major/minor bump per CONTRIBUTING.md › Releases). |
| **R14** | **Don't invent components.** If Figma has it, build it to the Figma spec. If Figma doesn't have it, it is a design request first, not a new export. Compose existing components in product code. |

---

## 3. React rules

These follow react.dev and are hard rules for every file in `src/` and for product code built on the
package. ESLint enforces Rules of Hooks and exhaustive deps as errors.

| # | Rule | Do | Don't |
| --- | --- | --- | --- |
| **K1** | **Pure components, immutable data.** Render is a pure function of props and state. Never mutate props, state, or module variables during render. | `setItems([...items, item])`, `setUser({ ...user, name })` | `items.push(item)`, `props.style.color = …`, a module-level counter |
| **K2** | **PascalCase** component names; camelCase for everything else. | `function SiteHeader()` | `function siteHeader()` |
| **K3** | **Never nest component definitions.** Define every component at module top level. A component defined inside another remounts on every render and loses its state. | Top-level `function NavItem()`, passed props | `function Header() { function Item() {…} return <Item/> }` |
| **K4** | **Fragments for a single root** when you don't need a wrapper element. | `<>…</>` or `<Fragment key={id}>` | an extra `<div>` only to satisfy JSX |
| **K5** | **Stable keys.** Keys come from the data (`id`, `href`, `slug`). Index keys only for static lists that never reorder, insert or delete. | `key={link.href}` | `key={i}` on a sortable list, `key={Math.random()}` |
| **K6** | **Rules of Hooks.** Call hooks at the top level of a component or custom hook (`useX`) only. Never inside conditions, loops, nested functions, `try`/`catch`, or after an early `return`. | All hooks first, then conditions | `if (open) useEffect(…)` |
| **K7** | **Lift state up** to the closest common parent when two components need the same data. One source of truth. | Parent owns `activeStep`, children get props | Two siblings with their own copies kept in sync |
| **K8** | **No redundant or derived state.** If it can be computed from props or state, compute it during render (`useMemo` only if it's measurably expensive). | `const fullName = first + ' ' + last` | `useState(fullName)` + an effect that updates it |
| **K9** | **Functional updaters** when the next state depends on the previous one. | `setCount((c) => c + 1)` | `setCount(count + 1)` in a loop or async callback |
| **K10** | **`useReducer` for complex state:** several related fields, or transitions that depend on each other. | `dispatch({ type: 'next' })` | five `useState`s updated together in every handler |
| **K11** | **Effects only for external sync** (DOM APIs, subscriptions, timers, network, non-React widgets). Never for derived data, and never to respond to a user event: put that logic in the event handler. | `onClick={handleSubmit}` that posts | `useEffect(() => { if (submitted) post() }, [submitted])` |
| **K12** | **Complete dependency arrays.** List every reactive value an effect, `useMemo` or `useCallback` reads. Never suppress `react-hooks/exhaustive-deps`; restructure instead (move the function inside the effect, use an updater, or `useRef` for non-reactive values). | `[userId, query]` | `// eslint-disable-next-line react-hooks/exhaustive-deps` |
| **K13** | **Clean up** every subscription, listener, timer, observer and fetch. Abort fetches with `AbortController`. | `return () => { ctrl.abort(); clearTimeout(t); window.removeEventListener('resize', onResize); }` | an effect that adds a listener and never removes it |
| **K14** | **Pass handler references, not calls.** | `onClick={handleClick}`, `onClick={() => select(id)}` | `onClick={handleClick()}` |
| **K15** | **Naming:** event props are `on<Event>` (`onOpenChange`, `onStepClick`); the functions that implement them are `handle<Event>` (`handleOpenChange`). | `<Menu onOpenChange={handleOpenChange} />` | `<Menu openChanged={doOpen} />` |
| **K16** | **Controlled + uncontrolled** for state a component owns: `value` / `defaultValue` / `onValueChange` (or `open` / `defaultOpen` / `onOpenChange`). | Both modes work | Only internal state, no way to control it |

### Effect template

```tsx
useEffect(() => {
  const controller = new AbortController();
  fetch(`/api/projects?q=${encodeURIComponent(query)}`, { signal: controller.signal })
    .then((r) => r.json())
    .then(setResults)
    .catch((err) => {
      if (err.name !== 'AbortError') setError(err);
    });
  return () => controller.abort();
}, [query]);
```

### Pre-emit checklist

Run through this before you emit or commit any component code. Every answer must be **yes**.

| # | Check |
| --- | --- |
| 1 | Is every component defined once, at module top level (none nested inside another)? |
| 2 | Are all hooks called unconditionally, at the top level, before any early return? |
| 3 | Are props and state treated as immutable (new objects/arrays, never mutated)? |
| 4 | Do lists use stable keys from the data (no index on reorderable lists, no `Math.random()`)? |
| 5 | Is there no state that could be computed from props or other state? |
| 6 | Are handlers passed as references (`onX={handleX}`), named `on*` / `handle*`? |
| 7 | Does every effect sync with something external, list complete deps, and return a cleanup when it subscribes, listens, times or fetches? |

And for anything in this repo, also: semantic tokens only (R1–R3), focus ring (R4), checked in all three themes (R5).

---

## 4. Decision tables

### "I need a color"

| I need… | Use | Not |
| --- | --- | --- |
| The page background | `--ns-color-bg-canvas` | `bg-surface`, a hex |
| A card, panel, field or menu surface | `--ns-color-bg-surface` | `bg-canvas` |
| A quieter area inside a surface (zebra row, well) | `--ns-color-bg-surface-subtle` | `opacity` on `bg-surface` |
| A warm/cream section (Light) | `--ns-color-bg-surface-warm` | `--ns-color-cream-900` (R1) |
| An inverted band (footer, banner) | `--ns-color-bg-inverse` + `--ns-color-text-inverse` + `--ns-color-icon-inverse` | `text-primary` on it |
| The primary action fill | `--ns-color-bg-brand` (`-hover`, `-pressed`) + `--ns-color-text-on-brand` | `filter: brightness()` for hover |
| A tinted brand chip or selected row | `--ns-color-bg-brand-subtle` + `--ns-color-text-brand` | `bg-brand` at 10% opacity |
| An accent fill (golden / honey) | `--ns-color-bg-accent` (`-hover`) + `--ns-color-text-on-accent` | white text on accent |
| A highlight fill (red / coral) | `--ns-color-bg-highlight` (`-hover`) + `--ns-color-text-on-highlight` | `bg-error` (highlight isn't an error) |
| A status fill (info, success, error) | `--ns-color-bg-{info,success,error}` + `--ns-color-text-on-status` | `text-primary` on it |
| A warning fill | `--ns-color-bg-warning` + `--ns-color-text-on-warning` | `text-on-status` (white fails on orange) |
| A status tint (alert, badge) | `--ns-color-bg-{info,success,warning,error}-subtle` + `--ns-color-text-{info,success,warning,error}` + an icon (R7) | color alone |
| Body text | `--ns-color-text-primary` | `--ns-color-gray-900` (R1) |
| Supporting text, captions | `--ns-color-text-secondary`, then `--ns-color-text-tertiary` | lowering opacity |
| Disabled text / fill / border / icon | `--ns-color-text-disabled`, `-bg-disabled`, `-border-disabled`, `-icon-disabled` | `opacity: 0.5` |
| Brand-colored text or heading | `--ns-color-text-brand` | `bg-brand` value as text |
| A link | `--ns-color-text-link` → `--ns-color-text-link-hover`, underlined in prose | `text-brand` with no underline |
| A container edge (card, divider) | `--ns-color-border-default` or `-subtle` | `border-input` |
| A form input's resting border | `--ns-color-border-input` (≥ 3:1) | `border-default` (fails 3:1) |
| A strong separator or outlined control | `--ns-color-border-strong` | `border-default` |
| A selected / brand outline | `--ns-color-border-brand` | `border-focus` |
| The keyboard focus ring | `--ns-color-border-focus`, outline + offset (R4) | a box-shadow |
| A status border | `--ns-color-border-{info,success,warning,error}` | the `bg-*` status color |
| An icon | `--ns-color-icon-{primary,secondary,brand,accent,highlight,success,warning,error,inverse,disabled}`, set as `color` (icons use `currentColor`) | `fill="#…"` |
| A modal scrim | `--ns-color-bg-overlay` | `rgba(0,0,0,.5)` |
| A frosted-glass panel | `--ns-color-bg-glass` + `backdrop-filter: var(--ns-glass-sm \| lg \| xl)` | a hand-written `blur(…)` |
| A sub-brand color (Careers, Talks, Bites…) | Only in `Logo`/`NSMark` or sub-brand product pages: `--ns-palette-*` | anywhere in a shared component |

### "I need spacing, size, shape or type"

| I need… | Use | Values |
| --- | --- | --- |
| Padding, gap, margin | `--ns-spacing-<n>` (the name is the px value) | 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 60, 64, 80, 96, 100, 120, 150, 180 |
| Icon width/height | `--ns-size-icon-{xs,sm,md,lg,xl}` (or `<Icon size>`) | 12 · 16 · 20 · 24 · 32 |
| Control height (button, field) | `--ns-size-control-{sm,md,lg}` | 32 · 40 · 48 |
| Corner radius | `--ns-radius-{none,xs,sm,md,lg,xl,2xl,3xl,full}` | 0 · 4 · 8 · 12 · 16 · 24 · 32 · 40 · 9999 (`full` for pills and circles) |
| Border width | `--ns-border-width-{none,thin,regular,medium,thick}` | 0 · 1 · 1.5 · 2 · 4 (`medium` is the focus ring) |
| A whole text style | `.ns-text-<family>-<size>-<weight>` class, e.g. `.ns-text-primary-body-md-regular`, `.ns-text-web-h1-black` | 105 classes, `textStyles` lists them |
| Text style inside component CSS | the style's `--ns-font-family-*`, `--ns-font-size-*`, `--ns-font-weight-*`, `--ns-line-height-*`, `--ns-letter-spacing-*` together | never mix across styles (R11) |
| A shadow | `--ns-elevation-{xs,sm,md,lg,xl}` | `inset-hairline` for a 1px inner edge |
| Blur / glow | `--ns-glass-*` (backdrop-filter), `--ns-glow-*` (filter) | |
| A gradient | `--ns-gradient-*` | corporate and Web gradients in shared components; sub-brand gradients in sub-brand pages only |
| A breakpoint | `@media (max-width: 767px)` | mobile type switches at 768px |

Spacing is for gaps and padding; size tokens are for width and height. Don't use `--ns-spacing-24`
as an icon size or `--ns-size-icon-md` as padding.

### "Which family of text style?"

| Context | Family |
| --- | --- |
| Product UI, components, documentation | `primary-*` (Fira Code) and `secondary-*` (Greycliff CF) |
| The Web 2025 website (`web-2025` theme) | `web-*` (Public Sans), responsive below 768px |
| Legacy Web 2023 pages | `web-2023-*` |

---

## 5. Component API

Per Figma spec: props come from each Figma page's documentation panel (docs/IMPLEMENTATION-PLAN.md
§2). Variant values map to lowercase kebab code values (`S/M/L` → `sm/md/lg`). Every component
forwards `ref`, accepts `className` and the native props of its root element (`...rest`). JSDoc in the
source and Storybook autodocs are the full reference; this table is the summary.

| Component | Root | Key props | Notes |
| --- | --- | --- | --- |
| `Icon` | `<svg>` | `name: IconName` (180 names, `iconNames`), `size?: 'xs'\|'sm'\|'md'\|'lg'\|'xl'` (md), `color?: IconColor` (semantic `icon/*` role), `spin?`, `label?` | Decorative (`aria-hidden`) unless `label` is set. Without `color` it inherits `currentColor`. |
| `Logo` | `<svg>` | `variant?: 'main'\|'on-dark'\|'mono-light'`, `width?` (148), `label?` ("NicaSource"; `""` inside a named link) | Brand exception: fixed brand colors (R1). Min width 96px. |
| `NSMark` | `<svg>` | `color?: 'red'\|'navy'\|'yellow'\|'wine'\|'salmon'\|'cyan'`, `size?` (24), `label?` | Brand exception, as Logo. Decorative unless `label` is set. |
| `Button` | `<button>` | `variant?: 'filled'\|'outlined'\|'text'`, `size?: 'sm'\|'md'\|'lg'`, `icon?: IconName`, `arrow?`, `loading?`, `asChild?`, `disabled` | `loading` sets `aria-busy` and blocks `onClick`. `asChild` renders your `<a>` with button styling. |
| `IconButton` | `<button>` | `icon: IconName`, `aria-label` (or `aria-labelledby`, required by the type), `variant?: 'filled'\|'outlined'\|'text'`, `size?: 'sm'\|'md'\|'lg'`, `asChild?` | No visible text, so an accessible name is mandatory. `asChild` for social links. |
| `TextField` | wrapper + `<input>` | `label` (required; `hideLabel?` to hide visually), `helperText?`, `error?`, `success?`, `endIcon?: IconName`, native input props | `error` wires `aria-invalid` + `aria-describedby` and shows text, not only red (R7). |
| `Tag` | `<span>` | `variant?: 'outlined'\|'filled'`, `color?: 'brand'\|'highlight'\|'accent'\|'neutral'`, `size?: 'sm'\|'md'` | Non-interactive label. |
| `StepNumber` | `<div>` | `value: number`, `caption?`, `size?: 'sm'\|'md'\|'lg'`, `tone?: 'brand'\|'highlight'\|'accent'` | |
| `PortfolioCard` | `<article>` | `href`, `title`, `client?`, `image?`, `tags?`, `headingLevel?: 2\|3\|4`, `linkProps?` | One link per card (the title); the whole card is the hit area. |
| `Stepper` | `<nav>` / `<ol>` | `steps: (string \| { id?, label })[]`, `current: number`, `onStepClick?`, `compact?`, `completedLabel?`, `formatSummary?` | Current step has `aria-current="step"`; done/current/upcoming are derived from `current`, never stored. |
| `SiteHeader` | `<header>` | `links: { label, href }[]`, `current?` (href of the current page), `cta?`, `logoVariant?: 'main'\|'on-dark'\|'mono-light'`, `logoHref?`, `renderLink?` (router integration), `menuOpen` / `defaultMenuOpen` / `onMenuOpenChange`, `skipLinkHref?`, `navLabel?`, `menuLabel?` | Includes a skip link. Mobile menu: Escape closes it and focus returns to the toggle. |
| `NavLink` | `<a>` | `href?`, `active?` (sets `aria-current="page"`), `asChild?` | Use `asChild` to wrap your router's `Link`. |
| `SiteFooter` | `<footer>` | `social?: { facebook?, instagram?, linkedin? }`, `legal?: { label, href }[]`, `copyright?`, `surface?: 'inverse'\|'canvas'`, `logoVariant?`, `renderLink?` | Inverse surface in Light, canvas in Dark / Web 2025. Social links open in a new tab and say so. |

The source JSDoc wins if it ever differs from this table.

### Usage

```tsx
import { Button, IconButton, TextField, Tag } from '@nicasource/ds';

<Button variant="filled" size="md" icon="arrow-right" onClick={handleContact}>Contact us</Button>
<Button asChild variant="text"><a href="/work">See our work</a></Button>
<IconButton icon="close" aria-label="Close menu" variant="text" onClick={handleClose} />
<TextField label="Work email" type="email" error={emailError} onChange={handleEmailChange} />
<Tag color="accent" variant="filled">AI</Tag>
```

---

## 6. Anti-patterns

| Don't | Why | Do |
| --- | --- | --- |
| `color: #0d3c8a` / `background: rgb(…)` | Breaks theming and AA checks (R2) | A semantic `--ns-color-*` token |
| `var(--ns-color-blue-600)` in a component | Primitives don't follow the theme (R1) | `--ns-color-bg-brand` / `-text-brand` |
| `var(--ns-palette-navy-800)` in Button | Palettes are sub-brand colors (R1) | Semantic token; palettes only in Logo/NSMark |
| `padding: 12px 18px` | Off-scale values (R3) | `var(--ns-spacing-12) var(--ns-spacing-16)` |
| `outline: none` on `:focus` | Keyboard users lose their place (R4) | The standard `:focus-visible` outline |
| `[data-theme='dark'] .ns-x { color: … }` | Theme logic belongs in tokens (R5) | A semantic token that already switches |
| `<Button state="hover">`, `isHovered` prop | States are CSS (R8) | `:hover`, `:focus-visible`, `:active`, `disabled` |
| `filter: brightness(0.9)` / `opacity` for hover | Unpredictable contrast (R8) | `*-hover` / `*-pressed` tokens |
| A red border as the only error signal | Color alone (R7) | Error text + icon + `aria-invalid` |
| Editing `tokens/css/tokens.css` or `generated.ts` | Overwritten on next export (R9, R10) | Change Figma, re-export, `npm run build:tokens` |
| `function Card() { const Row = () => …; return <Row/> }` | Nested definition remounts every render (K3) | Top-level `Row` |
| `key={index}` on a sortable list, `key={Math.random()}` | Breaks state and focus on reorder (K5) | `key={item.id}` |
| `useState(props.items.length)` + effect to sync | Derived state (K8) | `const count = items.length` |
| `useEffect(() => { if (clicked) track() }, [clicked])` | Event logic in an effect (K11) | Call `track()` in the click handler |
| `// eslint-disable-next-line react-hooks/exhaustive-deps` | Stale closures (K12) | Fix the deps |
| `addEventListener` with no cleanup, fetch with no abort | Leaks and races (K13) | Return a cleanup, use `AbortController` |
| `onClick={handleClick()}` | Runs during render (K14) | `onClick={handleClick}` |
| `git commit` on `main`, `git push origin main`, `--no-verify` | Bypasses review (R12) | Branch + PR |

---

## 7. Working in this repo

- Component contract: [docs/component-contract.md](docs/component-contract.md) (files, API, styling, tests, stories).
- Plan and inventory: [docs/IMPLEMENTATION-PLAN.md](docs/IMPLEMENTATION-PLAN.md).
- How to contribute (developers, designers, AI agents): [CONTRIBUTING.md](CONTRIBUTING.md).
- Short orientation for Claude Code: [CLAUDE.md](CLAUDE.md). Other agents: [AGENTS.md](AGENTS.md).

| Command | What it does |
| --- | --- |
| `npm run verify` | gen:tokens, typecheck, `lint:tokens`, ESLint, unit tests. Must pass before a PR. |
| `npm run lint:tokens` | Token contract only (fast; also runs in the pre-commit hook) |
| `npm run build:tokens` | Rebuild `tokens/` and `src/tokens/generated.ts` from the Figma snapshot |
| `npm run build` | `dist/` (ESM + `.d.ts`) and `dist/styles.css` |
| `npm run storybook` | Storybook on <http://localhost:6006> |
