# Global pieces — build spec

Figma `eIwmOO5omtR1Tlhdjea0C6` · theme `web-2025` (dark). These are shared by every page: navigation, footer,
contact module, client-logo marquee, testimonial card. Source frames are the Home instances unless noted; the
Components page (`15:20568`) holds the master symbols and their states.
Designer notes for all of these are transcribed in [annotations.md](annotations.md) (Home section).

Token hex reference (web-2025): `bg-canvas` #181728 · `bg-surface` #292643 · `bg-inverse` #f6fcff · `bg-brand` #fd2847 ·
`bg-accent` #fde5ac · `bg-glass` rgba(255,255,255,.08) · `bg-overlay` rgba(17,17,17,.4) · `text-primary` #f6fcff ·
`text-secondary` #bec8d8 · `text-highlight`/`text-brand` #fd6a75 · `text-accent` #fde5ac · `text-inverse` #181728 ·
`border-subtle` #292643 · `border-default` #413c64 · `border-strong` #f6fcff · `border-input` #7c77a5.

---

## 1. Navigation — other:site-header   (desktop `1:1284`, master `15:20901` · mobile `13:8863`, master `15:20877`)
Pattern: other:site-header
Layout desktop: full width × 80px, `position: fixed/sticky` over the hero (it sits at y=0 on top of the hero, which
  starts at y=0 too). Padding `--ns-spacing-24` vertical / `--ns-spacing-180` horizontal. Row, space-between: logo
  (76×32) left; link list right-aligned, gap `--ns-spacing-32`.
  Surface: `--ns-color-bg-glass` with `backdrop-filter: blur(calc(var(--ns-blur-lg) / 2))` (Figma effect "Glass/LG").
Layout mobile: 393 × 80, padding 24 / `--ns-spacing-16`. Logo left, 32px hamburger icon right. The link list exists
  in the mobile frame but is **hidden**; no open-menu / drawer state is designed anywhere in the file (UI or
  Components page). Build the drawer with DS `SiteHeader`'s built-in mobile menu (`menuOpen` / `onMenuOpenChange`).
