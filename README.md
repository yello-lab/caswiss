# CASWISS website

A static, single-page site for CASWISS — an independent curator of timepieces and leather in Accra. Built with plain HTML, CSS and JavaScript. No build step, no framework, no backend.

The strategy and client-buy-in companion is in [`LUXURY-STRATEGY.md`](LUXURY-STRATEGY.md).

## Preview locally

From the project root:

```bash
python3 -m http.server 4180
```

Then open <http://127.0.0.1:4180/>.

The site can also be opened directly from `index.html`, though using a local server is closer to production and avoids any browser restrictions on local assets.

## Project structure

```
index.html                  Page markup, SEO metadata, JSON-LD
assets/css/styles.css       Design system and responsive rules
assets/js/site.js           Product catalogue, filters, dialog, WhatsApp links, form
assets/fonts/               Self-hosted Cormorant Garamond and Jost
assets/img/products/        Product cards and detail images
assets/img/editorial/       Hero, quote band, house, appointment and social-share imagery
assets/img/collections/     Three occasion cards
images/                     Original WhatsApp source photography — keep as reference
LUXURY-STRATEGY.md          Positioning, research rationale, launch and onboarding plan
```

## The five things to update most often

### 1. WhatsApp number

The number is in two places and they must stay in sync:

- `assets/js/site.js` — `const WA_NUMBER = '233243028241';`
- Every `tel:+233243028241` link in `index.html`

`data-wa` links are populated by JavaScript from `WA_NUMBER`. If the number changes, update both the constant and the visible/`tel:` links.

### 2. A product

Each product lives in two places:

1. **The card** in `index.html` inside `#productGrid`.
2. **The catalogue entry** in `assets/js/site.js` inside `const catalog = { ... }`.

Use the same slug for `data-product`, `data-open-product` and the catalogue key. Add the card to the correct `data-category` (`timepieces` or `footwear`), and update the three filter counts in the toolbar if the totals change.

Each catalogue entry supports:

```js
'slug': {
  brand: 'Seiko',
  name: 'Blue Dial Automatic',
  ref: 'CS-T-01',
  spec: 'Steel case · sunray blue dial · leather strap',
  materials: 'Stainless steel case, textured leather strap, automatic movement',
  description: 'A short, specific product story.',
  image: 'assets/img/products/example-large.webp',
  imageAlt: 'Accessible description of the main image',
  detail: 'assets/img/products/detail-example-large.webp',
  detailAlt: 'Accessible description of the detail image'
}
```

`detail` and `detailAlt` are optional. If omitted, the dialog hides the detail image.

### 3. Images

Product cards use a `<picture>` with WebP sources and a JPEG fallback. Keep the existing naming convention:

```
example-small.webp
example-large.webp
example-small.jpg
example-large.jpg
```

Product images sit on warm paper. Keep the product on a clean, light background and use `object-fit: contain` behaviour for full silhouettes. Do not crop a watch or a shoe in a way that hides its shape.

The current source photography is in `images/`. That folder is the archive; the production files are in `assets/img/`.

### 4. Copy and claims

Before publishing a new claim, confirm it with the owner. Do not add “authenticated”, “new”, “serviced”, “warranty”, “limited” or similar wording unless it is documented and approved.

Prices are intentionally “on request”. The product dialog and footer explain that condition, availability and price are confirmed by an advisor. Keep that consistent.

### 5. SEO and sharing

- Update the canonical URL and Open Graph/Twitter image paths when the live domain is confirmed.
- Replace `assets/img/editorial/og-image.jpg` in the social meta tags if the campaign image changes. Social platforms require an absolute URL once the domain is live.
- The JSON-LD block near the top of `index.html` describes the store; keep the phone number, locality and opening hours current.

## Interaction behaviour

- **Mobile menu:** opens under the sticky header, locks body scroll and closes on link click or `Escape`.
- **Filters:** update card visibility, `aria-pressed`, the live filter status and the URL hash target.
- **Product dialog:** uses native `<dialog>`, populates from the catalogue, closes on backdrop click, close button or `Escape`, and returns focus to the card that opened it.
- **Appointment form:** validates the name, builds a structured message and opens WhatsApp. It does not send data to a server.
- **Advisor button:** appears after scrolling and opens a generic WhatsApp enquiry.
- **Reveal animation:** IntersectionObserver with a fallback timer if JavaScript never sets `window.CASWISS_READY`.

## Deploying

The site is static. Upload the project folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel, S3, etc.).

Recommended:

1. Connect the real domain and update the canonical/OG URLs.
2. Serve over HTTPS.
3. Enable compression and long-lived caching for `/assets/`.
4. Set up privacy-friendly analytics with events for product dialog opens, filters, WhatsApp clicks and appointment form submits.
5. Test the live WhatsApp links on a real phone.

## Release checklist

- [ ] `node --check assets/js/site.js` passes.
- [ ] All local image/font paths resolve.
- [ ] All 15 product cards open the correct dialog and image.
- [ ] Filters show 9 timepieces, 6 footwear and 15 in total.
- [ ] Mobile menu opens, closes and does not allow background scrolling.
- [ ] Product dialog close, backdrop and `Escape` all work.
- [ ] Appointment form rejects an empty name and opens WhatsApp with the correct prefilled message.
- [ ] WhatsApp and `tel:` numbers match.
- [ ] Tested at 320 px, 390 px, 768 px, 1024 px and 1440 px.
- [ ] Keyboard navigation and visible focus work through the page.
- [ ] Automated accessibility scan (axe-core) reports no violations.
- [ ] Reduced-motion setting does not break content.
- [ ] Social preview image is correct.
- [ ] Client has confirmed all provenance, condition, delivery and returns wording.
