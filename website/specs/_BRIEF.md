# Figma extraction brief (for spec agents)

Figma file: `eIwmOO5omtR1Tlhdjea0C6` (NS_2025_website). Desktop frames are 1513 wide, mobile 393 wide.
We are rebuilding the site as a headless-WordPress + React frontend using the `@nicasource/ds` design
system (this repo) in its `web-2025` theme. Your job is extraction only: no frontend code.

## Rules
- Before calling `get_design_context`, load the `figma:figma-design-to-code` skill and pass
  `skillNames: "figma-design-to-code"`. Call it per **section** node (not whole pages, they are too big).
  Use `get_screenshot` (maxDimension ~1600) to see each section; you can read the PNG after `curl`.
- Skip hidden sections (`hidden="true"` in metadata).
- Download every image/SVG asset the section needs from the URLs `get_design_context` returns
  (curl immediately, URLs expire) into `website/frontend/public/assets/<page-slug>/` with
  descriptive kebab-case names (`hero-globe.png`, `tz-pacific.jpg`, `client-welink.svg`).
  Shared things (client logos, footer badges, nav logo, banner backgrounds reused across pages) go in
  `website/frontend/public/assets/shared/` — check if a file already exists there before downloading again.
  Do NOT download the NicaSource logo: the DS `<Logo>` component covers it. Icons: prefer DS icon names
  (see `src/icons/generated.ts` for the 180 names); only download an icon if no DS icon fits.
  Big gradient "texture text" headings (e.g. "Build a Team That Works When You Do") — download the
  texture image used as the text fill, we will render it with `background-clip: text`.
- Map styles to the design system, not raw values:
  - text → closest `.ns-text-web-*` class (see `tokens/css/text-styles.css` and the `--ns-font-size-web-*`
    values in `tokens/css/tokens.css`). Note Figma px size/weight next to it.
  - colors → `web-2025` semantic tokens (`--ns-color-bg-canvas`, `-bg-surface`, `-text-primary`,
    `-text-secondary`, `-text-brand`, `-text-accent`, `-border-brand`, ...; see the `[data-theme='web-2025']`
    block in `tokens/css/tokens.css`). Note the Figma hex next to it.
  - spacing/radius → `--ns-spacing-*` / `--ns-radius-*` nearest value.
  - DS components where they fit: Button, IconButton, Tag, TextField, PortfolioCard, StepNumber, Stepper,
    SiteHeader, SiteFooter, NavLink, Logo, NSMark, Icon.
- Copy all visible text **verbatim** (headings, body, labels, CTAs, list items).

## Output: one markdown file per page, `website/specs/<page-slug>.md`
For each visible section, in page order:

```
## <n>. <Section name> — <pattern>   (desktop <nodeId> · mobile <nodeId>)
Pattern: one of hero | logo-marquee | statement | bento-services | texture-heading | feature-split |
  timezone-bento | process-steps | testimonial-carousel | insights-grid | cta-banner | seo-states |
  contact-form | card-grid | stats | rich-text | job-list | case-study-list | other:<name>
Layout desktop: container width, columns, alignment, paddings (tokens), gaps, card radii/borders.
Layout mobile: what changes (stacking order, hidden items, carousel vs grid, font sizes).
Typography: element → .ns-text-web-* (figma px/weight)
Colors: element → token (figma hex)
Content: (verbatim, as structured YAML-ish fields: eyebrow, heading, body, cta {label, href guess}, items[...])
Assets: local path → where it sits, rendered size
Interactions/behaviour: hover, carousel, tabs, marquee, sticky, accordions, anything implied
DS components: which to use
```

End the file with a short "Page notes" list (anything odd, inconsistencies between desktop and mobile,
placeholder content like "State Name").

Keep the spec factual and compact. Don't stop to ask questions; make a reasonable call and note it.