Typography: links → `.ns-text-web-nav-medium` (18/27, 500; mobile 16/24).
Colors: current link → `--ns-color-text-primary` (#f6fcff); other links → `--ns-color-text-highlight` (#fd6a75);
  bar → `--ns-color-bg-glass`.
Content:
  links: [Home → /, Services → /services, Results → /case-studies, About Us → /about, Careers → /careers,
          Insights → /insights, Contact Us → /contact]   (hrefs are guesses)
  current: Home on the Home page (white); every other page highlights its own item the same way.
  no CTA button in the bar.
Assets: none. Logo = DS `<Logo variant="on-dark">` (white "nica source" wordmark + red roof mark; Figma instance
  "logo", 76×32. DS Logo says "never below 96px": use 96 wide, or ask design to allow 76). Hamburger = DS `Icon name="menu"` (32px).
Interactions/behaviour: sticky/fixed over content with glass blur. Hover state for links not designed — use
  `--ns-color-text-link-hover` (#ffa3a6) + underline. Mobile: hamburger toggles the DS drawer.
DS components: `SiteHeader` (`links`, `current`, `logoVariant` left unset → resolves to `on-dark` in web-2025, no `cta`), `NavLink`, `Logo`, `Icon`.

---

## 2. Footer — other:site-footer   (desktop `2745:10456`, master `53:89942` · mobile `53:91225`)
Pattern: other:site-footer
Layout desktop: 1512 × 735, bg `--ns-color-bg-canvas`, padding `--ns-spacing-60` all sides, column gap `--ns-spacing-24`,
  content width 1393px.
  Row 1 (gap `--ns-spacing-32`, align top): four link columns (heading + list; gap 32 between heading and list,
  16 between links) → OpenAI badge column (two 139×65 badges stacked, gap `--ns-spacing-8`) → subscription column
  (flex 1, gap 24): heading + caption (gap 20), then a row (gap 24, align end) of Email input (flex 1, h 59) +
  "Subscribe" outlined button; then the careers card.
  Careers card: h 100, radius `--ns-radius-lg` (16), padding `--ns-spacing-16`, row, gap 8, align center; background
  image (cover) + `--ns-color-bg-overlay` layer; title (flex 1) + "Explore Careers" outlined button (white border).
  Row 2: giant brand word "Nicasource LLC", Public Sans Black 180/180, color `--ns-color-bg-surface`
  (Figma `--ns-color-night-700` #292643 → same value as `bg-surface`), width 1393 (decorative, `aria-hidden`).
  Row 3: 8px-tall full-width bar `--ns-color-bg-surface` (#292643).
  Row 4 (gap 24): logo (76×32), then a row space-between: tagline · copyright · ("Follow Us" + 3 social icons, gap 32 / 16).
Layout mobile (393 wide, padding `--ns-spacing-16`, gap 16, content width 361) — **order changes**: subscription
  block first (heading in `--ns-color-text-highlight`), then the careers card (title at H4 24/27), then the link
  columns stacked as one column (gap 32), then "Nicasource LLC" at 45/40, the 8px bar, then a centred trail:
  logo, a row with tagline + copyright (10/12 regular, gap 16), then "Follow Us" + icons. **The OpenAI badges are
  not in the mobile footer** (keep them on mobile anyway, after the link columns; note for design).
Typography: column headings → `.ns-text-web-h4-black` (24/27, 900); links + caption + trail text →
  `.ns-text-web-caption-light` (14/21, 300, −0.32; mobile trail is 10/12 regular → `.ns-text-web-small-regular` 12/18
  is the closest token); "Insight subscription" → `.ns-text-web-h4-black`; Email label 14 regular, input text 14 light;
  Subscribe → Button sm (14/18 medium); careers title → Public Sans Black 18/18 (desktop, no exact style; use
  `.ns-text-web-lead-medium` size with weight black, or `.ns-text-web-h4-black` as on mobile); "Explore Careers" →
  Button md (16/18 medium); brand word → no token (180px black; mobile 45px), use a local class.
Colors: column headings + links → `--ns-color-text-secondary` (#bec8d8); "Insight subscription" →
  `--ns-color-text-primary` desktop / `--ns-color-text-highlight` mobile; trail text → `--ns-color-text-primary`
  (Figma `base-white`); social icons → `--ns-color-icon-brand` (#fd6a75, Figma "NS Red" #F13C45); input border
  `--ns-color-border-strong` (#f6fcff); careers card title `--ns-color-text-primary`.
Content:
  columns:
    - heading: "Hire" · links: ["Hire Developers", "Hire UX/UI Designers", "Hire Quality Assurance (QA)",
      "Hire Project Managers", "Hire SalesForce Admins", "Hire SalesForce Developers"]
    - heading: "Nicasource" · links: ["About Us", "Case Studies", "Our Working Industries", "Careers", "Blog"]
    - heading: "House Specialty" · links: ["Staff Augmentation", "Why LATAM?", "Overlap With US Time Zones"]
    - heading: "House Specialty" · links: same three again   ← duplicated placeholder column (mobile shows it 3×)
  badges: 2 × "OpenAI Select Partner" (same SVG twice — placeholder for two different partner badges?)
  subscription: heading "Insight subscription" · caption "We are your gateway to exceptional nearshore talent" ·
    field label "Email" · placeholder (Figma sample value) "darklord88@gmail.com" → use a real placeholder like
    "you@company.com" · button "Subscribe"
  careers card: title "Say Hi and join our team!" · cta "Explore Careers" → /careers
  brand word: "Nicasource LLC"
  trail: tagline "Your nearshore engineering partner" · copyright "2024. All rights reserved." (render
    "© {year} NicaSource, LLC. All rights reserved.") · "Follow Us" + Instagram, Facebook, LinkedIn
Assets:
  `/assets/shared/badge-openai-select-partner.svg` → 139×65, white rounded badge, ×2 in desktop column 5
  `/assets/shared/footer-careers-card-bg.jpg` (1200×686, same image as `case-study/hero-waves.png`) → careers card bg, cover, with `--ns-color-bg-overlay`
  logo → DS `<Logo variant="on-dark">` (Figma variant is named "Property 1=main" but renders white-on-dark), no download
  social icons → DS `Icon` `instagram`, `facebook`, `linkedin` (Figma is Code-Connected to these; 48px box, glyph ~20)
Interactions/behaviour: links hover → `--ns-color-text-link-hover`; email field uses DS TextField focus ring
  (active state in Figma = `--ns-color-border-brand`-ish watermelon border); subscribe posts to the newsletter endpoint
  (WP). Social links open in new tab.
DS components: `SiteFooter` only covers the trail row (logo + social + copyright + legal). Build the upper part as a
  site-level `SiteFooterNav` composition: `TextField` (label "Email"), `Button variant="outlined" size="sm"`
  ("Subscribe"), `Button variant="outlined" size="md"` ("Explore Careers"), `Logo`, `IconButton`/`Icon`.
  Then render `<SiteFooter surface="canvas" social={…}>` for the trail, or extend it (see notes).

---

## 3. Contact module — contact-form   (desktop `953:10728` · mobile `13:8935` · masters `15:21211` / `15:21103`)
Pattern: contact-form
Layout desktop: 1513 × 565, bg `--ns-color-bg-surface` (#292643), padding `--ns-spacing-80` / `--ns-spacing-180`,
  content 1153 wide. Column gap 24: heading; tab row (gap `--ns-spacing-24`); row of 3 inputs (equal flex, gap 16);
  row (gap 16) of [Service chips block (flex 1)] + [Message textarea (flex 1, h 75 field) with the "Send" button
  right-aligned under it (gap 16)].
Layout mobile: 393 wide, padding `--ns-spacing-40` / `--ns-spacing-24`. Everything stacks: heading, tabs, 3 inputs
  stacked (gap 16), chips (wrap), Message field 148 tall with the "Send" button **inside** the field, bottom-right.
  Tabs on mobile are 14px.
Typography: heading → mixed `.ns-text-web-h2-light` with a `.ns-text-web-h2-black` span (42/48; mobile 32/38);
  tabs → `.ns-text-web-body-light` (18/27; mobile 14 → `.ns-text-web-caption-light`); field labels ("Full Name",
  "Email", "Company", "Service Requested", "Message") → `.ns-text-web-eyebrow-black` (16/18, 900); input text →
  18 light (`.ns-text-web-body-light`); chips → 12 regular (Figma uses Inter; use Public Sans
  `.ns-text-web-small-regular`); Send → Button sm 14 medium.
Colors: heading `--ns-color-text-primary`; tabs `--ns-color-text-accent` (#fde5ac), active tab underline 2px
  `--ns-color-bg-accent`; labels `--ns-color-text-primary`; input border default `--ns-color-text-secondary`
  slate-300 (#bec8d8 → use `--ns-color-border-input` or DS TextField default); input border focused/active
  `--ns-color-border-brand` (Figma watermelon #fd6a75 → closest semantic is `--ns-color-text-highlight` value; DS
  TextField focus); placeholder `--ns-color-text-secondary`; chip default: 1px border `--ns-color-border-strong`
  (#f6fcff), text `--ns-color-text-primary`; chip selected: bg #fd6a75 (`--ns-color-text-highlight` value; there is
  no bg token for coral-300, use `--ns-color-bg-highlight` #fd2847 or add one) with text `--ns-color-text-primary`
  + close-circle icon.
Content:
  heading: "Are you looking for a **reliable company** for staff augmentation services?"
  tabs: ["New Project" (active), "Join Our Team", "General Inquiries"]
  fields: Full Name (sample "Tom Riddle"), Email (sample "darklord87@gmail.com"), Company (sample "slitherine.io")
    → these are Figma sample values; render empty inputs with placeholders.
  service label: "Service Requested"
  chips: ["Software Development" (selected), "Project Management", "QA Testing" (selected), "UX Audit" (selected),
          "UI Design", "UX Design" (selected), "Salesforce Administration", "Salesforce Development",
          "Staff Augmentation"]
  message: label "Message" · placeholder "Drop us some lines here..."
  submit: "Send" (with send icon)
Tab states: the Contact Us page variants (`1189:11372/11431/11490`) show the three tab states — **the form fields
  are identical in all three**; only the active underline moves (and on the Contact page the right-hand portrait
  and copy change). The Contact page labels the first tab "New Business", the Home module says "New Project".
  Per the designer note (annotations.md, Contact Module): "New Project" uses the clickable service chips instead
  of a dropdown; "Join Our Team" adds a **portfolio/CV upload** field (not drawn anywhere); "General Inquiries"
  presumably drops the chips. Build tabs as a real `role="tablist"`, each tab swapping the field set:
    - New Project: name, email, company, service chips, message
    - Join Our Team: name, email, (company → optional / "LinkedIn"), portfolio upload (file), message — to confirm
    - General Inquiries: name, email, company, message — to confirm
Assets: none. Icons from DS: chip close → `Icon name="remove-circle"` (16, Figma "close-circle"); Send → `Icon name="send"` (20).
Interactions/behaviour: tabs switch the form variant; chips are toggle buttons (`aria-pressed`), selected shows the
  ✕ icon (clicking toggles off); input active state = coral border (focus); Send = outlined small button (hidden
  "Button" instance 1:5568 in old versions suggests a filled submit was dropped). Validation/success/error states
  are not drawn in the module (top-level `tick-circle`, `danger`, `close-circle` icons on the canvas hint at
  success/warning/error toasts).
DS components: `TextField` (label, placeholder; multiline textarea not in DS → local `<textarea>` styled like
  TextField), `Tag`-like toggle chip (DS `Tag` is not interactive → local `Chip` toggle button, or `Button
  variant="outlined" size="sm"` with `aria-pressed`), `Button variant="outlined" size="sm" icon="send"`, `Icon`.

---

## 4. Client logo marquee — logo-marquee   (desktop `1:925` inside `1:922` · mobile `13:15650` inside `13:8491`)
Pattern: logo-marquee
Layout: full-bleed row, `overflow: hidden`, gap `--ns-spacing-20`. Each logo sits in a card: height 120, padding
  0 `--ns-spacing-40`, radius `--ns-radius-2xl` (32), bg `--ns-color-bg-surface` (#292643), logo centred.
  Figma shows 8 cards = the 4 logos twice (the loop duplicate), clipped on both edges.
  Mobile: same cards, same size, three visible and clipped.
Logos (order): VERSA, Scalar, WeLink, Children's Miracle Network Hospitals (then repeat).
Assets (all in `/assets/shared/`, fills are cream #FCF9F4 / white baked into the SVGs):
  `client-versa.svg` 212×29 · `client-scalar.svg` 143×41 · `client-welink.svg` 225×34 · `client-cmnh.svg` 211×87
  (versa and cmnh were recomposed from their vector parts at the Figma offsets; the Figma frame export was unusable)
  `client-jolt.png` 186×125 (2×) → used in the testimonial card, 78×52.
Interactions/behaviour: per designer note, the strip auto-scrolls right → left as an infinite marquee (duplicate the
  set, translateX −50% loop). Pause on hover/focus; static, no animation under `prefers-reduced-motion`.
  Each logo `<img alt="{Client name}">`; duplicates `aria-hidden`.
DS components: none (local `LogoMarquee`).

---

## 5. Testimonial card — testimonial-carousel   (desktop `1:1206` · mobile `13:8785`)
Used on Home (and other pages with the "Don't just take our word for it!" module).
Layout: card padding `--ns-spacing-40` (mobile `--ns-spacing-24`), radius `--ns-radius-lg` (16), bg `--ns-color-bg-inverse`
  (#f6fcff), column gap 16: header row (client logo 78×52 left; author right-aligned: icon 16 + name + role, gap 8;
  mobile stacks the logo above the author row), quote, pagination dots (103×13: 4 dots, the active one is a
  red pill).
Typography: name → Inter Black 16/16 (use Public Sans `.ns-text-web-eyebrow-black`), role → Inter Medium 16/16 (use
  `.ns-text-web-label-medium` at 16 or `.ns-text-web-nav-medium`); quote → `.ns-text-web-nav-medium` (18/27, 500)
  desktop, `.ns-text-web-lead-medium` (20/24) mobile.
Colors: all text + icon → Figma `--ns-color-night-700` #292643 (primitive) → use `--ns-color-text-inverse` (#181728);
  active dot `--ns-color-bg-brand` (#fd2847); inactive dots slate-100-ish → `--ns-color-border-default`/ a light
  neutral (Figma #d4e6ee-ish).
Content (one slide drawn):
  logo: Jolt · name "Erick" · role "Head of Development"
  quote: "\"Nicasource has helped us simplify our engineering team growth by making  it easier for us to find and
    retain great programmers. Instead of  reviewing hundreds of resumes and interviewing dozens of candidates,  they
    provide fantastic pre-vetted devs that meet our qualifications.\""  (double spaces are in the source; collapse)
Assets: `/assets/shared/client-jolt.png`; `/assets/shared/icon-user-circle.svg` (16, "user-octagon"; no DS equivalent)
Interactions/behaviour: designer note: auto-advancing carousel (changes testimonial every X seconds); dots are
  clickable; pause on hover/focus and under reduced motion; `aria-roledescription="carousel"`.
  Testimonials come from WordPress.
DS components: none for the card (local `TestimonialCard` + `Carousel`), `Icon` if a user icon is added to DS.

---

## Global notes
- Button mapping used across specs: Figma "Large=Large" (24/16 padding, 18 medium) → `Button size="lg"`;
  "Large=Medium" (12 padding, 18 medium) → `Button size="md"`; "Large=Small" (8 padding, 14) → `size="sm"`.
  Filled red buttons → `variant="filled"` (`--ns-color-bg-brand` #fd2847, text `--ns-color-text-on-brand`; Figma
  uses #f6fcff text, which fails nothing visually but DS on-brand is #181728 — follow DS for AA).
- Mobile: CTA buttons go full width (designer note).
- "Nicasource LLC" giant word and the 8px divider are part of the footer on every page.
- The footer's 4th column duplicates "House Specialty" and the badge column repeats the same badge: placeholders.
- No mobile drawer, hover states for nav links, or form success/error states are designed.
