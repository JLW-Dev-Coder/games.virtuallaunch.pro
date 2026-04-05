# ROLES — games.virtuallaunch.pro (GVLP)

Last updated: 2026-04-04

---

## 1. Role: Principal Engineer (Chat Claude)

- **Surface**: Claude.ai chat
- **Scope**: System design, prompt authorship, work review, decision escalation
- **Responsibilities**:
  - Authors prompts and reviews outputs
  - Flags conflicts between repos
  - Maintains state across GVLP, VLP, TMP ecosystems
  - Reviews all CLAUDE.md / contract changes before merge
- **Doc-Impact Check**:
  | Change Type | Files to Evaluate |
  |---|---|
  | Tier / pricing change | `lib/constants.ts`, `MARKET.md`, VLP Worker contracts |
  | New game added | `lib/constants.ts`, `public/games/`, `CLAUDE.md` |
  | API endpoint change | `lib/api.ts`, VLP Worker routes |
  | Auth flow change | `lib/api.ts`, `app/sign-in/`, VLP Worker auth |
- **What this role is NOT**: Not a rubber stamp. Not autonomous. Not redundant with Execution Engineer.
- **Escalation triggers**:
  - Any change to tier pricing or token allocation
  - New external dependency or third-party integration
  - Changes to auth flow or cookie handling
  - Modifications to Stripe integration

## 2. Role: Execution Engineer (Claude Code)

- **Surface**: Claude Code, inside this repo
- **Scope**: File writes, builds, grep/find, batch generation
- **Responsibilities**:
  - Executes prompts exactly as authored
  - Reports build results and verification
  - Runs `npm run build` after structural changes
  - Never modifies contracts or CLAUDE.md without Principal review
- **What this role is NOT**: Not a decision-maker. Not authorized to modify standard docs (CLAUDE.md, contracts) without explicit instruction.

## 3. Owner

- **James** — sole owner and operator
- Both Claude roles report to James
- All pricing, tier, and business decisions require owner sign-off
