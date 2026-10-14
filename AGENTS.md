# Agent instructions

For Codex, Cursor, Copilot, Gemini and any other coding agent working in this repo.

1. **Read [AI-GUIDE.md](AI-GUIDE.md) first.** It is the full contract: hard rules R1–R14, React rules
   K1–K16 with the 7-point pre-emit checklist, token decision tables and the component API.
2. **Then read [CLAUDE.md](CLAUDE.md).** Despite the name it is the short orientation for every agent:
   what the repo is, the non-negotiables, how to change a token or add a component, and the layout.
3. Components follow [docs/component-contract.md](docs/component-contract.md). The workflow for
   branches, PRs and releases is in [CONTRIBUTING.md](CONTRIBUTING.md) › AI agents.

## Non-negotiables

- **Never commit to or push to `main`.** Create a branch (`feature/`, `fix/`, `chore/`, `tokens/`,
  `docs/`), push it, open a PR. Never use `--no-verify`, never set `NS_DS_ALLOW_MAIN`.
- Semantic tokens only; no raw hex/px, no primitives, no `--ns-palette-*` outside Logo/NSMark.
- Everything works in the `light`, `dark` and `web-2025` themes and meets WCAG 2.1 AA.
- Never hand-edit generated files (`tokens/**`, `src/tokens/generated.ts`, `src/icons/generated.ts`).
- `npm run verify` passes before you open a PR.
