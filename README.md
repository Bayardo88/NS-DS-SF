# NicaSource Design System V2

Code home for the NicaSource Design System V2 design tokens. The source of truth is the
Figma file **Design System V2** (`JdINnstfRHeLRPZjeEla4U`). Every token here mirrors a
Figma variable or style, and every CSS custom property uses the variable's WEB code syntax
from Figma exactly, so a name you see in Figma's inspect panel is the name you write in code.

## Components

The Figma file also holds the component library: one page per component (Icons, Brand, Button,
Icon Button, Text Field, Tag, Card, Stepper, Step Number, Navigation Bar, Footer), 342 variants in
total, every one bound to these tokens and working in all three color modes. Start with the
**📖 Read me first** page. Each component page has a documentation panel with anatomy, the Figma
properties and the code props they map to, states and behavior, accessibility, a React example and
a JSON spec for AI agents. The components aren't implemented in code in this repo yet.

## Using the tokens

```html
<link rel="stylesheet" href="tokens/css/tokens.css" />
<!-- optional: utility classes for the 105 Figma text styles -->
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
Mobile value differs. Right now that's 41 values:
- the 29 Web 2025 `web-*` font sizes, line heights and letter spacings
- the 12 Web 2023 `web23-*` hero, title, subtitle and body sizes and line heights

For example, `--ns-font-size-web-h1` is 70px on desktop and 40px on mobile, and
`--ns-font-size-web23-hero-xl` is 120px on desktop and 60px on mobile. Anything that uses these
variables, including the `.ns-text-web-*` and `.ns-text-web-2023-*` classes, adapts with no extra
CSS. The `Primary/*` and `Secondary/*` scales, and the Web 2023 label and overline, are the same in both modes.

## Files

| Path | What it is |
| --- | --- |
| `tokens/tokens.json` | Every token in [W3C DTCG 2025.10](https://www.designtokens.org/tr/2025.10/format/) format. Aliases are kept as `{group.token}` references. |
| `tokens/css/tokens.css` | CSS custom properties. `:root` holds the primitives, brand palettes, light semantic colors, desktop typography, all other dimensions in px, effects and gradients. Figma variable descriptions appear as comments. After it come the dark and web-2025 theme blocks and the mobile type media query. |
| `tokens/css/text-styles.css` | `.ns-text-*` classes, one per Figma text style, built from the typography variables. |
| `tokens/figma/*.json` | Raw snapshot of the Figma variables and styles. The build reads these files; don't edit them by hand. |
| `scripts/figma-export.js` | Read-only Figma Plugin API script that writes the snapshot. |
| `scripts/build-tokens.mjs` | Builds `tokens.json` and the CSS from the snapshot. Uses Node 18+ and has no dependencies. |

## Token architecture

Two tiers. Components use **semantic** tokens. **Primitives** are the raw palette that the
semantic tokens alias. The NS Corporate ramps are red, blue, golden, cream, gray, orange and green.
The Web 2025 ramps are night, slate, coral and honey. Primitives have no Figma scopes, so they stay out of Figma's property
pickers. **Brand palettes** sit apart from both tiers; see below.

| Figma collection | Modes | Count | DTCG group | CSS prefix | Examples |
| --- | --- | ---: | --- | --- | --- |
| Primitives | Value | 126 | `primitives` | `--ns-color-*` | `--ns-color-blue-600`, `--ns-color-night-900`, `--ns-color-alpha-wine-50` |
| Color (semantic) | Light, Dark, Web 2025 | 67 | `color` | `--ns-color-{bg,text,border,icon}-*` | `--ns-color-bg-brand`, `--ns-color-bg-glass`, `--ns-color-border-input` |
| Spacing | Value | 22 | `spacing` | `--ns-spacing-*` | `--ns-spacing-16` (the name is the px value) |
| Shape | Value | 14 | `shape` | `--ns-radius-*`, `--ns-border-width-*` | `--ns-radius-3xl` (40px), `--ns-border-width-regular` (1.5px) |
| Size | Value | 8 | `size` | `--ns-size-{icon,control}-*` | `--ns-size-icon-md`, `--ns-size-control-lg` |
| Typography | Desktop, Mobile | 99 | `typography` | `--ns-font-*`, `--ns-line-height-*`, `--ns-letter-spacing-*` | `--ns-font-size-body-md`, `--ns-font-size-web23-title`, `--ns-font-family-bites-display` |
| Effects | Value | 5 | `effects` | `--ns-blur-*` | `--ns-blur-sm` (6px), `--ns-blur-lg` (24px), `--ns-blur-xl` (40px), `--ns-blur-2xl` (80px), `--ns-blur-glow` (240px) |
| Brand Palettes | Value | 180 | `palette` | `--ns-palette-*` | `--ns-palette-navy-800`, `--ns-palette-crimson-500`, `--ns-palette-chalk-900` |

That's 521 variables in total.

### Brand palettes

The 18 ramps (50–900) are the colors of NicaSource's sub-brands and past websites. They aren't
aliased by the semantic tokens and don't change with the theme. Use them on campaign or sub-brand
pages, and use the semantic `--ns-color-*` tokens everywhere else. Each ramp's Figma description
names who uses it. That description is the token's `$description` in `tokens.json` and a comment
above the ramp in `tokens.css`.

| Ramps | Used by |
| --- | --- |
| yellow | Careers, Insights |
| pink, wine | Careers |
| neutral | Careers (Black), website placeholders and greys |
| salmon | Talks (Coral), Insights, Careers |
| cyan | Talks (Light Blue), Careers |
| chalk | Insights, Ignite, Awards; Web 2023 page background (`chalk-900`) |
| purple | Insights |
| gold | Awards (Yellow Gold) |
| lime, indigo, amber | Ignite (lime; Neon Blue; Orange) |
| violet, fuchsia, citrine | Bites |
| teal | Bites (Light Blue), Careers |
| navy | Web 1, Web 2, Web 2023, 404, Privacy |
| crimson | Web 2023 CTA |

Unlike primitives, palette variables are scoped to fills, strokes and effect colors in Figma, so
designers can pick them directly.

Styles, which are composite tokens:

| Figma style | Count | DTCG group / `$type` | CSS |
| --- | ---: | --- | --- |
| `Elevation/XS…XL` effect styles | 5 | `elevation` / `shadow` | `--ns-elevation-{xs,sm,md,lg,xl}` for `box-shadow` (multi-layer; colors reference the alpha primitives) |
| `Inset/Hairline` effect style | 1 | `inset` / `shadow` | `--ns-inset-hairline` for `box-shadow` (`inset 0 0 1px 0`, black 10%) |
| `Shadow/Hard`, `Shadow/Wine`, `Shadow/Float` effect styles | 3 | `shadow` / `shadow` | `--ns-shadow-hard` (Careers retro offset), `--ns-shadow-wine` (Careers), `--ns-shadow-float` (Web 2023) for `box-shadow` |
| `Glass/SM`, `Glass/LG`, `Glass/XL` effect styles | 3 | `glass` / `dimension` | `--ns-glass-sm`, `--ns-glass-lg`, `--ns-glass-xl` for `backdrop-filter`, e.g. `blur(var(--ns-blur-sm))`. Pair with `--ns-color-bg-glass`. `Glass/XL` also has a drop shadow, exported separately as `--ns-glass-xl-shadow` (`glass.xl-shadow`, a `shadow` token) for `box-shadow`. |
| `Glow/LG`, `Glow/XL` effect styles | 2 | `glow` / `dimension` | `--ns-glow-lg` (80px), `--ns-glow-xl` (240px) for `filter`, used for background light blobs |
| `Gradient/*` paint styles | 18 | `gradient` / `gradient` | Corporate: `--ns-gradient-blue-light-to-dark`, `-red-light-to-dark`, `-blue-base-to-dark`, `-red-base-to-dark`. Web: `-night-fade`, `-web-2023-sunset`. Sub-brands: `-careers-gold`, `-careers-gold-light`, `-careers-sky`, `-red-to-wine`, `-red-to-yellow`, `-cyan-to-navy`, `-salmon-to-red`, `-bites-violet`, `-insights-purple`, `-awards-gold`, `-talks-teal`, `-talks-salmon` |
| `Primary/*`, `Secondary/*`, `Web/*`, `Web 2023/*` text styles | 105 | `text-style` / `typography` | `.ns-text-{primary,secondary,web,web-2023}-{size}-{weight}`, e.g. `.ns-text-primary-body-md-semibold`, `.ns-text-web-h1-black`, `.ns-text-web-2023-hero-xl-extra-bold` |

```css
.glass-panel {
  background: var(--ns-color-bg-glass);
  backdrop-filter: var(--ns-glass-lg);
  box-shadow: var(--ns-inset-hairline);
}

.web-2023-card {
  border-radius: var(--ns-radius-3xl);
  backdrop-filter: var(--ns-glass-xl);
  box-shadow: var(--ns-glass-xl-shadow);
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
  primitive of the same hex, or to the brand-palette color if no primitive matches. For example,
  Night Fade's `#000000` becomes `{palette.neutral.900}`. A color with no match stays literal, like the two Careers Gold stops.
  The CSS angle is computed from the Figma gradient transform: `90deg` is left to right and Night Fade's
  `180deg` is top to bottom.
- `Secondary/Overline SM/Demi Bold` is the one text style with percent letter spacing (4%) and a
  text case (uppercase). The snapshot records these in an extra trailing column. In CSS the class
  sets `letter-spacing: 0.04em` and `text-transform: uppercase`. In `tokens.json`, `letterSpacing` is
  the px value at the style's size (0.56px), and the percent and case are under `$extensions`.
- DTCG has no filter type. Glass and Glow are stored as their blur-radius `dimension`, and
  `$extensions["com.nicasource.css"]` records the CSS property and the `blur()` wrapper.

### Fonts

- **Primary:** Fira Code (`--ns-font-family-primary`).
- **Web:** Public Sans (`--ns-font-family-web`), used by the `Web/*` text styles on the
  Web 2025 website.
- **Site body:** Open Sans (`--ns-font-family-site-body`), body copy on the 2019–2023 websites.
  `Web 2023/Body/Regular` uses it.
- **Tertiary:** Plus Jakarta Sans (`--ns-font-family-tertiary`), UI and body copy in the v1 brand
  guideline pages.
- **Sub-brand display faces:** Atrament (`--ns-font-family-careers-display`, NS Careers), Hello
  Paris Sans (`--ns-font-family-awards-display`, NS Awards), Asphalts Display
  (`--ns-font-family-talks-display`, NS Talks) and Bebas Neue (`--ns-font-family-bites-display`, NS Bites).
  These are tokens only. No text style uses them yet.
- **Secondary:** Greycliff CF (`--ns-font-family-secondary`). Until Greycliff CF is installed,
  Figma's `Secondary/*` and `Web 2023/*` text styles render in **Plus Jakarta Sans** as a stand-in.
  The exception is `Web 2023/Body`, which uses Open Sans. Those tokens
  carry `$extensions["com.figma"].standInFor`. In CSS, Plus Jakarta Sans is the first fallback after
  Greycliff CF. The CSS font-family values add fallback stacks after the Figma family. Those
  stacks live in `FONT_FALLBACKS` in the build script.
- The weight comes from the style name: ExtraLight 200, Light 300, Regular 400, Medium 500,
  SemiBold/Demi Bold 600, Bold 700, Extra Bold (`extrabold`) and Heavy (`heavy`) 800, Black 900.

The font files themselves aren't in this repo yet. Load them yourself (`@font-face` or a font service).

## Regenerating from Figma

1. Open `scripts/figma-export.js`. Run it against the Figma file once for each `PART`
   (`variables`, `effects`, `text`), using the Figma MCP `use_figma` tool or a development plugin.
   Save each result over `tokens/figma/variables.json`, `effects.json` and `text-styles.json`. The script
   only reads the file and never changes it. `use_figma` caps each result at 20 KB. If a part is over
   the limit, set `ONLY` to export it in pieces, then merge them in Figma's order: collection names for
   `variables`, style-name prefixes for `text`. A collection that is still too big, like Brand Palettes,
   can be read in index ranges with `SLICE`.
2. Run the build:

   ```bash
   node scripts/build-tokens.mjs
   ```

   The build fails on unresolved aliases, duplicate token paths or CSS names, a mode with no CSS
   output configured (`MODE_CSS` in the build script), and text styles whose values drift from their
   typography variables. At the end it prints the count for each collection.
3. Review the diff and commit the snapshot and the generated files together.
