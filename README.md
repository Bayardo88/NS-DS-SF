# NicaSource Design System V2

Code home for the NicaSource Design System V2 design tokens. The source of truth is the
Figma file **Design System V2** (`JdINnstfRHeLRPZjeEla4U`). Every token here mirrors a
Figma variable or style, and every CSS custom property uses the variable's WEB code syntax
from Figma exactly, so a name you see in Figma's inspect panel is the name you write in code.

## Using the tokens

```html
<link rel="stylesheet" href="tokens/css/tokens.css" />
<!-- optional: utility classes for the 75 Figma text styles -->
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

**Theming.** Light is the default. Dark mode applies with `data-theme="dark"` on any ancestor
(usually `<html>`), or automatically from the system `prefers-color-scheme: dark` unless the page
forces `data-theme="light"`. Only the semantic colors change between modes. Primitives,
dimensions, elevation and gradients stay the same in both modes.

## Files

| Path | What it is |
| --- | --- |
| `tokens/tokens.json` | Every token in [W3C DTCG 2025.10](https://www.designtokens.org/tr/2025.10/format/) format. Aliases are kept as `{group.token}` references. |
| `tokens/css/tokens.css` | CSS custom properties: `:root` (primitives, light semantic colors, dimensions in px, elevation, gradients), plus dark overrides. |
| `tokens/css/text-styles.css` | `.ns-text-*` classes, one per Figma text style, built from the typography variables. |
| `tokens/figma/*.json` | Raw snapshot of the Figma variables and styles. The build reads these files; don't edit them by hand. |
| `scripts/figma-export.js` | Read-only Figma Plugin API script that writes the snapshot. |
| `scripts/build-tokens.mjs` | Builds `tokens.json` and the CSS from the snapshot. Uses Node 18+ and has no dependencies. |

## Token architecture

Two tiers. Components use **semantic** tokens. **Primitives** are the raw palette that the
semantic tokens alias. Primitives have no Figma scopes, so they stay out of Figma's property
pickers.

| Figma collection | Modes | Count | DTCG group | CSS prefix | Examples |
| --- | --- | ---: | --- | --- | --- |
| Primitives | Value | 79 | `primitives` | `--ns-color-*` | `--ns-color-blue-600`, `--ns-color-alpha-black-10` |
| Color (semantic) | Light, Dark | 65 | `color` | `--ns-color-{bg,text,border,icon}-*` | `--ns-color-bg-brand`, `--ns-color-text-on-brand` |
| Spacing | Value | 16 | `spacing` | `--ns-spacing-*` | `--ns-spacing-16` (the name is the px value) |
| Shape | Value | 11 | `shape` | `--ns-radius-*`, `--ns-border-width-*` | `--ns-radius-md`, `--ns-border-width-thin` |
| Size | Value | 8 | `size` | `--ns-size-{icon,control}-*` | `--ns-size-icon-md`, `--ns-size-control-lg` |
| Typography | Value | 38 | `typography` | `--ns-font-*`, `--ns-line-height-*`, `--ns-letter-spacing-*` | `--ns-font-size-body-md`, `--ns-font-weight-semibold` |

Styles, which are composite tokens:

| Figma style | Count | DTCG group / `$type` | CSS |
| --- | ---: | --- | --- |
| `Elevation/XS…XL` effect styles | 5 | `elevation` / `shadow` | `--ns-elevation-{xs,sm,md,lg,xl}` (multi-layer `box-shadow`; colors reference the alpha primitives) |
| `Gradient/*` paint styles | 4 | `gradient` / `gradient` | `--ns-gradient-blue-light-to-dark`, `-red-light-to-dark`, `-blue-base-to-dark`, `-red-base-to-dark` |
| `Primary/*`, `Secondary/*` text styles | 75 | `text-style` / `typography` | `.ns-text-{primary,secondary}-{size}-{weight}`, e.g. `.ns-text-primary-body-md-semibold` |

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

- `$value` holds the default (Light) value. Every mode appears under
  `$extensions["com.figma"].modes`, e.g. `{ "Light": "{primitives.blue.600}", "Dark": "{primitives.blue.300}" }`.
- `$extensions["com.figma"]` also records the collection, the Figma variable name, the
  scopes and the code syntax, so tokens can be traced back to Figma.
- Colors use the 2025.10 object form (`colorSpace`, `components`, optional `alpha`, `hex`).
  Dimensions use `{ "value": 16, "unit": "px" }`.
- Line heights are px dimensions because Figma defines them in px. The `typography`
  composites reference them as they are, without converting to unitless ratios.
- Gradient stops in Figma are literal colors. The build replaces each one with a reference to the
  primitive of the same hex. The CSS angle (`90deg`, left to right) is computed from the Figma
  gradient transform.

### Fonts

- **Primary:** Fira Code (`--ns-font-family-primary`).
- **Secondary:** Greycliff CF (`--ns-font-family-secondary`). Until Greycliff CF is installed,
  Figma's `Secondary/*` text styles render in **Plus Jakarta Sans** as a stand-in. Those tokens
  carry `$extensions["com.figma"].standInFor`. In CSS, Plus Jakarta Sans is the first fallback after
  Greycliff CF. The CSS font-family values add fallback stacks after the Figma family. Those
  stacks live in `FONT_FALLBACKS` in the build script.
- The weight comes from the style name: Regular 400, Medium 500, SemiBold/Demi Bold 600,
  Bold 700, Heavy 800.

The font files themselves aren't in this repo yet. Load them yourself (`@font-face` or a font service).

## Regenerating from Figma

1. Open `scripts/figma-export.js`. Run it against the Figma file once for each `PART`
   (`variables`, `effects`, `text`), using the Figma MCP `use_figma` tool or a development plugin.
   Save each result over `tokens/figma/variables.json`, `effects.json` and `text-styles.json`. The script
   only reads the file and never changes it.
2. Run the build:

   ```bash
   node scripts/build-tokens.mjs
   ```

   The build fails on unresolved aliases, duplicate token paths or CSS names, and text styles
   whose values drift from their typography variables. At the end it prints the count for each collection.
3. Review the diff and commit the snapshot and the generated files together.
