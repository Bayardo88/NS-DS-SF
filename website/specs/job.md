# Job detail — build spec

Figma `eIwmOO5omtR1Tlhdjea0C6` · desktop frame `1:2417` "carreers/Job Board/Job" (1513 × 4381) · mobile frame `13:9650` (393 × 6972).
Theme `web-2025` (dark). Route: `/careers/<job-slug>`, a template filled from the WordPress `job` CPT (fields at the end).
Nav (`1:2471`) is out of scope. No footer instance exists in the desktop frame (`1:2417` ends after the Contact Module); use the shared layout footer.
Hidden and skipped: `1:2418` (old hero), `1:2481` (Banner/timezone card).

The Figma content is placeholder: the title is "Seniority + Role Name" and every body paragraph is the same lorem-style "Nike's e-commerce strategy…" text.
Everything below is a template bound to CPT fields.

Common section shell: bg `--ns-color-bg-canvas` (#181728), padding `--ns-spacing-80` / `--ns-spacing-180`, inner width 1153. Mobile: padding 40/16.

---

## 1. Hero — hero   (desktop 1:2421 · mobile 13:9654)
Pattern: hero
Layout desktop: 1513 × 843, padding `--ns-spacing-100` / `--ns-spacing-180`. Breadcrumb absolutely placed at top 100 / left 180. The title block is vertically centred (flex 1, justify center).
  Background: cover image + flat `--ns-color-bg-overlay` (rgba(17,17,17,.5)). There is no bottom gradient fade here, unlike About and Careers; add the same fade-to-canvas for consistency if desired.
Layout mobile: 393 × 843. The title sits near the bottom (y≈660), breadcrumb at the top under the nav.
Typography: breadcrumb → `.ns-text-web-caption-light` (14/300); title → `.ns-text-web-h1-black` (70/76, 900, −1.61; mobile 40/44), 2 lines: seniority on line 1, role on line 2.
Colors: all text → `--ns-color-text-primary` (#f6fcff).
Content:
  breadcrumb: ["home", "page", "page2", "page03"]   ← placeholder; render Home › Careers › {job title}
  heading: "Seniority +" / "Role Name"   → `{seniority}` + line break + `{role_name}` (e.g. "Senior" / ".NET Developer")
  (not in design, recommended) a meta row under the title, built with DS `Tag` (outlined, neutral, sm): location · employment type · hours · work mode, plus an "Apply now" Button linking to `#apply`.
Assets: `/assets/job/hero-bg.jpg` (600×1200 portrait, blue particle waves): background, cover. Default hero; allow a per-job override (`hero_image`). Low-res for 1513w, so request a larger export.
Interactions/behaviour: none.
DS components: `Icon` (`home`, `chevron-right`), optional `Tag`, `Button`.

## 2. Job description body — rich-text   (desktop 1:2433 "Our process" · mobile 13:9666)
Pattern: rich-text (2-column label/content rows) + card-grid
Layout desktop: 1513 × 2198, padding 80/180, column gap `--ns-spacing-60` between blocks. Each block is a row (gap `--ns-spacing-20`, align start):
  left is the H2 label in a fixed 481px column; right is the content (flex 1, ≈652px), stack gap `--ns-spacing-20` between paragraphs.
  Blocks in order: About Nicasource · Job Description · Role Expectations (bulleted list) · Benefits (paragraph), then a row of 3 benefit cards
  (same `InfoCard`: 371 × 408, padding 32, border 3px `--ns-color-border-subtle`, radius 32, gap 20).
Layout mobile: each block stacks (H2, then gap 20, then content); cards become 1 column (361w, gap 20). Total ≈3533 tall because of the long copy.
Typography: block labels → `.ns-text-web-h2-black` (42/48, 900; mobile 32/38); paragraphs + list items → `.ns-text-web-body-light` (18/27); list → `list-style: disc`, item indent 27px;
  card title → `.ns-text-web-h2-black`; card body → `.ns-text-web-body-light`.
Colors: labels → `--ns-color-text-secondary` (#bec8d8); body + list → `--ns-color-text-secondary` (#bec8d8); card title + body → `--ns-color-text-secondary`; card bg/border as above.
Content (placeholder, map to fields):
  - label: "About Nicasource"   → field `about_company` (default global boilerplate from Options page). Figma text: "Nike's e-commerce strategy focuses on leveraging augmented reality (AR) to enhance the online shopping experience. By allowing customers to virtually try on shoes and apparel through their smartphones, Nike aims to bridge the gap between physical and digital shopping. Additionally, the strategy includes personalized recommendations based on user behavior and preferences, ensuring that every customer feels uniquely catered to. The integration of a loyalty program that rewards users for engaging with the brand online will further enhance customer retention and satisfaction."
  - label: "Job Description"    → field `description` (WYSIWYG; Figma shows 3 paragraphs of the same placeholder text)
  - label: "Role Expectations"  → field `responsibilities` (repeater or WYSIWYG list). Figma items:
      - "Write clean, maintainable code that adheres to best practices."
      - "Collaborate with team members to design and implement software solutions."
      - "Participate in code reviews to ensure quality and share knowledge."
      - "Stay updated with the latest technologies and programming languages."
      - "Debug and troubleshoot issues in existing software applications."
      - "Document code and processes for future reference and onboarding."
      - "Test software thoroughly to ensure functionality and performance."
      - "Communicate effectively with stakeholders to gather requirements and provide updates."
  - label: "Benefits"           → field `benefits_intro` (paragraph; same placeholder text)
  - benefit cards → field `benefits` (repeater {title, body}, default from Options page), Figma:
      - { title: "Benefit 01", body: "We excel at identifying and honing premier talent, meticulously crafted to meet the exacting demands of your digital product and service, ensuring flawless execution." }
      - { title: "Benefit 02", body: "Our talent offers a perfect balance between productivity and a more affordable annual cost compared to others. In addition to not paying taxes, social security, etc... We take care of that so you pay less." }
      - { title: "Benefit 03", body: "We offer 40 productive hours weekly for your business, with daily updates. Enjoy 8 extra hours, called NS Time, for meals, training, and meetings. Our training keeps our team learning new skills to benefit your business." }
  Any section whose field is empty is omitted (no empty label).
Assets: none.
Interactions/behaviour: none. Consider a sticky "Apply" button on mobile, because the body is about 3.5k px long.
DS components: shared `InfoCard`; WYSIWYG output styled with a `.job-prose` wrapper (p, ul, li, strong, a → `--ns-color-text-link`).

## 3. Application form — contact-form ("Join Our Team" variant)   (desktop 8:5362 · mobile 13:9756)
Pattern: contact-form
Anchor id: `apply`. Same `ContactModule` as About §7 / Home, with the **"Join Our Team"** tab active and the application field set.
Layout desktop: 1513 × 605, bg `--ns-color-bg-surface` (#292643), padding 80/180. Column of 1153 with gap 24:
  heading; then the tab row (gap 24, active tab underlined 2px); then row 1: 5 equal inputs (gap 16); then row 2: 5 equal inputs (gap 16); then the full-width Message textarea (148 tall, submit inside, bottom-right).
Layout mobile: 393 × 1111, padding 40/16. Every field is full-width and stacked (gap ≈16–24), then the Message textarea (≈120 tall) with the submit button bottom-right inside.
Typography: heading → `.ns-text-web-h2-black` "Show us" + `.ns-text-web-h2-light` " your moves!" (42/48; mobile 32/38, all Black); tabs → `.ns-text-web-body-light` (18/27);
  labels → `.ns-text-web-eyebrow-black` (16/18, 900); input text → `.ns-text-web-body-light`; submit → `.ns-text-web-label-medium` (14).
Colors: heading → `--ns-color-text-primary` (#f6fcff); tabs → `--ns-color-text-accent` (#fde5ac); active underline → `--ns-color-text-link` / coral-300 (Figma #fd6a75; the About variant used honey; pick one per DS, `--ns-color-border-brand` recommended);
  labels → `--ns-color-text-primary`; input border → DS TextField default (Figma #bec8d8); focused/invalid field → `--ns-color-border-brand` (Figma #fd6a75 on Full Name); placeholder → `--ns-color-text-secondary`;
  submit → outlined, border `--ns-color-border-strong` (#f6fcff), text `--ns-color-text-primary`, radius 8, padding 8.
Content:
  heading: "**Show us** your moves!"
  tabs: ["New Project", "Join Our Team" (active), "General Inquiries"]
  Figma fields (row 1): Full Name ("Tom Riddle") · Email ("darklord87@gmail.com") · Phone ("slitherine.io") · Portfolio ("slitherine.io", upload icon) · Country ("slitherine.io", chevron-down)
  Figma fields (row 2): English Level ("B2") · Email · Phone · Portfolio · Country   ← row 2 duplicates row 1 except English Level, so it is a placeholder duplicate
  message: { label: "Message", placeholder: "Drop us some lines here..." }
  submit: { label: "Apply Now", icon: send }
  **Recommended final field set** (de-duplicated; the placeholders were wrong in Figma):
    - Full Name     — text, required, autocomplete=name, placeholder "Tom Riddle"
    - Email         — email, required, autocomplete=email, placeholder "darklord87@gmail.com"
    - Phone         — tel, required, autocomplete=tel, placeholder "+505 8888 8888" (Figma shows "slitherine.io", a copy-paste error)
    - Portfolio / CV — file upload (pdf, doc, docx; ≤ 10 MB), required. The upload icon (`upload`) is the end adornment; also accept a URL (LinkedIn/GitHub/portfolio) as a separate optional `Portfolio URL` text field
    - Country       — select (country list), required, chevron-down end icon
    - English Level — select: A1, A2, B1, B2, C1, C2 (Figma value "B2"), required
    - Message       — textarea, optional, placeholder "Drop us some lines here..."
    - hidden: `job_id`, `job_title` (from the current job), source page URL
  Submit target: the WP endpoint (e.g. Gravity Forms / CF7 REST / custom `/wp-json/ns/v1/apply`) or the ATS from the job's `apply_url` if set (then this form can be replaced by a redirect button).
  Success state (not designed): replace the form with "Thanks, {first name}! We received your application for {job title}. Our talent team will get back to you soon." (h3-light).
  Error state: DS TextField `error` prop under each field; on network failure, a message above the submit button in `--ns-color-text-error`.
Assets: none (icons: DS `upload` / `cloud-upload`, `chevron-down`, `send`).
Interactions/behaviour: the tabs are real tabs (`role="tablist"`); on a job page default to "Join Our Team". Switching to "New Project" / "General Inquiries" swaps the field set (see about.md §7).
  Client-side validation on blur; the submit button shows the DS Button `loading` state while sending. Honeypot + rate limiting server-side. Keyboard: the file input must be reachable and labelled.
DS components: `TextField` (Full Name, Email, Phone, Portfolio URL), `Icon`, `Button` (outlined, sm, icon `send`, `loading`). Missing in DS: `Select` (Country, English Level), `FileField` (upload), `TextArea`.
  Build these as local components mirroring TextField styling, and file a DS request.

---

## Page notes
- Everything is placeholder: hero title "Seniority + Role Name", Nike lorem body text, "Benefit 0X" cards, form values like "slitherine.io" in Phone/Country.
- The form's second row duplicates Email/Phone/Portfolio/Country; the spec de-duplicates it (see §3).
- Breadcrumb is placeholder. Generate Home › Careers › {title}.
- Hero has a flat overlay only (no fade to canvas like About/Careers heroes).
- No job metadata (location, type, seniority tags) is shown anywhere in the design even though the CPT has these fields. Recommend a Tag row in the hero (§1).
- No footer instance in the desktop frame; the mobile frame has one (`53:91862`). Use the shared footer.
- Add `JobPosting` JSON-LD (schema.org) from the CPT fields for SEO (title, description, datePosted, validThrough, employmentType, jobLocationType=TELECOMMUTE, applicantLocationRequirements, hiringOrganization).

---

## WordPress job fields (CPT `job`)
Post type `job`, slug base `/careers/`, `show_in_rest: true`, supports title, editor, thumbnail, excerpt. Suggested ACF field group "Job details":

| Field | Key | Type | Notes / used in |
| --- | --- | --- | --- |
| Title | `post_title` | core | Full display title, e.g. "Senior .NET Developer"; used in cards (careers §7) and SEO |
| Role name | `role_name` | text | Hero line 2, e.g. ".NET Developer" |
| Seniority | `seniority` | select: Intern, Junior, Mid, Senior, Lead, Principal | Hero line 1; tag |
| Department / discipline | `department` | taxonomy `job_department` (Engineering, QA, Design, PM, Salesforce, Data…) | Filters, card fallback image |
| Tech tags / skills | `skills` | taxonomy `job_skill` (non-hierarchical) | Tag row, filters |
| Location | `location` | text or taxonomy `job_location` (e.g. "LATAM", "Nicaragua", "Mexico", "Argentina") | Tag, JSON-LD applicantLocationRequirements |
| Work mode | `work_mode` | select: Remote, Hybrid, On-site (default Remote) | Tag, JSON-LD jobLocationType |
| Employment type | `employment_type` | select: Full-time, Part-time, Contract, Contractor (B2B) | Tag, JSON-LD employmentType |
| Hours / schedule | `hours` | text, e.g. "40 h/week, US Central overlap" | Tag |
| Time-zone overlap | `timezone_overlap` | select: Pacific, Mountain, Central, Eastern | Tag |
| English level required | `english_level` | select: A2–C2 | Tag; form default/validation |
| Salary range | `salary_min`, `salary_max`, `salary_currency`, `salary_period` | number/number/select/select | Optional; JSON-LD baseSalary |
| Featured image | `_thumbnail_id` | core | Job card image (careers §7), fallback `/assets/careers/job-card-placeholder.jpg` |
| Hero image | `hero_image` | image | Optional override of `/assets/job/hero-bg.jpg` |
| Excerpt / summary | `post_excerpt` | core | Meta description, card subtitle (optional) |
| About the company | `about_company` | WYSIWYG, default from Options page | §2 "About Nicasource" |
| Job description | `post_content` / `description` | WYSIWYG | §2 "Job Description" |
| Responsibilities | `responsibilities` | repeater {text} or WYSIWYG list | §2 "Role Expectations" |
| Requirements | `requirements` | repeater {text} | Not in design; recommended extra block "Requirements" (same row layout) |
| Nice to have | `nice_to_have` | repeater {text} | Optional extra block |
| Benefits intro | `benefits_intro` | textarea | §2 "Benefits" paragraph |
| Benefits cards | `benefits` | repeater {title, body}, default from Options page | §2 cards (3 shown) |
| Apply URL | `apply_url` | url | If set (external ATS), the CTA links there instead of the on-page form |
| Status | `status` | select: Open, Paused, Closed | Hide closed jobs from careers list; show "This position is closed" on detail |
| Date posted | `post_date` | core | JSON-LD datePosted |
| Valid through | `valid_through` | date | JSON-LD validThrough; auto-hide after |
| Featured / order | `menu_order`, `is_featured` | core / true-false | Card ordering on careers |
| Application form recipients | `notify_emails` | text (comma list) | Where applications for this job are sent (optional, default HR inbox) |
