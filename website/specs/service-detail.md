# Service Detail page (Development) — build spec

Figma `eIwmOO5omtR1Tlhdjea0C6` · desktop frame `1:4241` (1513 × 7143) · mobile frame `13:10821` "Development" (393 × 9499).
Theme: `web-2025`. Page background: `--ns-color-bg-canvas` (#181728).
This is the template for every service detail page (Development, Product Design, Salesforce, PM, QA). Build it data-driven: hero copy, the service card, skills, FAQs and banner copy come from CMS.
Global nav and footer are owned by the global spec. Shared conventions (container 1153 = 180px side padding, section padding 80, mobile 16/40, h2 style, Button normalisation) are the same as `services.md`.

Desktop order: Hero → Credibility → General → Comparison → Service card → Skills → FAQ → Time zones → Banner (no Contact Module on desktop).
Mobile order: Hero → Credibility → General → Service card → Comparison → Skills → Banner → FAQ → Time zones → Contact Module.

---

## 1. Hero — hero   (desktop 1:4245 · mobile 13:10825)
Pattern: hero
Layout desktop: full-bleed, ≈843px tall, padding 100/180, column gap 24. The breadcrumb sits at the top and the text block is vertically centred. Background image `cover`. Overlays: `linear-gradient(180deg, transparent 50%, var(--ns-color-bg-canvas))` over a flat `rgba(17,17,17,.5)` (`--ns-color-bg-overlay`).
Layout mobile: 393×843, padding 100/16. The h1 wraps into 3 lines ("Every <Code/>", "placed", "with purpose."), and on mobile "with purpose." is **not** bold. The body copy is different. The CTA is full-width. The image is different. The bottom fade starts at 56%.
Typography:
- breadcrumb → `.ns-text-web-caption-light`
- h1 → `.ns-text-web-h1-light` (70/76, 300). "with purpose" is a Black (900) run on desktop. `<` and `/>` are coral.
- sub → `.ns-text-web-h3-light` (32/48)
- CTA → Button label (18/27, 500)
Colors: h1 → `--ns-color-text-primary` (#f6fcff); `<` and `/>` glyphs → `--ns-color-bg-brand` color (#fd2847 coral-500; as text use `color: var(--ns-color-bg-brand)` or `--ns-color-text-brand` #fd6a75 if contrast-safe, see notes); sub → `--ns-color-text-primary`
Content:
```
breadcrumb: [home, page, page2, page03]   # placeholder → Home > Services > Development
h1 (desktop): "Every <Code/> placed " + "**with purpose**" + "."   # line break after "placed"
h1 (mobile):  "Every <Code/> placed with purpose."             # no bold
sub (desktop): "We build the team you don’t have time to find, and we have the talent that has worked with businesses like yours. So you can keep growing, without slowing down."
sub (mobile): "Scale your workforce as your projects change with our nearshore software staff augmentation. Quickly add skilled professionals to your team without the hassle of lengthy hiring processes. Get top talent when you need it."
cta: { label: "Augment your team  Now", href: "/contact-us/" }   # double space in Figma; use "Augment your team now"
```
Assets:
- `/assets/service-detail/hero-code-bokeh.png` → desktop bg (1200×800; orange/teal bokeh code lines)
- `/assets/service-detail/hero-mobile-dev-headphones.jpg` → mobile bg (1200×904; developer with headphones and glasses)
Interactions/behaviour: the global glass nav overlays the hero.
DS components: Button (primary), Icon `home` / `chevron-right` (breadcrumb).

---

## 2. Credibility Statement — logo-marquee   (desktop 7:5001 · mobile 13:17871)
Pattern: logo-marquee
Layout: identical to `services.md` §2 (padding 80/0, gap 80, pill cards 120 tall, radius 32, `--ns-color-bg-surface`, marquee). On desktop the title here is **centred**.
Typography: title → `.ns-text-web-h2-light`, `--ns-color-text-secondary`
Content:
```
desktop title: "Developers Who Fit Like A Glove And Perform Like Swiss Watches. These Enterprises Didn’t Waste Time—They Hired Ours"
mobile title (bold in **): "**Brands** that have taken **advantage** of our **partnership** and have grown their **businesses**"
logos: [Scalar, Versa, WeLink, Children's Miracle Network Hospitals]
```
Assets: `/assets/shared/client-scalar.svg`, `client-versa.svg`, `client-welink.svg`, `client-cmnh.svg` (shared, already present)
Interactions/behaviour: infinite marquee, paused under reduced motion.
DS components: shared LogoMarquee.

---

## 3. General Module — feature-split   (desktop 1:4378 · mobile 13:17930)
Pattern: feature-split
Layout desktop: same as `services.md` §3. The row has gap 20 and padding 80/180. The left column (flex 1, padding 16, gap 24) holds the eyebrow, heading, body and CTA. The right column is 469 wide and full height, with the image at radius 32, `cover`.
Layout mobile: same structure as the Services mobile General Module, with the same copy and ice-cream image. **Mobile content differs from desktop.**
Typography:
- eyebrow → `.ns-text-web-eyebrow-black` (16/900)
- heading → `.ns-text-web-h2-black` (42/48, **900**; unlike Services, which is Light)
- body → Figma uses Public Sans Regular 20/30 (-0.44), which matches no DS style. Use `.ns-text-web-lead-medium` (20px) or `.ns-text-web-body-light`; recommend `.ns-text-web-body-light` for consistency with Services.
Colors: eyebrow → `--ns-color-text-accent` (#fde5ac); heading → `--ns-color-text-secondary`; body → `--ns-color-text-primary`
Content (desktop):
```
eyebrow: "Software Staff Augmentation for Saas & Startups"
heading: "Skip Building From Scratch Your Team Is Already Here"   # wraps after "Scratch"
body: "Nicasource helps you grow your engineering team without the stress of hiring from scratch. We match you with experienced developers who understand how to ship, not just code. They plug into your tools, your time zone, and your culture—so your product keeps moving while you stay focused on growth."
cta: { label: "Skip Hiring Delays—Get Talent Now", href: "/contact-us/" }   # underlined link style in Figma
```
Content (mobile): same as services.md §3 mobile ("What is **Nearshore Staff Augmentation** with Nica Source?", 2 paragraphs, CTA "Schedule a Call").
Assets:
- `/assets/service-detail/general-dev-team-office.jpg` → desktop right column, 469×~505 (1900×1085; three people at a laptop in an office)
- `/assets/services/general-mobile-ice-cream.jpg` → mobile (reuse the Services asset)
Interactions/behaviour: none.
DS components: Button (primary).

---

## 4. Comparison ("testimonials section") — other:comparison-cards   (desktop 1:4411 · mobile 13:17945)
Pattern: other:comparison-cards
Layout desktop: same header as `services.md` §6 (centred, gap 32). The three cards are **collapsed** here: title plus chevron only, each 1 row tall (padding 32, radius 16, border 2px `--ns-color-border-subtle`), in a 3-column row with gap 24. Nicasource shows `chevron-up`; the others show `chevron-down`.
Layout mobile: identical to Services mobile (left-aligned heading with bold runs, stacked collapsed accordion).
Typography / Colors: as services.md §6.
Content: heading, sub and the three card lists are identical to services.md §6. Reuse the same component and data. The expanded content is the bullet lists from services.md.
Assets: none.
Interactions/behaviour: accordion. Clicking a card expands its list. Allow one open at a time on mobile, independent on desktop.
DS components: Icon (`chevron-up` / `chevron-down`).

---

## 5. Service card — feature-split (card)   (desktop 1:4389 · mobile 13:10969)
Pattern: other:service-detail-card
Layout desktop: padding 80/180, gap 20 between the eyebrow, heading and card. The card is 1153×672, bg `--ns-color-bg-inverse` (#f6fcff slate-50), radius `--ns-radius-2xl` (32), padding 40, gap 32, and has two columns:
- Column 1 (543 wide, gap 34):
  - Header row, gap 24: an 80px icon tile (coral outline rounded square with `< >` code glyph) and a 2-line title.
  - Description.
  - "Some technologies we work with:" with tech chips (wrap, gap 4).
  - Button.
  - "Explore the rest of our Services" with a 3-column link list (gap 15 vertical, 31 horizontal).
- Column 2 (468 wide, padding 16, full height): image at radius 16, `cover`.
Layout mobile: the card is full-width (361), radius 32, padding 24. The image comes first (≈313×225, radius 16), then the icon and title, then the description. The tech chips are **replaced** by outlined pill links to other services. The "Explore the rest…" list and the "Talk to a Dev Team Lead" button are removed; the button becomes full-width "Partner with Us". The heading wraps over 4 lines, with the bold run on lines 2–3.
Typography:
- eyebrow → `.ns-text-web-eyebrow-black`
- heading → `.ns-text-web-h2-light` with bold run
- card title → `.ns-text-web-h3-black` (32/48, 900)
- description → `.ns-text-web-body-light`
- sub-labels ("Some technologies…", "Explore the rest…") → body 18/27 Black; use `.ns-text-web-body-regular` + `font-weight: var(--ns-font-weight-black)` or `.ns-text-web-h4-black` at 18px
- chips and links → `.ns-text-web-small-regular` (12/18, 400)
Colors (card is a light surface inside a dark theme):
- card bg → `--ns-color-bg-inverse` (#f6fcff)
- title, description, sub-labels → `--ns-color-text-inverse` (#181728; Figma used white fallback / night-700 #292643)
- chip bg #eef6fa, border #d9e1ee, text #ababae → off-token. Use DS `<Tag>` with neutral styling; on the inverse surface text #ababae fails contrast, so use `--ns-color-text-inverse` at reduced emphasis or `--ns-color-slate-600`-equivalent semantic (flag).
- "Explore the rest" links: active "Project Management" → coral-500 (#fd2847); others → #9f9fa0 (off-token, low contrast). Map to `--ns-color-text-inverse` (rest) and brand (current/hover).
- icon tile → coral-500 stroke, radius ≈16
- button → `--ns-color-bg-brand`
Content:
```
eyebrow: "Explore our Services"
heading (bold in **): "Look the type of **Custom Software Development** we offer in our company"
card:
  icon: code (DS `code` icon in a 80px coral-outlined rounded tile)
  title: "Software Development"     # 2 lines: "Software" / "Development"
  description: "Get software solutions built uniquely for you, featuring both sleek front-end design and powerful back-end technology."
  techLabel: "Some technologies we work with:"
  tech:   # chip label + 16px logo at the right
    - { label: "React Native", logo: /assets/shared/tech-react.svg }
    - { label: "Flutter", logo: /assets/shared/tech-flutter.svg }
    - { label: "Node.js", logo: /assets/shared/tech-nodejs.svg }
    - { label: "React", logo: /assets/shared/tech-react.svg }
    - { label: "WordPress", logo: /assets/shared/tech-wordpress.svg }
    - { label: "Shopify", logo: /assets/shared/tech-shopify.svg }
    - { label: "Webflow", logo: /assets/shared/tech-webflow.svg }
  cta (desktop): { label: "Talk to a Dev Team Lead", href: "/contact-us/" }
  cta (mobile):  { label: "Partner with Us", href: "/contact-us/" }
  exploreLabel (desktop): "Explore the rest of our Services"
  explore (desktop, 3 columns):
    - ["Project Management", "QA Testing", "Salesforce Administration"]
    - ["Staff Augmentation", "UX Design", "UI Design"]
    - ["UX Product Audit", "Product Management"]
  explore (mobile pills, in order): ["Project Management", "QA Testing", "Salesforce Administration", "Software Development", "Staff Augmentation", "UX Design", "UI Design", "UX Product Audit"]
```
Assets:
- `/assets/service-detail/service-card-robot-laptop.png` → right column image 436×~600 desktop / top image 313×225 mobile (1344×896; orange robot arms and a laptop with code)
- `/assets/shared/tech-*.svg` → 16px chip logos (react, flutter, nodejs, wordpress, shopify, webflow)
Interactions/behaviour: the explore links and mobile pills link to the other service detail pages. "Project Management" is shown in coral, which looks like a hover or active state.
DS components: Button (primary), Tag (tech chips; mobile outlined pills), Icon `code`.

---

## 6. Skills ("Our process") — other:tag-marquee   (desktop 1:4459 · mobile 13:11035)
Pattern: other:tag-marquee
Layout desktop: padding 80/180, column gap 40, centred. The heading is followed by **3 rows** of tags. Each row is a single-line flex with gap 16, centred, overflowing both edges (clipped by the section). Tag: padding 8/16, radius `--ns-radius-lg` (16), border 1px `--ns-color-border-accent` (#fde5ac), bg canvas. Figma mixes tag sizes per row (Inter Medium 24px vs Public Sans Medium 20px). Normalise to a single size (20px).
Layout mobile: 393 × 396, padding ~40/16, the heading is centred on 2 lines, and the 3 tag rows overflow both sides. On mobile the bold run is "the skills".
Typography: heading → `.ns-text-web-h2-light` with bold runs (line-height 1.5 in Figma; use the h2 style); tag → `.ns-text-web-lead-medium` (20/24, 500)
Colors: heading → `--ns-color-text-secondary`; tag text → `--ns-color-text-secondary` (#bec8d8); tag border → `--ns-color-border-accent`
Content:
```
desktop heading (bold in **): "**We have** the **skills** you’re looking for"
mobile heading (bold in **):  "We have **the skills** you’re looking for"
tags (same list in every row): ["React Native", "React.js", "Android", "Python", "C++", "Ruby", "iOS", "Scala", "Vue.js", "C#", "PHP", "Ruby on Rails", "Swift", "Node.js", "Java", "Angular", "HTML", "And More"]
```
Assets: none.
Interactions/behaviour: the three rows are clearly a **horizontal marquee**, each row offset (row 1 and 3 scroll one way, row 2 the other, or with different start offsets). Duplicate the list for a seamless loop and pause under reduced motion. Tags are not links.
DS components: Tag.

---

## 7. FAQ ("Our process") — other:faq-accordion   (desktop 1:4585 · mobile 13:11161)
Pattern: other:faq-accordion
Layout desktop: padding 80/180, gap 40. The heading is centred. Two columns, gap 32, each a column of FAQ cards with gap 32. Card: padding 40/32, radius 16, border 2px `--ns-color-border-subtle`, bg canvas, row gap 32 (question flex 1 + 24px `chevron-down` in `--ns-color-icon-accent`). The **open** card has border 2px slate-300 (#bec8d8) and shows its answer below the question (gap 32).
Layout mobile: single column, gap 16. Card padding 16, radius 16. The heading becomes "FAQ’s". The order is left column then right column.
Typography: heading → `.ns-text-web-h2-black` (42/48, 900, centred); question → `.ns-text-web-h4-black`; answer → `.ns-text-web-body-light`
Colors: heading → `--ns-color-text-secondary`; question → `--ns-color-text-primary`; answer → `--ns-color-text-secondary`; open border → slate-300 (no exact semantic; use `--ns-color-border-strong` or `--ns-color-border-accent`, see notes)
Content:
```
desktop heading: "FAQ'S About Hiring Software Team In USA"
mobile heading: "FAQ’s"
faqs:   # left column first (4), then right column (6)
  - q: "How does custom software development differ from off-the-shelf software?"
    a: "Custom software development offers tailored solutions that align closely with a business's unique needs, allowing for greater customization and scalability. While it requires a higher upfront cost and longer development time, it adapts as the business grows. Off-the-shelf software, however, provides a quicker, budget-friendly option but lacks the flexibility to fully meet specific requirements. Choosing between the two depends on whether customization or cost efficiency is the priority."
    open: true
  - q: "What are the benefits of developing custom software?"
  - q: "Is custom software development suitable for small businesses?"
  - q: "Can custom software scale with my business?"
  - q: "What technologies are used in custom software development?"
  - q: "How much does custom software development cost?"
  - q: "How long does it take to develop custom solutions?"
  - q: "How do I choose the right custom software development partner?"
  - q: "How do you ensure the security of software solutions?"
  - q: "Can custom software be integrated with existing systems?"
```
(Answers 2–10 are not in Figma; they must come from the CMS.)
Assets: none.
Interactions/behaviour: an accordion, with `button[aria-expanded]` on the question and the chevron rotating 180° when open. Item 1 is open by default. Emit FAQPage JSON-LD for SEO.
DS components: Icon (`chevron-down`).

---

## 8. Time zones ("SEO Module") — seo-states   (desktop 7:5248 · mobile 13:17991)
Pattern: seo-states
Same component as `services.md` §8. The only desktop difference is that the heading wraps to 3 lines ("Covering All U.S. Time / Zones with Seamless / Overlap"), because the heading box is narrower. Treat that as natural wrapping and use the same component.
Content:
```
desktop eyebrow: "No Offshore Lag"
desktop heading: "Covering All U.S. Time Zones with Seamless Overlap"
mobile eyebrow: "Name the city"
mobile heading (bold in **): "We got you **covered**"
columns: ["Pacific Time", "Mountain Time", "Central Time", "Eastern Time", "Eastern Time +1"]
states: "State Name" × 8 per column   # PLACEHOLDER
```
Assets: none. Interactions: as Services (fade/ticker on desktop, accordion on mobile).

---

## 9. Banner "Ready to scale your development team?" — cta-banner   (desktop 1:4575 · mobile 13:17973)
Pattern: cta-banner
Layout desktop: full-bleed, padding 80/180. Content 1121 wide, centred column, gap 24. Background image `cover` with a 50% overlay.
Layout mobile: padding 40/16, full-width button. In Figma the title breaks mid-word ("developm / ent") at 60px. Use `overflow-wrap: normal` and `hyphens: auto`, or drop to h1 size on narrow screens.
Typography: title → `.ns-text-web-banner-black` (80/88; mobile 60); sub → `.ns-text-web-h2-light`
Colors: text → `--ns-color-text-primary`
Content:
```
title: "Ready to scale your development team?"
sub: "Explore Staff Augmentation with Us!"
cta (desktop): { label: "Schedule a Call", href: "/contact-us/" }   # Figma typo "Sche\dule a Call"
cta (mobile):  { label: "Partner with Us", href: "/contact-us/" }
```
Assets: `/assets/shared/banner-waves-bg.jpg` (byte-identical to the Figma fill, both breakpoints)
Interactions/behaviour: none. On desktop this is the last section before the footer; on mobile it sits between Skills and FAQ.
DS components: Button (primary).

---

## 10. Contact Module (mobile only)   (mobile 13:18063)
Owned by the global contact-module spec. Same as the Services contact module ("Are you looking for a **reliable company** for staff augmentation services?"). **Desktop 1:4241 has no Contact Module**: the page ends with the Banner and then the footer. Recommend adding it on desktop for parity, or dropping it on mobile; confirm with design.

---

## Page notes
- Mobile reuses Services-page content in several places:
  - Credibility: the mobile heading is the Services one, not "Developers Who Fit Like A Glove…".
  - General Module: ice cream, "What is Nearshore Staff Augmentation…", not "Skip Building From Scratch".

  This looks like an unfinished mobile adaptation. Use the desktop copy at all breakpoints unless design confirms otherwise.
- Section order differs between breakpoints:
  - The Comparison and Service card are swapped.
  - The Banner moves above the FAQ.
  - Contact exists on mobile only.

  Recommend following the desktop order.
- The hero h1 uses inline coral `<`/`/>` glyphs. #fd2847 on the dark image is decorative; the text is still readable without colour (WCAG OK).
- The Service card is a light (`bg-inverse`) panel in the dark theme. Several Figma colours on it are off-token and low-contrast (chip text #ababae, link grey #9f9fa0 on #f6fcff ≈ 2.3:1, failing AA). Use `--ns-color-text-inverse` (with opacity no lower than AA) and the DS Tag.
- The FAQ open-state border is slate-300 (#bec8d8), which has no semantic token in web-2025. Use `--ns-color-border-accent` (honey, matching the mobile benefits open state) or `--ns-color-border-strong`. Flag it in Figma.
- The General Module body uses Public Sans Regular 20/30, which is not a DS text style. The heading is H2 **Black** here but H2 Light on Services; keep per-page as designed.
- Skills tags mix Inter 24px and Public Sans 20px in the same rows (a Figma inconsistency). Use `.ns-text-web-lead-medium` everywhere.
- Placeholders: breadcrumb "page/page2/page03", "State Name" lists, FAQ answers 2–10 missing.
- Icon tile on the service card: Figma uses the vuesax "scroll" layer (rendered as `< >` in a rounded square). DS icon `code` in a 80px tile with 2px coral border and radius 16 reproduces it, so no download was needed.
