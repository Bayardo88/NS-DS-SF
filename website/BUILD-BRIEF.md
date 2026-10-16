# Page-build brief (for build agents)

You are building pages of the NicaSource 2025 website reference in `website/`. It is a headless
WordPress (Playground, `wordpress/`) + React/Vite frontend (`frontend/`) on the `@nicasource/ds`
design system, `web-2025` theme. **Read first:** `../AI-GUIDE.md` §2–§4 (hard rules, React rules,
token decision tables), then the existing code listed below so you match it exactly.

## How it works
- Every URL is resolved by `frontend/src/layout/RoutePage.tsx` → `lib/wp.ts` `fetchRoute(path)` →
  WordPress `ns/v1/route`, falling back to the seed JSON in `content/` (so new content renders
  without restarting WordPress). Do **not** restart or kill the WordPress server or the Vite server.
- A page = `content/pages/NN-<slug>.json`: `{ slug, title, parent?, sections: [{ type, ...props }] }`.
  Child pages set `"parent": "<parent-slug>"` (e.g. `services/development` = slug `development`,
  parent `services`). Posts / jobs / case studies are files in `content/posts|jobs|case-studies/`
  with `meta` fields; their URLs are `/insights/<slug>`, `/careers/jobs/<slug>`, `/results/<slug>`.
  A post/job/case-study entry's own `sections` array renders its detail page (use template sections
  that read the entry through `useEntry()` from `lib/EntryContext.ts`).
- `type` → component lives in a registry. **You only edit your group's registry**
  `frontend/src/sections/<group>/index.ts` and put your new section components in that folder.
  Never edit `sections/registry.tsx` or another group's folder.

## Reuse before you build
Existing generic sections (read their props in the files): `hero`, `logo-marquee`, `bento-services`,
`texture-callout`, `general` (General Module: copy + media, contentSide, background mode,
testimonials), `timezone-bento`, `columns` (1–3 col number/title/body, card|plain), `post-bento`,
`banner`, `seo-states`, `contact` (contact module with tabs/chips/upload).
Shared components: `components/Rich.tsx` (`**bold**` + `\n` in CMS strings), `components/Cta.tsx`,
`components/Breadcrumb.tsx`, `components/OverlayCard.tsx` (photo card with tags + title),
`components/TestimonialCarousel.tsx`, `lib/entries.ts`, `lib/useAsync.ts` + `lib/wp.ts`
`fetchCollection('posts'|'jobs'|'case-studies')`.
DS components (import from `@nicasource/ds` only): Button (`asChild`, `variant`, `size`, `icon`,
`arrow`), IconButton, Icon (names in `../src/icons/generated.ts`), Tag, TextField, StepNumber, Stepper,
PortfolioCard, Logo. Prefer extending an existing section with a new optional prop over a new
section that is 90% the same. If you extend a shared section, keep it backward compatible.

## Rules (non-negotiable)
- Colors only `--ns-color-{bg,text,border,icon}-*` semantic tokens; spacing `--ns-spacing-*`, radius
  `--ns-radius-*`, border `--ns-border-width-*`, effects `--ns-elevation-*`/`--ns-glass-*`. No hex/rgb,
  no raw px except `1px` hairlines, `@media` widths, and the layout vars in `styles/site.css`
  (`--site-container`, `--site-gutter`, `--site-section-y`, `--site-hero-height`).
- Type = `.ns-text-web-*` classes (they are responsive at 767px). Don't set font sizes by hand.
- `.container`, `.section`, `.stack`, `.eyebrow(--brand)`, `.heading`, `.body-copy`, `.texture-text`
  from `styles/site.css`.
- One `<Name>.tsx` + `<Name>.css` per section; BEM-ish class names prefixed by the section name.
- React rules K1–K16 (no nested components, stable keys, effects only for external sync with
  cleanup, no eslint-disable for exhaustive-deps). Every interactive element has a `:focus-visible`
  ring: `outline: var(--ns-border-width-medium) solid var(--ns-color-border-focus); outline-offset: var(--ns-spacing-2);`.
- Accessibility: real buttons/links, ARIA tabs / disclosure patterns where the specs ask, alt text,
  marquees and auto-play stop under `prefers-reduced-motion`.
- Mobile ≤767px: stack columns, full-width CTAs, hover → press. The Figma mobile frames sometimes
  carry older copy: use desktop copy, mobile layout.
- Assets: only files under `frontend/public/assets/**` (referenced as `/assets/...`). If an image is
  over ~1.5 MB, make a `.jpg` copy with `sips -s format jpeg -s formatOptions 78 -Z 1800 in --out out`
  and reference that. No hot-linking.
- Placeholder copy from Figma (lorem, "State Name", "Brand + Project Name") may stay, but where the
  spec offers a sensible real-looking alternative, use it.

## Verify
1. `cd website && npx tsc --noEmit` passes.
2. In the browser pane, open your own tab (`tabs_create`) on `http://localhost:5173/<path>`; check
   console errors; check desktop at 1512 wide and mobile at 393 wide (`resize_window` with a custom
   size on your tab; reset to `desktop` preset when done). Compare to the Figma frame screenshots in
   your spec. Tip for full-page review: set the viewport to 1512×5600 and shift with
   `document.querySelector('main').style.marginTop='-5000px'`.
3. Report: pages/routes built, new section types (name + one-line purpose + props), assets added,
   anything you could not match and why.
