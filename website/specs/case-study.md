# Case Study detail page (template) — `/case-studies/:slug`

Figma: desktop `1:3900` "Results/Industries/Case Studies" (1513 × 8609) · mobile `13:10545` (393 × 11772).
Theme `web-2025`. Nav (`1:3983`) and Footer are owned by the shared-chrome spec and skipped. The nav marks "Results" as current.
This page is a **template** for a WordPress custom post type; the field model is at the end.

Hidden in Figma and skipped: second Hero (`1:3913`), Credibility Statement + logo strip (`1:3916`), "Column Right" of
the testimonial module (`7:5585`), the Bento Grid tag cloud (`1:3994`, 27 labels) and its "NS Insights" eyebrow (`1:4023`),
the "Brand" eyebrows of the Strategy/Design blocks (`1:3941`, `1:3949`).

Source fidelity: sections 1–2 were extracted with `get_design_context` (exact tokens). Sections 3–5 were extracted
from desktop-app screenshots + node metadata only (Figma remote MCP hit its plan rate limit mid-run); sizes from
metadata are exact, type/colour mappings for those sections are inferred from the render and marked "(inferred)".

---

## 1. Hero — hero   (desktop 1:3901 · mobile 13:10546)
Pattern: hero
Layout desktop: full-bleed 1513 × 843, padding `--ns-spacing-100` / `--ns-spacing-180`. Background image cover
(placed at 107.79% height, top −3.9%) + flat `--ns-color-bg-overlay` layer (no bottom gradient, unlike the list hero).
Content column vertically centred, gap `--ns-spacing-24`: title, then tag row (gap `--ns-spacing-6`, no wrap).
Breadcrumb absolutely at top 100 / left 180.
Layout mobile: 393 × 843, padding 100/16; content sits lower (bottom third), title 2 lines at mobile h1 (40/44). Breadcrumb at top 100 / left 16.
Typography:
- title → `.ns-text-web-h1-black` (70/76 Black, tracking −1.61; mobile 40/44), explicit line break between brand and project
- tags → `.ns-text-web-label-medium` (14 Medium)
- breadcrumb → `.ns-text-web-caption-light` (14, lh 1.5)
Colors: title → `--ns-color-text-primary` (#f6fcff); tag bg → `--ns-color-bg-brand` (#fd2847), tag text → `--ns-color-text-primary`, radius `--ns-radius-sm`, padding `--ns-spacing-8`; breadcrumb → `--ns-color-text-primary` / `--ns-color-icon-primary`.
Content:
```yaml
breadcrumb: [home, page, page2, page03]      # real: Home > Results (or Case Studies) > <Industry?> > <Title>
title: "Brand +\nProject Name"               # placeholder → "<Client> + <Project>"
tags: [Trends, Technology, Sustainability]   # placeholder → industry / services taxonomy terms
```
Assets: `website/frontend/public/assets/case-study/hero-waves.png` (JPEG, 1200×686) → hero background cover. Per-post field (hero image). Note: same image is the 2nd card image in "Explore more" (section 5) — it is the waves picture used by another post.
Interactions/behaviour: none.
DS components: `Tag` (solid brand variant needed, see list-page notes), `Icon` `home` / `arrow-right`.

---

## 2. Case study body — rich-text + image gallery   (desktop 1:3925 · mobile 13:10570)
Pattern: other:case-study-body (stacked "feature-split" blocks + full-width images)
Section container desktop: 1513 wide, bg `--ns-color-bg-canvas` (#181728), padding `--ns-spacing-80` / `--ns-spacing-180`,
children stacked with gap `--ns-spacing-40`. Mobile: padding `--ns-spacing-40` / `--ns-spacing-16`, gap `--ns-spacing-40`.
Sub-blocks in order:

### 2a. Intro header (`1:3926` · mobile `13:10571`)
Layout desktop: column gap `--ns-spacing-20`. Eyebrow row, then a row (gap 20): title flex 1 + client logo tile 198×198
radius `--ns-radius-lg` (16), white tile bg is in the logo image itself.
Layout mobile: eyebrow, logo tile (~56px, above the title, left aligned), title (3 lines). (inferred from screenshot)
Typography: eyebrow → `.ns-text-web-eyebrow-black` (16/18 Black); title → `.ns-text-web-h2-black` (42/48; mobile 32/38).
Colors: eyebrow → `--ns-color-text-accent` (#fde5ac); title → `--ns-color-text-secondary` (#bec8d8).
Content:
```yaml
eyebrow: "Brand"                                              # → client name / "Client"
title: "Project Headline goes here in specific two lines."   # → headline (max ~2 lines)
logo: client-logo-nike.png                                    # → client logo
```

### 2b. Overview — text + two images (`1:3933` · mobile `13:10578`)
Layout desktop: row gap `--ns-spacing-40`, `align-items:flex-end`, height 630. Left column (flex 1, gap 40): paragraph,
then image (aspect 567/354, radius `--ns-radius-lg`, image positioned 120% height / top −20%). Right column (flex 1): tall image,
full column height, cover, radius `--ns-radius-lg`.
Layout mobile: stacked: shopper image (361 wide, ~4:3), paragraph, then tall mobile-app image (361 × ~520). (inferred)
Typography: paragraph → `.ns-text-web-body-light` (18/27; mobile 16/24). Color `--ns-color-text-secondary` (#bec8d8).
Content:
```yaml
overview: "Introducing a groundbreaking e-commerce platform for Nike that revolutionizes the online shopping experience. This project features an intuitive interface, personalized product recommendations, and a streamlined checkout process. Customers can explore the latest athletic gear, track their orders in real-time, and enjoy exclusive discounts tailored just for them. With enhanced mobile compatibility and a vibrant community forum, Nike's new online store is set to elevate the way fans connect with their favorite brand."
images: [overview-shopper.png (left, 556×347), overview-mobile-app.png (right, 556×630)]
```

### 2c. "Strategy" block (`1:3940` · mobile `13:10584`)
Layout desktop: row gap `--ns-spacing-20`, `align-items:flex-start`: title column fixed 481 wide, body flex 1 (652).
Layout mobile: stacked title then body (gap 20).
Typography: title → `.ns-text-web-h2-black` (42/48); body → `.ns-text-web-body-light` (18/27). Both `--ns-color-text-secondary` (#bec8d8).
Content:
```yaml
title: "Strategy"
body: "Nike's e-commerce strategy focuses on leveraging augmented reality (AR) to enhance the online shopping experience. By allowing customers to virtually try on shoes and apparel through their smartphones, Nike aims to bridge the gap between physical and digital shopping. Additionally, the strategy includes personalized recommendations based on user behavior and preferences, ensuring that every customer feels uniquely catered to. The integration of a loyalty program that rewards users for engaging with the brand online will further enhance customer retention and satisfaction."
```

### 2d. Full-width image (`1:3947` · mobile `13:10591`)
1153 × 430, radius `--ns-radius-lg`, cover, placeholder bg `--ns-color-bg-surface` (Figma #d9d9d9 while loading). Mobile 361 × 430 (cover crops to the bust).
Asset: `placeholder-vr-bust.png`.

### 2e. "Design" block (`1:3948` · mobile `13:10592`)
Same layout/typography as 2c.
```yaml
title: "Design"
body: <identical to Strategy body — placeholder copy duplicated in Figma>
```

### 2f. Image group (`1:3955` · mobile `13:10599`)
Layout desktop: column gap 40: row (gap 40) of image 760×430 + image flex 1 (353×430, crop: 237% width, left −54.8%),
then full-width image 1153×430. All radius `--ns-radius-lg`.
Layout mobile: horizontal scroller, height 430: three images 310, 138, 293 wide with gap `--ns-spacing-16`, overflow to
the right (peek) → render as a scroll-snap carousel.
Asset: `placeholder-vr-bust.png` (all 3 slots).

Assets (section 2): in `website/frontend/public/assets/case-study/`
- `client-logo-nike.png` (PNG 600×600) → logo tile 198×198
- `overview-shopper.png` (PNG 2048×1536) → 2b left image
- `overview-mobile-app.png` (PNG 2048×1536) → 2b right tall image (cover)
- `placeholder-vr-bust.png` (JPEG 2000×1333, Unsplash+ watermarked placeholder) → 2d, 2f (×3), and section 4 images
Interactions/behaviour: images could open a lightbox (not designed). Mobile image group is a horizontal swipe row.
DS components: none specific (layout + text styles). Images as `<figure>` with optional caption.

---

## 3. Testimonial — testimonial-carousel (single quote card)   (desktop 7:5573 · mobile 13:10604)
Pattern: other:testimonial-card (single)
Layout desktop: section bg `--ns-color-bg-canvas`, padding `--ns-spacing-80` / `--ns-spacing-180`; Column Left padding 16;
card 1121 × 544, bg light, radius `--ns-radius-lg` (inferred, ~16), padding `--ns-spacing-40`, row gap `--ns-spacing-16`:
text column 626 (author row 16 high, gap 16, quote) + photo 399 × 464 radius `--ns-radius-lg`.
Layout mobile: section padding 40/16; card 361 × 788 padding `--ns-spacing-24`: author row, quote, photo full width (~281 × 390) below.
Typography (inferred): author name → `.ns-text-web-eyebrow-black` (16 Black); role → `.ns-text-web-body-regular` 16; quote → `.ns-text-web-h3-light` (32/48 Light; mobile ~20/30 → token h3 mobile 20/30).
Colors (inferred): card bg → `--ns-color-bg-inverse` (#f6fcff slate-50); quote/author → `--ns-color-text-inverse` (#181728); author icon → `--ns-color-icon-inverse`.
Content:
```yaml
author: { name: "Boyo", role: "Product Director", icon: user-octagon }
quote: "\"Working with this team has been a game changer for our project. Their expertise and dedication have helped us expand our reach across LATAM, particularly in Mexico, Nicaragua, and Argentina. We couldn't have done it without their support!\""
photo: testimonial-client-photo.png
```
Assets: `website/frontend/public/assets/case-study/testimonial-client-photo.png` (PNG 399×464, **1x screenshot export, corners already rounded** — re-export at 2x from Figma node `7:5584` when the MCP quota resets).
Interactions/behaviour: none (single quote). Use `<figure><blockquote>…</blockquote><figcaption>`.
DS components: none. DS has no user/user-octagon icon (checked `src/icons/generated.ts`): export the Figma "user-octagon" SVG (16px) when the MCP quota resets, or drop the icon.

---

## 4. Development block — feature-split + gallery   (desktop 1:3970 · mobile 13:10618)
Pattern: feature-split (reverse of 2b) + full-width images
Layout desktop: bg `--ns-color-bg-canvas`, padding 80/180, column gap 40.
- Row `1:3973` (1153 × 733, gap 40): left tall image 556.5 × 733 (cover, radius lg); right column 556.5 (gap 40): text box
  (padding 16, title 481 wide, gap 20 to paragraph) then image 556.5 × 347.
- Full-width image `1:3979` 1153 × 700, radius lg.
- Row `1:3980` (gap 40): image 353 × 430 + image 760 × 430, radius lg.
Layout mobile (`13:10618`, 393 × 2870): stacked: tall image (361 × ~370), title, paragraph, wide image, then large image
361 × 700, then `13:10628` 361 × 900 → two images stacked 430 each (gap 40). (inferred from screenshot)
Typography: title → `.ns-text-web-h2-black` (42/48); paragraph → `.ns-text-web-body-light` (18/27 desktop; render shows smaller ~16/24 → follows token). Colors: `--ns-color-text-secondary` (#bec8d8). (inferred)
Content:
```yaml
title: "Development"
body: <identical to the Overview paragraph in 2b: "Introducing a groundbreaking e-commerce platform for Nike that revolutionizes …">
images:
  tall_left: overview-mobile-app.png
  small_right: overview-shopper.png
  full_width: placeholder-vr-bust.png (1153×700)
  pair: [placeholder-vr-bust.png (353×430), placeholder-vr-bust.png (760×430)]
```
Assets: re-uses `overview-mobile-app.png`, `overview-shopper.png`, `placeholder-vr-bust.png` (same Figma images by visual match; not re-downloaded because of the rate limit — verify hashes later).
Interactions/behaviour: none.
DS components: none specific.

---

## 5. Explore more case studies — card-grid (related posts)   (desktop 1:3993 · mobile 13:10641)
Pattern: card-grid
Layout desktop: bg `--ns-color-bg-canvas`, padding 80/180. Title (1153 × 48), gap 40, row of 3 cards 360 × 390
(gap ~36.5, `justify-content:space-between`), radius `--ns-radius-xl` (24, inferred), image cover with dark bottom
gradient; tags top-left (padding ~`--ns-spacing-20`), title bottom-left.
Layout mobile: title 2 lines; cards stacked full width 361 × ~390, gap `--ns-spacing-16`.
Typography (inferred): section title → `.ns-text-web-h2-light` (42/48 Light; mobile 32/38); card title → `.ns-text-web-h4-black` (24/27; render ~20px Black → could be h3 mobile); tags → `.ns-text-web-label-medium`.
Colors: section title → `--ns-color-text-primary` (#f6fcff); card title → `--ns-color-text-primary`; tags → `--ns-color-bg-brand` bg + light text.
Content:
```yaml
title: "Explore more case studies like this"
cards:
  - { title: "The Heart of the City: Central Insights", tags: [Trends, Technology, Sustainability], image: code-tunnel (not downloaded) }
  - { title: "Exploring the Wonders of the Pacific Ocean", tags: [Remote Work, Mental Health Awareness], image: hero-waves.png }
  - { title: "Eastern Adventures: A Journey Beyond", tags: [Technology], image: testimonial-client-photo.png (same photo) }
```
Assets: none downloaded on purpose: card images are the related posts' featured images (dynamic). For local mocks reuse
`case-study/hero-waves.png`, `case-study/testimonial-client-photo.png`; card 1 image (code tunnel) not exported (image is a frame fill under text, needs `get_design_context` on `1:4029`).
Interactions/behaviour: each card is a link to that case study; hover zoom. Related = same industry/service terms, latest 3, excluding current.
DS components: `PortfolioCard` is the intended DS card for case studies (has `image`, `tags`, `client`, title, link). Its layout (image + text below) differs from this overlay card; either add an `overlay` variant to PortfolioCard or build locally. `Tag` for chips.

---

## 6. Contact Module — contact-form   (desktop 7:5595 · mobile 13:18541)
Identical instance to the list page Contact Module (`7:5437` / `13:18333`). See `case-studies.md` §6 for the full spec.
Content (verbatim): heading "Are you looking for a **reliable company** for staff augmentation services?"; tabs "New Project",
"Join Our Team", "General Inquiries"; fields "Full Name" (Tom Riddle), "Email" (darklord87@gmail.com), "Company" (slitherine.io);
"Service Requested" chips; "Message" ("Drop us some lines here..."); "Send".

---

## Page notes
- Almost all copy is placeholder: "Brand + Project Name", "Project Headline goes here in specific two lines.", eyebrow "Brand", blog-style tags, breadcrumb "home > page > page2 > page03". Strategy and Design share identical body copy; Development repeats the Overview paragraph.
- Images include Unsplash+ watermarked placeholders (`placeholder-vr-bust.png`) — do not ship to production.
- Desktop shows only Strategy / Design / Development headed blocks; there is **no explicit Challenge, Solution or Results/metrics section** and no tech-stack list in the design. The field model below adds them as optional fields so editors can fill them; flag to design.
- Section 2 is one Figma frame but semantically 6 blocks; the build should be a flexible-content/blocks renderer, not a fixed layout.
- Hidden Bento tag cloud (27 labels) suggests a planned taxonomy filter; not visible.
- Figma MCP (remote) hit the plan's call limit after section 2; sections 3–5 typography/colours are inferred from screenshots. `testimonial-client-photo.png` is a 1x screenshot with rounded corners baked in — re-export at 2x without the mask.

---

## WordPress custom post type: `case_study`

Proposed field model (ACF / Meta Box; exposed via WPGraphQL or REST). Slug `/case-studies/:slug`.

**Core WP fields**
| Field | Type | Used in |
| --- | --- | --- |
| `title` | post title (e.g. "Nike AR Commerce") | listing, related cards, SEO |
| `slug` | post slug | URL |
| `excerpt` | text, ~200 chars | list rows body (case-studies §3–5) |
| `featured_image` | image | list thumbnail (469×422 / 361×456), related cards (360×390) |
| `menu_order` / `is_featured` | bool `is_featured` | list page featured card (§2) |

**Taxonomies**
| Taxonomy | Example terms | Used in |
| --- | --- | --- |
| `industry` | Retail, Fintech, Healthcare | hero tags, list eyebrow, related-posts matching, breadcrumb level |
| `service` | Staff Augmentation, Software Development, UX Design, QA Testing | hero tags, list eyebrow, related matching |
| `technology` (tech stack) | React, Node.js, Salesforce, AWS | optional tech-stack chips (not in design) |

**ACF field group "Case study"**
| Field | Type | Required | Section |
| --- | --- | --- | --- |
| `client_name` | text | yes | 2a eyebrow ("Brand"), hero title prefix |
| `client_logo` | image (square, ≥400px, on white) | yes | 2a logo tile 198×198 |
| `project_name` | text | yes | hero title line 2 ("Project Name") |
| `hero_image` | image (≥2400×1350) | yes | 1 hero background |
| `hero_tags` | relationship → taxonomy terms (max 3) or derived from `industry`+`service` | no | 1 hero chips |
| `headline` | text (≤ 2 lines, ~70 chars) | yes | 2a title |
| `overview` | textarea / wysiwyg | yes | 2b paragraph |
| `overview_images` | gallery (exactly 2: landscape + portrait) | no | 2b |
| `challenge` | wysiwyg | no (not in design) | new text block, same layout as 2c |
| `solution` | wysiwyg | no (not in design) | new text block, same layout as 2c |
| `content_blocks` | flexible content, repeatable: `text_block {title, body}` (2c/2e/4 title+body), `image_full {image, height: 430\|700}` (2d/4), `image_pair {image_a, image_b, ratio: "2:1"\|"1:2"}` (2f/4 row), `split_media {image_tall, title, body, image_small, reverse:bool}` (2b/4) | yes | Strategy / Design / Development blocks and galleries |
| `results_metrics` | repeater `{value (e.g. "40%"), label (e.g. "faster checkout")}` | no (not in design) | new stats strip after content blocks |
| `tech_stack` | taxonomy `technology` (multi) | no (not in design) | chips list |
| `testimonial` | group `{quote (textarea), author_name, author_role, author_photo (image 399×464 @2x)}` — or relationship to a shared `testimonial` CPT | no | 3 |
| `related_case_studies` | relationship → `case_study` (max 3); fallback: auto by shared `industry`/`service` | no | 5 |
| `cta_override` | group `{heading, default_tab}` | no | 6 contact module (else global default) |
| `seo` | Yoast/RankMath | — | meta |

Fields that **vary per case study**: client name + logo, project name, hero image, hero tags (industry/service), headline,
overview text + images, challenge, solution, strategy/design/development blocks (titles, bodies, images), results metrics,
tech stack, testimonial (quote, author, role, photo), related case studies, featured image/excerpt.
Fields that are **global/static** (options page or shared component): breadcrumb root ("Home > Case Studies"), section title
"Explore more case studies like this", Contact Module copy/fields, nav, footer.
