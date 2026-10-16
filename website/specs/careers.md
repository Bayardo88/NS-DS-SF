# Careers — build spec

Figma `eIwmOO5omtR1Tlhdjea0C6` · desktop frame `1:1679` "carreers" (1513 × 6583) · mobile frame `13:9298` (393 × 6717).
Theme `web-2025` (dark). Nav (`1:1998`) and Footer (`53:90527`) are out of scope.
Hidden and skipped: `1:1680` (old hero), `1:1838` (Chip-Group inside Bento), `1:1992` (Our process, second), `1:2008` (Banner/timezone card).

Desktop order: Hero → Benefits intro heading → Benefits cards → Life at Nicasource → Culture collage → The Way We Work (interest tags) → Open Roles.
Mobile order differs: Hero → texture "embrace remote life" → Life at Nicasource → Benefits → The Way We Work → texture "LIFE AT NICA-SOURCE" → collage → testimonial quote → Open Roles.
Build from desktop. Mobile-only blocks are listed in Page notes.

Common section shell: bg `--ns-color-bg-canvas` (#181728), padding `--ns-spacing-80` / `--ns-spacing-180`, inner width 1153.
Mobile: padding `--ns-spacing-40` / `--ns-spacing-16`.

---

## 1. Hero — hero   (desktop 1:1683 · mobile 13:9302)
Pattern: hero
Layout desktop: 1513 × 843, padding `--ns-spacing-100` / `--ns-spacing-180`. Breadcrumb at the top, then a text block (flex 1, justify center, gap `--ns-spacing-24`): H1, H3, button.
  Background: cover image + `linear-gradient(180deg, transparent 53.6%, #181728 96.7%)` + 50% #111 overlay (`--ns-color-bg-overlay`).
Layout mobile: 393 × 843, padding 16, text in the lower half. The mobile frame shows old copy and photo ("We are a **specialized staffing firm** within the **software** and **engineering industry**." / "We started operations in Managua, Nicaragua on 2013.", photo of smiling people). Use the desktop copy and image.
Typography: breadcrumb → `.ns-text-web-caption-light` (14/300); title → `.ns-text-web-h1-light` (70/76, 300, −1.61); subtitle → `.ns-text-web-h3-light` (32/48); CTA → Button lg (Figma Public Sans Medium 18/27, padding 16/24, radius 8).
Colors: all text → `--ns-color-text-primary` (#f6fcff); CTA → `--ns-color-bg-brand` (#fd2847).
Content:
  breadcrumb: ["home", "page", "page2", "page03"]   ← placeholder; render Home › Careers
  heading: "Careers That Turn LATAM Talent Into Global Impact"   (Figma has a trailing empty line after the title; ignore it)
  body: "Be part of a nearshore team powering startups & enterprises across the US and beyond."
  cta: { label: "See all openings", href: "#open-roles" }  (scrolls to §7)
Assets: `/assets/careers/hero-bg.png` (800×1200, portrait, blurred LED-wall bokeh): background, cover. The source is low-res but blurred, so it is acceptable.
Interactions/behaviour: CTA smooth-scrolls to the Open Roles section.
DS components: `Button` (filled, lg), `Icon` (`home`, `chevron-right`) for the breadcrumb.

## 2. Benefits intro — statement   (desktop 1:1710 · mobile: merged into 13:9339)
Pattern: statement
Layout desktop: 1513 × 246, padding 80/180, a centred text column (1153) with gap `--ns-spacing-20`, `text-align: center`.
Layout mobile: on mobile the eyebrow/title sit left-aligned on top of the benefit cards (see §3), with different copy.
Typography: eyebrow → `.ns-text-web-eyebrow-black` (16/18); title → `.ns-text-web-h2-light` (42/48).
Colors: eyebrow → `--ns-color-text-accent` (#fde5ac); title → `--ns-color-text-secondary` (#bec8d8).
Content:
  eyebrow: "Built for Your Career"
  heading: "Benefits That Care for You and Your Future"
Assets: none.
Interactions/behaviour: none.
DS components: none.

## 3. Benefits cards — card-grid   (desktop 2132:12896 · mobile 13:9339)
Pattern: card-grid
Layout desktop: 1513 × 674, padding 80/180. A left-aligned header (eyebrow + H2, gap 20), then gap 20, then a row of 3 cards with gap `--ns-spacing-20`.
  Card: 371 × 408, padding `--ns-spacing-32`, bg `--ns-color-bg-canvas`, border 3px `--ns-color-border-subtle` (#292643), radius `--ns-radius-2xl` (32); title, then gap 8, then the body. Same `InfoCard` as About §5.
Layout mobile: header (eyebrow "The Benefits", title "Other than work for a cool company"), then 1-column cards (361w, height auto ≈ 272–299, gap 20). Mobile body text is 18/27 like desktop.
Typography: eyebrow → `.ns-text-web-eyebrow-black`; heading → `.ns-text-web-h2-light`; card title → `.ns-text-web-h2-black` (Public Sans Black 42); card body → `.ns-text-web-body-light` (18/27).
Colors: eyebrow → `--ns-color-text-accent`; heading → `--ns-color-text-secondary`; card title → `--ns-color-text-secondary` (#bec8d8); card body → `--ns-color-text-secondary` (Figma #bec8d8, unlike About where it is #f6fcff).
Content:
  eyebrow: "Your Next Challenge Awaits"
  heading: "Build for Global Tech, Grow Without Limits"
  items:
    - title: "Global Connections"
      body: "We excel at identifying and honing premier talent, meticulously crafted to meet the exacting demands of your digital product and service, ensuring flawless execution."
    - title: "Remote first work"
      body: "Our talent offers a perfect balance between productivity and a more affordable annual cost compared to others. In addition to not paying taxes, social security, etc... We take care of that so you pay less."
    - title: "Flexible time off"
      body: "We offer 40 productive hours weekly for your business, with daily updates. Enjoy 8 extra hours, called NS Time, for meals, training, and meetings. Our training keeps our team learning new skills to benefit your business."
  mobile header copy: eyebrow "The Benefits", heading "Other than work for a cool company"
Assets: none.
Interactions/behaviour: none.
DS components: shared `InfoCard` (local).
Note: the card bodies are client-facing copy ("…so you pay less") on a careers page. Flag it to content (see Page notes).

## 4. Life at Nicasource — feature-split (image right)   (desktop 1:1700 · mobile 13:9329)
Pattern: feature-split
Layout desktop: 1513 × 586, padding 80/180, gap 20, items centred. Left text column 488 × 426, padding 16, stack gap 24. Right image column 645 × 426,
  radius `--ns-radius-2xl` (32), overflow hidden, photo cover.
Layout mobile: stacked, text then image (361 × 426, radius 32).
Typography: eyebrow → `.ns-text-web-eyebrow-black`; title → `.ns-text-web-h2-black` (42/48, 900); body → `.ns-text-web-body-light` (18/27), two paragraphs with one blank line between.
Colors: eyebrow → `--ns-color-text-accent`; title → `--ns-color-text-primary` (#f6fcff); body → `--ns-color-text-primary`.
Content:
  eyebrow: "Why Us?"
  heading: "Life at Nicasource"
  body:
    - "Behind every project, there’s a team that collaborates and enjoys the journey together. At Nicasource, it’s not just about writing code or delivering features—it’s about creating spaces where people connect, share moments, and celebrate along the way."
    - "Growth here feels collective. Our culture blends professional excellence with real human connection: from stand-ups to milestones, from learning opportunities to small celebrations like this one. Every challenge becomes a chance to grow stronger as a team and deliver lasting impact."
Assets: `/assets/careers/life-at-nicasource-team.png` (1152×896): team in NicaSource aprons, right column 645 × 426, cover.
Interactions/behaviour: none.
DS components: none.

## 5. Culture collage — other:image-collage   (desktop 1:1837 "Bento Grid-03" · mobile 13:9466)
Pattern: other:image-collage
This is **not a job board**: the node is a single flattened image (polaroids, Mission/Vision sticky notes, value stickers: Commitment, Honesty, Respect, Transparency, Flexibility, "Be kind be nice be NS", applaud bot).
Layout desktop: 1513 × 2187, padding 80/180. One image box 1181 × 2027. The image is placed at left −1.6%, top 6.1%, w 101.3%, h 83.1% inside it, so the real art is about 1196 × 1684 centred.
  Build it as a centred `<img>` max-width 1181, height auto.
Layout mobile: 393 × 589 with a **different** collage (placeholder "May Dumps / recap" stock polaroids) plus a row of label chips. Use the desktop collage scaled to the container width.
Typography: n/a (text is baked into the image).
Colors: section bg `--ns-color-bg-canvas`.
Content:
  alt text (write it, the image has meaningful text): "Collage of NicaSource team photos with our Mission and Vision notes and our values: Commitment, Honesty, Respect, Transparency, Flexibility."
  Mission (baked in the image): "We empower our clients through exceptional staff augmentation, driving their success and satisfaction…" (hard to read). Consider rendering Mission/Vision as real text for accessibility and SEO.
Assets: `/assets/careers/culture-collage-mission-vision.png` (1290×1816, palette PNG): centred, about 1181w.
Interactions/behaviour: none. Optional: subtle parallax or float on scroll (not specified).
DS components: none.

## 6. The Way We Work — other:interest-marquee   (desktop 1:1718 "Our process" · mobile 13:9347)
Pattern: other:interest-marquee (statement + tag marquee)
Layout desktop: 1513 × 638, padding 80/180, gap `--ns-spacing-60`, centred. Content column gap `--ns-spacing-40`: H2 centred (1153w), then body (917w, left-aligned inside a centred box),
  then 3 rows of tags (each row is a single nowrap flex line, gap `--ns-spacing-16`, centred, overflowing the viewport on both sides).
  Tag: bg `--ns-color-bg-canvas`, border 1px `--ns-color-border-accent` (#fde5ac), radius `--ns-radius-lg` (16), padding 8/16.
Layout mobile: 393 × 396: H2 (361w, 2 lines) then 3 overflowing tag rows (row width up to ~1728px). The body paragraph is not in the mobile frame; keep it.
Typography: H2 → `.ns-text-web-h2-light` (Figma uses Inter Light 42 / 1.5 lh, −0.92 tracking; normalise to Public Sans via the DS class); body → `.ns-text-web-body-light`;
  tag label → `.ns-text-web-lead-medium` (20/24, 500). Some Figma tags are Inter Medium 24; normalise all of them to lead-medium.
Colors: H2 → `--ns-color-text-primary` (Figma white); body → `--ns-color-text-primary`; tag text → `--ns-color-text-secondary` (#bec8d8); tag border → `--ns-color-border-accent`.
Content:
  heading: "The Way We Work Is The Way We Grow Together"
  body: "At Nicasource, collaboration is built on shared principles. They guide how we deliver, but also define what we expect from every teammate who joins us. We believe growth comes when both sides live by the same standards — shaping how we show up, how we work together, and how we succeed as a team."
  rows:
    - ["Rock’n’Roll", "Jazz", "Classical", "Hip Hop", "Reggae", "Blues", "Metal", "Pop", "Country", "Folk", "Electronic", "Soul", "R&B", "Punk", "Indie", "Alternative", "Funk", "Disco"]
    - ["Hiking", "Camping", "Kayaking", "Cycling", "Rock Climbing", "Bird Watching", "Fishing", "Skiing", "Surfing", "Photography", "Snorkeling", "Trail Running", "Wildlife Observation", "Caving", "Stargazing", "Picnicking", "Scuba Diving", "Backpacking"]
    - ["Comic books", "Graphic novels", "Manga", "Webcomics", "Superhero comics", "Indie comics", "Historical comics", "Science fiction comics", "Fantasy comics", "Horror comics", "Romantic comics", "Educational comics", "Political cartoons", "Satirical comics", "Children's comics", "Slice of life comics", "Adventure comics", "Science comics"]
Assets: none.
Interactions/behaviour: the rows overflow both edges, which implies an **infinite horizontal marquee**: rows alternate direction (row 1 →, row 2 ←, row 3 →), slow (~40–60s loop),
  pause on hover, static under `prefers-reduced-motion`. Duplicate each row's items for a seamless loop; the duplicate copy gets `aria-hidden`. Clip the section horizontally (`overflow-x: clip`).
DS components: `Tag` (variant outlined, color accent, size md) if its sizing can reach 20px text; otherwise a local `InterestTag`.
Note: the tags are placeholder-ish (music genres, outdoor activities, comic genres). They likely stand for team interests or hobbies. Flag to content: they do not match the "shared principles" copy.

## 7. Open Roles — job-list   (desktop 1:1984 · mobile 13:9510)
Pattern: job-list
Anchor id: `open-roles` (target of the hero CTA).
Layout desktop: 1513 × 674, padding 80/180. Header (eyebrow + H2, gap 20), then gap 20, then a row of 3 Job Cards with gap 20.
  Job Card: 371 × 408, padding `--ns-spacing-24`, gap 24, bg `--ns-color-bg-canvas`, border 3px `--ns-color-border-subtle` (#292643), radius `--ns-radius-2xl` (32), content justified to the end:
  image (flex 1, ≈ 317 × 260, radius `--ns-radius-lg` 16, cover), then a content stack (gap 8): job title, then an "Apply Now" text button with an external-link icon.
  Show all published jobs in a responsive grid (3 columns desktop, wrapping rows, gap 20). Desktop shows 3 identical placeholder cards.
Layout mobile: header (eyebrow, H2 "Ready to make your Mark?" all Light), then 1-column cards **without the image** (361w, padding 24, radius 32; title, then Apply Now), gap 20.
Typography: eyebrow → `.ns-text-web-eyebrow-black`; H2 → `.ns-text-web-h2-light` with the "make your Mark" span in `.ns-text-web-h2-black` (desktop only); job title → `.ns-text-web-h4-black` (Figma Public Sans Black 24/27);
  Apply Now → `.ns-text-web-lead-medium` / Button text (Figma Public Sans Medium 18/27, padding 8, radius 8).
Colors: eyebrow → `--ns-color-text-highlight` (Figma #fd6a75 coral-300; desktop. Mobile shows it honey `--ns-color-text-accent`; use highlight); H2 → `--ns-color-text-secondary` (#bec8d8);
  job title → `--ns-color-text-primary` (Figma white); Apply Now + icon → `--ns-color-text-link` (#fd6a75).
Content:
  eyebrow: "Open Roles"
  heading: "Ready to **make your Mark**?"
  items (placeholder ×3): { title: ".NET Senior Developer", cta: "Apply Now", href: "/careers/<job-slug>" }
  Data source: WordPress `job` CPT (see job.md "WordPress job fields"). Card fields: `featured_image`, `title` (or `seniority + role`), permalink.
  Empty state (not designed): "No open roles right now. Check back soon." in body-light, plus a link to the General Inquiries form.
Assets: `/assets/careers/job-card-placeholder.jpg` (1200×992, woman with tablet next to a robot): the fallback job image when a job has no featured image.
  The same file exists as `insights/post-pacific-ocean-2.jpg` (stock placeholder).
Interactions/behaviour: the whole card is clickable (link to the job detail). Hover: border → `--ns-color-border-default` or a slight lift. "Apply Now" icon is `external-link`, but the link stays on-site (job detail #apply); consider `arrow-right`.
  Optional filters were planned (hidden `1:1838` Chip-Group); not in scope.
DS components: `Button` (variant text, size md, icon `external-link`), `Icon`. Local `JobCard`.

---

## Page notes
- Breadcrumb is placeholder copy. Generate it from the route.
- Mobile-only blocks (not on desktop; build only if design confirms):
  - `13:9309` texture heading "embrace remote life" (`.ns-text-web-callout-lg-black`, mobile 50/40). Texture fill `/assets/shared/texture-gradient-ribbons.jpg` via `background-clip: text`.
  - `13:9463` texture heading "LIFE AT NICA-" / "SOURCE" (`.ns-text-web-callout-xl-black`, mobile 70/60, uppercase). Texture fill `/assets/shared/banner-waves-bg.jpg` (bg-size ≈189% × 212%, position 97% 41%).
  - `15:19050` testimonial quote card: bg `--ns-color-bg-inverse` (#f6fcff), radius 16, padding 24. Icon `user` 16px + name "Boyo" (Black 16) + role "Product Director" (Medium 16), color `--ns-color-text-inverse` (Figma #292643).
    Quote `.ns-text-web-h3-light`: "\"This is the best place to explore and be creative, no matter the type of project or client.”" (the quote is a placeholder, attributed to the user).
- Mobile collage `13:9466` is a stock placeholder ("May Dumps"), so it is not downloaded. Use the desktop collage.
- §3 benefit bodies are copy-pasted client-sales copy ("so you pay less", "your business"). §6 tags look like lorem-style placeholders. Flag both to content.
- Eyebrow color is inconsistent: "Open Roles" is coral on desktop and honey on mobile. Spec uses coral (`text-highlight`).
- Figma heading in §6 is Inter instead of Public Sans. Normalise to DS text styles.
- The job card image is identical for every card. Real cards should use the job's featured image or a per-discipline illustration, falling back to the placeholder.
