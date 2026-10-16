# Case Studies (Results) list page — `/case-studies`

Figma: desktop `1:3179` "Case Studies" (1513 × 4429) · mobile `13:10321` "Results" (393 × 7010).
Theme `web-2025`. Nav (`1:3344`) and Footer (`53:90266`) are owned by the shared-chrome spec and skipped here.
Note: the desktop nav labels this page "Case Studies"; on the detail page the same nav item reads "Results".

Hidden in Figma and skipped: second Hero `1:3186`-ish (`CONTENT 1:3187`), Credibility Statement (`1:3190`/`1:3192` logo strip),
"Main Blog Post" (`1:3199`, desktop) / `13:10340` (mobile).

Token sizes below: desktop values are the 1513 breakpoint; the `--ns-font-size-web-*` tokens switch to their
mobile values (h1 40/44, h2 32/38, body 16/24, caption 12/18, eyebrow 14/16) under the mobile breakpoint.

---

## 1. Hero — hero   (desktop 1:3180 · mobile 13:10322)
Pattern: hero
Layout desktop: full-bleed 1513 × 843. Padding `--ns-spacing-100` top/bottom, `--ns-spacing-180` left/right (1153 content).
Background photo cover (image is placed at 107.79% height, top −3.9%; use `object-fit: cover; object-position: center`)
with two overlays stacked: `linear-gradient(180deg, transparent 49.9%, var(--ns-color-bg-canvas) 97%)` (Figma #181728)
on top of a flat `--ns-color-bg-overlay` layer (Figma rgba(17,17,17,.5)). Content column vertically centred
(`justify-content:center`, gap `--ns-spacing-24`). Breadcrumb absolutely positioned at top 100 / left 180
(below the 80px nav), padding 4/8, gap 8.
Layout mobile: 393 × 843, padding `--ns-spacing-100` / `--ns-spacing-16`. Breadcrumb at top 100 / left 16. Heading wraps
to 6 lines at mobile h1 size (40/44). Same overlays (gradient ends at 100%). The glass nav sits on top of the hero
(sticky, `--ns-color-bg-glass` + backdrop blur `--ns-blur-lg`) — owned by SiteHeader.
Typography:
- heading → `.ns-text-web-h1-light` with `<strong>` runs in `.ns-text-web-h1-black` weight (70/76, Light 300 + Black 900, tracking −1.61px). Mobile: 40/44.
- breadcrumb items → `.ns-text-web-caption-light` (14px Light, line-height 1.5, tracking −0.322px)
Colors: heading → `--ns-color-text-primary` (#f6fcff); breadcrumb text + icons → `--ns-color-text-primary` / `--ns-color-icon-primary` (#f6fcff).
Content:
```yaml
breadcrumb: [home, page, page2, page03]   # placeholder; real: Home > Case Studies
heading:   # bold runs marked **
  desktop: "More than **10 years** as a staffing firm within the **software** and **engineering industry**."
  mobile:  "**More than 10 years** as a staffing firm within the **software** and **engineering industry**."
```
Assets: `website/frontend/public/assets/case-studies/hero-studio.png` (JPEG data despite .png, 2400×1808) → hero background, cover 1513×843 / 393×843 (same file on mobile).
Interactions/behaviour: none. Breadcrumb items are links except the last (current page, `aria-current="page"`).
DS components: `Icon` `home` (16) and `arrow-right` (16; Figma uses a play-like chevron "arrow-right" glyph — DS `chevron-right` is also acceptable) for breadcrumb. Breadcrumb itself is not a DS component (build locally, `<nav aria-label="Breadcrumb"><ol>`).

---

## 2. Featured case study — case-study-list (featured card)   (desktop 1:88633 · mobile 13:10349)
Pattern: case-study-list
Layout desktop: section bg `--ns-color-bg-canvas` (#181728), padding `--ns-spacing-80` / `--ns-spacing-180`. One card
full container width (1153 × 380), radius `--ns-radius-2xl` (32), padding `--ns-spacing-32`, content bottom-aligned
(`justify-content:flex-end`). Card bg = cover image + `--ns-color-bg-overlay` layer. Content column gap `--ns-spacing-24`;
chips row gap `--ns-spacing-6`, wraps.
Layout mobile: section padding `--ns-spacing-40` / `--ns-spacing-16`. Card 361 × 400, same radius/padding. Heading uses
h2-black (32/38 mobile) instead of h1, chips wrap to 2 rows.
Typography:
- title → desktop `.ns-text-web-h1-black` (70/76 Black, tracking −1.61); mobile `.ns-text-web-h2-black` (Figma 42/48 frame value, token mobile 32/38)
- chip label → `.ns-text-web-label-medium` (14px Medium, tracking −0.322)
Colors: section bg → `--ns-color-bg-canvas` (#181728); title → desktop `--ns-color-text-secondary` (#bec8d8), mobile Figma uses base white → `--ns-color-text-primary` (#f6fcff), pick `text-primary` on both for contrast over a photo; chip bg → `--ns-color-bg-brand` (#fd2847), chip text → `--ns-color-text-primary` (#f6fcff; note `text-on-brand` is night-900 in web-2025 — Figma uses light text, contrast of #f6fcff on #fd2847 is ~3.6:1, OK only as large/bold, flag for a11y), chip radius `--ns-radius-sm` (8), padding `--ns-spacing-8`.
Content:
```yaml
title:
  desktop: "AR, the new frontier in remote work"
  mobile:  "AR, The new frontier in remote work"
tags: [Trends, Technology, Sustainability, Remote Work, Mental Health Awareness]
href: /case-studies/<slug>   # whole card is the link (guess)
```
Assets: `website/frontend/public/assets/case-studies/featured-ar-remote-work.png` (JPEG, 1200×686) → card background, cover 1153×380 desktop / 361×400 mobile. In production this is the featured case study's hero image (CMS).
Interactions/behaviour: whole card is a link to the featured case study (implied). Hover: suggest slight image zoom / overlay darken. This is the "sticky/featured" post (first or flagged `is_featured`).
DS components: `Tag` for chips (closest: `variant="filled" color="brand"`; DS filled uses `*-subtle` bg, Figma uses solid `--ns-color-bg-brand` → needs a local override or a new solid Tag variant; flag). `PortfolioCard` does not match this layout (overlay text on image) — build locally.

---

## 3–5. Case study rows — case-study-list   (desktop 33:23293, 7:5545, 7:5559 · mobile 13:10386, 13:18305, 13:18319)
Pattern: case-study-list (alternating feature-split rows)
Three identical rows; row 2 (`7:5545`) mirrors the layout (image left, text right). Render from a CMS list and alternate by index.
Layout desktop: each row 1513 × 582, bg `--ns-color-bg-canvas`, padding `--ns-spacing-80` / `--ns-spacing-180`, gap
`--ns-spacing-20`, `align-items:center`. Text column flex 1 (664) with padding `--ns-spacing-16`, inner gap
`--ns-spacing-24`. Image column fixed 469 wide, stretches to row height (422), radius `--ns-radius-2xl` (32),
image cover; container behind image `--ns-color-bg-inverse` (shows only while loading).
Layout mobile: each row 393 × 1088, stacked column: text first, image after (also for the mirrored row — always text-then-image),
padding `--ns-spacing-40` / `--ns-spacing-16`, gap `--ns-spacing-20`. Image block full width × 456, radius 32.
CTA button is full width on mobile.
Typography:
- eyebrow (category/service) → `.ns-text-web-caption-light` (14/21 Light, tracking −0.32)
- title → `.ns-text-web-h2-light` with bold runs `.ns-text-web-h2-black` (42/48; mobile 32/38)
- body → `.ns-text-web-body-light` (18/27; mobile 16/24), two paragraphs with blank line between
- CTA → Button label (Figma Inter Medium 20/18, tracking −0.44 — DS Button uses Public Sans; use DS)
Colors: eyebrow → `--ns-color-text-accent` (#fde5ac honey-200 in web-2025); title → `--ns-color-text-secondary` (#bec8d8); body → `--ns-color-text-primary` (#f6fcff); CTA bg → `--ns-color-bg-brand` (Figma #f13c45, not a token; nearest coral-500 #fd2847), CTA text white → Button handles.
Content (same placeholder in all three rows):
```yaml
eyebrow: "Staff Augmentation"
title:
  desktop: "**Why hire** our **developers** to increase your actual staff?"
  mobile:  "Why hire **our developers** to increase your actual staff?"
body:
  - "We pride ourselves on helping our clients achieve their goals by matching the right talent with their specialized needs."
  - "Unlike traditional staffing agencies, Nicasource provides your company with dedicated teams that address all your digital needs"
cta: { label: "Schedule a Call", href: "/contact" }   # guess; for real case-study rows likely "Read case study" → /case-studies/<slug>
image: case-ice-cream.png
```
Assets: `website/frontend/public/assets/case-studies/case-ice-cream.png` (JPEG, 1200×1200) → row image, 469×422 desktop / 361×456 mobile; same file used in all 3 rows (placeholder; real rows use each case study's thumbnail).
Interactions/behaviour: CTA navigates. Suggest image hover zoom. Desktop alternates image side (odd rows image right, even rows image left).
DS components: `Button` (variant primary, size lg — Figma padding 24/32, radius 8 → `--ns-radius-sm`). Optionally `Tag` for eyebrow if it becomes a category list.

---

## 6. Contact Module — contact-form   (desktop 7:5437 · mobile 13:18333)
Pattern: contact-form (shared module; same instance appears on the case-study detail page `7:5595` / `13:18541` and other pages — build once as a shared section).
Layout desktop: bg `--ns-color-bg-surface` (#292643), padding `--ns-spacing-80` / `--ns-spacing-180`. Column gap
`--ns-spacing-24`. Header → tabs row (gap 24; active tab has 2px `--ns-color-bg-accent` underline) → row of 3 inputs
(gap `--ns-spacing-16`, equal flex) → row: left "Service Requested" chips (flex 1, wrap, gap `--ns-spacing-16`),
right "Message" textarea (flex 1, height 148, padding `--ns-spacing-16`, radius `--ns-radius-sm`, 1px border)
with "Send" button bottom-right inside it.
Layout mobile: padding `--ns-spacing-40` / `--ns-spacing-24`. Everything stacks: heading (4 lines), tabs row (3 tabs spread),
Full Name, Email, Company, Service chips (wrap), Message (full width) with Send inside.
Typography:
- heading → `.ns-text-web-h2-light` + `.ns-text-web-h2-black` bold run (42/48; mobile 32/38)
- tabs → `.ns-text-web-body-light` (18/27)
- field labels → `.ns-text-web-eyebrow-black` (16/18 Black)
- input text / placeholder → `.ns-text-web-body-light` (18px Light)
- chips → `.ns-text-web-small-regular` (Figma Inter Regular 12)
- Send → `.ns-text-web-label-medium` (14 Medium)
Colors: bg → `--ns-color-bg-surface` (#292643); heading/labels → `--ns-color-text-primary` (#f6fcff); tabs → `--ns-color-text-accent` (#fde5ac), active underline → `--ns-color-border-accent`; input border default → `--ns-color-border-input` (Figma #bec8d8), focused/error example border → `--ns-color-border-brand`/`-error` (Figma watermelon #fd6a75 on "Full Name"); input value → `--ns-color-text-primary`, placeholder → `--ns-color-text-secondary` (#bec8d8); chip selected bg → `--ns-color-bg-highlight-hover`/coral-300 (#fd6a75; nearest semantic: `--ns-color-text-brand` value, use a selected `bg-brand` variant), chip unselected → 1px `--ns-color-border-strong` (#f6fcff), radius `--ns-radius-xl` (24); Send button → 1px `--ns-color-border-strong`, radius `--ns-radius-sm`.
Content:
```yaml
heading: "Are you looking for a **reliable company** for staff augmentation services?"
tabs: ["New Project" (active), "Join Our Team", "General Inquiries"]
fields:
  - { label: "Full Name", placeholder: "Tom Riddle" }
  - { label: "Email", placeholder: "darklord87@gmail.com" }
  - { label: "Company", placeholder: "slitherine.io" }
service_requested:
  label: "Service Requested"
  options: ["Software Development" (selected), "Project Management", "QA Testing" (selected), "UX Audit" (selected),
            "UI Design", "UX Design" (selected), "Salesforce Administration", "Salesforce Development", "Staff Augmentation"]
message: { label: "Message", placeholder: "Drop us some lines here..." }
submit: "Send"
```
(Hidden in Figma: sub-heading "Let’s talk now and let us supply you with the right talent.")
Assets: none (icons from DS).
Interactions/behaviour: tabs switch form type (role="tablist"); chips are multi-select toggles (`aria-pressed`), selected ones show a close-circle icon; Send submits (to WP/Gravity Forms or a headless endpoint). Placeholder values above are sample data, use them as `placeholder` only.
DS components: `TextField` (inputs + textarea), `Button` (Send, variant secondary/outlined, size sm, `icon="send"`), chips → `Button` toggle or local Chip (DS `Tag` is non-interactive), `Icon` `close` for selected chip (Figma "close-circle"; DS has no `close-circle`, use `close`).

---

## Page notes
- All three case-study rows are placeholder copy ("Staff Augmentation / Why hire our developers…" with a "Schedule a Call" CTA) and the same ice-cream image; they are clearly a staffing-services module reused as a stand-in. Treat them as the case-study list template: eyebrow = industry/service, title = case study title, body = excerpt, CTA = "Read case study" link, image = thumbnail. Confirm copy with design.
- The featured card's tags (Trends, Technology…) are blog-style categories, also placeholders.
- Breadcrumb reads "home > page > page2 > page03" (placeholder).
- Figma fallback values in the code are light-theme hexes (#fefdfb canvas, #161d2c text); the rendered design is the dark `web-2025` theme — tokens above follow the render.
- Hero heading bold runs differ desktop vs mobile ("10 years" vs "More than 10 years"; "Why hire … developers" vs "our developers"). Use desktop emphasis unless design says otherwise.
- Mobile heading font sizes in Figma code say 70px/42px, but the render shows the mobile token sizes (40/44, 32/38) — rely on the responsive tokens.
- CTA red #f13c45 and button font Inter are off-system; use DS `Button` (Public Sans, `--ns-color-bg-brand`).
- Solid red chips (bg-brand + light text) have no exact DS `Tag` variant and borderline contrast (~3.6:1); flag for DS.
- No pagination, filters or category chips are visible (a hidden Chip-Group exists on the detail page's Bento Grid). If the list grows, add pagination/"Load more" — not designed.
