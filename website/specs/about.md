# About Us — build spec

Figma `eIwmOO5omtR1Tlhdjea0C6` · desktop frame `1:1448` (1513 × 5139) · mobile frame `13:9053` (393 × 8298).
Theme `web-2025` (dark). Nav (`1:1515`) and Footer (`53:90440`) are out of scope (they belong to the shared layout).
Hidden and skipped: `1:1449` (old hero), `5:3852` (Mini-CallOut right column), `1:1525` (Banner/timezone card).

**Mobile is not a responsive copy of desktop.** The mobile frame holds older copy and imagery: a different hero
image and title, an extra "Full remote culture since 2020 / All over LATAM" module, an extra "Become an industry leader"
module, and no founder Mini-CallOut. **Desktop content is the source of truth.** Use mobile frames for layout rules
only (16px gutters, stacking, type scale). Each section notes its mobile differences.

Common section shell (all modules unless noted): full-bleed `<section>`, bg `--ns-color-bg-canvas` (#181728),
padding `--ns-spacing-80` vertical / `--ns-spacing-180` horizontal, inner content width 1153px.
Mobile: padding `--ns-spacing-40` vertical / `--ns-spacing-16` horizontal; inner columns add `--ns-spacing-16` padding (329px text width).

---

## 1. Hero — hero   (desktop 1:1452 · mobile 13:9057)
Pattern: hero
Layout desktop: 1513 × 843, padding `--ns-spacing-100` / `--ns-spacing-180`. Column with gap `--ns-spacing-24`: breadcrumb at the top, then
  the text block vertically centred in the remaining height (flex 1, justify center), gap `--ns-spacing-24`. Text spans the full 1153px width.
  Background: full-cover image, plus two overlays: `linear-gradient(180deg, transparent 49.9%, #181728 97.2%)` (fade to `--ns-color-bg-canvas`)
  over a flat 50% #111 (`--ns-color-bg-overlay`).
Layout mobile: 393 × 843, padding 16px. Breadcrumb at top (y≈100 below the 80px nav, so the hero sits under a transparent nav). Title block is pushed
  toward the lower-middle. The mobile frame uses a different photo (woman with glasses) and different copy (see Page notes); use the desktop image and copy.
Typography: breadcrumb → `.ns-text-web-caption-light` (14/300, Figma tracking −0.32); title → `.ns-text-web-h1-light` (70/76, 300, −1.61); subtitle → `.ns-text-web-h3-light` (32/48, 300, −0.7).
  Mobile: h1 40/44, h3 20.
Colors: breadcrumb text + icons → `--ns-color-text-primary` (#f6fcff); title + subtitle → `--ns-color-text-primary` (#f6fcff).
Content:
  breadcrumb: [home(icon) "home", "page", "page2", "page03"]   ← placeholder; render the real trail: Home › About Us
  heading: "Built for Impact. Driven by People"
  body: "We’re a nearshore engineering partner that helps digital products thrive and the people behind them grow."
Assets: `/assets/about/hero-bg.png` (1440×900): section background, object-fit cover (Figma: 107.8% height, top −3.9%).
Interactions/behaviour: nav overlays the hero (transparent nav). No CTA.
DS components: `Icon` (`home`, separator `chevron-right`, 16px). Breadcrumb has no DS component yet: build it as a local `<nav aria-label="Breadcrumb"><ol>`.

## 2. Built on Experience — feature-split   (desktop 5:3834 · mobile: none)
Pattern: feature-split
Layout desktop: 1513 × 703, padding 80/180. Inner column has `--ns-spacing-16` padding. A row with gap `--ns-spacing-40` and two equal columns (flex 1 each, ≈548px):
  left is the text stack (eyebrow, then gap 20, then the title (547w), then gap 20, then the body); right is a photo 511px tall, radius `--ns-radius-lg` (16), cover.
Layout mobile: not present in the mobile frame. Recommended: stack the text, then the image (image height ~220px, radius 16), as in the mobile "Our teams" module `13:18778`.
Typography: eyebrow → `.ns-text-web-eyebrow-black` (16/18, 900); title → `.ns-text-web-h2-light` (42/48, 300); body → `.ns-text-web-body-light` (18/27, 300).
Colors: eyebrow → `--ns-color-text-accent` (#fde5ac); title → `--ns-color-text-secondary` (#bec8d8); body → `--ns-color-text-primary` (#f6fcff).
Content:
  eyebrow: "Built on Experience, Grown with Purpose"
  heading: "A Reliable Nearshore Partner With Decade of Experience"
  body:
    - "Nicasource started in 2013 as a digital agency focused on building great products. We learned that success comes not just from code, but from the people behind it."
    - "Today, we specialize in nearshore staff augmentation for fast-growing tech companies, embedding engineers who treat your product as their own. We bring the same product mindset—now at scale. Not just a vendor, but a reliable extension of your team."
Assets: `/assets/about/about-founder-laptop.png` (1160×1114): right column, about 548 × 511, cover, radius 16.
Interactions/behaviour: none.
DS components: none (plain layout).

## 3. Research / Our findings — feature-split (image left)   (desktop 1:1469 · mobile 13:9084)
Pattern: feature-split
Layout desktop: 1513 × 632, padding 80/180, row gap `--ns-spacing-20`, items centred. Left is a 664px spacer slot (the frame's image is opacity 0).
  The visible donut illustration is the **section background image**, positioned left: 3.1%, top −1.3%, w 58.2%, h 98.2%, so it covers roughly the left 880px.
  Right is the text column, 469px wide, padding-x `--ns-spacing-32`, stack gap `--ns-spacing-24`.
  Build it as a 2-column grid: the image in the left cell (object-fit contain, may bleed to the left edge) and the text on the right.
Layout mobile: the text comes first, then the illustration below. Mobile uses a different image (a "24:00" orb, positioned at the bottom 35% of the section) and adds a link line (see Content).
  Use the desktop donut image on mobile too, or the orb image; the desktop donut is the recommended choice.
Typography: eyebrow → `.ns-text-web-eyebrow-black`; title → `.ns-text-web-h2-black` (42/48, 900); body paragraphs → `.ns-text-web-body-light`; CTA → DS Button md (Figma: Inter Medium 20, padding 24/32, radius 8).
Colors: eyebrow → `--ns-color-text-accent` (#fde5ac); title → `--ns-color-text-secondary` (#bec8d8); body → `--ns-color-text-primary`; CTA → `--ns-color-bg-brand` (Figma #f13c45 red-500); mobile link → `--ns-color-text-highlight` (#fd6a75).
Content:
  eyebrow: "Research"
  heading: "Our findings"
  body:
    - "We found that the average worker in the USA works at least 24 hours out of 48 working hours per week."
    - "This reduction of productive time impacts many companies today, both for the progress of a project and monetarily in every sense of the word."
  cta: { label: "Schedule a Call", href: "/contact" }
  mobile-only link (no CTA on mobile): "Ptsssss we have a full article talking about this in detail >>" → href guess: /insights/<article>
Assets:
  `/assets/about/research-donut-lost-time.png` (2560×1849): desktop left illustration (glass donut labelled "Lost Time (24 hrs)" / "Productive (24 hrs)"), about 880 × 620.
  `/assets/about/research-orb-24h-mobile.png` (1440×900): optional, mobile-only orb under the text, 393w.
Interactions/behaviour: none.
DS components: `Button` (variant filled, size lg).

## 4. Why Us? / Our Offer — feature-split (image right)   (desktop 1:1481 · mobile 13:9096)
Pattern: feature-split
Layout desktop: 1513 × 586, padding 80/180, gap `--ns-spacing-20`, items centred. Left text column 488 × 426, padding `--ns-spacing-16`, stack gap 24.
  Right image column 645 × 426, radius `--ns-radius-2xl` (32), image cover with `mix-blend-mode: color-dodge`. The image is a PNG with transparency, so it looks right without the blend; drop the blend if it washes out.
Layout mobile: stacked, text first, then the image (361 × 426, radius 32). The mobile frame shows a "24 00" orb on a light card. Use the desktop lego-blocks image.
Typography: eyebrow → `.ns-text-web-eyebrow-black`; title → `.ns-text-web-h2-black`; body → `.ns-text-web-body-light`; CTA → Button.
Colors: eyebrow → `--ns-color-text-accent`; title → `--ns-color-text-secondary` (#bec8d8); body → `--ns-color-text-primary`; CTA → `--ns-color-bg-brand`.
Content:
  eyebrow: "Why Us?"
  heading: "Our Offer"
  body: "Unlike traditional staffing agencies, Nicasource As a leading Staff Augmentation Firm, provides your company with dedicated teams that address all your digital needs, from the maintenance of websites and platforms to the enhancement and development of new features, without the hassle of international laws, payroll, employee benefits, etc."
  cta: { label: "Schedule a Call", href: "/contact" }   (desktop only; the mobile frame has no button, so keep it on mobile anyway)
Assets: `/assets/about/offer-blocks.png` (4096×2731): right column, 645 × 426, cover. Optimise or resize it at build time (it is a 4K PNG).
Interactions/behaviour: none.
DS components: `Button` (filled, lg).

## 5. Engagement models — card-grid   (desktop 1:1491 · mobile 13:9106)
Pattern: card-grid
Layout desktop: 1513 × 568, padding 80/180, a row of 3 cards with gap `--ns-spacing-20`. Each card is 371 × 408 (fixed height), padding `--ns-spacing-32`, gap 24,
  bg `--ns-color-bg-canvas` (#181728), border 3px `--ns-color-border-subtle` (#292643), radius `--ns-radius-2xl` (32). Inside the card: title, then gap 8, then the body.
Layout mobile: 1 column, cards 361 × 408 with gap 20 (the mobile frame keeps the fixed 408 height; use `min-height` instead).
Typography: card title → `.ns-text-web-h2-black` (Figma Public Sans Black 42, line-height normal); card body → `.ns-text-web-body-light` (18/27).
Colors: card title → `--ns-color-text-secondary` (#bec8d8); body → `--ns-color-text-primary` (#f6fcff).
Content:
  items:
    - title: "Staff Augmentation"
      body: ["You lead, we support. Add individual engineers to your existing team and keep full control of execution.", "Ideal for: Long-term, seasonal, or fast-scaling needs"]
    - title: "Managed Teams"
      body: ["No tech team? No problem. We provide a managed dedicated teams led by a tech lead who drives the engineering side while you focus on outcomes. You set the scope — we steer the how.", "Ideal for: Non-technical teams needing technical leadership, and long-term partnerships."]
    - title: "Project-Based Work"
      body: ["We own the delivery from kickoff to launch. Ideal when you need a team to get in, get it done, and move on.", "Ideal for: Fixed-scope builds, MVPs, or overflow projects."]
Assets: none.
Interactions/behaviour: none. Text overflows the fixed 408px in card 2 on desktop (see Page notes): use `min-height: 408px`.
DS components: none. This is the same "step" card used on the Careers and Job pages, so build a shared `InfoCard`.

## 6. Built To Deliver — cta-banner   (desktop 5:3869 · mobile 15:18828)
Pattern: cta-banner
Layout desktop: 1513 × 507, padding 80/180. Content is a centred column (1121 wide) with gap `--ns-spacing-24`: a centred headline, then a centred button.
  Background: base `--ns-color-bg-canvas`, then a cover image, then an overlay of `--ns-color-bg-overlay` (rgba(17,17,17,.5)).
Layout mobile: 393 × 273. Mobile copy differs: "Let’s start planning!" with a full-width button. Use the desktop headline on all breakpoints (banner size scales to 60/55 on mobile) and make the button full-width on mobile.
Typography: headline → `.ns-text-web-banner-black` (80/88, 900; mobile 60/55); button → Button lg (Figma Public Sans Medium 18/27, padding 16/24, radius 8).
Colors: headline → `--ns-color-text-primary` (#f6fcff); button bg → `--ns-color-bg-brand` (#fd2847), label Figma #f6fcff.
Content:
  heading: "We’re Built To Deliver — For Your Business, Your Users, And Your Team."
  cta: { label: "Partner with Us", href: "/contact" }
  mobile heading (old copy, not used): "Let’s start planning!"
Assets: `/assets/shared/banner-waves-bg.jpg` (1200×686, shared): background, cover. Upscaled at 1513 wide, so request a larger export if it looks soft.
Interactions/behaviour: none.
DS components: `Button` (filled, lg).

## 7. Contact — contact-form   (desktop 8:4846 · mobile 15:18842)
Pattern: contact-form
Same module as the home and contact pages. If the home spec already defines `ContactModule`, reuse it with tab "New Project" active.
Layout desktop: 1513 × 565, bg `--ns-color-bg-surface` (#292643), padding 80/180. Column of 1153 with gap 24:
  heading; then the tab row (gap 24); then row 1: 3 equal inputs (gap 16); then row 2: left "Service Requested" chip group (flex 1, wrap, gap 16) and right Message textarea (flex 1, 148px tall).
Layout mobile: 393 × 938, padding 40/24. Everything stacks: heading, tabs, Full Name, Email, Company, chips (wrap), Message (≈120px tall, Send button inside bottom-right).
Typography: heading → `.ns-text-web-h2-light` with the bold span `.ns-text-web-h2-black` (42/48); tabs → `.ns-text-web-body-light` (18/27); field labels → `.ns-text-web-eyebrow-black` (16/18, 900);
  input value → `.ns-text-web-body-light` (Figma 18 Light, tracking −0.41); chips → `.ns-text-web-small-regular` (Figma Inter 12); Send → `.ns-text-web-label-medium` (14 Medium).
Colors: heading → `--ns-color-text-primary` (#f6fcff); tabs → `--ns-color-text-accent` (#fde5ac); active tab underline 2px → `--ns-color-bg-accent` (#fde5ac);
  labels → `--ns-color-text-primary`; input border → `--ns-color-border-default` (Figma #bec8d8 slate-300, which is lighter than the token; see notes); focused/error field border (Full Name) → `--ns-color-border-brand` (Figma #fd6a75);
  placeholder → `--ns-color-text-secondary` (#bec8d8); chip selected → bg `--ns-color-bg-highlight` (Figma #fd6a75), text `--ns-color-text-primary`, with a 16px close-circle icon;
  chip unselected → border 1px `--ns-color-border-strong` (#f6fcff), text `--ns-color-text-primary`; Send button → outlined, border `--ns-color-border-strong`, radius 8, padding 8.
Content:
  heading: "Are you looking for a **reliable company** for staff augmentation services?"
  tabs: ["New Project" (active), "Join Our Team", "General Inquiries"]
  fields:
    - { label: "Full Name", placeholder: "Tom Riddle", type: text, required }
    - { label: "Email", placeholder: "darklord87@gmail.com", type: email, required }
    - { label: "Company", placeholder: "slitherine.io", type: text }
  service chips (multi-select): ["Software Development", "Project Management", "QA Testing", "UX Audit", "UI Design", "UX Design", "Salesforce Administration", "Salesforce Development", "Staff Augmentation"]
    (the Figma state shows these selected: Software Development, QA Testing, UX Audit, UX Design)
  message: { label: "Message", placeholder: "Drop us some lines here..." }
  submit: { label: "Send", icon: send }
Assets: none (icons: DS `close` / `remove-circle` for chip dismiss, `send` for submit).
Interactions/behaviour: tabs switch the form variant (tab "Join Our Team" swaps to the job-application field set, see job.md §3). Chips are toggle buttons
  (`aria-pressed`); selected ones show the close icon. The submit button sits inside the textarea box, bottom-right.
DS components: `TextField` (Full Name, Email, Company), `Tag` (filled/highlight when selected, outlined/neutral when not, size sm) or a toggle-chip wrapper, `Button` (outlined, sm, icon `send`).
  The DS has no textarea: build a local `TextArea` that mirrors `TextField` styling.

---

## Page notes
- Breadcrumb copy is placeholder ("home › page › page2 › page03"). Generate it from the route.
- Mobile frame copy is stale and differs from desktop:
  - Hero title "About Us & Culture" + body "Nicasource is a specialized staffing firm within the software and engineering industry. We started operations in Managua, Nicaragua on 2013." (different hero photo).
  - Extra module `13:18778`: texture heading "Full remote culture since 2020" (`.ns-text-web-callout-lg-black`, gradient texture fill) + eyebrow "Our teams", title "All over LATAM",
    body "In 2020, we embraced a remote culture, and now we have teams all over LATAM – with main units located in Mexico, Nicaragua, and Argentina.", photo `/assets/about/team-latam-mobile.jpg`.
    Texture fill: `/assets/shared/texture-gradient-ribbons.jpg` (same file as `home/texture-build-a-team.png`). Render with `background-clip: text`.
  - Extra module `13:9110`: eyebrow "We can help you", title "Become an industry leader" (text-primary), body "When it comes to product development, there’s no such thing as one perfect solution for all problems. Nicasource is the perfect partner whether you are looking to hire and outsource your technology team or are just interested in augmenting your current engineering department to have better production coverage and a wider skill set and areas of expertise. We can provide your organization with fixed team members and have seasonal profiles available as your business grows.", photo `/assets/about/industry-leader-mobile.jpg` (radius 32).
  - The desktop "Built on Experience" Mini-CallOut is missing on mobile.
  Recommendation: build from desktop. Confirm with design whether the two mobile-only modules should also go on desktop. Their assets are downloaded in case.
- Desktop 3-column card 2 text overflows the fixed 408px card height. Use min-height.
- Figma buttons use raw reds (#f13c45 and #fd2847) and Inter on some instances. Use DS `Button` (coral-500 `--ns-color-bg-brand`). The Figma label is near-white on coral, but the DS `text-on-brand` is dark (night-900) for AA contrast. Follow the DS.
- Input borders in Figma are slate-300 (#bec8d8); `--ns-color-border-default` in web-2025 is night-600 (#413c64), which is lower contrast. Use DS `TextField` defaults and flag the difference to design.
- `offer-blocks.png` is 4096px wide and `research-donut-lost-time.png` is 2560px. Resize or convert to WebP in the build.
- Figma token fallbacks in the generated code (e.g. #735b30, #3c4655) are light-theme values. The hex values noted above are the web-2025 values.
