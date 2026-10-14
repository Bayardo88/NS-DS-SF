# NicaSource Design System V2

Code home for the NicaSource Design System V2 design tokens. The source of truth is the
Figma file **Design System V2** (`JdINnstfRHeLRPZjeEla4U`). Every token here mirrors a
Figma variable or style, and every CSS custom property uses the variable's WEB code syntax
from Figma exactly, so a name you see in Figma's inspect panel is the name you write in code.

## Using the tokens

```html
<link rel="stylesheet" href="tokens/css/tokens.css" />
<!-- optional: utility classes for the 95 Figma text styles -->
<link rel="stylesheet" href="tokens/css/text-styles.css" />
```

```css
.card {
  background: var(--ns-color-bg-surface);
  color: var(--ns-color-text-primary);
  padding: var(--ns-spacing-24);
  border: var(--ns-border-width-thin) solid var(--ns-color-border-default);
  border-radius: var(--ns-radius-lg);
  box-shadow: var(--ns-elevation-sm);
}
```

### Themes

The semantic `Color` collection has three modes. Each mode is a CSS theme:

| Figma mode | How to apply it | Look |
| --- | --- | --- |
| Light | Default. Set `data-theme="light"` to force it. | NS Corporate on cream and white |
| Dark | `data-theme="dark"`, or automatic from `prefers-color-scheme: dark` when no `data-theme` is set on `<html>` | NS Corporate on deep blue |
| Web 2025 | `data-theme="web-2025"` | Website theme: night surfaces, coral brand, honey accent |

```html
<html data-theme="web-2025">
```

Set `data-theme` on `<html>`, or on any element to theme just that subtree. The system dark
preference only applies to the page root when no `data-theme` is set there, so an explicit
theme always wins. Only the semantic colors change between themes. Primitives, dimensions,
effects and gradients stay the same in every theme. Each theme also sets `color-scheme` from
how light its canvas is (web-2025 is dark), so form controls and scrollbars match.

### Responsive type

The `Typography` collection has a **Desktop** mode, which is the `:root` default, and a
**Mobile** mode. Below 768px wide, `@media (max-width: 767px)` overrides only the variables whose
Mobile value differs. Right now that's the 29 `web-*` font sizes, line heights and letter spacings.
For example, `--ns-font-size-web-h1` is 70px on desktop and 40px on mobile. Anything that uses
these variables, including the `.ns-text-web-*` classes, adapts with no extra CSS. The
`Primary/*` and `Secondary/*` scales are the same in both modes.

## Files

