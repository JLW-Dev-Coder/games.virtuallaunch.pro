# games.virtuallaunch.pro

A collection of self-contained browser mini-games for tax professionals. Each game is a standalone **JS module** that can be embedded on any page via a simple `<script>` tag and connects to your Worker backend for **token balances, payouts, and tracking**.

These games are designed for **tax pros to embed on their websites**, boosting engagement, SEO visibility, and client interaction while gamifying tax learning.

---

## 1. Game JS Files

Each game lives in its own file, e.g., `tax-spin-wheel.js`.

**Responsibilities:**

1. Render the interactive game (spin wheel, trivia, puzzle, etc.)
2. Animate gameplay (e.g., spinning the wheel)
3. Deduct tokens through your Worker (`/api/use-tokens`)
4. Display results or prizes in a pop-up
5. Update scoreboard (tokens, wins, prizes collected)
6. Optional: “Learn More” links for additional info

**Embedding Example:**

```html
<script src="https://games.virtuallaunch.pro/games/tax-spin-wheel.js" data-client-id="CLIENT123"></script>
```


```
│   README.md
│   wrangler.toml
│   
├───contracts
│       onboarding.contract.json
│       price-free.json
│       price-tier-1.json
│       price-tier-2.json
│       price-tier-3.json
│       product.json
│       token.contract.json
│
├───games
├───public
│   │   index.html
│   │   onboarding.html
│   │   operator.html
│   │   reviews.html
│   │   success.html
│   │   support.html
│   │
│   └───games
│       │   audit-escape-room.html
│       │   capital-gains-climb.html
│       │   deduction-dash.html
│       │   irs-fact-or-fiction.html
│       │   refund-rush.html
│       │   tax-match-mania.html
│       │   tax-spin-wheel.html
│       │   tax-trivia.html
│       │   tax-word-search.html
│       │
│       └───js
│               audit-escape-room.js
│               capital-gains-climb.js
│               deduction-dash.js
│               irs-fact-or-fiction.js
│               refund-rush.js
│               tax-match-mania.js
│               tax-spin-wheel.js
│               tax-trivia.js
│               tax-word-search.js
│
└───workers
    └───src


```
---

## 2. Token Integration

Games read `data-client-id` from the script tag. Example usage:

```javascript
fetch('https://games.virtuallaunch.pro/api/use-tokens', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({
    clientId: 'CLIENT123',
    visitorId: 'VISITOR456',
    tokensToUse: 5
  })
})
.then(res => res.json())
.then(data => {
  if(data.ok){
    startGame(); // start animation/game logic
  } else {
    alert('Not enough tokens! Buy more.');
  }
});
```

Your Worker handles **token deduction** and updates KV storage.

---

## 3. Scoreboard / Token Display

* Each game maintains its own scoreboard:

  * Tokens remaining
  * Wins or prizes collected
* Optional: Persist visitor session with Worker so balances stay accurate on reload

---

## 4. Worker Responsibilities

* **POST /api/use-tokens** – validate, deduct tokens, return updated balance
* **POST /api/purchase-tokens** – called after Stripe checkout to add tokens
* **POST /api/create-checkout-session** – create Stripe Checkout session
* **POST /api/webhook** – listen for Stripe payment success events

---

## 5. Stripe Integration

**Frontend Flow:**

```javascript
fetch('https://games.virtuallaunch.pro/api/create-checkout-session', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({
    clientId: 'CLIENT123',
    visitorId: 'VISITOR456',
    tokens: 50
  })
})
.then(res => res.json())
.then(data => {
  if(data.url){
    window.location.href = data.url;
  }
});
```

**Worker Flow:**

* Creates Checkout session with Stripe for token purchases
* Updates visitor token balance on Stripe payment success

---

## 6. Pricing Tiers

| Tier Name                   | Price  | What’s Included                                                                              |
| --------------------------- | ------ | -------------------------------------------------------------------------------------------- |
| **Tax Play Starter**        | Free   | 1 game, 50 tokens/month                                                                      |
| **Tax Play Apprentice**     | $9/mo  | 3 games, 500 tokens/month                                                                    |
| **Tax Play Strategist**     | $19/mo | 5 games, 1,500 tokens/month                                                                  |
| **Tax Play Navigator** | $39/mo | All games, 750 token/month |


**Stripe Pricing Example (cents for Stripe API):**

```json
{
  "products": [
    {"name":"Starter Spin","prices":[{"unit_amount":0,"currency":"usd","recurring":{"interval":"month"}}]},
    {"name":"Tax Apprentice","prices":[{"unit_amount":900,"currency":"usd","recurring":{"interval":"month"}}]},
    {"name":"Tax Strategist","prices":[{"unit_amount":1900,"currency":"usd","recurring":{"interval":"month"}}]},
    {"name":"Firm Navigator","prices":[{"unit_amount":3900,"currency":"usd","recurring":{"interval":"month"}}]}
  ]
}
```

---

## 7. Adding New Games

* Add a new JS module to `games/`
* Register in `games/registry.js` (optional)
* Use the same token + Stripe pattern
* Keep each module **self-contained** for easy embedding

---

## 8. Marketable Features / Slogans (for tax pros)

1. **Gamify Tax Learning** – Interactive, educational mini-games for clients
2. **Boost Taxpayer Engagement** – Encourage repeat visits and engagement on your site
3. **Increase Tax Practice SEO Visibility** – Backlinks and embeds drive traffic and search rankings
4. **Flexible Access, Pay as You Grow** – Free tier, individual, and firm-level subscriptions
5. **Interactive Tax Fun Anywhere** – Fully browser-based, mobile-friendly, drop-in modules

---

## 9. Getting Started

1. Include the game script in your page
2. Set `data-client-id` for the client
3. Make sure Worker backend routes `/api/use-tokens`, `/api/purchase-tokens`, `/api/create-checkout-session`, `/api/webhook` are live
4. Launch instantly with full token tracking, Stripe purchases, and scoreboard support

---

Games are **drop-in**, fully interactive, mobile-friendly, and designed to help tax professionals **educate, engage, and grow their practice**.

`tax-spin-wheel.js` is the first example module ready to deploy.

---