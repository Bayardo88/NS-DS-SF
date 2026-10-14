# Branch protection for `main`

Local hooks (`.githooks/`) and the Claude Code hook (`.claude/settings.json`) stop most mistakes, but
they can be skipped. GitHub branch protection is the guard that can't be. Apply it once, after the
first push of `main` and after CI has run at least once (GitHub only offers a status check it has seen).

## Settings

Repository **Settings → Branches → Add branch protection rule**, pattern `main`:

| Setting | Value | Why |
| --- | --- | --- |
| Require a pull request before merging | On | No direct pushes |
| Required approving reviews | 1 | Every change is reviewed |
| Dismiss stale pull request approvals when new commits are pushed | On | Approval covers the final code |
| Require review from Code Owners | On | `.github/CODEOWNERS` owns tokens, styles and guardrails |
| Require status checks to pass before merging | On, check **`verify`** (from `.github/workflows/ci.yml`) | Typecheck, token lint, ESLint, tests, build, Storybook build |
| Require branches to be up to date before merging | On | The check ran against current `main` |
| Require conversation resolution before merging | On | Review comments get answered |
| Do not allow bypassing the above settings (include administrators) | On | Applies to the owner too |
| Allow force pushes | Off | History on `main` is never rewritten |
| Allow deletions | Off | `main` can't be deleted |

## Apply with the GitHub CLI

Needs `gh auth login` with admin rights on the repo.

```bash
gh api -X PUT repos/Bayardo88/NS-DS-SF/branches/main/protection \
  -H "Accept: application/vnd.github+json" \
  --input - <<'JSON'
{
  "required_status_checks": {
    "strict": true,
    "checks": [{ "context": "verify" }]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true
  },
  "restrictions": null,
  "required_conversation_resolution": true,
  "allow_force_pushes": false,
  "allow_deletions": false
}
JSON
```

Check it:

```bash
gh api repos/Bayardo88/NS-DS-SF/branches/main/protection \
  --jq '{reviews: .required_pull_request_reviews.required_approving_review_count, codeowners: .required_pull_request_reviews.require_code_owner_reviews, checks: [.required_status_checks.checks[].context], admins: .enforce_admins.enabled, force_push: .allow_force_pushes.enabled, deletions: .allow_deletions.enabled}'
```

## One-person team caveat

GitHub never lets the author approve their own PR. With `@Bayardo88` as the only code owner and
administrators included, nobody else can approve Bayardo88's PRs, so they can't merge. Pick one:

- Add a second code owner (a person or a team) to `.github/CODEOWNERS` and as a collaborator. Recommended.
- Or, while working alone, set `"enforce_admins": false` so the owner can merge their own PR with the
  admin override. Pushes still need a PR and the `verify` check for everyone else.

## Also set

- **Settings → General → Pull Requests:** allow squash merging; turn on "Automatically delete head branches".
- **Settings → Pages → Build and deployment → Source: GitHub Actions**, for `.github/workflows/storybook-pages.yml`.
