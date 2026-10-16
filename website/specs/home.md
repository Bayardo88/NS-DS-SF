# Home — build spec

Figma `eIwmOO5omtR1Tlhdjea0C6` · desktop frame `1:911` "Homepage" (1512 × 11225) · mobile frame `13:8480` "Home" (393 × 12835).
Theme `web-2025` (dark). Navigation (`1:1284` / `13:8863`), contact module (`953:10728` / `13:8935`), footer
(`2745:10456` / `53:91225`), the client-logo marquee and the testimonial card are specified in [global.md](global.md).
Designer notes for every Home section are in [annotations.md](annotations.md) → "Home".
Hidden and skipped: `13:8481` (old mobile hero copy, hidden). Opacity-0 layers inside sections are noted where they matter.

**Mobile is not a responsive copy of desktop.** Mobile holds older copy (different hero text, "Build your dream team.",
"Vanished ROI on Time", "This is the real deal.", "It's that easy!", "meet us, love us & shine", a different NS Insights
heading, mobile-only images) and lacks two desktop sections (desktop item03 calendar and the "Build to fit" callout are
replaced by mobile equivalents). **Desktop content is the source of truth.** Use the mobile frames for layout rules
(16px gutters, stacking, type scale, full-width CTAs). Each section lists its mobile counterpart and differences.

