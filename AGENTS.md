# AGENTS.md

ZonaSwitch — Spanish-language Nintendo Switch game shop. Monolithic Node/Express server (`server.js`, ~3,500 lines) + static frontend in `public/` (plain CSS/JS, **no build step**, no framework). All UI is DOM manipulation from `public/app.js` (~3,600 lines); the 4 storefront HTML pages load `app.js`. The admin panel is the EXCEPTION: `public/admin.html` is standalone and loads its own `admin.js`/`admin.css` (see Frontend gotchas). MongoDB via Mongoose with local JSON fallback in `data/` (gitignored — never commit runtime data).

## Deploy (most important)

- **Railway deploys from branch `burbuja`, NOT `main`.** `main` is stale and diverged — never push features to it. Deploy command: `git add ... && git commit ... && git push origin burbuja`.
- Live site: `https://intelligent-integrity-burbuja.up.railway.app/` (also `index.html`, `juego.html`, `faq.html`, `terminos.html`, and the admin panel at `/admin`).
- After pushing, wait ~45s for the deploy, then verify against the live URL (server-side changes too — the live app.js/style.css can be fetched to confirm the new code is up).
- No local dev: dependencies are not installed and the server needs `.env` (RESEND_API_KEY is optional — `resend` is null-guarded at server.js:1210; don't "harden" it back into a startup crash).

## Verification (no test suite exists)

- Syntax: `node --check public/app.js public/juego.js public/admin.js server.js`.
- Layout/behavior: headless Chrome against the LIVE site at 360px (and 667/640px) viewport. Puppeteer-core pattern used this session: `npm install puppeteer-core --prefix <temp>` + system Chrome (`C:\Program Files\Google\Chrome\Application\chrome.exe`), `setViewport({width:360, height:800, isMobile:true})`, measure `document.documentElement.scrollWidth` vs `clientWidth`, `getBoundingClientRect()` on the target elements. Static CSS reasoning repeatedly missed real breakage — browser-verify mobile changes.

## Frontend gotchas (each one was a real bug)

- **CSP**: helmet is configured with `scriptSrcAttr: ["'unsafe-inline'"]` (server.js:56-59) because the UI relies heavily on inline `onclick=` in JS-generated markup. Never add `script-src-attr 'none'` or remove this — it kills every button.
- **Fetch interceptor**: `app.js` wraps fetch; ONLY `/api/auth/me` responses may force-logout (the `isSessionProbe` logic). Treating arbitrary 401/403 as "session expired" logs users out on refresh — the interceptor is deliberately scoped.
- **`html/body { overflow-x: clip }`** (style.css ~350-360): do NOT change back to `hidden`. `hidden` creates a scroll container that breaks `backdrop-filter` and clips fixed-element shadows (pill nav) on iOS Safari.
- **`body > * { max-width: 100% !important }`**: load-bearing. `body` is `display:flex; flex-direction:column`; flex items refuse to shrink below content min-width, so `.main-container` renders ~2× viewport without this. The `!important` is required — `.main-container { max-width: 1560px }` would otherwise win the cascade.
- **Every `backdrop-filter` needs its `-webkit-backdrop-filter` pair** (iOS <18). Never animate `transform` on an element that itself has `backdrop-filter` (WebKit renders the blur dead) — wrap it in a child or animate the parent.
- **Admin panel** (`public/admin.html` + `admin.js` + `admin.css`): standalone — deliberately does NOT load `app.js`/`style.css` (it has its own small helpers: fetch wrapper with Bearer token, escapeHTML, formatCLP, toast). Served at `/admin` by the static middleware's `extensions: ['html']` (server.js:145) — no explicit route, and the slug guard (server.js:164) keeps `admin` excluded from the storefront fallback. The page shell is public; the gate is CLIENT-SIDE (`admin.js` calls `/api/auth/me` on load and redirects non-admins to `/`). The API is the security boundary (all `/api/admin/*` behind `verifyAdmin`). Never render `cuentas`/`soldPrimaria`/`soldSecundaria`/`siguienteVarianteIndex` in admin lists — `GET /api/admin/juegos` returns raw objects including credentials. Old admin UI (settings-modal subtabs in app.js) still exists until the new panel reaches full parity.
- **Favorites**: `favoriteGameIds` Set, localStorage key `zonaswitch_favorites`, ids are numbers. The `data-category="favoritos"` pill requires `matchCategory` to pass favorites through: `activeCategory === 'todos' || activeCategory === 'favoritos' || game.categoria === activeCategory` — the prior version ANDed it out and favorites showed 0 games.
- **Price filter**: slider `min/max/value` stay raw CLP internally; labels render via `formatCLP()` (converts to `currentCurrency` via `CURRENCY_RATES`). Range ceiling = max of BOTH `precioSecundaria` and `precioPrimaria` (~50k), not just secundaria (~25k). Currency switches must call `updateFilterPriceLabels()`.
- **Stock availability**: `/api/juegos` exposes `stockPrimaria`/`stockSecundaria` (deliberate — storefront shows availability). Missing/undefined = unlimited; a type is "agotado" only when the field is an integer ≤ 0. Pattern: `!(Number.isInteger(game.stockX) && game.stockX <= 0)`. `sanitizeGameForPublic` still strips `cuentas`, `siguienteVarianteIndex`, `soldPrimaria/Secundaria`, `deletedAt` — keep it that way.

## Design conventions (user-directed)

- UI chrome icons = Lucide-style inline SVGs (`stroke="currentColor"`, 24×24, `stroke-width="2"`, no fill, no dependencies). Decorative emojis are being removed; KEEP content/data emojis: stock glyphs ✅/⛔/⚠️ in cards, toast messages (icons auto-mapped via `TOAST_EMOJI_ICONS` in app.js), accordion content, catalog titles, star ratings.
- Motion: Apple curves — entrances `cubic-bezier(0.32, 0.72, 0, 1)`, overshoot `cubic-bezier(0.34, 1.56, 0.64, 1)`, exits `cubic-bezier(0.4, 0, 1, 1)`; durations 0.15s micro / 0.25s content / 0.4s sheet-modal; staggers 40-80ms capped at 0.5s. The `prefers-reduced-motion` block at the end of style.css must keep covering new animations (it zeroes delays too).
- All copy is Spanish — never change user-facing text.
- Mobile: bottom nav is a floating pill (`nav-compact` class, direction-based scroll collapse), toasts are thin top-center iOS-style banners, light mode = `html.light-mode` class + `localStorage['zonaswitch_theme']` (default dark).

## Misc

- `git status`/diff: files in `public/` may show LF→CRLF warnings — harmless, commit anyway.
- Don't touch `server.js` auth/payment/security code casually; the repo had a security audit pass and those paths are intentionally hardened (rate limits, OTP lockouts, constant-time compares).