| Path | What it is |
| --- | --- |
| `tokens/tokens.json` | Every token in [W3C DTCG 2025.10](https://www.designtokens.org/tr/2025.10/format/) format. Aliases are kept as `{group.token}` references. |
| `tokens/css/tokens.css` | CSS custom properties. `:root` holds the primitives, light semantic colors, desktop typography, all other dimensions in px, effects and gradients. After it come the dark and web-2025 theme blocks and the mobile type media query. |
| `tokens/css/text-styles.css` | `.ns-text-*` classes, one per Figma text style, built from the typography variables. |
| `tokens/figma/*.json` | Raw snapshot of the Figma variables and styles. The build reads these files; don't edit them by hand. |
| `scripts/figma-export.js` | Read-only Figma Plugin API script that writes the snapshot. |
| `scripts/build-tokens.mjs` | Builds `tokens.json` and the CSS from the snapshot. Uses Node 18+ and has no dependencies. |

## Token architecture

Two tiers. Components use **semantic** tokens. **Primitives** are the raw palette that the
semantic tokens alias. The NS Corporate ramps are red, blue, golden, cream, gray, orange and green.
The Web 2025 ramps are night, slate, coral and honey. Primitives have no Figma scopes, so they stay out of Figma's property
pickers.

| Figma collection | Modes | Count | DTCG group | CSS prefix | Examples |
| --- | --- | ---: | --- | --- | --- |
| Primitives | Value | 121 | `primitives` | `--ns-color-*` | `--ns-color-blue-600`, `--ns-color-night-900`, `--ns-color-alpha-black-10` |
| Color (semantic) | Light, Dark, Web 2025 | 66 | `color` | `--ns-color-{bg,text,border,icon}-*` | `--ns-color-bg-brand`, `--ns-color-bg-glass`, `--ns-color-text-on-brand` |
| Spacing | Value | 20 | `spacing` | `--ns-spacing-*` | `--ns-spacing-16` (the name is the px value) |
| Shape | Value | 13 | `shape` | `--ns-radius-*`, `--ns-border-width-*` | `--ns-radius-2xl`, `--ns-border-width-regular` (1.5px) |
| Size | Value | 8 | `size` | `--ns-size-{icon,control}-*` | `--ns-size-icon-md`, `--ns-size-control-lg` |
| Typography | Desktop, Mobile | 76 | `typography` | `--ns-font-*`, `--ns-line-height-*`, `--ns-letter-spacing-*` | `--ns-font-size-body-md`, `--ns-font-size-web-h1`, `--ns-font-weight-black` |
| Effects | Value | 3 | `effects` | `--ns-blur-*` | `--ns-blur-sm` (6px), `--ns-blur-lg` (24px), `--ns-blur-glow` (240px) |

That's 307 variables in total.

Styles, which are composite tokens:

| Figma style | Count | DTCG group / `$type` | CSS |
| --- | ---: | --- | --- |
| `Elevation/XS…XL` effect styles | 5 | `elevation` / `shadow` | `--ns-elevation-{xs,sm,md,lg,xl}` for `box-shadow` (multi-layer; colors reference the alpha primitives) |
| `Inset/Hairline` effect style | 1 | `inset` / `shadow` | `--ns-inset-hairline` for `box-shadow` (`inset 0 0 1px 0`, black 10%) |
| `Glass/SM`, `Glass/LG` effect styles | 2 | `glass` / `dimension` | `--ns-glass-sm`, `--ns-glass-lg` for `backdrop-filter`, e.g. `blur(var(--ns-blur-sm))`. Pair with `--ns-color-bg-glass`. |
| `Glow/XL` effect style | 1 | `glow` / `dimension` | `--ns-glow-xl` for `filter` (`blur(var(--ns-blur-glow))`), used for background light blobs |
| `Gradient/*` paint styles | 5 | `gradient` / `gradient` | `--ns-gradient-blue-light-to-dark`, `-red-light-to-dark`, `-blue-base-to-dark`, `-red-base-to-dark`, `-night-fade` |
| `Primary/*`, `Secondary/*`, `Web/*` text styles | 95 | `text-style` / `typography` | `.ns-text-{primary,secondary,web}-{size}-{weight}`, e.g. `.ns-text-primary-body-md-semibold`, `.ns-text-web-h1-black` |

```css
.glass-panel {
  background: var(--ns-color-bg-glass);
  backdrop-filter: var(--ns-glass-lg);
  box-shadow: var(--ns-inset-hairline);
}
```

### Naming

- The CSS property is taken from the variable's WEB code syntax in Figma, e.g.
  `bg/brand` → `--ns-color-bg-brand`, `icon/md` (Size) → `--ns-size-icon-md`. The build never
  derives names on its own.
- A DTCG path is the collection's group followed by the Figma name segments, e.g. `Color / bg/brand` → `color.bg.brand`
  and `Primitives / blue/600` → `primitives.blue.600`. A duplicated leading segment is
  dropped, so `Spacing / spacing/8` → `spacing.8`.
- Semantic colors are named by role, then variant: `bg/brand-hover`, `text/on-brand`,
  `border/focus`, `icon/success`.

### DTCG notes

- `$value` holds the value in the collection's default mode (Light, or Desktop for typography).
  Collections with more than one mode list every mode under `$extensions["com.figma"].modes`, e.g.
  `{ "Light": "{primitives.blue.600}", "Dark": "{primitives.blue.300}", "Web 2025": "{primitives.coral.500}" }`.
- `$extensions["com.figma"]` also records the collection, the Figma variable name, the
  scopes and the code syntax, so tokens can be traced back to Figma.
- Colors use the 2025.10 object form (`colorSpace`, `components`, optional `alpha`, `hex`).
  Dimensions use `{ "value": 16, "unit": "px" }`.
- Line heights are px dimensions because Figma defines them in px. The `typography`
  composites reference them as they are, without converting to unitless ratios.
- Gradient stops in Figma are literal colors. The build replaces each one with a reference to the
  primitive of the same hex. A color with no matching primitive stays literal, like the `#000000` in Night Fade.
  The CSS angle is computed from the Figma gradient transform: `90deg` is left to right and Night Fade's
  `180deg` is top to bottom.
- DTCG has no filter type. Glass and Glow are stored as their blur-radius `dimension`, and
  `$extensions["com.nicasource.css"]` records the CSS property and the `blur()` wrapper.

### Fonts

- **Primary:** Fira Code (`--ns-font-family-primary`).
- **Web:** Public Sans (`--ns-font-family-web`), used by the `Web/*` text styles on the
  Web 2025 website.
- **Secondary:** Greycliff CF (`--ns-font-family-secondary`). Until Greycliff CF is installed,
  Figma's `Secondary/*` text styles render in **Plus Jakarta Sans** as a stand-in. Those tokens
  carry `$extensions["com.figma"].standInFor`. In CSS, Plus Jakarta Sans is the first fallback after
  Greycliff CF. The CSS font-family values add fallback stacks after the Figma family. Those
  stacks live in `FONT_FALLBACKS` in the build script.
- The weight comes from the style name: ExtraLight 200, Light 300, Regular 400, Medium 500,
  SemiBold/Demi Bold 600, Bold 700, Heavy 800, Black 900.

The font files themselves aren't in this repo yet. Load them yourself (`@font-face` or a font service).

## Regenerating from Figma

1. Open `scripts/figma-export.js`. Run it against the Figma file once for each `PART`
   (`variables`, `effects`, `text`), using the Figma MCP `use_figma` tool or a development plugin.
   Save each result over `tokens/figma/variables.json`, `effects.json` and `text-styles.json`. The script
   only reads the file and never changes it. `use_figma` caps each result at 20 KB. If a part is over
   the limit, set `ONLY` to export it in pieces, then merge them in Figma's order: collection names for
   `variables`, style-name prefixes for `text`.
2. Run the build:

   ```bash
   node scripts/build-tokens.mjs
   ```

   The build fails on unresolved aliases, duplicate token paths or CSS names, a mode with no CSS
   output configured (`MODE_CSS` in the build script), and text styles whose values drift from their
   typography variables. At the end it prints the count for each collection.
3. Review the diff and commit the snapshot and the generated files together.
