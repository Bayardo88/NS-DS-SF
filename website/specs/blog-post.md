# Blog Post (single article): build spec

Figma: desktop `1:5335` (1513 × 4074) · mobile `13:11761` (393 × 7238). Theme `web-2025` (dark).
Nav (`1:5427`, `15:19753`) and footer (`53:90788`, `53:92044`) are owned by the layout spec.
Designer note: `57:103735`, see [annotations.md](annotations.md#blog-post). The sidebar holds a topic breakdown; clicking a topic scrolls to that section. It also carries the share buttons and an optional banner. The body can be text and multimedia. A mini author card opens the post and the full author card closes it.
Data comes from a native WP post; field list in [insights.md → WordPress data model](insights.md#wordpress-data-model-native-posts).
Tag chip, overlay and container conventions are the same as in insights.md.

---

## 1. Post hero: Main Blog Post, `hero` (desktop `1:5336` + breadcrumb `1:5623` · mobile `13:11762` + `13:12049`)
Pattern: hero (full-bleed featured image + title + tags)
Layout desktop: 1513 × 600, full-bleed. Padding `--ns-spacing-100` top/bottom, `--ns-spacing-180` sides. Content is bottom-aligned, with gap `--ns-spacing-24` between title and chips; chip gap `--ns-spacing-6`. The featured image covers the hero (scaled 108%, offset −3.9% top) under `--ns-color-bg-overlay`. The nav (80px) overlays the top of the hero. The breadcrumb sits absolutely at x 180, y 100.
Layout mobile: 393 × 600, same structure with 16px side padding. The title is about 42px (3 lines) and the chips wrap to 2 rows. The breadcrumb sits at x 16, y 100.
Typography: title → `.ns-text-web-banner-black` (80/88, 900) desktop, `.ns-text-web-h2-black` (42/48) mobile. Breadcrumb → `.ns-text-web-caption-light` (14/1.5, 300, tracking −0.322). Chips → DS `Tag`.
Colors: title → `--ns-color-text-primary` (white); breadcrumb → `--ns-color-text-primary` (`#f6fcff`); chips → `--ns-color-bg-brand` (`#fd2847`).
Content:
```
breadcrumb: [home(icon), page, page2, page03]   # placeholder; real: Home › Insights › {post title}
title: "AR, The new frontier in remote work"
tags: [Trends, Technology, Sustainability, Remote Work, Mental Health Awareness]
```
Assets: background = `website/frontend/public/assets/shared/banner-waves-bg.jpg` (same file as the Insights featured post). In production it is the post's featured image.
Interactions: tag chips could link to `/insights?tag=<slug>` (not specified).
DS components: `Tag`, `Icon name="home"` / `"chevron-right"` for the breadcrumb.

## 2. Reading progress bar: Reader-Loader, `other:reading-progress` (desktop `1:5345` · mobile `13:11771`)
Pattern: other:reading-progress
Layout: full-width 4px bar directly under the hero (y 600). Track fill `#bec8d8` (slate-300); progress fill `#fd6a75` (coral-300), shown at 721/1513 ≈ 48% in the mock.
Colors: track → `--ns-color-border-default` or `--ns-color-text-secondary` as a bg (Figma binds primitive `--ns-color-slate-300`; use a semantic token). Fill → `--ns-color-bg-brand-pressed` (coral-300) or `--ns-color-text-brand`.
Interactions:
- Width = scroll progress through the **article section** (from top of body to bottom of the full author card), updated on scroll with rAF.
- Becomes **sticky** under the nav (`position: sticky; top: <nav height>`) once the hero scrolls away. This is implied by the name "Reader-Loader".
- `role="progressbar"` with `aria-valuenow`, or mark it `aria-hidden` since it is decorative.
- No transition when `prefers-reduced-motion` is set.
DS components: none; local `ReadingProgress`.

## 3. Article body: Bento Grid-03 Main Content, `rich-text` (desktop `1:5349` / `1:5378` · mobile `13:11775` / `13:11804`)
Pattern: rich-text (two-column: sticky sidebar + article)
Layout desktop: section 1513 × 2049, padding 80 top/bottom, 180 sides, bg `--ns-color-bg-canvas`. Main row (1153 wide) has gap 90px (no exact token: use `--ns-spacing-80` + 10, or `--ns-spacing-100`; Figma uses a raw 90).
- **Sidebar** (`1:5379`): 330 wide, column, gap `--ns-spacing-32`. It holds the TOC, then Share, then the Banner. Make the TOC + share block `position: sticky` (top = nav + 24) so it follows the reader; this is implied by "click to scroll".
- **Article column** (`1:5393`): flex 1 (733 wide), column, gap `--ns-spacing-60`. It holds the mini author card, then the content, then the full author card.
Layout mobile: one column, 16px padding, 40px vertical padding. Order: TOC, Share, Banner (361 × 560), then the article (mini author → content → full author card). The TOC is NOT sticky on mobile; consider a collapsible "Content" accordion (not in Figma). The full author card stacks the avatar above the name (613 tall).

### 3a. Table of contents (`1:5380`)
Typography:
- "Content" title → Public Sans Bold 24 / 1.5, tracking −0.552. No exact DS class; nearest `.ns-text-web-h4-black` (24/27), but use Bold 700 → flag it.
- items → `.ns-text-web-nav-medium` (18/27, 500); level-2 items are bulleted (`list-disc`) with a 27px indent.
Colors: Figma binds `--ns-color-text-secondary` (`#3c4655` fallback), which renders slate-300 in web-2025. The "Share" title uses `--ns-color-text-primary`.
Content (verbatim; level 1 = h2, level 2 = h3):
```
- Introduction
  - The Role of AI in UX Design
  - How AI is Shaping User Experience
- Key Contributions of AI in UX Design
  - Personalization at Scale
  - Enhanced User Research
  - Predictive Analytics
  - Improving Accessibility
- Challenges of AI in UX Design
  - Data Privacy Concerns
  - Bias in AI Algorithms
  - Over-Reliance on Automation
- The Future of AI in UX Design
- Conclusion
  - Balancing AI and Human-Centered Design
```
Interactions:
- The TOC is **generated from the post's h2/h3 headings**: add `id` slugs server-side or at render.
- Clicking smooth-scrolls to the heading (`scroll-margin-top` = nav + progress bar). Disable smooth scroll under reduced motion.
- Highlight the active heading with an IntersectionObserver scroll-spy (not drawn in Figma, recommended): use `--ns-color-text-primary` / `--ns-color-text-brand` and `aria-current="location"`.
- Render as `<nav aria-label="Table of contents">` with nested `<ol>`/`<ul>`.

### 3b. Share (`1:5383`)
Layout: "Share" title, then an icon row with gap `--ns-spacing-24`. Icons are 32px boxes (Code Connect says size 48; the frame draws 32).
Typography: "Share" → Bold 24/1.5 (same as the TOC title).
Content: icons [Share 2 (native share / copy link), Instagram, Facebook].
Interactions:
- Share 2 → `navigator.share()` with a copy-link fallback.
- Facebook → `https://www.facebook.com/sharer/sharer.php?u=`.
- Instagram has no web share intent: replace it with LinkedIn (`linkedin.com/sharing/share-offsite/?url=`) or X; flag to design.
- Each icon is an `IconButton` with an `aria-label`.
Colors: icons → `--ns-color-icon-primary`.
DS components: `IconButton` + `Icon name="share"` (or `share-out`), `"instagram"`, `"facebook"`, `"linkedin"`.

### 3c. Sidebar banner (optional) (`1:5389`)
Layout: 330 × 560 (mobile 361 × 560), radius `--ns-radius-2xl`, padding `--ns-spacing-24`. Column with space-between: heading at the top, full-width button at the bottom. Image covers the banner.
Typography: heading → Public Sans Black 35px, line-height normal, tracking −0.805, **uppercase** (nearest `.ns-text-web-h2-black` + `text-transform: uppercase`; 35px has no token). Button → DS `Button` (Medium 18).
Colors: heading Figma binds `--ns-color-text-primary` (renders light); button fill raw `#f13c45` → `--ns-color-bg-brand`; label white → DS button on-brand text.
Content:
```
heading: "Team up with Nicasource for new opportunities!"   # rendered uppercase
cta: {label: "Partner with Us", href: "/contact-us"}
```
Assets: background `website/frontend/public/assets/shared/banner-liquid-bg.jpg` (already in shared, md5-identical, so not re-downloaded).
Interactions: optional per post (ACF `show_banner`); hide the whole block when it is off.
DS components: `Button variant="primary" fullWidth`.

### 3d. Mini author card, top of article (`1:5394`)
Layout: row, gap 19 (≈ `--ns-spacing-20`), items centred. Avatar 76 × 76, radius `--ns-radius-xl` (24), placeholder bg `#d9d9d9`. The text column has gap `--ns-spacing-8`.
Typography: name → `.ns-text-web-h4-black` (24/27); bio → `.ns-text-web-body-light` (18/27).
Colors: both → `--ns-color-text-primary`.
Content:
```
name: "By Boyo Martínez"
bio: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna."   # placeholder
```
Assets: `website/frontend/public/assets/blog-post/author-boyo-martinez.jpg` (480², sample avatar; production uses the WP user avatar or an ACF image).

### 3e. Article content: rich text (`1:5399`)
Layout: column, gap `--ns-spacing-60` between blocks (text block → image → text block). Full article width is 733 desktop, 361 mobile. The paragraphs inside a block are separated by one empty line (27px); in CSS that is `p + p { margin-top: var(--ns-line-height-web-body) }` (27px, nearest `--ns-spacing-24`).
Rich-text element styles (WP `post_content`):

| Element | Style | Color |
| --- | --- | --- |
| `p` | `.ns-text-web-body-light` (18/27, 300) | `--ns-color-text-secondary` (Figma binds text-secondary, renders slate-300) |
| `h2` | **not drawn**. Recommend `.ns-text-web-h3-black` (32/48), margin-top 60 | `--ns-color-text-primary` |
| `h3` | **not drawn**. Recommend `.ns-text-web-h4-black` (24/27), margin-top 40 | `--ns-color-text-primary` |
| `ul`/`ol` | not drawn. Use body-light, disc/decimal, 27px indent (matches the TOC indent) | text-secondary |
| `blockquote` | not drawn. Recommend `.ns-text-web-h4-light`, left border 2px `--ns-color-border-brand`, padding-left 24; or reuse the DS testimonial/quote style | text-primary |
| `img` / `figure` | full width, radius `--ns-radius-xl` (24), height ~430 at 733w (≈ 16:9.4), `object-fit: cover`, 60px vertical gap; caption not drawn (use `.ns-text-web-caption-light`, text-tertiary) | n/a |
| `a` | not drawn. Use `--ns-color-text-link`, underline, hover `--ns-color-text-link-hover` | n/a |
| embeds (video) | the note says "multimedia": responsive 16:9 wrapper, radius 24 | n/a |

Content (verbatim, sample article):
```
p: "Artificial intelligence (AI) is transforming the world of user experience (UX) design by enabling more personalized, efficient, and intuitive interactions between users and digital products. AI-driven technologies are becoming an integral part of how designers create experiences that anticipate user needs, automate repetitive tasks, and deliver more inclusive solutions."
p: "One of the most significant contributions of AI in UX design is personalization at scale. AI algorithms analyze user data to tailor experiences to individual preferences, resulting in more relevant content, product recommendations, and interfaces. This approach improves engagement and satisfaction, as seen with platforms like Netflix and Spotify."
p: "Another area where AI is making a difference is in user research. By analyzing user behavior patterns, AI tools help designers gather insights more efficiently, reducing reliance on time-consuming methods like interviews and surveys. AI-powered analytics platforms can highlight pain points and areas for improvement, leading to better-informed design decisions."
img: article-vr-bust.jpg (blue classical bust wearing a VR headset)
p: "Additionally, predictive analytics enable UX designers to anticipate user needs and offer proactive solutions, creating smoother interactions. AI also plays a crucial role in improving accessibility, using tools that automatically identify and resolve usability issues for people with disabilities."
p: "However, AI in UX design comes with challenges, including data privacy concerns, bias in AI algorithms, and the risk of over-reliance on automation. Designers must navigate these challenges thoughtfully, ensuring that AI enhances rather than diminishes the human-centered approach to design."
p: "Looking ahead, AI's role in UX design is poised to grow, with advancements in emotion recognition, hyper-personalization, and conversational interfaces. While AI can automate and enhance many aspects of UX design, the human touch will remain critical to crafting truly meaningful user experiences."
```
Assets: `website/frontend/public/assets/blog-post/article-vr-bust.jpg` (2000×1333) goes in the body image slot at 733×430 desktop.

### 3f. Full author card, end of article (`1:5403`)
Layout desktop: row, gap 19, padding `--ns-spacing-24`, radius `--ns-radius-2xl`, bg `--ns-color-bg-surface` (`#292643`-ish). Avatar 100 × 100, radius `--ns-radius-2xl`. The content column has gap `--ns-spacing-16`.
Layout mobile: the avatar stacks above the content and the badges wrap to their own lines (card is 361 × 613).
Typography:
- name → Public Sans Black 20/20, tracking −0.46 (nearest `.ns-text-web-lead-medium` size; use `.ns-text-web-h4-black` scaled to 20; flag it)
- badges → Regular 16/20, tracking −0.368 (nearest `.ns-text-web-body-regular` at 16)
- bio and role value → Regular 16/1.5
- "Expertise:" and "Role:" labels → Regular 20/20
- expertise pills → Regular 16/20
Colors:
- name, bio and labels → `--ns-color-text-primary`
- "Verified Expert" → `#b68f4f` (NS Gold, golden-400) → `--ns-color-text-accent` (honey-200 in web-2025; check the visual match)
- "15 Years of Experience" → `#36e5f0` (NS Lightning Blue): no semantic token. Use `--ns-color-text-info` or ask for a token.
- pills: 1px border `--ns-color-border-strong` (white), radius `--ns-radius-lg` (16), padding `--ns-spacing-8`, gap `--ns-spacing-16`
Content:
```
name: "By Boyo Martínez"
badges: [{icon: verified, label: "Verified Expert"}, {icon: user-octagon, label: "15 Years of Experience"}]
bio: "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.."
expertise_label: "Expertise:"
expertise: [UX Design, Product Design, Product Strategy]
role_label: "Role:"
role: "Product Director"
```
Assets:
- `website/frontend/public/assets/blog-post/author-boyo-martinez.jpg` (avatar)
- `website/frontend/public/assets/blog-post/icon-verified.svg` (20px badge-check; no DS equivalent, `check-circle` is the closest fallback)
- `website/frontend/public/assets/blog-post/icon-user-octagon.svg` (20px; no DS equivalent)
DS components: `Tag` (outline variant, if the DS has one) for the expertise pills; otherwise local.

## 4. Related posts: Bento Grid-03, `card-grid` (desktop `1:5437` · mobile `13:11863`)
Pattern: card-grid (3 related posts)
Layout desktop: 1513 × 686, padding 80 top/bottom, 180 sides, gap `--ns-spacing-40` between heading and cards. Cards are 3 × 360 × 390, space-between (≈ 36px gaps). The card style is identical to the Insights grid card (radius 32, padding 32, subtle 1px border, image + overlay, chips at the top, title at the bottom).
Layout mobile: heading (3 lines), then cards stacked full-width (361 wide, ~400 tall), gap ~20.
Typography: heading → `.ns-text-web-h2-light` (42/48, 300); card title → `.ns-text-web-h4-black`.
Colors: heading → `--ns-color-text-primary`; section bg → `--ns-color-bg-canvas`.
Content:
```
heading: "Wanna go down the rabbit hole? Check out these related articles!"
posts:
  - {tags: [Trends, Technology, Sustainability], title: "The Heart of the City: Central Insights", img: insights/post-heart-of-city-1.jpg}
  - {tags: [Remote Work, Mental Health Awareness], title: "Exploring the Wonders of the Pacific Ocean", img: insights/post-pacific-ocean-3.jpg}
  - {tags: [Technology], title: "Eastern Adventures: A Journey Beyond", img: insights/post-eastern-adventures-1.jpg}
```
Assets: reuses `website/frontend/public/assets/insights/post-*.jpg` (md5-identical; not duplicated).
Interactions: whole-card links; same `PostCard` component as the Insights grid. Related = 3 posts sharing tags with the current post, excluding itself.
DS components: `Tag`; shared `PostCard`.

---

## Page notes
- **No h2/h3, list or quote is drawn in the body**, only paragraphs and one image, while the TOC implies h2/h3 sections. The rich-text table above recommends heading styles; confirm with design.
- **Placeholder content:** the author bio is lorem ipsum, the breadcrumb is placeholder, and the TOC items don't match the body text (the body has no headings).
- **Date and reading time are not shown anywhere** in the design. Recommend a meta line under the title in the hero (e.g. `Oct 16, 2026 · 6 min read`, `.ns-text-web-caption-light`).
- **Share row includes Instagram**, which has no URL share intent. Suggest LinkedIn instead.
- **Off-token values:** 90px column gap, 19px author gaps, 35px banner heading, 20px author name, Bold 24 TOC titles. Snap these to tokens.
- **Raw colors:** `#f13c45` (banner button), `#36e5f0` (experience badge), `#d9d9d9` (avatar placeholder). Map them to semantic tokens.
- The TOC color binds `text-secondary`; the Figma light-theme fallback `#3c4655` would fail on dark, but in web-2025 it resolves to slate-300, which is fine.
- **Mobile hero** has no overlay on its image; keep the overlay for legibility.
