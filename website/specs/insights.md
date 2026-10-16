# NS Insights (blog index): build spec

Figma: desktop `1:4851` (1513 × 4365) · mobile `13:11379` (393 × 6240). Theme `web-2025` (dark).
Nav (`1:5007`, `15:19440`) and footer (`53:90701`, `53:91953`) belong to the shared layout spec and are not covered here.
Designer notes for this page are in [annotations.md](annotations.md#ns-insights) (`57:103618`, `57:103725`, `57:103659`, `57:103649`, `57:103715`, `57:103745`).

Shared conventions on this page:
- **Container:** desktop content is 1153px wide, with `--ns-spacing-180` (180px) side padding inside the 1513 frame. Mobile uses `--ns-spacing-16` side padding.
- **Tag chip ("Label" component, `1:468`):** padding 8px (`--ns-spacing-8`), radius 8px (`--ns-radius-sm`), fill `#fd2847` → `--ns-color-bg-brand`. Text is Public Sans Medium 14px, line-height 1, tracking −0.322px, `#f6fcff` → `.ns-text-web-label-medium`, `--ns-color-text-primary`. Use the DS **`Tag`**. Note that the DS `--ns-color-text-on-brand` is night-900; the Figma chip uses light text on coral, so check contrast (see Page notes).
- **Image overlay:** cards and heroes put `--ns-color-bg-overlay` (Figma `rgba(17,17,17,.5)`) over the photo.

---

## 1. Page header: General Module (hero), `hero` (desktop `1:4852` · mobile `13:11380`)
Pattern: hero
Layout desktop: height 586. Row of two columns: padding `--ns-spacing-100` top/bottom and `--ns-spacing-180` left/right, gap `--ns-spacing-80`, items centred. The left column (flex 1, padding 16) holds a text stack with gap `--ns-spacing-24`. The right column is 586px wide, padding 16, with the image box 354px tall (cropped, image scaled ~128% and offset −17% / −6%). A breadcrumb sits absolutely at left 180, top 100.
Layout mobile: column layout, padding-top 150, bottom `--ns-spacing-40`, sides 16, gap 32. Text comes first, then the image (252px tall, full width). The breadcrumb sits at left 16, top 100. The mobile title and paragraph use **Light** weights (see Typography).
Typography:
- eyebrow → `.ns-text-web-eyebrow-black` (16/18, 900)
- heading desktop → `.ns-text-web-h2-black` (42/48, 900); heading mobile → `.ns-text-web-h1-light` per Figma (70/76 token; the frame renders at ~40px, see Page notes)
- body desktop → `.ns-text-web-body-light` (18/27, 300); body mobile → `.ns-text-web-h3-light` (32/48 token, rendered ~20px)
- breadcrumb → Public Sans Light 14px / 1.5, tracking −0.322 → `.ns-text-web-caption-light`
Colors:
- section bg → `--ns-color-bg-canvas` (night-900)
- eyebrow desktop → `--ns-color-text-highlight` (Figma `#d20f18` fallback, coral-300 in web-2025); eyebrow mobile → `--ns-color-text-accent` (honey)
- heading and body → `--ns-color-text-primary` (Figma white)
- breadcrumb → `--ns-color-text-primary` (`#f6fcff`)
Content:
```
breadcrumb: [home(icon home) › page › page2 › page03]   # placeholder; real: Home › Insights
eyebrow: "Your go-to source"
heading: "Tech insights and industry trends."
body: "Explore expert tips on software solutions, team scaling, and digital innovation to stay ahead in the tech world."
cta: none in this frame (the note says the CTA is optional)
```
Assets: `website/frontend/public/assets/insights/hero-3d-icon-pack.png` (1710×972 RGBA, 3D coral icons) goes in the right column at 554×354 desktop and 329×252 mobile, `object-fit: cover`.
Interactions: none. Annotation `57:103618`: the General module's eyebrow, title, paragraph and CTA are all optional.
DS components: `Icon name="home"` and `Icon name="chevron-right"` (Figma `arrow-right` vuesax) for the breadcrumb.

## 2. Featured post: Main Blog Post, `other:featured-post` (desktop `1:4861` · mobile `15:19539`)
Pattern: other:featured-post (full-bleed image card)
Layout desktop: full-bleed 1513 × 600. Padding `--ns-spacing-80` top/bottom, `--ns-spacing-180` sides. Content is bottom-aligned (justify end), gap `--ns-spacing-24` between title and chip row; chip gap `--ns-spacing-6`, wrapping. The background image covers the frame with the overlay on top.
Layout mobile: becomes a **rounded card** inside the page padding. Section padding `--ns-spacing-40` / `--ns-spacing-16`. The card is 361 × 400, radius `--ns-radius-2xl` (32), padding `--ns-spacing-32`, content bottom-aligned, gap 24. The mobile Figma frame has no overlay; add one for contrast anyway.
Typography: title desktop → `.ns-text-web-banner-black` (80/88, 900); title mobile → `.ns-text-web-h2-black` (42/48). Chips are DS `Tag`.
Colors: title → `--ns-color-text-primary` (Figma white); overlay → `--ns-color-bg-overlay`.
Content:
```
title: "AR, The new frontier in remote work"
tags: [Trends, Technology, Sustainability, Remote Work, Mental Health Awareness]
```
Assets: background `website/frontend/public/assets/shared/banner-waves-bg.jpg`, the same file as the banner below (md5-identical). In production it is the post's featured image.
Interactions: the whole card links to the post (implied). Annotation `57:103725`: any post can be flagged as **featured** in the CMS to fill this slot.
DS components: `Tag`.

## 3. Tag filter + post grid: Bento Grid-03, `insights-grid` (desktop `1:4870` · mobile `13:11398`)
Pattern: insights-grid (tag filter chips + 3-column masonry)
Layout desktop: 1513 × 2025. Padding 80 top/bottom, 180 sides.
- **Tag filter** (`53:4018`): wrapping flex, gap `--ns-spacing-6`, left-aligned, 3 rows (102px). The note caps it at 3 rows max and 1 row min.
- **Grid** (`1:4899`, 40px below the chips): 3 columns of 375 / 372 / 366, column gap 20, card gap 20. It is a masonry layout: each column stacks cards of different fixed heights.
  - C1 heights: 240 / 444 / 322 / 403
  - C2 heights: 351 / 500 / 402 / 410
  - C3 heights: 360 / 240 / 545 / 281
- **Card:** radius `--ns-radius-2xl` (32), border `--ns-border-width-thin` in `--ns-color-border-subtle` (Figma `#f4f4f5`), padding `--ns-spacing-32`. Flex column with space-between: chips at the top (max-width 284, gap 6, wrapping), title at the bottom. The image covers the card with the overlay on top. One card (C2 #2) has no chips and its title is vertically centred, which looks like a design inconsistency; default to space-between.
Layout mobile:
- **Tag filter:** centred, wrapping, max 4 rows per the note (`57:103715`). The mobile frame shows placeholder chips (see Content).
- **Grid:** single column of full-width cards (361 wide) at their varying heights, gap 20.
Typography: card title → `.ns-text-web-h4-black` (24/27, 900); chips → `Tag` (Medium 14).
Colors:
- card title → `--ns-color-text-primary` (white)
- filter chips desktop: active "Trends" chip fill `#fd6a75` (coral-300) with a 1px `#f6fcff` border, others `#fd2847`. Map the active chip to `--ns-color-bg-brand-pressed` plus border `--ns-color-border-strong`, and the rest to `--ns-color-bg-brand`.
- filter chips mobile: fill `#292643` → `--ns-color-bg-surface`, text `--ns-color-text-primary`. The two frames disagree; recommend unselected = surface, selected = brand.
Content:
```
filters_desktop: [Trends (selected), Sustainability, Remote Work, AI Integration, Health Tech, E-commerce Growth,
  Virtual Reality, Social Media Evolution, Blockchain Applications, 5G Technology, Personalization in Marketing,
  Diversity and Inclusion, Mental Health Awareness, Subscription Services, Smart Home Devices, Augmented Reality,
  Gig Economy, Cybersecurity Innovations, Wearable Technology, Plant-Based Products, Electric Vehicles]
filters_mobile (placeholder): [All, Active, Archived, Pending, In Progress, Completed, On Hold, Cancelled, Scheduled,
  Under Review, Delayed, Approved, Rejected, Draft, Finalized, Expired, New, Modified, Reviewed, Unresolved, Resolved,
  Escalated, Not Started, In Development, Ready for Testing, Testing, Live]
posts (column, height, tags, title, image):
  C1:
  - {h: 240, tags: [Trends, Technology, Sustainability], title: "The Heart of the City: Central Insights", img: post-heart-of-city-1.jpg}
  - {h: 444, tags: [Mental Health Awareness], title: "Exploring the Majestic Mountain Landscapes", img: post-majestic-mountain.jpg}
  - {h: 322, tags: [Trends, Technology, Sustainability], title: "The Heart of the City: Central Insights", img: post-heart-of-city-2.jpg}
  - {h: 403, tags: [Trends, Technology, Sustainability], title: "The Heart of the City: Central Insights", img: post-heart-of-city-3.jpg}
  C2:
  - {h: 351, tags: [Remote Work, Mental Health Awareness], title: "Exploring the Wonders of the Pacific Ocean", img: post-pacific-ocean-1.png}
  - {h: 500, tags: [], title: "Exploring the Wonders of the Pacific Ocean", img: post-pacific-ocean-2.jpg}
  - {h: 402, tags: [Remote Work, Mental Health Awareness], title: "Exploring the Wonders of the Pacific Ocean", img: post-pacific-ocean-3.jpg}
  - {h: 410, tags: [Remote Work, Mental Health Awareness], title: "Exploring the Wonders of the Pacific Ocean", img: post-pacific-ocean-4.png}
  C3:
  - {h: 360, tags: [Technology, Sustainability], title: "Discovering the Charm of the Eastern Region", img: post-eastern-charm-1.png}
  - {h: 240, tags: [Technology], title: "Eastern Adventures: A Journey Beyond", img: post-eastern-adventures-1.jpg}
  - {h: 545, tags: [Technology, Sustainability], title: "Discovering the Charm of the Eastern Region", img: post-eastern-charm-2.jpg}
  - {h: 281, tags: [Technology], title: "Eastern Adventures: A Journey Beyond", img: post-eastern-adventures-2.jpg}
```
Assets: `website/frontend/public/assets/insights/post-*.{jpg,png}` (12 sample featured images, used `object-fit: cover`). These are placeholder content; in production every card uses the post's featured image.
Interactions:
- Filter chips are toggle buttons (`aria-pressed`) that filter the grid by tag. Desktop selected state = lighter coral + light border. Single-select vs multi-select is not specified; recommend single-select with "All".
- Cards are whole-card links to the post; add a hover lift/zoom (not in Figma) and a `:focus-visible` ring.
- Pagination / "load more" is not designed; add load-more at the end (see Page notes).
- Card heights: Figma uses fixed heights to make the masonry. In code, use CSS columns (`column-count: 3`) or a JS masonry with a set of aspect ratios (e.g. cycle 3:2, 4:5, 1:1, 3:4) so real posts don't look uniform.
DS components: `Tag` (filters as `<button>` chips, card tags as static), card is local (`PostCard`); `PortfolioCard` could be reused if it supports a full-bleed image + overlay variant.

## 4. CTA banner: Banner Module, `cta-banner` (desktop `8:5509` · mobile `15:19609`)
Pattern: cta-banner
Layout desktop: 1513 × 419. Padding 80 top/bottom, 180 sides. A centred column (1121 wide) with gap `--ns-spacing-24`. Background image covers the section; base layer `--ns-color-bg-canvas` with `--ns-color-bg-overlay` on top.
Layout mobile: 393 × 383, the same stack centred. The heading wraps to 4 lines at ~42px (Figma frame) and the button runs nearly full-width.
Typography: heading → `.ns-text-web-banner-black` (80/88, 900, centred), mobile ~`.ns-text-web-h2-black`; button label Public Sans Medium 18/27 → DS `Button` size lg.
Colors: heading → `--ns-color-text-primary` (Figma token text-primary); button fill `#fd2847` → `--ns-color-bg-brand`, label `#f6fcff`.
Content:
```
heading: "Redefine success with Nicasource"
cta: {label: "Partner with Us", href: "/contact-us"}
```
Assets: `website/frontend/public/assets/shared/banner-waves-bg.jpg` (already in shared; reused, not re-downloaded).
Interactions: button hover/focus states from the DS.
DS components: `Button variant="primary" size="lg"`. This is the same banner module as other pages; reuse the shared `CtaBanner` section.

---

## Page notes
- **Placeholder breadcrumb** ("home › page › page2 › page03"): implement as real breadcrumbs (Home › Insights).
- **Mobile filter chips are placeholder** status words (All, Active, Archived…), not blog tags. Use the same WP tag list as desktop.
- **Filter chip colors differ between breakpoints:** desktop is all coral, mobile is dark surface. Pick one system: surface = unselected, brand = selected.
- **Mobile type tokens look wrong:** the mobile hero binds `Web/H1/Light` (70px) and `Web/H3/Light` (32px), but the boxes render at about 40px and 20px. Use `.ns-text-web-h2-light` / `.ns-text-web-body-light` (or a responsive clamp) on mobile and check with design.
- **Eyebrow color mismatch:** desktop uses `text-highlight` (coral), mobile uses `text-accent` (honey).
- **Contrast:** light text on `#fd2847` chips at 14px is about 3.6:1, which fails AA for small text. The DS `Tag` / `--ns-color-text-on-brand` (night-900) should win; confirm with design.
- **Repeated titles and sample images** in the grid are placeholders.
- **No pagination, empty state or "no results for tag" state** is designed. Add load-more and an empty state.
- The featured post background and the banner background are the same image file (`shared/banner-waves-bg.jpg`).

## WordPress data model (native posts)
The blog uses native WP `post` objects, read via WPGraphQL or the REST API. Fields the frontend needs:

| Field | WP source | Used in |
| --- | --- | --- |
| Title | `post_title` | featured hero, grid card, related card, post hero |
| Slug / URL | `post_name` / permalink | card links, breadcrumbs |
| Excerpt | `post_excerpt` | SEO meta description, OG; not shown visually in these frames |
| Featured image | `_thumbnail_id` (+ alt text, sizes) | card background, post hero, featured slot |
| Tags | `post_tag` taxonomy | chips on cards/hero, filter list on index (note: "tag grid = tags used in blog posts") |
| Categories | `category` taxonomy | not visible in the design. Optional: use them for the filter instead of tags if the tag count gets large |
| Author | `post_author` → user: display name, avatar, bio + ACF: `verified_expert` (bool), `years_experience` (int), `expertise` (string[]), `role` (string) | mini author card (top of post) + full author card (bottom) |
| Date | `post_date` | not shown in the design. Add it to the post hero/meta (recommended) |
| Reading time | computed from word count (~200 wpm), or an ACF override | not shown in the design. Optional, shown in the post meta |
| Featured flag | WP "sticky" post, or ACF `is_featured` (bool) | NS Insights featured slot (note `57:103725`) |
| Body | `post_content` (Gutenberg blocks) | article body; h2/h3 anchors feed the TOC |
| Sidebar banner (optional) | ACF group: `show_banner`, `banner_heading`, `banner_image`, `banner_cta` | blog post sidebar |
| Related posts | shared tags (top 3 by overlap, newest first) or an ACF relationship override | "Wanna go down the rabbit hole?" section |
