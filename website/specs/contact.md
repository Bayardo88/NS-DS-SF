# Contact Us: build spec

Figma: desktop `1:5139` (1513 × 1578) · mobile `13:11629` (393 × 2682). Theme `web-2025` (dark).
Nav (`1:5141`, `15:19883`) and footer (`53:90875`, `53:92135`) are owned by the layout spec.

**Two versions exist:**
- **v1, page frames:** `13:8342` desktop / `15:20257` mobile. A single "Talk to Adriana" state with full-bleed photo.
- **v2, documentation section:** revised frames, one per tab:

| Tab | Desktop frame | Mobile frame |
| --- | --- | --- |
| New Business | `1189:11431` | (see Page notes) |
| General Inquiries | `1189:11372` | (see Page notes) |
| Join Our Team | `1189:11490` | `1189:11547` |

The two other mobile frames are `1189:11602` and `1189:11657`.

Designer note `57:103755` ([annotations.md](annotations.md#contact-us)): "depending on the selected option, the photo shown changes, and the headline too". **Build v2.** It is the newer, more complete design and it implements that note. v1 is documented for reference.

---

## 1. Contact hero with tabbed form, `contact-form` (v1 desktop `13:8342` · v1 mobile `15:20257` · v2 see table above)
Pattern: contact-form (split hero: form column + photo/headline column; tab-driven)

### Layout
Desktop v2 (`1189:11432`): 1513 × 843, two equal halves of 757.
- **Left "Contac form"** (`1189:11435`): bg `#292643` → `--ns-color-bg-surface`. Padding left 148, right 75, content centred vertically. The inner column is 534.5 wide with gap `--ns-spacing-24`.
- **Right side** (`1189:11473`): bg `#24223b` (≈ `--ns-color-bg-surface-subtle` / night-800). Padding 89 sides, 137 bottom; content bottom-aligned. Two stacked full-cover image layers:
  1. the NS chevron mark (same in every tab)
  2. the people cut-out with handwritten name labels
- The nav overlays the top 80px.

Desktop v1 (`13:8342`): 1513 × 843. Row with padding `--ns-spacing-100` top/bottom and `--ns-spacing-180` sides, gap 20, items at the end.
- **Left: Contact Module.** Padding 32, radius `--ns-radius-2xl`, gap 100; the form has gap 24.
- **Right: text column.** Bottom-aligned.
- **Background:** `--ns-color-bg-surface`, with the Adriana photo covering the right ~54% (`left 49.33%`, `width 54.27%`).

Mobile v1 (`13:11629` / `15:20257`): photo hero first (393 × ~540, with the breadcrumb at top 100 and the headline + paragraph over the photo), then the form below on `--ns-color-bg-surface`. Padding 16; every input is full-width and stacked (Full Name, Email, Company each on its own row); chips wrap.
Mobile v2 (`1189:11547`): "right side" photo block first (393 × 733, content bottom-left, padding-left 29, bottom 71, text width 305), then the Contact Module (393 × 666, padding 16 / 26). The form takes the same stacked order.

### Form structure (identical in every tab in the frames; see Interactions for the intended per-tab differences)
1. **Section title (v2 only):** "Ready to **Drop a Line?**". Public Sans 28/42, "Ready to" Light 300 and "Drop a Line?" Black 900, white. Nearest classes are `.ns-text-web-h3-light` + `<strong class="ns-text-web-h3-black">` (32/48), sized down to 28. Off-token; flag it. The Join Our Team frame (`1189:11490`) omits this title.
2. **Tabs (`filter`):** row, gap `--ns-spacing-24`. Each tab is a label at `.ns-text-web-body-light` (18/27, 300); the active tab has a 2px underline.
   - v2 colors: active label + underline `#fde5ac` (honey) → `--ns-color-text-accent` / `--ns-color-border-accent`; inactive labels `#f6fcff` → `--ns-color-text-primary`.
   - v1 colors: all labels `--ns-color-text-accent`, underline `--ns-color-bg-accent`.
3. **Input row:** three fields, gap `--ns-spacing-16`. Desktop widths are flex 1 / 178 fixed / flex 1. Each field is a label above an input, gap 4.
   - Label: Public Sans Black 16/18 → `.ns-text-web-eyebrow-black`, `--ns-color-text-primary`.
   - Input box: border 1px, radius `--ns-radius-sm` (8), padding 8 × 16, text 14px (Figma font "Stevie Sans Book", not in the DS; use the DS input font, `.ns-text-web-label-medium` / caption size 14).
   - Input states: default border `#bec8d8` (slate-300) → `--ns-color-border-default`, value/placeholder text slate-300 → `--ns-color-text-secondary`. **Focused/filled** (the "Full Name" field) border `#fd6a75` → `--ns-color-border-brand` (or `--ns-color-border-focus`), value text `--ns-color-text-primary`.
4. **Service Requested:** label (eyebrow-black), then chips. Gap 4; chips wrap with gap `--ns-spacing-16`.
   - Chip: padding 8 × 16, radius 24 (`--ns-radius-xl`), text Public Sans Regular 12 (v1 used Inter 12) → `.ns-text-web-small-regular`.
   - **Unselected:** 1px border `#f6fcff` → `--ns-color-border-strong`, transparent fill, text `--ns-color-text-primary`.
   - **Selected:** fill `#fd6a75` → `--ns-color-bg-brand-pressed` (coral-300; or `--ns-color-bg-brand`), text `#f6fcff`, plus a trailing 16px close-circle icon (DS `Icon name="remove-circle"` or `"close"`).
5. **Message:** label (eyebrow-black), then a textarea 148px total height. Border 1px `--ns-color-border-default` (slate-300), radius `--ns-radius-sm`, padding `--ns-spacing-16`. Placeholder is Light 18 (`.ns-text-web-body-light`) in `--ns-color-text-secondary`.
   - **Send button inside the textarea, bottom-right:** outline, 1px `#f6fcff` border, radius 8, padding 8, gap 8. Label "Send" Medium 14 plus a 20px send icon (DS `Icon name="send"`). Implement it as a real submit button positioned over the bottom-right of the textarea wrapper (not inside the `<textarea>`).

Typography summary: tab labels → `.ns-text-web-body-light`; field labels → `.ns-text-web-eyebrow-black`; input text → 14px (`.ns-text-web-label-medium`); chips → `.ns-text-web-small-regular`; textarea placeholder → `.ns-text-web-body-light`.
- Right-column headline v2 → Public Sans 42, Light + Black split, tracking −0.966 → `.ns-text-web-h2-light` + `.ns-text-web-h2-black` span.
- Right-column paragraph v2 → Light 25 / 1.5, tracking −0.55 (off-token; nearest `.ns-text-web-h3-light` 32/48 or `.ns-text-web-lead`; mobile v2 uses 20 / 1.5).
- v1 headline: "Talk to" Light 70/76 + "Adriana" Black 70/76 → `.ns-text-web-h1-light` + `.ns-text-web-h1-black` span. v1 paragraph → `.ns-text-web-h3-light` (32/48).

### Content (verbatim)
```
section_title (v2): "Ready to " + bold "Drop a Line?"
tabs (v2): ["New Business", "Join Our Team", "General Inquiries"]      # v1 first tab was "New Project"
fields:
  - {label: "Full Name", placeholder/value: "Tom Riddle"}
  - {label: "Email", placeholder/value: "darklord87@gmail.com"}
  - {label: "Company", placeholder/value: "slitherine.io"}
service_label: "Service Requested"
services: [Software Development (selected), Project Management, QA Testing (selected), UX Audit (selected),
           UI Design, UX Design (selected), Salesforce Administration, Salesforce Development, Staff Augmentation]
message_label: "Message"
message_placeholder: "Drop us some lines here..."
submit: "Send"

right_column_by_tab (v2):
  New Business:      {headline: "Let’s Build " + bold "Something Great",
                      body: "Looking to grow your team, ship faster, or expand capacity? Let’s talk about your goals — and how we can help you get there.",
                      people: "Adriana (COO) + Jose (CTO)" handwritten labels}
  General Inquiries: {headline: bold "Hi " + "to You Too",
                      body: "Got questions, ideas, partnership thoughts — or just curious about how we work? Drop us a line. We’d love to hear from you.",
                      people: "Hansell (Marketing Manager)"}
  Join Our Team:     {headline: "Your Next Role " + bold "Starts Here",
                      body: "We’re always eager to meet sharp minds who love solving real problems with creativity, and collaboration. Think you’d thrive here? Let’s connect.",
                      people: "Maria Mercedes (Head of culture)"}

v1 right column (single state):
  headline: "Talk to " + bold "Adriana"
  body: "Do  you have any questions? Feedback? Or do you feel ready to grow your staff with us? We look forward to hearing from you!"   # double space after "Do" is in Figma; fix it
breadcrumb (v1 mobile): [home, page, page2, page03]   # placeholder
```

### Assets
| File | Use | Size in layout |
| --- | --- | --- |
| `website/frontend/public/assets/contact/tab-bg-ns-chevron.png` (1422×1808, transparent) | v2 right column, layer 1, all tabs | `object-fit: cover`, 757 × 843 |
| `website/frontend/public/assets/contact/tab-new-business-adriana-jose.png` | v2 New Business, layer 2 | cover 757 × 843 |
| `website/frontend/public/assets/contact/tab-general-hansell.png` | v2 General Inquiries, layer 2 | cover 757 × 843 |
| `website/frontend/public/assets/contact/tab-join-team-maria-mercedes.png` | v2 Join Our Team, layer 2 | cover 757 × 843 |
| `website/frontend/public/assets/contact/hero-adriana.png` (761×843) | v1 only (photo, right half) | 821 × 880 crop |

The layer-2 PNGs include the handwritten name/role labels baked into the image. Give each one meaningful alt text (e.g. "Adriana, COO, and Jose, CTO"). On mobile v2 the same PNGs are scaled 154% and offset −27% left (cropped to centre the people).
Icons: send → DS `send`; chip remove → DS `remove-circle` / `close`. No icons downloaded.

### Interactions and behaviour
- **Tabs** (`role="tablist"`, arrow-key navigation) switch three things:
  1. the right column: image layer 2, headline and body (per the table above), cross-fading over about 300ms, or instant under reduced motion
  2. the active underline
  3. the form fields (see the next point)
- **Form fields per tab:** the frames show the same fields in all three tabs, but the Home contact-module note (`57:103202`, see annotations.md) says the form changes by type. Recommended:
  - *New Business*: Name, Email, Company, Service chips, Message.
  - *Join Our Team*: Name, Email, LinkedIn/Portfolio URL or **CV/portfolio upload**, Message; no Company or Service chips.
  - *General Inquiries*: Name, Email, Company (optional), Message; no Service chips.
  Confirm with design.
- **Service chips** are multi-select toggle buttons (`aria-pressed`). A selected chip shows the close-circle icon; clicking it deselects. Submit them as an array.
- **Validation:** required Name, Email (format) and Message; inline error text under the field with `--ns-color-text-error` and `--ns-color-border-error`. Not designed.
- **Submit states:** button loading, then success/error. **No success state is designed** in either v1 or v2. The v2 frames are tab variants, not success screens. Recommend replacing the form with a confirmation message using the tab's headline style.
- **Pre-select a tab** from the URL (`/contact-us?type=join-team`) so the "Explore Careers" and "Partner with Us" CTAs elsewhere can deep-link.
- **Submission target:** a WP endpoint (Contact Form 7 / Gravity Forms REST, or a custom route) with honeypot/reCAPTCHA. Not specified.
- Placeholders shown as values ("Tom Riddle", etc.) should be real `placeholder` text, or use empty fields.

### DS components
`TextField` for Full Name, Email and Company; `TextField` multiline/textarea for Message if supported, otherwise local. `Tag` as toggle chips if it supports a selectable/removable variant, otherwise a local `ChipToggle`. `Button variant="secondary|outline" size="sm"` with `Icon name="send"` for Send. Tabs are local (build `Tabs`; DS `Stepper` is not a fit).

---

## Page notes
- **v1 vs v2:** v2 (documentation section) renames "New Project" to **"New Business"**, adds the "Ready to Drop a Line?" title, changes the inactive tab color to light/honey, and splits the hero into two hard halves with cut-out people photos instead of one full-bleed photo. Build v2.
- **Note vs frames disagree on people:** note `57:103755` says New Project = Adriana *or* José Luis, Join our Team = *Clara*, General = group photo. The v2 frames show Adriana + Jose / Maria Mercedes / Hansell. Follow the frames; confirm with design.
- **Mobile v2 mapping:** only `1189:11547` was verified (Join Our Team, "Your Next Role Starts Here"). `1189:11602` and `1189:11657` are presumed to be New Business and General Inquiries by order, but this is unverified (Figma MCP quota).
- **Join Our Team frame** has no "Ready to Drop a Line?" title and still shows Company + Service chips; likely a copy-paste leftover.
- **Off-token values:** 28px section title, 25px right-column paragraph, padding 148/75/89/137, raw `#292643` / `#24223b` / `#fde5ac`, "Stevie Sans" input font, Inter in v1 chips.
- **Double space** in "Do  you have any questions?" (v1).
- **Contrast:** light text on a `#fd6a75` selected chip at 12px is about 2.8:1 and fails AA. Use dark text (`--ns-color-text-on-brand`) or a darker fill.
- The breadcrumb on v1 mobile is placeholder.
