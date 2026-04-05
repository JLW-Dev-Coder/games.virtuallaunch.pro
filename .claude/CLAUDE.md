# GVLP — games.virtuallaunch.pro

> Gamified engagement platform for tax professionals  
> Domain: `games.virtuallaunch.pro`  
> Last updated: 2026-04-04

---

## 1. System Definition

**What it is**: Next.js 16 App Router frontend deployed to Cloudflare Pages. Operators (tax pros) sign in, choose a tier, and get embed codes for interactive mini-games they place on their client-facing websites.

**What it is NOT**: This repo has no backend. No Worker routes. No database. No Stripe webhook handling. All API calls go to `api.virtuallaunch.pro` (VLP Worker, separate repo).

**Audience**: Tax professionals (operators) who embed games; their clients (visitors) who play.

**Stack**:
- Next.js 16 (App Router) / React 19
- Cloudflare Pages (`pages_build_output_dir = "out"`)
- CSS Modules + global tokens (`app/globals.css`)
- Stripe checkout via VLP API (secrets in Cloudflare dashboard, not wrangler.toml)

## 2. Hard Constraints

- **No backend changes in this repo** — all API routes live in VLP Worker
- **Never invent endpoints** — only call routes defined in `lib/api.ts`
- **Never hardcode API URLs** — use `API_BASE` from `lib/api.ts`
- **Never commit secrets** — Stripe keys live in Cloudflare dashboard
- **Run `npm run build` after any structural change**

## 3. Migration Status

- Frontend: ✅ Next.js 16 App Router (2026-03-29)
- Backend: ✅ 8 routes live in VLP Worker (api.virtuallaunch.pro)
- Legacy Worker: ✅ None existed — greenfield build
- wrangler.toml: ✅ Pages-only configuration (no Worker binding)
- Auth: Uses VLP shared auth via `credentials: 'include'` (cookie-based, cookie set by VLP Worker)

## 4. Tier Configuration (`lib/constants.ts`)

| Tier       | Tokens | Games | Monthly |
|------------|--------|-------|---------|
| starter    | 100    | 1     | $0      |
| apprentice | 500    | 3     | $9      |
| strategist | 1500   | 6     | $19     |
| navigator  | 5000   | 9     | $39     |

## 5. Game Unlock Rules (`lib/constants.ts`)

Games unlock progressively by tier. All 9 games:

| Slug                  | Name                | Unlocked at   |
|-----------------------|---------------------|---------------|
| tax-trivia            | Tax Trivia          | starter       |
| tax-match-mania       | Tax Match Mania     | apprentice    |
| tax-spin-wheel        | Tax Spin Wheel      | apprentice    |
| tax-word-search       | Tax Word Search     | strategist    |
| irs-fact-or-fiction   | IRS Fact or Fiction | strategist    |
| capital-gains-climb   | Capital Gains Climb | strategist    |
| deduction-dash        | Deduction Dash      | navigator     |
| refund-rush           | Refund Rush         | navigator     |
| audit-escape-room     | Audit Escape Room   | navigator     |

Each tier's unlock list is cumulative (navigator gets all 9).

## 6. App Structure
```
app/
  page.tsx          — marketing home
  layout.tsx        — root layout
  affiliate/        — affiliate dashboard
  dashboard/        — operator dashboard
  embed/            — embed snippet page
  games/            — game player page
  onboarding/       — operator onboarding flow
  reviews/          — reviews page
  sign-in/          — auth (magic link + Google OAuth via VLP)
  success/          — post-payment success
  support/          — support page
lib/
  constants.ts      — GVLP_TIERS, GVLP_GAME_UNLOCK, GAME_SLUGS, GAME_META
  api.ts            — API client (calls api.virtuallaunch.pro)
  visitor.ts        — visitor/session utilities
components/
  AuthGuard.tsx     — route auth protection
  Nav.tsx / Footer.tsx
public/games/       — static legacy game HTML files (9 games)
```

## 7. External Interfaces

| Dependency | URL | Ownership |
|---|---|---|
| VLP API | `api.virtuallaunch.pro` | VLP repo (separate) |
| Stripe | Via VLP API checkout endpoint | VLP Worker |
| Auth | VLP `/v1/auth/*` routes | VLP Worker |
| Affiliates | VLP `/v1/affiliates/*` routes | VLP Worker |

## 8. Secrets
Set via Cloudflare dashboard or `wrangler secret put`:
- `STRIPE_SECRET_KEY` (shared with VLP)
- `STRIPE_WEBHOOK_SECRET` (shared with VLP)

## 9. Post-Task Requirements

After every task:
1. Run `npm run build` — must pass
2. Verify no hardcoded API URLs outside `lib/api.ts`
3. Check that new pages follow CSS Module pattern (see `.claude/STYLE.md`)

## 10. Related Systems

| Repo | Purpose | Boundary |
|---|---|---|
| virtuallaunch.pro | Parent platform, API, Worker | GVLP calls its API but never modifies it |
| taxmonitor.pro | Sibling SaaS product | Cross-sell target, no code dependency |
| transcript.taxmonitor.pro | Sibling tool | No dependency |
