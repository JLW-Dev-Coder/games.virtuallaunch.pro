# GVLP — games.virtuallaunch.pro

## Project Overview
Tax-themed game platform for tax professionals. Operators embed games on their client-facing sites via a JavaScript embed snippet. Built as Next.js 15 App Router deployed to Cloudflare Pages.

Backend API lives in the VLP Worker at `api.virtuallaunch.pro` (separate repo). This repo is frontend-only.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Deploy**: Cloudflare Pages (`pages_build_output_dir = ".next"`)
- **Runtime**: React 19
- **Stripe**: Payment processing (secrets injected via Cloudflare dashboard, not wrangler.toml)

## Migration Status
- Frontend: ✅ Next.js 15 App Router (2026-03-29)
- Backend: ✅ 8 routes live in VLP Worker (api.virtuallaunch.pro)
- Legacy Worker: ✅ None existed — greenfield build
- wrangler.toml: ✅ Pages-only configuration

## Tier Configuration (`lib/constants.ts`)

| Tier       | Tokens | Games | Monthly |
|------------|--------|-------|---------|
| starter    | 100    | 1     | $0      |
| apprentice | 500    | 3     | $9      |
| strategist | 1500   | 6     | $19     |
| navigator  | 5000   | 9     | $39     |

## Game Unlock Rules (`lib/constants.ts`)

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

## App Structure
```
app/
  page.tsx          — marketing home
  layout.tsx        — root layout
  dashboard/        — operator dashboard
  embed/            — embed snippet page
  games/            — game player page
  onboarding/       — operator onboarding flow
  reviews/          — reviews page
  sign-in/          — auth
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

## Secrets
Set via Cloudflare dashboard or `wrangler secret put`:
- `STRIPE_SECRET_KEY` (shared with VLP)
- `STRIPE_WEBHOOK_SECRET` (shared with VLP)
