# Component contract

Every component in `src/components/` follows this contract. Reviewers reject a PR that breaks it,
and `npm run verify` catches most of it automatically.

## Files

```
src/components/<Name>/
├── <Name>.tsx          component + exported <Name>Props
├── <Name>.css          styles (bundled into dist/styles.css; never imported from TS)
├── <Name>.test.tsx     tests
├── <Name>.stories.tsx  Storybook stories
└── index.ts            export { <Name>, type <Name>Props } from './<Name>.js';
```

Import paths inside `src/` use the `.js` extension (`'../../utils/cx.js'`) so the emitted ESM resolves.

## API

1. **`forwardRef`** to the root DOM element, and set `displayName` implicitly by naming the inner function.
2. **Extend the native props** of the root element (`ButtonHTMLAttributes<HTMLButtonElement>` and so on),
   `Omit` the ones you redefine, and spread `...rest` onto the root.
3. **Merge `className`** with `cx('ns-<name>', modifiers…, className)`. Never replace it.
4. **Export the props type** as `<Name>Props`, and document every prop with JSDoc. Storybook autodocs reads it.
5. **Prop names come from the Figma docs panel** (`variant`, `size`, `tone`, `color`…). Figma variant
   values map to lowercase kebab code values: `S/M/L` → `sm/md/lg`, `On dark` → `on-dark`.
6. **Interaction states are not props.** Hover, Focused, Pressed come from CSS (`:hover`, `:focus-visible`,
   `:active`). Disabled is the native `disabled` attribute. Loading is a `loading` prop that sets
   `aria-busy` and blocks clicks.
7. **`asChild`** on anything that can be a link or a button (Button, IconButton, NavLink), using
   `Slot` from `src/utils`, so `<Button asChild><a href="/contact">…</a></Button>` renders one `<a>`.
8. **Icons** are passed by name (`icon="arrow-right"`, typed as `IconName`) and rendered with `<Icon>`.

## React rules (from react.dev, enforced by ESLint where possible)

- Pure render: no mutation of props, state or module variables during render.
- Define components at module top level; never declare a component inside another component.
- Hooks at the top level only, never in conditions, loops or callbacks.
- No derived state: compute values during render instead of syncing them with `useState` + `useEffect`.
- `useEffect` is only for syncing with something outside React. Every effect has complete dependencies and
  a cleanup function when it subscribes, listens, or times anything.
- Event props are named `on<Event>`, and internal handlers are named `handle<Event>`. Pass references
  (`onClick={handleClick}`), not calls.
- List keys come from stable data (`key={link.href}`), never from the index for reorderable lists and
  never from `Math.random()`.
- Controlled + uncontrolled: when a component owns state (e.g. a mobile menu's `open`), accept
  `open` / `defaultOpen` / `onOpenChange`.

## Styling

- Class names: `ns-<name>` for the block, `ns-<name>--<modifier>` for variants, `ns-<name>__<part>`
  for parts. The `ns-text-*` prefix belongs to the text-style classes, so don't use it for components.
- **Semantic tokens only**: `--ns-color-{bg,text,border,icon}-*`, `--ns-spacing-*`, `--ns-radius-*`,
  `--ns-border-width-*`, `--ns-size-*`, `--ns-font-*`, `--ns-line-height-*`, `--ns-letter-spacing-*`,
  `--ns-elevation-*`. No raw hex, `rgb()`, or px values, except `0`, `1px` hairlines, and the
  `100%`/`50%` family. `npm run lint:tokens` enforces this.
- **Never use primitives** (`--ns-color-red-500`, `--ns-color-night-900`) or brand palettes
  (`--ns-palette-*`) in a component. The one exception is `Logo` / `NSMark`, whose colors are fixed
  brand colors by design.
- Focus: `:focus-visible { outline: var(--ns-border-width-medium) solid var(--ns-color-border-focus); outline-offset: var(--ns-spacing-2); }`.
  Never remove an outline without replacing it.
- Hover and pressed colors come from `*-hover` / `*-pressed` tokens, never `filter` or `opacity`.
- Respect `prefers-reduced-motion` (base.css handles transitions on `ns-` classes).
- Must look correct in all three themes: `light`, `dark`, `web-2025`.

## Tests (`<Name>.test.tsx`)

Minimum for every component:

1. Renders with default props and has **no axe violations** (`checkA11y` from `src/test/render.tsx`).
2. Forwards `ref` to the root element, merges `className`, and passes through `...rest` (e.g. `data-testid`).
3. Each variant/size prop produces its modifier class.
4. Keyboard behavior for anything interactive (Tab reaches it; Enter/Space activate; Escape closes
   overlays), using `@testing-library/user-event`.
5. Disabled / loading block the `on*` handler.

## Stories (`<Name>.stories.tsx`)

- CSF3, `title: 'Components/<Name>'` (`'Site/<Name>'` for SiteHeader and SiteFooter), `component`, `args`,
  `argTypes` with `control: 'select'` for unions.
- One `Default` story driven by controls, then one story per Figma variant axis (e.g. `Variants`, `Sizes`,
  `States`) that lays out every option side by side, matching the Figma page.
- `parameters.docs.description.component` is the Figma component description, rewritten for developers.
- Stories must pass the a11y addon in every theme.
