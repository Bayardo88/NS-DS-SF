---
name: ns-website-screens
description: Design and build new screens, page variants and explorations of the NicaSource 2025 marketing website on the real code — the @nicasource/ds design system (web-2025 theme) and the headless-WordPress + React reference in website/. Use whenever someone asks to create, mock up, prototype, redesign, A/B or explore a NicaSource website page or section (home, services, results/case studies, about, careers/jobs, insights/blog, contact, landing pages, campaign pages), or pastes a frame from the NS_2025_website Figma file.
---

# NicaSource website screens

You build NicaSource website screens by **composing existing sections as WordPress content JSON** and
rendering them through the real frontend. You do not draw mockups from scratch or write one-off HTML.

## Read first (every time)
1. `website/DESIGN.md`: voice, tokens, type, layout, the **section catalog (§6)** with every prop, the
   behaviour rules and the recipe. It is the contract.
2. `AI-GUIDE.md` §2–§3: the hard rules (semantic tokens only, no raw hex or px, focus ring, AA) and the
   React rules.
3. Skim one or two existing pages in `website/content/pages/*.json` to see real compositions.

## Workflow
1. **Brief → outline.** Restate the screen's job, audience and single conversion. Outline it as an
   ordered list of section types from DESIGN.md §6 and check it against the rhythm rules (§5). For
   explorations, propose 2–3 distinct directions (for example "proof-led", "visual-led",
   "short-form") and say how each differs in composition, not only in copy.
2. **Write content** in the NicaSource voice (DESIGN.md §1). Use `**bold**` for emphasis words and
   `\n` for deliberate breaks. Reuse images from `website/frontend/public/assets/**`. List the folder
   before choosing.
3. **Create the page file:** `website/content/pages/NN-<slug>.json`:
   ```json
   { "slug": "home-v2", "parent": "explore", "title": "Home v2 (proof-led)", "sections": [ { "type": "hero", "...": "..." } ] }
   ```
   Use `parent: "explore"` for explorations (URL `/explore/<slug>`), so production pages stay untouched.
   Posts, jobs and case studies go in `website/content/{posts,jobs,case-studies}/`.
4. **New section, only if no section + props can express it.** Add
   `website/frontend/src/sections/<group>/<Name>.tsx` + `<Name>.css`, register the type in that group's
   `index.ts` (use `sections/explore/` for experimental ones), and add a row to DESIGN.md §6. Rules: DS
   components from `@nicasource/ds`, `.ns-text-web-*` classes, `--ns-*` semantic tokens, the
   `--site-*` layout vars, a `:focus-visible` ring, reduced-motion support, and stacking at ≤767px.
   Prefer adding an optional prop to an existing section over a near-duplicate section.
5. **Run and verify.** Start the servers with the preview tool (launch configs `website-wordpress` and
   `website`, or `npm run wp` / `npm run dev` in `website/`). Open `http://localhost:5173/<path>`. New
   JSON renders immediately from the seed fallback; restart WordPress to import it into wp-admin.
   Check:
   - desktop 1512 wide and mobile 393 wide (full-page tip: a 1512×5600 viewport, then shift `main`
     with a negative `margin-top`)
   - no console errors and no horizontal scroll
   - AA contrast, keyboard focus visible
   - `cd website && npx tsc --noEmit`
6. **Hand back** the URL(s), a screenshot per breakpoint, the section outline, and any new section or
   prop you added (with why). For multiple directions, give one URL each.

## Guardrails
- Never edit `tokens/**`, `src/**` (the DS package) or generated files to make a screen work. A missing
  token is a Figma request (R9).
- Never hard-code colors, font sizes or px. Never put white text on coral. Never use a `<div onClick>`.
- Collections (posts, jobs, case studies) come from WordPress through `fetchCollection`, never from
  hard-coded cards.
- Never commit to `main`. Work on a `feature/…` branch (repo CLAUDE.md).
- Placeholder copy must read as real, on-brand copy unless the user asks for lorem.
