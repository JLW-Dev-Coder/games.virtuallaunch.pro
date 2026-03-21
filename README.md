# games.virtuallaunch.pro
Here’s the README updated with **Stripe integration** included:

---

# games.virtuallaunch.pro

A collection of self-contained browser mini-games for tax professionals. Each game is a standalone **JS module** that can be embedded on any page via a simple `<script>` tag and connects to your Worker backend for **token balances, payouts, and tracking**.

---

## 1. Game JS Files

Each game lives in its own file, e.g., `tax-spin-wheel.js`.

**Responsibilities:**

1. Render the interactive game (spin wheel, trivia, puzzle, etc.).
2. Animate gameplay (e.g., spinning the wheel).
3. Deduct tokens through your Worker (`/api/use-tokens`).
4. Display results or prizes in a pop-up.
5. Update scoreboard (tokens, wins, prizes collected).
6. Optional: “Learn More” links for additional info.

**Embedding Example:**

```html
<script src="https://games.virtuallaunch.pro/tax-spin-wheel.js" data-client-id="CLIENT123"></script>
```

---

## 2. Token Integration

Games read `data-client-id` from the `<script>` tag. When a user plays:

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
    spinWheel(); // start animation
  } else {
    alert('Not enough tokens! Buy more.');
  }
});
```

Your Worker backend handles **token deduction** and updates KV storage.

---

## 3. Scoreboard / Token Display

* Each game maintains its own scoreboard:

  * Tokens remaining
  * Wins or prizes collected

* Optional: Persist visitor session with Worker, so token balance is accurate on page reload.

---

## 4. Worker Responsibilities

* **POST /api/use-tokens**

  * Validate `clientId` + `visitorId`
  * Check token balance
  * Deduct tokens if enough
  * Return updated balance

* **POST /api/purchase-tokens**

  * Called after Stripe checkout
  * Increase visitor token balance in KV

---

## 5. Stripe Integration

Enable visitors to purchase tokens directly via Stripe.

**Frontend Flow:**

1. User clicks **Buy Tokens** button.
2. JS calls your Worker route to create a Stripe Checkout session:

```javascript
fetch('https://games.virtuallaunch.pro/api/create-checkout-session', {
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({
    clientId: 'CLIENT123',
    visitorId: 'VISITOR456',
    tokens: 50 // number of tokens to buy
  })
})
.then(res => res.json())
.then(data => {
  if(data.url){
    window.location.href = data.url; // redirect to Stripe Checkout
  }
});
```

**Worker Flow:**

* **POST /api/create-checkout-session**

  * Receives `clientId`, `visitorId`, and `tokens`
  * Creates Stripe Checkout session with token purchase amount
  * Returns `session.url` to frontend

* **POST /api/webhook**

  * Listens for Stripe payment success events
  * Adds purchased tokens to the visitor’s balance in KV

---

## 6. Adding New Games

* Each new game is a separate JS module:

  * `tax-trivia.js`
  * `tax-puzzle.js`
  * `bonus-spin.js`

* Follow the same token + Stripe integration pattern.

* Each module is **self-contained** and embeds anywhere via snippet while relying on Worker for backend validation.

---

## 7. Getting Started

1. Include the game script in your page.
2. Ensure `data-client-id` is set for the client.
3. Make sure your Worker backend routes `/api/use-tokens`, `/api/purchase-tokens`, `/api/create-checkout-session`, and `/api/webhook` are live.
4. Launch the game instantly with full token tracking, Stripe purchases, and scoreboard support.

---

Games are fully **drop-in** with secure token tracking and optional Stripe purchases. `tax-spin-wheel.js` is the first example module ready to deploy.

---

I can also draft a **complete `tax-spin-wheel.js` file** that includes **animations, token deduction, pop-ups, scoreboard, and Stripe checkout integration** so you could deploy it immediately.

Do you want me to create that full example next?