Common section shell: full-bleed `<section>`, bg `--ns-color-bg-canvas` (#181728). Desktop padding `--ns-spacing-80`
vertical / `--ns-spacing-180` horizontal (inner width 1153; some sections use `--ns-spacing-100` → 1313, noted).
Mobile padding `--ns-spacing-40` / `--ns-spacing-16`, text columns often add another `--ns-spacing-16`.

Section order: nav (overlay) → 1 Hero → 2 Validation/logos → 3 Services bento → 4 Build a Team → 5 40 vs 24 hours →
6 NS Time → 7 Time zones bento → 8 Built to fit callout → 9 Process intro → 10 Process steps → 11 Testimonial →
12 NS Insights → 13 CTA banner → 14 Service areas (SEO) → 15 Contact module → footer.

---

## 1. Hero — hero   (desktop 1:915 · mobile 13:8484)
Pattern: hero
Layout desktop: 1512 × 843, padding `--ns-spacing-100` all sides, content column centred (text-align center),
  inner stack gap `--ns-spacing-24`, block height 643 so the text sits vertically centred. Nav (80px glass) overlays the top.
  Background layers: (1) globe image, full width, height 107.79%, top −3.9% (≈ `object-fit: cover; object-position: center 40%`);
  (2) `linear-gradient(180deg, transparent 49.94%, #181728 99.89%)` → fade into `--ns-color-bg-canvas`.
Layout mobile: 393 × 843, padding 100 / 16, left-aligned. Breadcrumb at top (placeholder "home › page › page2 › page03" — on
  Home render no breadcrumb). Text block 590 tall, centred vertically. CTA full width. Different background
  (glass "X" shape, `/assets/shared/hero-glass-x-bg.png`, positioned left −130%, width 367%, i.e. zoomed into the X) and
  different copy (see notes). Use desktop globe + copy on mobile too (crop centred on the globe).
Typography: heading → `.ns-text-web-h1-light` (70/76, 300, −1.61; mobile 40/44); body → `.ns-text-web-body-light`
  (18/27, 300; mobile uses `.ns-text-web-h3-light` 20/30 for its subtitle); CTA → Button lg (18/27 medium).
Colors: heading + body → `--ns-color-text-primary` (#f6fcff); CTA bg `--ns-color-bg-brand` (#fd2847).
Content:
  heading: "Nearshore Staff Augmentation Company with Elite Engineering Talent"
    (Figma line breaks: "Nearshore Staff Augmentation" / "Company with" / "Elite Engineering Talent")
  body: "Finding top-performing talent is exhausting, we can make it easy." <br>
        "Our engineers are pre-vetted, trained, and team-ready, working in your time zone and embedded in your workflow from day one. Focus on growth; we handle the rest."
  cta: { label: "Get Your Elite Team Today", href: "/contact" }   (label has a trailing space in Figma; trim)
  mobile (old) copy, do not ship: heading "Nearshore Staff Augmentation Company for Elite Engineering Talent",
    subtitle "Connecting you with top LATAM engineering talent, seamlessly integrated into your team and time zone.", cta "Get in Touch"
Assets:
  `/assets/home/hero-globe.png` (1920×1080 RGBA, 800 KB) → full-bleed background, cover
  `/assets/shared/hero-glass-x-bg.png` (1440×900; same file as `about/hero-bg.png`) → mobile Figma background only
Interactions/behaviour: designer note: background image + 50%→100% gradient so the hero melts into the next section.
  The globe is a static raster render (no vector / 3D data in Figma); if it should spin, that needs a video/Lottie from design.
DS components: `Button variant="filled" size="lg"` (mobile: full width), `SiteHeader` above.

## 2. Validation + client logos — logo-marquee   (desktop 1:922 · mobile 13:8491)
Pattern: logo-marquee
Layout desktop: 1512 × 504, padding 80 vertical / 0 horizontal, column gap `--ns-spacing-80`. Statement row has
  padding 0 `--ns-spacing-100` (1312 wide, left-aligned). Then the full-bleed marquee (see global.md §4).
Layout mobile: 393 × 392, padding 40 / 0, gap 40; statement padding 0 16. Marquee cards keep 120px height.
Typography: statement → `.ns-text-web-h2-black` (42/48, 900; mobile 32/38). Mobile statement is mixed light/black.
Colors: statement → `--ns-color-text-secondary` (#bec8d8).
Content:
  statement: "Our engineers have helped leading companies ship faster, scale smarter, and build better. And they’re ready to do the same for you."
  logos: [VERSA, Scalar, WeLink, Children’s Miracle Network Hospitals]
  mobile (old) statement: "**Brands** that have taken **advantage** of our **partnership** and have grown their **businesses**"
Assets: `/assets/shared/client-versa.svg`, `client-scalar.svg`, `client-welink.svg`, `client-cmnh.svg` (see global.md §4).
Interactions/behaviour: infinite right→left marquee (designer note), pause on hover, static under reduced motion.
DS components: none (local `LogoMarquee`).

## 3. Services — bento-services   (desktop 1:1048 · mobile 13:15305)
Pattern: bento-services
Layout desktop: 1512 × 902, padding 80 / `--ns-spacing-100`, column gap `--ns-spacing-40`, items centred.
  Eyebrow row, then intro paragraph (full width 1312), then the bento (1152 wide, gap `--ns-spacing-20`):
  CSS grid, 3 rows of logic:
    - col A: "Software Development" tall card 371 × 500
    - col B (761 wide, two rows of 240, gap 20): row 1 = "Product Design" 273 + "Salesforce Admins & Developers" 468;
      row 2 = "Project Management" 468 + "Quality Assurance" 273.
  Suggested grid: `grid-template-columns: 371fr 273fr 175fr 273fr` style areas, or two nested flex rows exactly as Figma.
  Card: padding 32, radius `--ns-radius-2xl` (32), border `--ns-border-width-medium` (2px) `--ns-color-text-highlight`
  colour (#fd6a75, Figma "watermelon"; no border token for coral-300 → use `--ns-color-border-brand` #fd2847 or
  request a token), bg `--ns-color-bg-canvas`. Content: top row with a 42px "export" (arrow-up-right) icon at opacity 0,
  title bottom-left (column, space-between).
Layout mobile: 393 × 740, padding 40 / 16, gap 32. Header: eyebrow + mixed heading. Cards stack: row of two 240-tall
  cards (Software Development, Product Design), a full-width short card (Salesforce Admin & Development), a row of two
  short cards (Quality Assurance, Project Management). Mobile cards: border 1px, radius `--ns-radius-lg` (16), padding 16.
Typography: eyebrow → `.ns-text-web-eyebrow-black` (16/18); intro → `.ns-text-web-h2-light` (42/48); card titles →
  `.ns-text-web-h4-black` (24/27, 900).
Colors: eyebrow → `--ns-color-text-highlight` (#fd6a75); intro → `--ns-color-text-secondary` (#bec8d8); card title →
  `--ns-color-text-highlight`; hover title → `--ns-color-text-primary`; hover border → `--ns-color-border-strong` (#f6fcff).
Content:
  eyebrow: "Plug-and-Play Expertise"
  intro: "We help you scale with expert teams in the areas that move your product forward. From code to quality, and design to delivery, our engineers are ready to jump in, contribute fast, and drive results."
  cards (title → link guess):
    - "Software Development" → /services/software-development
    - "Product Design" → /services/product-design
    - "Salesforce Admins & Developers" → /services/salesforce
    - "Project Management" → /services/project-management
    - "Quality Assurance" → /services/quality-assurance
  mobile (old) eyebrow "Explore our Services"; heading "We **accelerate** the creation of **high-performance** remote teams that grow with your **business**."; card "Salesforce Admin & Development"
Assets (hover backgrounds, from the Components page variants `15:20609/20625/20636/20647/20658`):
  `/assets/home/service-hover-software-development.jpg` · `service-hover-product-design.jpg` (2400²) ·
  `service-hover-salesforce.jpg` · `service-hover-project-management.jpg` · `service-hover-quality-assurance.png` (1456×816)
  → card background on hover, cover (large card: 229% width, left −40%), with `--ns-color-bg-overlay` on top.
Interactions/behaviour: every card is one big link to its service page. Hover (desktop) / press (mobile): background
  swaps to the photo + overlay, border turns `--ns-color-border-strong`, title turns white, the arrow icon fades in
  (opacity 0 → 1). Animate opacity/background only; respect reduced motion.
DS components: `Icon name="arrow-up-right"` (Figma "vuesax/linear/export", 42px); cards are local `<a>` cards.

## 4. Build a Team — texture-heading + feature-split   (desktop 1:1061 · mobile 13:8630)
Pattern: texture-heading (+ feature-split below it)
Layout desktop: 1512 × 1274, padding 80 / 100. Inner column (padding 16, gap 129): giant texture heading (full width
  1280, left-aligned) then a row (1244 wide, gap 65): text column 564 (gap 20) + image 628 × 503 (radius `--ns-radius-lg`).
Layout mobile: 393 × 720, padding 40 / 16 (+16 inner). Texture heading (Callout LG mobile 50/40) → eyebrow → heading →
  body → photo 220 tall full width (radius 16). Mobile copy and photo differ (see Content).
Typography: texture heading → `.ns-text-web-callout-lg-black` (160/150, 900; mobile 50/40); eyebrow →
  `.ns-text-web-eyebrow-black`; heading → `.ns-text-web-h2-light` (42/48); body → `.ns-text-web-body-light`;
  CTA → Button md (18/27 medium, padding 12).
Colors: texture heading → `color: transparent` + image fill; eyebrow → `--ns-color-text-accent` (#fde5ac); heading +
  body → `--ns-color-text-secondary` (#bec8d8); CTA → `--ns-color-bg-brand`.
Content:
  texture heading: "Build a Team That Works When You Do"
  eyebrow: "Tailored Teams. On Your Terms."
  heading: "Whatever You Need, Without the Overhead"
  body: "Full-time, part-time, or just a few hours a week — we adapt to your needs without rigid scopes, bloated processes, or the overhead of traditional hires. You get embedded engineers who work your hours and tools, without adding to your salary costs, benefits burden, tax liability, or internal admin time. No project padding. No hidden costs. Just the team you need, ready to go."
  cta: { label: "Find the Right Fit", href: "/contact" }
  mobile (old): texture "Build your dream team." · eyebrow "On Your terms" · heading "**Expert** Staff members" ·
    body "Whether you need full-time, part-time, or flexible, short-term talent, we’ve got you covered with expert staff augmentation—on your terms." · no CTA · photo of three people in hoodies
Assets:
  `/assets/shared/texture-gradient-ribbons.jpg` (1200×800) → text fill: `background: url() center / cover no-repeat;
    -webkit-background-clip: text; background-clip: text; color: transparent`
  `/assets/home/item01-lego-blocks.png` (4096×2949 RGBA, 4.8 MB — export a ~1300px WebP) → right column image 628×503, `object-fit: cover`
  `/assets/home/mobile-team-hoodies.jpg` (same as `about/team-latam-mobile.jpg`) → mobile Figma photo only
Interactions/behaviour: none designed. Texture heading needs a solid-colour fallback (`@supports not (background-clip: text)`)
  and must stay real text (it is the section's h2).
DS components: `Button variant="filled" size="md"` (mobile full width).

## 5. 40 hours vs 24 — feature-split   (desktop 1:1071 · mobile 13:8650)
Pattern: feature-split
Layout desktop: 1512 × 692, padding 80 / `--ns-spacing-180`, row gap 20, align center: image 664 × 532 (radius lg) left,
  text column 469 wide (padding 0 32, height 426, gap 24) right.
Layout mobile: 393 × 858, padding 40 / 16. Text first (eyebrow, heading, body), then the illustration at the bottom
  as a section background (an orb with "24:00", positioned top 51%, width 155%). Copy differs.
Typography: eyebrow `.ns-text-web-eyebrow-black`; heading `.ns-text-web-h2-light`; body `.ns-text-web-body-light`
  (two paragraphs with an empty line between); CTA Button md.
Colors: eyebrow `--ns-color-text-accent`; heading `--ns-color-text-secondary`; body `--ns-color-text-primary` (#f6fcff).
Content:
  eyebrow: "Every Hour Counts, But Most Are Lost"
  heading: "You’re Paying for 40 Hours. But Getting 24."
  body p1: "Research shows that in a typical 40-hour week, only 24 hours are truly productive. Meetings, multitasking, distractions, even lunch — it adds up to 16 hours of lost time every week. And that’s time your projects can’t afford to lose."
  body p2: "And that’s time your projects can’t afford to lose."   ← duplicate of p1's last sentence in Figma; probably drop p2
  cta: { label: "Book a Call and Recover 16 Hours", href: "/contact" }
  donut labels (baked into the image): 24 hrs Deep work · 6.5 hrs Meetings + admin syncs · 3 hrs Context switching ·
    3 hrs lunch + brakes [sic] · 2 hrs Training · 1.5 hrs Miscellaneous → use as the image `alt`/figcaption
    ("Where your 40 hired hours really go: …")
  mobile (old): eyebrow "Why Us?" · heading "**Vanished ROI** on Time" · body "24 hrs a week is the actual productivity of a person in an 8-hour workday, because there are meetings, trainings and even procrastination along the way. In other words, out of a 5-day work week, which represents 40 real hours, only 24 hours are worked. In other words, 16 hours less for projects to move forward."
Assets:
  `/assets/home/item02-hours-donut.png` (2560×1843, labels baked in) → left image 664×532, cover
  `/assets/home/mobile-orb-24h.png` (same as `about/research-orb-24h-mobile.png`) → mobile Figma art only
Interactions/behaviour: none designed. Donut is a raster render; the label text is not live text (see Page notes).
DS components: `Button variant="filled" size="md"`.

## 6. NS Time — feature-split (background illustration)   (desktop 1:1081 · mobile 13:8660)
Pattern: feature-split
Layout desktop: 1512 × 586, padding 80 / 180, row gap 20. Text column 488 wide (padding 16, gap 24) on the left; the
  right column is an empty 664-wide placeholder (opacity 0). The calendar-tablet illustration is a **section background
  layer**: left 35.77%, top −7.17%, width 68.68%, height 115.04% (bleeds past the section top/bottom).
Layout mobile: 393 × 680, padding 40 / 16. Text then a "40 + 8" illustration as background at the bottom
  (top 60.8%, width 103%). Copy differs.
Typography: eyebrow `.ns-text-web-eyebrow-black`; heading `.ns-text-web-h2-light`; body `.ns-text-web-body-light`.
Colors: eyebrow `--ns-color-text-highlight` (#fd6a75); heading `--ns-color-text-secondary`; body `--ns-color-text-primary`.
Content:
  eyebrow: "We Cover the Time That Slows You Down"
  heading: "Your Team, Focused and Fully Aligned."
  body: "Unlike traditional offshore models, you won’t be waiting for answers overnight or waking up to blockers. Our engineers stay aligned through internal syncs, KPI reviews, trainings, team check-ins, and even lunch—without pulling focus from your goals. We call those 8 extra hours NS Time, built into our model so your team can keep moving without interruptions."
  no CTA
  mobile (old): eyebrow "Our Method" · heading "This is the **real deal.**" · body "We take care of everything so that you can do what you know how to do with your equipment. And we will only charge you for 40 productive hours, yes or yes." + "What about the other 8 hours? We call it NS Time, as these hours are on the house, as we will cover meal times, training, team meetings and study time."
Assets:
  `/assets/home/item03-calendar-tablet.png` (4096×2958 RGBA, 3.9 MB — export ~1400px WebP) → background layer, right side
  `/assets/home/mobile-40-plus-8.png` → mobile Figma art only
Interactions/behaviour: designer note: the general module's empty column shows a background illustration/animation
  spanning the module. Static image is fine; an animated version would come from design.
DS components: none.

## 7. Time zones — timezone-bento   (desktop 1:1092 · mobile 13:15712)
Pattern: timezone-bento
Layout desktop: 1512 × 846, padding 80 / 180, column gap 40. Header (gap 20): eyebrow, then a row (gap 20) of
  heading (741 wide) + body (flex 1). Bento (1152, gap 20): tall card 371 × 500 "Pacific" + a 761-wide 2×2 of 240-tall
  cards (row 1: Central | Eastern, row 2: Mountain | Eastern+1; widths flex equal in row 1, 468/273 in row 2).
  Card: photo background (cover) + `--ns-color-bg-overlay`, border 1px `--ns-color-border-subtle`, radius
  `--ns-radius-2xl` (32), padding 32, content bottom-aligned: title, then list rows (icon 24 + text, gap 8).
Layout mobile: 393 × 1168, padding 40 / 16, gap 32. Cards: row (Pacific | Mountain), full-width Central, row
  (Eastern | Eastern+1); radius `--ns-radius-lg` (16), padding 24, icons 16, list text 14 (`.ns-text-web-label-medium`),
  titles lower-case in Figma ("mountain", "central") — use Title Case.
Typography: eyebrow `.ns-text-web-eyebrow-black`; heading → mixed `.ns-text-web-h2-light` / `-black` spans (42, Figma
  line-height "normal"; use 48); body `.ns-text-web-body-light`; card title `.ns-text-web-h3-black` (32/48, −0.7;
  mobile uses `.ns-text-web-h4-black`); list text `.ns-text-web-body-light` (18/27).
Colors: eyebrow `--ns-color-text-accent`; heading `--ns-color-text-secondary` (#bec8d8); body `--ns-color-text-primary`;
  card title + list text → `--ns-color-text-primary` (Figma `base-white`); list icons → `--ns-color-icon-accent` (#fde5ac, honey in render).
Content:
  eyebrow: "Maximize Productivity"
  heading: "**English-Speaking** Latin American **Talent** Aligned to **Your Work Hours**."
  body: "Time zone overlap allows Latin American talent to work in sync with U.S. teams, enabling seamless real-time collaboration and increased productivity."
  cards:
    - Pacific: countries [Mexico] · offset "UTC - 08:00"
    - Central: [Mexico, Nicaragua] · "UTC - 08:00"
    - Eastern: [Colombia, Ecuador] · "UTC - 08:00"
    - Mountain: [Mexico, Nicaragua] · "UTC - 08:00"
    - Eastern+1: [Brazil, Argentina] · "UTC - 08:00"
    (every card says UTC - 08:00 → placeholder; real: Pacific UTC−08:00, Mountain −07:00, Central −06:00, Eastern −05:00, Eastern+1 −04:00/−03:00 — confirm)
Assets: `/assets/home/tz-pacific.jpg` (cable car SF), `tz-central.jpg` (riverside houses), `tz-eastern.jpg` (beach palms),
  `tz-mountain.jpg` (rock arch), `tz-eastern-plus-1.jpg` (NYC skyline) → card backgrounds, cover.
  Icons → DS `Icon name="shield-check"` (country rows; Figma "location-tick"; `map-pin` is an alternative) and `Icon name="clock"` (offset row).
Interactions/behaviour: none designed (static cards).
DS components: `Icon`.

## 8. Built to fit — texture-heading (callout)   (desktop 1:1164 · mobile 13:8743)
Pattern: texture-heading
Layout desktop: 1512 × 735, padding 80 / 180, inner padding 16. One giant heading, full width 1120, left-aligned, 3 lines.
Layout mobile: 393 × 252, padding 20 / 16 (+16). Mobile shows different words and a different texture (see Content).
Typography: `.ns-text-web-callout-xl-black` (225/181, 900; mobile 70/60). Uppercase per designer note.
Colors: transparent text with image fill.
Content:
  heading: "BUILT TO FIT, EASY TO SCALE"  (Figma layer text is "BUILTTOFIT,EASYTOSCALE" with no spaces, so it wraps
    "BUILTTO / FIT,EASY / TOSCALE"; ship the spaced version and keep the 3-line rhythm with `<br>` or width)
  mobile (old): "meet us, / love us / & shine"
Assets:
  `/assets/shared/texture-gradient-ribbons.jpg` → fill with `background-size: 194.77% 258.47%; background-position: 77.01% 25.8%`
  `/assets/home/texture-meet-us-love-us.jpg` (1200×849, photo collage) → mobile Figma fill only (same size/position values)
Interactions/behaviour: designer note: "text as a mask over a photo fill". Static.
DS components: none.

## 9. Process intro — feature-split   (desktop 1:1167 · mobile 13:8746)
Pattern: feature-split
Layout desktop: 1512 × 462, padding 80 / 180, row gap 80. Text column 538 (padding 16, gap 24) left. The Ctrl/Hire keys
  render is a background layer: left 51.55%, top 4.22%, width 43.69%, height 90.82%. (The right column contains a hidden
  opacity-0 "Dev Keyboard" image — skip.)
Layout mobile: 393 × 633, padding 40 / 16. Text, then the keys image at the bottom (top 49.5%, width 98.65%). Copy differs.
Typography: eyebrow `.ns-text-web-eyebrow-black`; heading `.ns-text-web-h2-light`; body `.ns-text-web-body-light`.
Colors: eyebrow `--ns-color-text-accent`; heading + body `--ns-color-text-secondary`.
Content:
  eyebrow: "A Process Designed for Busy Product Leaders"
  heading: "From First Call to Kickoff, We Make It Effortless"
  body: "From the first conversation, we align with your stack, your tools, and your delivery pace. You get pre-trained, vetted profiles matched to your workflow. You review. You approve. We plug in and get to work — no friction, no wasted time."
  mobile (old): eyebrow "How We Work" · heading "It’s that **easy**!" · body "Partnering with Nicasource gives you access to top nearshore talent in your time zone for efficient, real-time collaboration, with a seamless process that lets you focus on business growth while they manage the details."
Assets: `/assets/home/process01-ctrl-hire-keys.png` (790×496 RGBA) → right side, contain.
DS components: none.

## 10. Process steps — process-steps   (desktop 1:1194 · mobile 13:8773)
Pattern: process-steps
Layout desktop: 1512 × 568, padding 80 / 180, row of 3 cards gap 20. Card 371 × 408, padding 32, gap 24, radius 32,
  bg `--ns-color-bg-canvas`, border 3px `--ns-color-border-subtle` (#292643; 3px has no token → `--ns-border-width-thick` 4 or medium 2).
Layout mobile: 393 × 1344, padding 40 / 16, cards stacked full width (408 tall each), card title 32px.
Typography: number → `.ns-text-web-numbers-extralight` (80/96, 200, uppercase; Components master uses Thin 100);
  title → Public Sans Black 42 line-height normal (→ `.ns-text-web-h2-black` 42/48; mobile 32); body → `.ns-text-web-body-light` (18/27).
Colors: number → `--ns-color-text-highlight` (#fd6a75) on Home (the Components master uses `--ns-color-text-accent` #fde5ac);
  title `--ns-color-text-primary`; body `--ns-color-text-secondary`.
Content:
  - "01" · "We meet with you!" (break after "We meet") · "You’ll meet directly with our COO or CTO to align on your product, goals, and team needs — so we can support your roadmap from day one."
  - "02" · "We Assemble Your Team" · "Once you’re on board, we handle the paperwork and start curating a team that fits your stack, tools, and delivery flow."
  - "03" · "You Approve and We Start" · "You review the lineup, give the green light, and your new team gets to work — aligned, embedded, and ready to deliver."
  mobile (old) titles/bodies: "We meet with you!" / "We’ll get to know each other, discuss your project, and dive into your specific needs and expectations." · "Ready to partner?" / "Once you’re on board, we’ll handle the paperwork and start assembling your custom team to match your project goals." · "Team Approved?" / "You approve the team, and we get to work. It really is that simple!."
Assets: none.
Interactions/behaviour: hover variant on the Components page (`15:20664`): border turns `--ns-color-text-highlight`
  coral (#fd6a75) and the background gets `linear-gradient(155.66deg, rgba(24,23,40,0) 54.91%, #fd6a75 105.5%)` over
  `--ns-color-bg-canvas` (a coral glow bottom-right). Cards are not links.
DS components: `StepNumber` may fit the "01" numerals if it supports the 80px light style; otherwise local.
  Designer note: this is the generic "columns module" (3/2/1 columns; also used for job cards and blog posts).

## 11. Testimonial — testimonial-carousel   (desktop 1:1198 · mobile 13:8777)
Pattern: testimonial-carousel
Layout desktop: 1512 × 531, padding 80 / 180, row gap 80, centred: text column 488 (padding 16, gap 24) + card column
  586 (padding 16). Card spec in global.md §5.
Layout mobile: 393 × 797, stacked: text, then card (padding 24).
Typography: eyebrow `.ns-text-web-eyebrow-black`; heading mixed `.ns-text-web-h2-light` + black span (42/48); body `.ns-text-web-body-light`.
Colors: eyebrow `--ns-color-text-highlight` (desktop) / `--ns-color-text-accent` (mobile); heading `--ns-color-text-secondary`; body `--ns-color-text-primary`.
Content:
  eyebrow: "Don’t just take our word for it!"
  heading: "Our **track record** speaks for itself."   (mobile bolds "speaks for itself." instead)
  body: "We have successfully delivered exceptional results to numerous clients, ranging from ambitious startups to established enterprises!"
  testimonial: see global.md §5 (Jolt · Erick · Head of Development)
Assets: `/assets/shared/client-jolt.png`, `/assets/shared/icon-user-circle.svg`.
Interactions/behaviour: auto-rotating carousel with dots (designer note).
DS components: local `TestimonialCarousel`.

## 12. NS Insights — insights-grid   (desktop 1:1223 · mobile 13:15858)
Pattern: insights-grid
Layout desktop: 1512 × 834, padding 80 / 180, gap 40. Header (eyebrow + heading, gap 20). Bento (gap 20, 1152):
  col 1 (375): two 240-tall cards; col 2: one 371 × 500 featured card; col 3 (366): two 240-tall cards.
  Card: photo bg (cover) + `--ns-color-bg-overlay`, border 1px `--ns-color-border-subtle`, radius 32, padding 32,
  column space-between: tag group top (wrap, gap `--ns-spacing-6`, max 284 wide), title bottom.
Layout mobile: 393 × 1098, padding 40 / 16, gap 32. **Only 3 posts**, stacked full width (240 tall, radius 16, padding 24).
Typography: eyebrow `.ns-text-web-eyebrow-black`; heading `.ns-text-web-h2-light` (mobile mixed light/black);
  tags 14 medium (−0.32) → `.ns-text-web-label-medium`; card title `.ns-text-web-h4-black` (24/27).
Colors: eyebrow `--ns-color-text-highlight` (desktop) / `--ns-color-text-accent` (mobile); heading `--ns-color-text-secondary`
  (mobile `--ns-color-text-primary`); tags bg `--ns-color-bg-brand` (#fd2847), text `--ns-color-text-primary`; card title `--ns-color-text-primary`.
Content:
  eyebrow: "NS Insights"
  heading: "Expert Knowledge to Help You Scale With Confidence & Build Smarter"
  posts (placeholder content, comes from WordPress):
    - col1 top: tags [Trends, Technology, Sustainability] · "The Heart of the City: Central Insights"
    - col1 bottom: tags [Mental Health Awareness] · "Exploring the Majestic Mountain Landscapes"
    - featured (centre): tags [Remote Work, Mental Health Awareness] · "Exploring the Wonders of the Pacific Ocean"
    - col3 top: tags [Technology, Sustainability] · "Discovering the Charm of the Eastern Region"
    - col3 bottom: tags [Technology] · "Eastern Adventures: A Journey Beyond"
  mobile (old) heading: "Your source for **expert knowledge**, industry trends, and **actionable strategies** to fuel **business success**."
Assets (placeholders; real images come from WP featured images; identical files exist in `/assets/insights/`):
  `/assets/home/blog-central-insights.jpg`, `blog-mountain-landscapes.jpg` (Figma crops it: height 208%, top −20%),
  `blog-pacific-ocean.jpg`, `blog-eastern-region.jpg`, `blog-eastern-adventures.jpg`
Interactions/behaviour: each card links to its post. Designer note: editors flag posts in the CMS for this grid,
  with one "main" post (centre, tall) and secondary posts. Mobile shows the first 3. Hover not designed — suggest overlay
  darkening + title underline.
DS components: `Tag variant="filled" color="brand" size="sm"` for the category labels.

## 13. CTA banner — cta-banner   (desktop 1:1274 · mobile 13:8853)
Pattern: cta-banner
Layout desktop: 1512 × 419, padding 80 / 180, content 1121 wide, column centred, gap 24. Background photo (cover) +
  `--ns-color-bg-overlay`.
Layout mobile: 393 × 383, padding 40 / 16, heading wraps to 4 lines, CTA full width.
Typography: heading → `.ns-text-web-banner-black` (80/88, 900, centred; mobile 60/55); CTA Button lg.
Colors: heading `--ns-color-text-primary`; CTA `--ns-color-bg-brand`.
Content:
  heading: "Redefine success with Nicasource"
  cta: { label: "Partner with Us", href: "/contact" }
Assets: `/assets/shared/banner-waves-bg.jpg` (1200×686; identical to Figma's CTA fill) → background, cover.
Interactions/behaviour: designer note: banner is full-bleed; background can be photo, video/animation, solid or gradient.
DS components: `Button variant="filled" size="lg"`.

## 14. Service areas — seo-states   (desktop 7:5374 · mobile 13:8873)
Pattern: seo-states
Layout desktop: 1512 × 729, padding 80 / 180, inner 1121 (padding 40, gap 16). Header (eyebrow, heading, gap 20), then a
  row of 5 columns space-between, each: column title, gap 32, then a list of 8 items (gap 16).
Layout mobile: 393 × 504, padding 40 / 16. Header, then 5 accordion rows (gap 16): bordered box (1px
  `--ns-color-border-subtle`, radius `--ns-radius-sm` 8, padding 16) with the column title and a 20px chevron-down.
Typography: eyebrow `.ns-text-web-eyebrow-black`; heading `.ns-text-web-h2-light` (mobile mixed light/black);
  column titles `.ns-text-web-h4-black` (24/27); items `.ns-text-web-nav-medium` (18/27, 500).
Colors: eyebrow `--ns-color-text-accent`; heading, titles, items `--ns-color-text-secondary` (#bec8d8).
Content:
  eyebrow: "Supporting Teams Coast to Coast — And Everywhere in Between"
  heading: "Wherever You Work, We Work Too"
  columns: ["Pacific Time", "Mountain Time", "Central Time", "Eastern Time", "Eastern Time +1"], each with 8 × "State Name" (placeholder)
  mobile (old): eyebrow "Name the city" · heading "We got you **covered**"
Assets: none. Mobile chevron → DS `Icon name="chevron-down"`.
Interactions/behaviour: designer note: each column is an independently scrollable list; the top and bottom items fade
  (Figma opacity 10% / 40% / 70% / 100% / 100% / 70% / 40% / 10% on the Pacific column) so focus is on the middle.
  Build as a fixed-height scroll container with `mask-image: linear-gradient(transparent, #000 35%, #000 65%, transparent)`.
  Mobile: accordion (`<details>`/button with `aria-expanded`), list revealed on open. Items probably link to SEO
  landing pages (states/cities) — needs the real list from WP.
DS components: `Icon`; accordion local.

## 15. Contact module — contact-form   (desktop 953:10728 · mobile 13:8935)
See global.md §3. Home uses the default "New Project" tab.

---

## How the visuals are built (image vs vector)
- **Hero globe**: a single raster PNG (1920×1080, RGBA, dotted globe with coloured arcs) used as an image fill on the hero
  frame, plus a CSS-reproducible linear gradient overlay. No vectors, no 3D data. Reproduce with `<img>`/`background-image`
  + gradient. An animated globe would need a video/Lottie from design.
- **Gradient texture headings** ("Build a Team That Works When You Do", "BUILT TO FIT, EASY TO SCALE", mobile "Build your dream
  team." and "meet us, love us & shine"): live Figma text with an **image fill** (`bg-clip-text`). The fill is a raster JPG
  (`/assets/shared/texture-gradient-ribbons.jpg` 1200×800 for both desktop headings; `/assets/home/texture-meet-us-love-us.jpg`
  for the mobile callout). Reproduce with `background-clip: text; color: transparent`, using the size/position values given per section.
- **3D illustrations** (Lego blocks, hours donut, calendar tablet, Ctrl/Hire keys, mobile 24:00 orb, mobile 40+8): all
  **raster PNG renders** (transparent RGBA) placed as image fills. Labels inside them ("React Dev 40hrs", "24 hrs Deep work",
  weekday headers) are baked into the pixels. Loose editable label frames for the Lego/donut art exist on the canvas
  (`1315:11755`…, `1384:12590`…), suggesting they were composited in Figma before flattening; the shipped asset is the PNG.
- **Client logos**: true vectors (exported as SVG). **Service hover photos, time-zone and blog photos**: raster JPG/PNG.

## Page notes
- Mobile frame carries older copy throughout (hero, sections 2, 3, 4, 5, 6, 8, 9, 10, 12, 14). Ship desktop copy on all
  breakpoints; mobile frames only define layout. Mobile hero/2-col art (`hero-glass-x-bg.png`, `mobile-*.png`,
  `texture-meet-us-love-us.jpg`) is downloaded in case design wants it, but is not referenced by the desktop copy.
- Placeholders: time-zone offsets all "UTC - 08:00"; service areas "State Name" ×40; mobile breadcrumb "page / page2 / page03";
  blog cards are lorem-style travel titles; form sample values ("Tom Riddle", "darklord87@gmail.com", "slitherine.io").
- Section 5 body repeats "And that’s time your projects can’t afford to lose." as a second paragraph (copy bug).
- Donut label typo "lunch + brakes" (should be "breaks") is baked into `item02-hours-donut.png`.
- Hero CTA label "Get Your Elite Team Today " has a trailing space; "Software Development" hover card etc. only exist on the Components page.
- Colour drift: several Figma nodes use primitives/legacy vars (`--color/red` #fd2847, `--color/watermelon` #fd6a75,
  `--neutral/light` #f6fcff, `--ns-color-night-700`). Mapped to semantic tokens above; a coral-300 (#fd6a75) border/bg
  semantic token does not exist in web-2025 (`text-highlight`/`text-brand` hold that value) — card borders and selected chips need one.
- Process step numerals: Home instance is coral ExtraLight, Components master is honey Thin. Pick one (Home used here).
- Button text in Figma is #f6fcff on #fd2847 (contrast ≈3.7:1, fails AA for 18px medium text). DS `Button` filled uses
  `--ns-color-text-on-brand` (#181728) — follow DS.
- Large renders: `item01-lego-blocks.png` 4.8 MB and `item03-calendar-tablet.png` 3.9 MB → convert to WebP/AVIF at ~2× display size.
- Assets also duplicated across page folders by other specs (tz photos ⇄ insights posts, blog images ⇄ insights). Consider
  moving the time-zone photos to `/assets/shared/` if other pages reuse the time-zone bento.
