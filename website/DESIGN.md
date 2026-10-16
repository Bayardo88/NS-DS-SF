---
name: NicaSource Website 2025
version: 0.1.0
source:
  figma_website: eIwmOO5omtR1Tlhdjea0C6 (NS_2025_website; Desktop section 1:910, Mobile 13:8479, documentation 54:92226)
  figma_design_system: JdINnstfRHeLRPZjeEla4U (Design System V2)
code:
  design_system: "@nicasource/ds (repo root, theme web-2025)"
  site: website/ (headless WordPress + React/Vite)
theme: web-2025
breakpoints: { mobile: "≤767px", tablet: "768–1023px", desktop: "≥1024px", design_frames: [1512, 393] }
---

# NicaSource Website 2025 — DESIGN.md

The contract for designing and building screens of the NicaSource marketing website: what it is, how
it looks, and how to compose a new screen from code that already exists. Read it top to bottom once.
After that, §6 (section catalog) and §9 (recipe) are what you need to build.

> **Golden rule.** A screen is an ordered list of **sections** from §6, written as JSON content. Build
> new screens by composing and configuring existing sections. Write a new section only when no existing
> one can express the idea with its props, and then build it from `@nicasource/ds` tokens and
> components only.

---

## 1. Product and voice

**What:** NicaSource is a nearshore staff-augmentation company. It places pre-vetted, English-speaking
Latin American engineers (Software Development, Product Design, QA, Project Management, Salesforce)
inside US product teams, in US time zones.

**Audience:** busy product and engineering leaders (CTO, VP Engineering, Head of Product) at startups
and enterprises.

**Primary conversion:** book a call or send the contact form. Every page ends with the contact module
or a banner that points to it.

