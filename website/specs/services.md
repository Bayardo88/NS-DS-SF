# Services page (Staff Augmentation) — build spec

Figma `eIwmOO5omtR1Tlhdjea0C6` · desktop frame `1:2674` (1513 × 7037) · mobile frame `13:15943` (393 × 8955).
Theme: `web-2025`. Page background: `--ns-color-bg-canvas` (#181728) throughout.
Global nav, footer and Contact Module belong to the global-components spec (see notes at the end).

**Shared conventions on this page**
- Desktop container: 1513 frame, side padding `--ns-spacing-180` (180px), so content is 1153px wide. Section vertical padding is `--ns-spacing-80` unless noted.
- Mobile container: side padding `--ns-spacing-16`, vertical `--ns-spacing-40`.
- Section headings use `.ns-text-web-h2-light` (42/48, weight 300) in `--ns-color-text-secondary` (#bec8d8). Some include **bold** runs, which are the same size in Public Sans Black (900). Render them as `<strong>` with `font-weight: var(--ns-font-weight-black)`.
- Small eyebrows come in two styles: `.ns-text-web-caption-light` (14px/300) and `.ns-text-web-eyebrow-black` (16px/900), both in `--ns-color-text-accent` (#fde5ac honey-200).
- Primary CTA: DS `<Button variant="primary">` (bg `--ns-color-bg-brand` #fd2847, label `--ns-color-text-primary`, 18px/500, radius `--ns-radius-sm` 8px, padding 16/24). Figma mixes #fd2847 and an off-token #f13c45 with Inter 20px labels. Normalise every button to the DS Button.

---

## 1. Hero — hero   (desktop 1:2678 · mobile 13:15947)
Pattern: hero
Layout desktop: full-bleed, 843px tall. Padding 100 (`--ns-spacing-100`) top/bottom, 180 sides. Column, gap 24. Breadcrumb sits at the top. The heading block is vertically centred in the remaining height. Background image `object-fit: cover`, shifted slightly (h 107.8%, top -3.9%). Two overlays: a flat `rgba(17,17,17,.5)` (≈ `--ns-color-bg-overlay`) and a bottom fade, `linear-gradient(180deg, transparent 50%, var(--ns-color-bg-canvas) 100%)`.
Layout mobile: 393 × 843, padding 100/16. **The content and image are different on mobile** (see Content). The CTA is full-width. Heading wraps to 5 lines at the mobile H1 size (40px).
Typography:
- breadcrumb items → `.ns-text-web-caption-light` (14px/300, -0.32 tracking), `--ns-color-text-primary`
- h1 → `.ns-text-web-h1-light` (70/76, 300, -1.61 tracking)
- sub → `.ns-text-web-h3-light` (32/48, 300)
- CTA → `.ns-text-web-nav-medium` (18/27, 500) inside Button
Colors: h1/sub → `--ns-color-text-primary` (#f6fcff); CTA bg → `--ns-color-bg-brand` (#fd2847)
Content (desktop):
```
breadcrumb: [home, page, page2, page03]   # placeholder: render real trail Home > Services
h1: "Staff Augmentation That Works Like An In-House Team"
sub: "We don’t just staff roles — We build teams that integrate with your tools, match your delivery flow, and care about your product like you do. Our engineers are pre-vetted deeply trained, and ready to move your vision forward from day one."
cta: { label: "Build Your Team Now", href: "/contact-us/" }   # Figma links to nicasource1dev.../contact-us/
```
Content (mobile):
```
h1: "Maximize Your Potential with Bespoke Staff Augmentation Solutions"
sub: "Let Our Experts Shape Your Success Story!"
cta: { label: "Augment Now", href: "/contact-us/" }
```
Assets:
- `/assets/services/hero-bg-dots.png` → desktop background (1200×673; colourful dot-matrix wave)
- `/assets/services/hero-mobile-woman-glasses.jpg` → mobile background (2400×1808; woman with glasses, pink light). The mobile overlay is only the bottom fade, with no flat 50% layer.
Interactions/behaviour: the nav (global) overlays the top of the hero with a glass background. The breadcrumb uses the home icon and arrow separators.
DS components: Button (primary), Icon `home` + `chevron-right` for breadcrumb (Figma uses vuesax "group"/"arrow-right" triangles). Use the DS icons and don't download these.

---

## 2. Credibility Statement — logo-marquee   (desktop 1:2685 · mobile 13:17453)
Pattern: logo-marquee
Layout desktop: padding 80 top/bottom, 0 sides (the strip bleeds full width). Column gap 80. The title is 1153 wide with 375px side padding (it is left-aligned in Figma, not centred). Logo strip: row, gap 20, overflow clipped. Each logo sits in a pill card 120px tall, padding 0/40, radius `--ns-radius-2xl` (32px), bg `--ns-color-bg-surface` (#292643). The sequence is Scalar, Versa, WeLink, CMNH, then repeats and bleeds off both edges.
Layout mobile: heading changes to mixed weights and wraps at 361px. Logo cards keep the same height and are much larger relative to the viewport, with one card centred and partially visible neighbours.
Typography: title → `.ns-text-web-h2-light` (42/48)
Colors: title → `--ns-color-text-secondary` (#bec8d8); card bg → `--ns-color-bg-surface` (#292643)
Content:
```
desktop title: "Brands That Have Taken Advantage Of Our Partnership And Have Grown Their Businesses"
mobile title (bold runs in **): "**Brands** that have taken **advantage** of our **partnership** and have grown their **businesses**"
logos: [Scalar, Versa, WeLink, Children's Miracle Network Hospitals]
```
Assets (shared, already present):
- `/assets/shared/client-scalar.svg` (143×41 area. The Figma logo is 5 vector glyphs, about 210×29)
- `/assets/shared/client-versa.svg` (143×41)
- `/assets/shared/client-welink.svg` (225×34)
- `/assets/shared/client-cmnh.svg` (211×87)
Interactions/behaviour: infinite horizontal marquee, the same as the Home logo strip. Pause it under `prefers-reduced-motion`.
DS components: none specific. Reuse the shared LogoMarquee from the Home spec.

---

## 3. General Module — feature-split   (desktop 1:2811 · mobile 13:16080)
Pattern: feature-split
Layout desktop: row, gap 20, padding 80/180, items centred. Left column: flex 1 with inner padding 16. Its content column has gap 24. Right column: 469px wide and stretches to the row height (≈ 537). The image fills it with radius `--ns-radius-2xl` (32), `object-fit: cover`.
Layout mobile: stacks text then image, padding 40/16. The image is full-width × 456px, radius 32. The CTA is full-width. **The copy is entirely different on mobile** (see below).
Typography:
- eyebrow → `.ns-text-web-caption-light` (14/300)
- heading → `.ns-text-web-h2-light` (42/48). Figma adds an empty trailing line, so drop it.
- body → `.ns-text-web-body-light` (18/27, 300). Paragraphs separated by one blank line (use `margin-block` 27px).
Colors: eyebrow → `--ns-color-text-accent` (#fde5ac); heading → `--ns-color-text-secondary` (#bec8d8); body → `--ns-color-text-primary` (#f6fcff)
Content (desktop):
```
eyebrow: "Staff Augmentation for SaaS Teams"
heading: "Expand Your Team Without Slowing Down"
body:
  - "Nicasource Staff Augmentation helps fast-growing SaaS teams scale engineering capacity — whether you need long-term contributors or short bursts of specialized support."
  - "From DevOps to QA and everything in between, our engineers integrate like full-time staff: working your hours, on your tools, and aligned to your flow. Without the overhead of recruiting fees, benefits packages, tax liability, or internal admin costs."
  - "No compliance complexity. No inflated headcount. Just lean, scalable engineering — on your terms."
cta: { label: "Augment Your Team", href: "/contact-us/" }
```
Content (mobile):
```
eyebrow: "Staff Augmentation"
heading (bold in **): "What is **Nearshore Staff Augmentation** with Nica Source?"
body:
  - "With Nica Source's staff augmentation services, tech companies can access a flexible workforce solution that brings in skilled professionals on a temporary basis. By choosing Nica Source, you can adjust your team size according to project demands, streamline hiring processes, and optimize efficiency."
  - "Our augmented staff integrates effortlessly into your existing teams, promoting quick project completion and cost-efficiency while you drive innovation and growth."
cta: { label: "Schedule a Call", href: "/contact-us/" }
```
Assets:
- `/assets/services/general-team-laptop.jpg` → desktop right column, 469×~505 rendered (1118×969 source; two engineers at a laptop)
- `/assets/services/general-mobile-ice-cream.jpg` → mobile image, 361×456 (1200×1200 source; ice-cream cone on pink, likely a placeholder)
Interactions/behaviour: none.
DS components: Button (primary).

---

## 4. Benefits ("Services Section") — other:benefits-explorer   (desktop 1:2822 · mobile 13:16091)
Pattern: other:benefits-explorer (tabs on desktop, accordion on mobile)
Layout desktop: padding 80/180, column gap 40. The content row is 438px tall and holds three columns:
- C1 and C2 are each 360px wide, column gap 24. They hold benefit "tabs": padding 24, radius `--ns-radius-lg` (16), border 2px `--ns-color-border-subtle` (#292643), bg canvas. The **active** tab has no visible border and bg `--ns-color-bg-surface` (#292643). Each tab row is the title (flex 1) plus an `eye` icon (24px, `--ns-color-icon-accent` #fde5ac).
- Column 3 (flex 1, gap 24) is the detail panel for the active tab: the title, then the description.
- The gap between columns is 16 in Figma (shown as "42px 16px").
Layout mobile: a single-column **accordion**, with a column gap of 16 in C1 and 24 in C2 (normalise to 16). Each item: padding 24, radius 16, border 2px subtle, and a `chevron-down` icon on the right. The open item has border 2px `--ns-color-border-accent` (#fde5ac; Figma #b68f4f) and shows its description plus an image 312×276 with radius 16. The heading copy changes too.
Typography:
- eyebrow → `.ns-text-web-caption-light`
- heading → `.ns-text-web-h2-light`
- tab title → `.ns-text-web-h4-black` (24/27, 900)
- detail title → `.ns-text-web-h4-black`; detail body → `.ns-text-web-body-light`
Colors: tab titles → `--ns-color-text-primary`; detail body → `--ns-color-text-secondary`; icons → `--ns-color-icon-accent`
Content:
```
desktop eyebrow: "When Your Product Can't wait"
desktop heading: "We Give You The Equipment You Need To Move Forward Without Slowing Down"
mobile eyebrow: "The Benefits"
mobile heading (bold in **): "Staff Augmentation service **benefits for your company**"
items:   # order: desktop C1 then C2; mobile shows the same order in one list
  - title: "40 Productive hours"
    body: "These hours are actually hours worked, each day we will demonstrate what we have done in those hours for your business."
    image (mobile open state): /assets/services/benefit-beach-laptop.jpg
  - title: "Cost Efficiency"
    body: "Our talent offers a perfect balance between productivity and a more affordable annual cost compared to others. In addition to not paying taxes, social security, etc... We take care of that so you pay less."
  - title: "8 Hours a day"
    body: "We call it NS Time, as these hours are on the house, as we will cover meal times, training, team meetings and study time."
  - title: "English Accent"
    body: "We make sure that our entire workforce speaks fluent and understandable English"
  - title: "Qualified Talent"
    body: "We excel at identifying and honing premier talent, meticulously crafted to meet the exacting demands of your digital product and service, ensuring flawless execution."
  - title: "Task & Team Management"
    body: "Focus on what you do best, and we focus on keeping the workers happy because we handle everything to make everything you need happen."
  - title: "LATAM Talent on your time"
    body: "Time zone alignment allows Latin American teams to sync effortlessly with their U.S. counterparts, fostering seamless collaboration and greater productivity."
  - title: "In-House Training"
    body: "we make sure that our employees have the opportunity to learn new knowledge and techniques to apply them in your business outside of working hours."
```
(Bodies 2–8 come from the mobile accordion layer names (hidden collapsed content). Desktop only shows item 1's body in the detail panel.)
Assets:
- `/assets/services/benefit-beach-laptop.jpg` → mobile open-accordion image, 312×276, radius 16 (1599×2400 source). Desktop shows no image.
Interactions/behaviour:
- Desktop: build it as a `role="tablist"` with vertical tabs. Hover or click selects a tab and swaps the detail panel. The default is "40 Productive hours". The eye icon hints at "view".
- Mobile: single-open accordion (`aria-expanded`), default open item 1. The chevron rotates on open.
DS components: Icon (`eye` desktop, `chevron-down` mobile). The tab and accordion card is a page-level component.

---

## 5. Services bento — bento-services   (desktop 1:2882 · mobile 13:17521 "Bento Grid-01-Mob")
Pattern: bento-services
Layout desktop: padding 80/180, column gap 20. Cards row: gap 20, 500px tall.
- Left: "Software Development", 371×500.
- Right column, 761 wide, two rows of 240 with gap 20:
  - Row 1: Product Design 273 + Salesforce 468.
  - Row 2: Project Management 468 + Quality Assurance 273.
- Cards: bg canvas, border 2px #fd6a75 (coral-300, so use `--ns-color-border-brand` or a 300-level brand border; see notes), radius 32 (`--ns-radius-2xl`), padding 32, content justified to the bottom-left.
- Each card has a hidden top row (opacity 0) with an `export` (external-link) icon, 42px. That is a hover state: show the arrow icon on hover.
Layout mobile: padding 40/16, gap 32 between header and grid, grid gap 16.
- Row 1: Software Development and Product Design, two equal cards 240 tall.
- Row 2: full-width "Salesforce Admin & Development", content-height.
- Row 3: Quality Assurance and Project Management, content-height.
- Cards on mobile: border 1px, radius 16 (`--ns-radius-lg`), padding 16.
Typography: eyebrow → desktop `.ns-text-web-caption-light`, mobile `.ns-text-web-eyebrow-black`; heading → `.ns-text-web-h2-light`; card label → `.ns-text-web-h4-black` (24/27, 900)
Colors: card label → `--ns-color-text-brand` (#fd6a75 coral-300); card border → coral-300 (#fd6a75)
Content:
```
desktop eyebrow: "You Set the Focus. We Bring the Firepower"
desktop heading: "Engineers, Designers, PMs, and More Ready to Plug Into Your Flow"   # line break after "More"
mobile eyebrow: "Explore our Services"
mobile heading (bold in **): "Need to **boos** your **existing team**? See how we can help."   # "boos" typo in Figma
cards:
  - { label: "Software Development", href: "/services/development" }
  - { label: "Product Design", href: "/services/product-design" }
  - { label: "Salesforce Admins & Developers", mobileLabel: "Salesforce Admin & Development", href: "/services/salesforce" }
  - { label: "Project Management", href: "/services/project-management" }
  - { label: "Quality Assurance", href: "/services/quality-assurance" }
```
Assets: none. The export icon is DS `arrow-up-right` / `external-link`.
Interactions/behaviour: the whole card is a link to its service detail page. Hover shows the arrow icon at top-right (fade in) and could fill the bg with `--ns-color-bg-brand-subtle`. Focus-visible ring.
DS components: Icon (`arrow-up-right`). Card is page-level, the same pattern as the Home bento.

---

## 6. Comparison ("testimonials section") — other:comparison-cards   (desktop 53:3990 · mobile 13:16174)
Pattern: other:comparison-cards (the Figma layer is named "testimonials" but holds no testimonials)
Layout desktop: padding 80/180, column gap 60, header centred. Three equal cards in a row, gap 24, top-aligned (cards 2 and 3 stretch to equal height). Card: padding 32, radius 16, border 2px `--ns-color-border-subtle`, bg canvas, gap 8. Title row: title flex 1 plus chevron icon (Nicasource shows `chevron-up` because it is open; the others show `chevron-down` but are still expanded on desktop). Body is a bullet list (disc, 27px indent).
Layout mobile: padding 40/16, gap 32. The heading is left-aligned with different bold runs; the sub is centred. Cards stack full-width as a **collapsed accordion** (title + chevron only). The mobile hidden bodies are prose paragraphs, not lists (see notes).
Typography: heading → `.ns-text-web-h2-light` with bold runs; sub → `.ns-text-web-body-light`; card title → `.ns-text-web-h4-black`; list → `.ns-text-web-body-light`
Colors: heading → `--ns-color-text-secondary` (#bec8d8); sub → `--ns-color-text-primary`; card title → `--ns-color-text-primary`; Nicasource list → `--ns-color-text-secondary`, other lists → `--ns-color-text-primary` (inconsistent in Figma; use secondary for all); chevrons → `--ns-color-icon-accent`
Content:
```
desktop heading (bold in **): "Why **augment** your **tech teams** with Us? Let’s Compare"
mobile heading (bold in **): "**Why augment** your tech teams **with Us**? Let’s Compare"
sub: "See the difference of the Staff Augmentation Firm versus other models"
cards:
  - title: "Nicasource"
    items:
      - "Fully managed hiring process, including legal aspects and payroll management"
      - "Comprehensive benefits management"
      - "Training provided based on client needs"
      - "Moderate pricing, including necessary equipment"
      - "Standard 40-hour workweek"
      - "Termination management handled by Nicasource"
      - "Flexible staffing with quick resource swaps"
      - "Easy scalability to meet seasonal demands"
  - title: "Recruiting Agency"
    items:
      - "Fully managed hiring process"
      - "Limited support in other areas"
      - "Legal hiring available as an add-on"
      - "Payroll, benefits, and training not included"
      - "Moderate pricing, but no equipment provided"
      - "Working hours unspecified"
      - "Terminations handled by the client"
      - "Changes in hires require a new hiring process"
      - "Limited flexibility for seasonal availability"
  - title: "In-House Team"
    items:
      - "Managed internally, including legal hiring and payroll"
      - "Added tax responsibilities"
      - "Benefits and training handled in-house"
      - "High costs due to overhead expenses"
      - "Equipment provided internally"
      - "24-hour workweek"
      - "Terminations managed within the organization"
      - "Lengthy internal process for hiring changes"
      - "Limited seasonal availability with a fixed staff"
```
Assets: none.
Interactions/behaviour: desktop shows all three expanded (the chevrons are decorative there, or let them collapse). Mobile is an accordion, all collapsed by default (or Nicasource open). Use the same list content on mobile rather than the prose variants.
DS components: Icon (`chevron-up` / `chevron-down`).

---

## 7. Mobile-only banner "Ready to scale your team?" — cta-banner   (mobile 13:17542; no desktop counterpart)
Pattern: cta-banner
Layout mobile: 393 × 428, padding 40/16, content centred, gap 24. Background image `cover` with a 50% overlay (`--ns-color-bg-overlay`). The button is full-width.
Typography: title → `.ns-text-web-banner-black` (mobile 60px, 900, centred); sub → `.ns-text-web-h2-light` (mobile 32px)
Colors: text → `--ns-color-text-primary`
Content:
```
title: "Ready to scale your team?"
sub: "Explore Staff Augmentation"
cta: { label: "Partner with Us", href: "/contact-us/" }
```
Assets: `/assets/shared/banner-waves-bg.jpg` (byte-identical to the Figma fill)
Interactions/behaviour: none. Sits between the bento and the comparison on mobile only. Hide it on desktop, or decide whether to add it to desktop (see notes).
DS components: Button (primary).

---

## 8. Time zones ("SEO Module") — timezone-bento / seo-states   (desktop 7:5311 · mobile 13:17556)
Pattern: seo-states
Layout desktop: padding 80/180. Inner card 1121 wide, padding 40, gap 16, radius 16, no bg. Top section: eyebrow, then a 2-line heading, gap 20. Then a row of five columns, `justify-content: space-between`. Each column: header, gap 32, then a list of 8 states with gap 16. In the Pacific column the list fades at both ends (opacity 0.1, 0.4, 0.7, 1, 1, 0.7, 0.4, 0.1), which implies a vertical auto-scroll ticker. The other columns are fully opaque.
Layout mobile: padding 40/16. The heading copy changes. The five time zones become **accordion rows** (title + small `chevron-down`; padding ≈16, radius 8 (`--ns-radius-sm`), border 1px `--ns-color-border-subtle`, gap 16). The state list is inside the collapsed content.
Typography: eyebrow → `.ns-text-web-eyebrow-black` (16/900); heading → `.ns-text-web-h2-light`; column title → `.ns-text-web-h4-black`; state → `.ns-text-web-nav-medium` (18/27, 500)
Colors: eyebrow → `--ns-color-text-accent`; heading, titles, states → `--ns-color-text-secondary` (#bec8d8)
Content:
```
desktop eyebrow: "No Offshore Lag"
desktop heading: "Covering All U.S. Time Zones / with Seamless Overlap"   # 2 lines
mobile eyebrow: "Name the city"
mobile heading (bold in **): "We got you **covered**"
columns: ["Pacific Time", "Mountain Time", "Central Time", "Eastern Time", "Eastern Time +1"]
states: "State Name" × 8 per column   # PLACEHOLDER: real state lists needed from content
```
Assets: none.
Interactions/behaviour: the faded Pacific column suggests an infinite vertical scroll ticker for each column, or a fade mask. Implement it as `mask-image: linear-gradient(transparent, #000 30%, #000 70%, transparent)` with a slow CSS scroll, and respect reduced motion. The mobile version is an accordion.
DS components: Icon (`chevron-down`).

---

## 9. Banner "Join the 20+ partners" — cta-banner   (desktop 1:2933 · mobile 13:16198)
Pattern: cta-banner
Layout desktop: full-bleed, padding 80/180. Content box 1121 wide, centred column, gap 24. Background image `cover` with a 50% overlay.
Layout mobile: padding 40/16. Adds a sub line. The button is full-width.
Typography: title → `.ns-text-web-banner-black` (80/88, 900, centred; mobile 60); sub (mobile only) → `.ns-text-web-h2-light`
Colors: title/sub → `--ns-color-text-primary`
Content:
```
title: "Join the 20+ partners who trust us."
sub (mobile only): "we’re ready to take your project to success."
cta: { label: "Schedule a Call", href: "/contact-us/" }   # Figma label has a typo "Sche\dule a Call"
```
Assets: `/assets/shared/banner-liquid-bg.jpg` → background (1200×1200, liquid-chrome iridescent). The same file is used for desktop and mobile.
Interactions/behaviour: none.
DS components: Button (primary).

---

## 10. Contact Module — contact-form   (desktop 5:4588 · mobile 13:17634)
Owned by the global contact-module spec. Page-specific differences only:
- Heading: "Are you looking for a **reliable company** for staff augmentation services?" (bold run "reliable company")
- Tabs: "New Project" (active, honey underline), "Join Our Team", "General Inquiries"
- Fields: Full Name, Email, Company, Service Requested (chips), Message, with a Send button. Sample values "Tom Riddle", "darklord87@gmail.com", "slitherine.io" are placeholders.
- Service chips: Software Development, Project Management, QA Testing, UX Audit, UI Design, UX Design, Salesforce Administration, Salesforce Development, Staff Augmentation (the selected state is filled coral with an × icon).
- Desktop bg is `--ns-color-bg-surface-subtle`/surface (≈ #292643, lighter than canvas).

---

## Page notes
- **Desktop and mobile differ in content**, not just layout:
  - Hero: different h1, sub, CTA label and image.
  - General Module: different copy and image (ice cream on mobile looks like a placeholder).
  - Benefits and Bento: different eyebrows and headings.
  - Mobile adds a "Ready to scale your team?" banner (13:17542).
  - Time zones: different eyebrow and heading.

  Recommendation: drive the copy from CMS fields, with the desktop copy as the canonical default. Confirm with design which copy wins.
- Typos in Figma: "boos" (boost), "Sche\dule a Call", "pre-vetted deeply trained" (missing comma), and the lowercase start of "we make sure…" and "we’re ready…". Keep them verbatim here; fix them in CMS content.
- "State Name" is placeholder content in all time-zone columns. Breadcrumb "page / page2 / page03" is a placeholder too.
- Off-token values in Figma:
  - Button bg #f13c45 and Inter 20px labels: use the DS Button.
  - Bento border #fd6a75 (coral-300): no semantic border token matches (`--ns-color-border-brand` is coral-500 #fd2847). Use `--ns-color-border-brand`, or request a `border-brand-subtle` token in Figma.
  - Mobile benefit active border #b68f4f is the light-theme accent: use `--ns-color-border-accent`.
- The desktop benefit-tab icon is `eye`, but the mobile one is `chevron-down`. Desktop tab "8 Hours a day" uses a 24px icon while the others use 48 (inconsistency); use 24 for all.
- Desktop comparison chevrons suggest collapsible cards, but all are shown expanded.
- Mobile comparison hidden bodies are prose paragraphs (layer names 13:16191, 13:16197) that restate the desktop bullet lists. Prefer the lists.
- The global nav on this page marks "Services" active.
