# STYLE — games.virtuallaunch.pro (GVLP)

Last updated: 2026-04-04

---

## 1. Stack

- **CSS approach**: CSS Modules (`.module.css` per page/component) + global tokens in `app/globals.css`
- **Fonts**: Outfit (UI), JetBrains Mono (code/mono)
- **What is NOT used**: Tailwind, styled-components, CSS-in-JS

## 2. Design Tokens (`app/globals.css :root`)

### Colors
| Token | Value | Usage |
|---|---|---|
| `--brand-red` | `#c41e3a` | Primary brand, CTAs |
| `--brand-pink` | `#e8446d` | Accent, hover states |
| `--brand-gold` | `#ffd700` | Highlights, badges, rewards |
| `--bg` | `#1a0a10` | Page background (dark) |
| `--surface` | `#2a0f1e` | Card backgrounds |
| `--surface2` | `#3a1528` | Elevated surfaces |
| `--text` | `#f0e6ea` | Primary text |
| `--text-muted` | `#9a7a85` | Secondary text |

### Spacing & Radius
| Token | Value |
|---|---|
| `--radius` | `12px` |
| `--radius-lg` | `20px` |

### Typography
- Body: `'Outfit', sans-serif` — weights 300–800
- Mono: `'JetBrains Mono', monospace` — weights 400, 500, 700
- Line height: `1.6`

## 3. Animations (globals.css)

| Keyframe | Purpose |
|---|---|
| `shimmer` | Background gradient sweep |
| `float` | Gentle vertical bounce |
| `slide-up` | Fade-in from below |
| `pulse-glow` | Gold glow pulse for rewards |

## 4. Layout Patterns

- Dark theme throughout — all pages use `var(--bg)` base
- Cards use `var(--surface)` with `var(--radius)` or `var(--radius-lg)`
- Max content width varies by page (no global max-width token)
- Mobile: `overflow-x: hidden` on body

## 5. Page File Pattern

Each page follows:
```
app/{route}/
  page.tsx            — page component
  page.module.css     — scoped styles
```

Dashboard sub-components:
```
app/dashboard/components/
  {Component}.tsx
  {Component}.module.css
```

## 6. Self-Check

Before delivering any styled page:
- [ ] Uses CSS Module, not inline styles or Tailwind
- [ ] References `var(--token)` for colors, radius — no hardcoded hex
- [ ] Dark theme compatible (light text on dark bg)
- [ ] Font family inherited from body (Outfit) unless mono needed
- [ ] Animations use existing keyframes where applicable