**Voice:** confident, plain and outcome-led. Short declarative headlines ("Built to fit, easy to
scale"). Talk about the reader's time, money and focus ("You're paying for 40 hours. But getting
24."). No jargon soup and no exclamation spam: at most one "!" per page.

**Recurring proof points:** pre-vetted and trained engineers; working in your time zone; "NS Time"
(8 extra hours of internal syncs, training and check-ins, so 40 billed hours stay 40 productive
hours); no hidden costs or project padding; you meet the COO or CTO first; you approve the team.

**CTA labels:** short, verb first, specific: "Get Your Elite Team Today", "Find the Right Fit",
"Book a Call and Recover 16 Hours", "Partner with Us", "Schedule a Call", "Explore Careers".

---

## 2. Visual language

A dark, deep-night canvas with coral (watermelon) actions, honey eyebrows and slate text. Large
**light-weight** headlines contrast with **black-weight** emphasis words inside the same sentence.

The site has three signature moves. Use at least one per page and no more than three:
1. **Texture call-outs:** giant uppercase or title-case Black text clipped over an iridescent liquid
   texture (`background-clip: text`).
2. **Glassy 3D illustrations:** translucent violet "glass" objects (LEGO blocks, donut charts, calendar
   tablets, keycaps) sitting directly on the canvas, with no card behind them.
3. **Bento grids:** outlined coral tiles, or photo tiles with a scrim, in an asymmetric CSS grid.

**Imagery:** real photography under a dark scrim (cities and landscapes for time zones, people at
work), 3D renders on transparent backgrounds, and liquid-chrome or wave textures for banners. Photos
always sit under `bg-overlay` or a gradient to the canvas, so text stays AA.

**Shape:** generous radii. Cards and bento tiles use `radius-xl` (24); featured cards and case-study
images use `radius-2xl` (32); chips and inputs use `radius-sm` (8); pills use `radius-full`.
Hairline 1px borders.

**Density:** airy. Sections breathe with `--site-section-y` (120 desktop / 64 mobile). Each section
has one idea.

---

## 3. Tokens (web-2025 theme)

Always reference the **token**. Hex values are given only so you can read a mockup; never write a hex
in code. Set `<html data-theme="web-2025">`. Tokens come from `@nicasource/ds/styles.css`.

### 3.1 Color roles

| Role | Token | Hex | Use |
| --- | --- | --- | --- |
| Page background | `--ns-color-bg-canvas` | #181728 | every section unless noted |
| Raised band / card | `--ns-color-bg-surface` | #292643 | header, contact band, logo pills, cards |
| Quiet well | `--ns-color-bg-surface-subtle` | #201e35 | inner wells |
| Light card | `--ns-color-bg-inverse` + `--ns-color-text-inverse` | #f6fcff / #181728 | testimonial card, light service card |
| Primary action | `--ns-color-bg-brand` (`-hover` #fd4f5f, `-pressed` #fd6a75) + `--ns-color-text-on-brand` | #fd2847 + #181728 | Buttons, selected chips, solid tags |
| Accent | `--ns-color-text-accent` / `--ns-color-border-accent` | #fde5ac | eyebrows, active tab underline, focus ring |
| Headline text | `--ns-color-text-secondary` | #bec8d8 | most H2s (slate, slightly muted) |
| Body / strong text | `--ns-color-text-primary` | #f6fcff | body on photos, hero H1, card titles |
| Muted text | `--ns-color-text-tertiary` | #a1acc0 | captions, meta |
| Brand text | `--ns-color-text-brand` | #fd6a75 | coral eyebrows, big step numbers, bento labels |
| Outline | `--ns-color-border-brand` | #fd2847 | bento tiles |
| Divider | `--ns-color-border-default` / `-subtle` | #413c64 / #292643 | card outlines, rules |
| Input border | `--ns-color-border-input` | #7c77a5 | fields (≥3:1) |
| Focus ring | `--ns-color-border-focus` | #fde5ac | outline 2px + 2px offset |
| Scrim | `--ns-color-bg-overlay` | rgb(17 17 17 / .4) | over photos |
| Glass | `--ns-color-bg-glass` + `backdrop-filter: var(--ns-glass-lg)` | white 8% | floating panels |

**Pairing rules.** Text on `bg-brand` is always `text-on-brand` (dark). Figma shows white on coral,
but that fails AA, so the DS wins. Eyebrows are `text-accent` (honey) by default and `text-brand`
(coral) for "proof" and "insights" sections. Never put coral text on a coral fill.

### 3.2 Typography: Public Sans, `.ns-text-web-*` classes

Each class sets family, size, weight, line-height and tracking together, and switches to mobile values
at ≤767px on its own. Never set font sizes by hand.

| Class | Desktop size/line | Mobile size/line | Weight | Use |
| --- | --- | --- | --- | --- |
| `ns-text-web-callout-xl-black` | 225/181 | 70/60 | 900 | single-word mega call-outs |
| `ns-text-web-callout-lg-black` | 160/150 | 50/40 | 900 | texture call-outs |
| `ns-text-web-banner-black` | 80/88 | 60/55 | 900 | banner headline |
| `ns-text-web-numbers-extralight` | 80/96 | 48/56 | 200 | step numbers "01", stats |
| `ns-text-web-h1-light` / `-black` | 70/76 | 40/44 | 300 / 900 | page H1 (hero) |
| `ns-text-web-h2-light` / `-black` | 42/48 | 32/38 | 300 / 900 | section headings, card titles |
| `ns-text-web-h3-light` / `-black` | 32/48 | 20/30 | 300 / 900 | sub-headings, time-zone names |
| `ns-text-web-h4-light` / `-black` | 24/27 | 18/22 | 300 / 900 | footer headings, small card titles |
| `ns-text-web-lead-medium` | 20/24 | 18/22 | 500 | lead lines, bento labels |
| `ns-text-web-body-light` / `-regular` | 18/27 | 16/24 | 300 / 400 | body copy (light is the default) |
| `ns-text-web-nav-medium` | 18/27 | 16/24 | 500 | navigation |
| `ns-text-web-eyebrow-black` | 16/18 | 14/16 | 900 | eyebrows, field labels |
| `ns-text-web-label-medium` | 14/16 | 14/16 | 500 | chips, small labels |
| `ns-text-web-caption-light` | 14/21 | 12/18 | 300 | captions, footer links, breadcrumbs |
| `ns-text-web-small-regular` | 12/18 | 12/18 | 400 | tags, legal |

**Mixed-weight headlines.** In content strings, wrap the emphasis words in `**…**`. The `<Rich>`
component renders them as `<strong>`, which the site CSS sets to weight 900. Example:
`"Our **track record**\nspeaks for itself."`. `\n` is a deliberate line break. `{{text}}` renders a coral
(`text-brand`) run, as in the Development hero's `{{<}}Code{{/>}}` glyphs. Use it rarely.

### 3.3 Spacing, size, radius, effects

- Spacing: `--ns-spacing-{0,2,4,6,8,10,12,16,20,24,32,40,48,56,60,64,80,96,100,120,150,180}`. The token
  name is the px value.
- Rhythm: section padding `--site-section-y` (120/64); heading → body gap 24; grid gaps 20 (12 on
  mobile); card padding 32 (24 on mobile).
- Radius: `--ns-radius-{xs 4, sm 8, md 12, lg 16, xl 24, 2xl 32, 3xl 40, full}`.
- Borders: `--ns-border-width-{thin 1, regular 1.5, medium 2, thick 4}`.
- Elevation: `--ns-elevation-{xs…xl}`. Rarely used on the dark site; depth comes from scrims and glass.
- Motion: 200–300 ms ease for hover; 500–600 ms for image zoom. Marquees loop linearly (~40 s). All
  motion stops under `prefers-reduced-motion`.

### 3.4 Layout

| Constant (site-only, `styles/site.css`) | Value | Note |
| --- | --- | --- |
| `--site-container` | 1152px | content width in the 1512 frame (180px side margins) |
| `--site-container-wide` | 1352px | footer and full-width grids |
| `--site-gutter` | 24 / 20 mobile | side padding inside `.container` |
| `--site-section-y` | 120 / 64 mobile | vertical section padding |
| `--site-hero-height` | 843px | hero height (capped at 100svh) |

These are the only raw values allowed in site code. Helpers: `.container`, `.container--wide`,
`.section`, `.section--tight`, `.stack` (column, gap 24), `.eyebrow`, `.eyebrow--brand`,
`.heading`, `.body-copy`, `.texture-text`.

---

## 4. Design-system components (`@nicasource/ds`)

Import from the package root only. Interaction states are CSS; only `loading` is a prop.

| Component | Use on the site |
| --- | --- |
| `SiteHeader` | sticky top bar: logo (on-dark), 7 links, mobile full-screen menu, skip link. Fed by WP `site.nav` |
| `Button` | every CTA. `variant="filled"` (coral pill + arrow bubble) for primary; `outlined` for secondary (Send, Subscribe, Explore Careers); `asChild` around links. `size="lg"` in heroes and modules, `sm` in forms |
| `IconButton` | social links, carousel controls. Always `aria-label` |
| `Icon` | 180 names (`home`, `chevron-right`, `clock`, `shield-check`, `send`, `close`, `arrow-up-right`, `code`, `share`, `instagram`, `facebook`, `linkedin`…) |
| `TextField` | every single-line input (label required) |
| `Tag` | non-interactive labels |
| `Logo` | NicaSource logo (`on-dark`) in header and footer |
| `StepNumber`, `Stepper`, `PortfolioCard`, `NavLink`, `NSMark` | available; not used on the current pages |

**Gaps, composed locally from tokens:** Breadcrumb, multi-select Chip (toggle button with
`aria-pressed`), TextArea, Select, File input, Accordion, Tabs, the solid coral Tag used on photo cards
(`OverlayCard`), and the full Footer (the DS `SiteFooter` is a simpler bar). Before adding anything,
check whether these already exist in `website/frontend/src/components`.

---

## 5. Page anatomy

```
SiteHeader (sticky, surface)                        ← WP site.nav
<main>
  hero                 843px, photo/3D bg, fades into the canvas
  1–N body sections    from §6, alternating rhythm (text-heavy ↔ visual)
  banner | contact     every page closes with a conversion section
</main>
Footer                 menu + newsletter + careers card / giant "Nicasource LLC" / trail bar
```

**Rhythm rules**
- Alternate the side of the media in consecutive `general` modules (`contentSide: left/right`).
- Follow a texture call-out with a `general` module or a grid, never with another call-out.
- Use at most one light (inverse) card cluster per viewport.
- The contact module is the last section on conversion pages. On pages with a banner and no contact
  module, the banner is last.

---

## 6. Section catalog (the page-builder vocabulary)

Each section is `{ "type": "<type>", ...props }` in a WordPress entry's `ns_sections` JSON. Props marked
? are optional. Media is `{ "src": "/assets/...", "alt": "" }` (empty alt for decorative images).
Link is `{ "label", "href" }`. Strings accept `**bold**` and `\n`.

<!-- SECTION-CATALOG:START -->
### Core (`frontend/src/sections/*.tsx`)

| type | Figma name | Purpose | Props |
| --- | --- | --- | --- |
| `hero` | Hero Section | Opening band, 843px. Photo or 3D background that fades into the canvas from the middle down | `heading`, `align?` center\|start, `eyebrow?`, `body?` string\|string[], `bodySize?` body\|lead, `cta?` Link, `background?` Media, `breadcrumb?` Link[] |
| `logo-marquee` | Credibility Statement / validation | Statement plus client logos scrolling right to left in surface pills | `heading?`, `logos` Media[] |
| `bento-services` | services / Bento Grid | 5 outlined coral tiles in an interlocking grid. Each tile is one link and reveals a photo on hover, focus or press | `eyebrow?`, `heading?`, `tiles` [{ `label`, `href`, `image?`, `span?` tall\|wide\|single }] (desktop placement follows order: tall, small, wide / wide, small) |
| `texture-callout` | (Mini) Call-Out | Giant display text clipped over a texture | `lines` string[], `texture` url, `size?` lg\|xl, `uppercase?`, `align?` start\|center |
| `general` | General Module | The workhorse: copy column plus media column, or media as a full-width background. Stacks on mobile | `eyebrow?`, `eyebrowTone?` accent\|brand, `heading?`, `headingSize?` md\|lg, `body?`, `cta?`, `media?`, `mediaMode?` column\|background, `contentSide?` left\|right, `testimonials?` (auto-advancing carousel in the media column), `mobileMediaFirst?` |
| `timezone-bento` | Bento Grid-01 | 2-column header plus 5 photo cards (US zone → LATAM countries and UTC) | `eyebrow?`, `heading`, `body?`, `zones` [{ `name`, `countries[]`, `utc`, `image`, `span?` tall }] |
| `columns` | 3 column module / process | 1–3 columns of number/title/body cards, every part optional | `eyebrow?`, `heading?`, `body?`, `columns?` 1\|2\|3, `appearance?` card\|plain, `items` [{ `number?`, `title?`, `body?`, `cta?` }] |
| `post-bento` | Bento Grid-03 (blog) | 5 posts from WP (`home_slot` main\|secondary). Main post in the tall center tile; 3 shown on mobile | `eyebrow?`, `heading?` |
| `banner` | Banner Module | Full-bleed headline plus CTA over a photo or texture | `heading`, `subheading?`, `cta?`, `background?` |
| `seo-states` | SEO Module / service areas | Independent, fading, keyboard-scrollable location lists | `eyebrow?`, `heading`, `subheading?`, `columns` [{ `heading`, `items[]` }] |
| `contact` | Contact Module | Inquiry tabs (New Project / Join Our Team / General Inquiries), fields, service chips, CV upload, message with Send | `heading?`, `subheading?`, `services?`, `defaultType?`, `layout?` band\|page |

### Services group (`sections/services/`)

| type | Figma name | Purpose | Props |
| --- | --- | --- | --- |
| `benefits-explorer` | Descriptive module | Benefit tabs in 2 columns drive a detail panel (title, body, image). Desktop uses ARIA vertical tabs; mobile becomes an accordion with the first item open | `eyebrow?`, `heading?`, `items` [{ `title`, `body`, `image?` }], `defaultIndex?` |
| `comparison-cards` | Comparative module | 3 collapsible columns (NicaSource vs Agency vs In-house). Expanded on desktop, collapsed on mobile | `eyebrow?`, `heading?`, `subheading?`, `cards` [{ `title`, `items?` \| `body?` }], `desktopExpanded?` |
| `service-card` | Services module | Light card: DS icon tile, title, description, tech chips with logos, CTA, "Explore the rest" links, plus a media column | `eyebrow?`, `heading?`, `icon`, `title`, `description`, `techLabel?`, `tech` [{ `label`, `logo?` }], `cta?`, `exploreLabel?`, `explore` Link[], `media?` |
| `skills-marquee` | Chips module | N rows of honey-outlined tags; the rows alternate direction | `heading?`, `tags` string[], `rows?` (3) |
| `faq-accordion` | FAQ module | Two columns of disclosures; emits FAQPage JSON-LD | `heading?`, `items` [{ `q`, `a` }], `split?`, `defaultOpen?` |

### Results group (`sections/results/`)

| type | Purpose | Props |
| --- | --- | --- |
| `case-study-list` | Reads the case-studies collection. The `featured` entry becomes a full-width photo card; the rest are rows that alternate the image side | `ctaLabel?`, `showFeatured?` |
| `case-study-hero` | Template: "Client +\nProject" H1 Black, brand tags, breadcrumb. Reads the entry | `title?`, `tags?`, `background?`, `breadcrumb?` |
| `case-study-body` | Template body built from `blocks`: `intro`, `split` (copy + small/tall images, `reverse`), `text` (title + body columns), `image` (`size` md\|lg), `gallery` (`mobile` scroll\|stack), `metrics` | `blocks` [{ `kind`, … }] |
| `case-study-testimonial` | Light quote card with a photo. Reads `meta.testimonial` | `quote?`, `name?`, `role?`, `photo?` |
| `case-study-related` | "Explore more case studies like this", ranked by shared industry and tags | `heading?`, `slugs?`, `limit?` (3) |

### Careers group (`sections/careers/`)

| type | Purpose | Props |
| --- | --- | --- |
| `info-cards` | Eyebrow + H2 with an optional row of 3 outlined cards. With no items it is a centered statement | `eyebrow?`, `heading`, `align?` start\|center, `items?` [{ `title`, `body` }] |
| `image-collage` | One composed moodboard image (culture, mission and vision) | `image` Media, `caption?` |
| `interest-marquee` | Heading, body and up to 3 rows of chips that alternate direction | `heading`, `body?`, `rows` string[][] |
| `job-list` | Open Roles. Reads the jobs collection, hides closed jobs, and each card is one link | `id?`, `eyebrow?`, `heading?`, `ctaLabel?`, `fallbackImage?`, `emptyText?`, `emptyCta?` |
| `job-hero` | Template: seniority + role H1, DS Tags (location, mode, type, hours), Apply button. Emits JobPosting JSON-LD | `background?`, `parent?`, `applyLabel?` |
| `job-description` | Template: label/content rows (About, Description, Expectations, Requirements, Nice to have, Benefits) + benefit cards | `aboutCompany?`, `benefitsIntro?`, `benefits?`, `labels?` |
| `job-application` | Template: "Show us your moves!" form (DS TextField + local Select, File and TextArea), validation, success state | `id?`, `heading?`, `otherTabs?`, `activeTabLabel?`, `countries?`, `submitLabel?` |

### Insights + Contact group (`sections/insights/`)

| type | Purpose | Props |
| --- | --- | --- |
| `insights-hero` | Short split hero: copy plus a 3D image, with breadcrumb | `breadcrumb?`, `eyebrow?`, `heading?`, `body?`, `cta?`, `media?` |
| `featured-post` | Full-bleed photo card for the `featured` post (or the given slug) | `slug?` |
| `insights-grid` | Tag filter chips (toggle buttons, `aria-pressed`) plus a 3-column masonry of posts with "Load more" | `tags?`, `pageSize?`, `excludeFeatured?` |
| `post-hero` | Template: post title over its image, date, reading time, author, tags, breadcrumb | — |
| `reading-progress` | Thin progress bar under the nav that tracks the article | `target?` |
| `post-article` | Template: sticky table of contents (from h2/h3, smooth scroll), share links, optional sidebar banner, mini author card, body (`meta.body` HTML), full author card | `banner?` { `heading`, `cta?`, `image?` } |
| `related-posts` | "Wanna go down the rabbit hole?" with 3 related posts | `heading?`, `slugs?` |
| `contact-page` | Contact Us: the tabbed form (shared ContactModule) plus a photo, headline and copy that change per tab | `heading?`, `panels` { project\|team\|general: { `heading`, `body?`, `image` } }, `chevron?`, `tabLabels?`, `services?` |

### Explore (`sections/explore/`)
Empty on purpose. Experimental section types for `/explore/*` screens go here (see §9).
<!-- SECTION-CATALOG:END -->

### Current pages (generated from `website/content`)

| Route | Page | Section stack |
| --- | --- | --- |
| `/` | Home | hero → logo-marquee → bento-services → texture-callout → general → general → general → timezone-bento → texture-callout → general → columns → general → post-bento → banner → seo-states → contact |
| `/services` | Services | hero → logo-marquee → general → benefits-explorer → bento-services → comparison-cards → seo-states → banner → contact |
| `/services/development` | Development | hero → logo-marquee → general → comparison-cards → service-card → skills-marquee → faq-accordion → seo-states → banner |
| `/results` | Case Studies | hero → case-study-list → contact |
| `/about` | About Us | hero → general → general → general → columns → banner → contact |
| `/careers` | Careers | hero → texture-callout → info-cards → info-cards → general → image-collage → interest-marquee → job-list |
| `/insights` | NS Insights | insights-hero → featured-post → insights-grid → banner |
| `/contact` | Contact Us | contact-page |
| `/explore` | Explorations | hero |
| `/results/<slug>` | case-studies template | case-study-hero → case-study-body → case-study-testimonial → case-study-body → case-study-related → contact |
| `/careers/jobs/<slug>` | jobs template | job-hero → job-description → job-application |
| `/insights/<slug>` | posts template | post-hero → reading-progress → post-article → related-posts |

---

## 7. Behaviour (from the designers' annotations)

- **Hero:** the background fades to the canvas from 50% down. On mobile the CTA goes full width.
- **Logo marquee:** scrolls right to left and loops forever. It pauses on hover and is static under
  reduced motion.
- **Bento tiles:** each tile is one link to its service page. The photo is revealed on `:hover` and
  `:focus-visible`, and on `:active` on touch devices.
- **General module:** every part is optional. It can swap sides, and its media can fill the background.
  It stacks on mobile.
- **Testimonials:** auto-advance every ~6 s, pause on hover and focus, have dot buttons, and never
  auto-play under reduced motion.
- **Insights bento:** posts are flagged in the CMS. Desktop shows 5, mobile shows 3 stacked.
- **SEO lists:** each column scrolls on its own. The top and bottom fade out (mask) to focus the middle.
- **Contact:** the form changes by inquiry type. New Project uses multi-select service chips instead of
  a dropdown; Join Our Team adds a portfolio upload.
- **Footer:** three bands. On mobile it becomes one column with the newsletter first.
- **Global:** the header is sticky and gains a shadow after 8px of scroll. Every interactive element
  has the honey focus ring. Columns stack at ≤767px. Hover becomes a press state on touch.

---

## 8. Content model (headless WordPress)

| WP type | REST | URL | Fields (`meta`) |
| --- | --- | --- | --- |
| Page | `ns/v1/route?path=/x` | `/x`, `/parent/x` | `ns_sections` (JSON) |
| Post | `ns/v1/collection/posts` | `/insights/<slug>` | `image`, `tags[]`, `home_slot`, `featured`, `reading_time`, `author{}`, `body` + `sections` |
| Job (`ns_job`) | `ns/v1/collection/jobs` | `/careers/jobs/<slug>` | `location`, `type`, `hours`, `seniority`, `tags[]`, `body` + `sections` |
| Case study (`ns_case_study`) | `ns/v1/collection/case-studies` | `/results/<slug>` | `client`, `industry`, `image`, `logo`, `tags[]`, `summary` + `sections` |
| Site settings | `ns/v1/site` | — | `nav[]`, `footer{}` |

Seed content lives in `website/content/**.json`. WordPress imports it on every boot, and the frontend
falls back to it when WordPress is offline or doesn't have an entry yet.

---

## 9. Recipe: build a new screen

1. **Pick the job** of the screen (landing, service, proof, hiring, article) and its single conversion.
2. **Outline** it as 5–12 sections from §6. Follow §5's rhythm: hero → proof → value → visual break →
   detail → social proof → conversion.
3. **Write content** in the voice of §1. Headlines are ≤12 words with 1–3 `**bold**` emphasis words.
   Body is ≤60 words per block. Every CTA is a verb phrase.
4. **Create the file** `website/content/pages/NN-<slug>.json` with `{ slug, title, parent?, sections }`.
   For explorations, use `parent: "explore"` with a slug like `home-v2`, which gives the URL
   `/explore/home-v2`.
5. **Assets:** reuse the files in `frontend/public/assets/**`. A new image goes in
   `assets/<page>/` as a JPEG of at most 1800px. New stock photos come from Openverse with a **CC0**
   licence (StockSnap or rawpixel sources), and each one gets a row in `assets/CREDITS.md`.
6. **Only if needed**, add a section: `frontend/src/sections/<group>/<Name>.tsx` + `.css`,
   registered in that group's `index.ts`. Use tokens only, a focus ring, reduced-motion support, and
   mobile stacking. Then document it in §6.
7. **Verify** at 1512 and 393 wide: no console errors, no horizontal scroll, AA contrast, keyboard
   reachable, motion respects reduced motion.

### Exploring new versions
- Change **content and composition** first (order, sides, which call-out, copy). That is cheap and
  stays on-system.
- Then change **section props** (`mediaMode: background`, `appearance: plain`, `align: center`).
- To go further, try alternate surfaces with a nested `ThemeProvider` (`dark` or `light`) around one
  section, a different texture, or new photography. Keep the tokens and type classes.
- Never fork tokens, hard-code colors, or change the DS package for an exploration. If an idea needs a
  new token, it is a Figma request (DS rule R9).

---

## 10. Don'ts

- Don't use hex, rgb or raw px in site code beyond the layout constants (DS R1–R3).
- Don't put white text on coral; use `text-on-brand`.
- Don't stack two texture call-outs or two banners back to back.
- Don't render an image without a scrim behind text.
- Don't add a second primary CTA in one section. The secondary one is `outlined` or a text link.
- Don't use auto-playing motion without a pause path and reduced-motion support.
- Don't hard-code collections (posts, jobs, case studies) in a page; read them from WordPress.
- Don't use a `<div onClick>`; use `<a>` or `<button>`.

---

## 11. Run it

```bash
cd website
npm install
npm run wp     # WordPress on http://127.0.0.1:9400 (admin: /wp-admin, user admin / password password)
npm run dev    # site on http://localhost:5173 (proxies /wp-json to WordPress)
```
