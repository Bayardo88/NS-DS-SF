## What and why

<!-- One or two sentences. What changed, and why. -->

**Figma:** <!-- link to the component/variable in Design System V2 (JdINnstfRHeLRPZjeEla4U), or "n/a" -->
**Type:** <!-- component · tokens · docs · tooling · fix -->

## Screenshots: all three themes

<!-- Required for any visual change. Use the Storybook Theme toolbar. Delete this section for non-visual PRs. -->

| Light | Dark | Web 2025 |
| --- | --- | --- |
| <!-- img --> | <!-- img --> | <!-- img --> |

## Checks

- [ ] `npm run verify` passes (gen:tokens, typecheck, lint:tokens, ESLint, tests)
- [ ] `npm run build` and `npm run build-storybook` pass
- [ ] Added a line under **Unreleased** in `CHANGELOG.md` (skip for docs-only / tooling-only changes)

## Token contract (AI-GUIDE.md §2)

- [ ] Semantic tokens only: no primitives (`--ns-color-blue-600`), no `--ns-palette-*` outside Logo/NSMark
- [ ] No raw hex, `rgb()`, or px (except `0` / `1px` hairlines / media queries)
- [ ] Token changes came from Figma (`tokens/figma/*` re-exported, then `npm run build:tokens`); no hand edits to generated files
- [ ] Looks right and passes the a11y addon in **Light, Dark and Web 2025**
- [ ] Color never carries meaning alone (icon or text alongside)

## Component contract (docs/component-contract.md)

- [ ] `forwardRef`, native props + `...rest`, `className` merged with `cx()`, exported `<Name>Props` with JSDoc
- [ ] Prop names and values match the Figma docs panel; interaction states are CSS, not props
- [ ] Visible focus ring via `:focus-visible` (outline + offset), keyboard behavior tested
- [ ] Tests: axe, ref/className/rest passthrough, variants, keyboard, disabled/loading
- [ ] Stories: `Default` + one per Figma variant axis

## React checklist (AI-GUIDE.md §3)

- [ ] 1. Every component is defined at module top level (none nested)
- [ ] 2. Hooks are unconditional and at the top level
- [ ] 3. Props and state are never mutated
- [ ] 4. List keys are stable ids (no index for reorderable lists, no `Math.random()`)
- [ ] 5. No derived state (computed during render instead)
- [ ] 6. Handlers passed as references (`onClick={handleClick}`), named `on*` / `handle*`
- [ ] 7. Effects only sync with external systems, have complete deps and a cleanup

## Breaking changes

<!-- "None", or what consumers must change. A prop rename or removal is breaking. -->
