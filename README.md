# Games VLP (GVLP)

> **games.virtuallaunch.pro**
> Gamified tax education subscriptions for tax professionals

---

## 1. System Overview

**What it is:** JavaScript embed games that tax pros rent for their websites. Operators sign in, pick a subscription tier, and get embed codes for interactive mini-games to place on their client-facing sites.

**What it is NOT:** This repo has no backend, no Worker routes, no database, and no Stripe webhook handling. All API calls go to the VLP Worker at `api.virtuallaunch.pro` (separate repo).

---

## 2. Architecture

- **Framework:** Next.js 16, App Router, React 19
- **Build output:** Static export to `out/`
- **Hosting:** Cloudflare Pages
- **API client:** `lib/api.ts` → `api.virtuallaunch.pro`
- **Styling:** CSS Modules + global tokens (`app/globals.css`)
- **Auth:** Cookie-based via VLP Worker (`credentials: 'include'`)

---

## 3. Responsibilities

| Owner | Owns |
|---|---|
| **This repo (GVLP)** | Frontend pages, game embed JS, static game HTML, CSS, marketing |
| **VLP Worker** | Auth, billing, tokens, game data, Stripe, affiliates |

---

## 4. Repo Structure

```
app/
  layout.tsx                — root layout
  page.tsx                  — marketing home
  affiliate/                — affiliate dashboard
  dashboard/                — operator dashboard
    components/             — EmbedCode, Overview, Settings, TokenUsage, Upgrade
  embed/                    — embed snippet page
  games/                    — game player page
  onboarding/               — operator onboarding flow
  reviews/                  — reviews page
  sign-in/                  — auth (magic link + Google OAuth via VLP)
  success/                  — post-payment success
  support/                  — support page
components/
  AuthGuard.tsx             — route auth protection
  Nav.tsx / Footer.tsx      — shared navigation
lib/
  api.ts                    — API client (calls api.virtuallaunch.pro)
  constants.ts              — tiers, game unlocks, game metadata
  visitor.ts                — visitor/session utilities
public/games/
  *.html                    — 9 static game HTML files
  js/*.js                   — 9 game JS modules (embeddable)
contracts/                  — local contract snapshots (source of truth in VLP repo)
```

---

## 5. Core Workflows

<!-- Future -->

---

## 6. Data Contracts

Canonical contracts live in the VLP repo under `contracts/registries/gvlp-registry.json`. Local copies in `contracts/` are snapshots for reference only.

---

## 7. Setup / Local Development

```bash
npm install
npm run dev
```

---

## 8. Commands

| Command | Purpose |
|---|---|
| `npm run build` | Static export to `out/` |
| `npm run dev` | Local dev server |

---

## 9. Environment / Config

No environment variables are required in this repo. Stripe keys and secrets are set in the Cloudflare dashboard and used by the VLP Worker only.

---

## 10. Deployment

- **Platform:** Cloudflare Pages
- **Build command:** `npm run build`
- **Output directory:** `out/`
- **Type:** Static export (no server-side rendering)

---

## 11. Constraints

- No backend in this repo — all API routes live in the VLP Worker
- No Worker bindings — this is a Pages-only deployment
- No contracts authored here — canonical contracts live in the VLP repo
- All API calls go through `lib/api.ts` using `API_BASE`

---

## 12. Related Systems

| System | Domain | Role |
|---|---|---|
| VLP (Worker + contracts) | `api.virtuallaunch.pro` | Backend API, auth, billing, tokens |
| TMP (directory) | `taxmonitor.pro` | Sibling SaaS — cross-sell target |
| TTMP (transcript tools) | `transcript.taxmonitor.pro` | Sibling tool — no dependency |

---

## 13. Glossary

| Term | Meaning |
|---|---|
| `vlp_session` | Auth cookie set by VLP Worker |
| VLP Worker | Single backend for all VLP products (`api.virtuallaunch.pro`) |
| Operator | Tax professional who subscribes and embeds games |
| Visitor | End user (taxpayer) who plays games on operator's site |
