# ACTION PLAN — SEO Fixes for nyuk.vercel.app
**Generated:** 2026-03-17 | **Overall Score:** 58/100 → Target: 80+/100

---

## 🔴 CRITICAL — Fix Immediately (High Impact, Low Effort)

### P1. Remove Duplicate Unicorn Studio CDN Script
- **File:** `index.html`
- **Action:** Remove the first `<script src="https://cdn.unicorn.studio/v1.4.0/unicornStudio.umd.js">` tag (keep only one)
- **Impact:** Reduces an unnecessary network request + parse time
- **Effort:** 2 min

### P2. Create robots.txt
- **File:** `public/robots.txt` (NEW)
- **Action:**
  ```
  User-agent: *
  Allow: /
  
  Sitemap: https://nyuk.vercel.app/sitemap.xml
  ```
- **Impact:** Enables proper crawl management; sitemap discovery
- **Effort:** 5 min

### P3. Create sitemap.xml
- **File:** `public/sitemap.xml` (NEW)
- **Action:**
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://nyuk.vercel.app/</loc>
      <lastmod>2026-03-17</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>
  ```
- **Submit to:** Google Search Console + Bing Webmaster Tools
- **Impact:** Google can now formally discover and index the page
- **Effort:** 5 min

### P4. Create llms.txt
- **File:** `public/llms.txt` (NEW)
- **Action:**
  ```
  # Nyuk Boutique Floral
  > Tienda de flores de lujo en Lima, Perú. Envío gratis el mismo día.
  
  ## Servicios
  - Ramos y arreglos florales premium
  - Delivery mismo día en Lima Metropolitana
  - Garantía de frescura 24 horas
  - Ocasiones: cumpleaños, aniversarios, bodas, eventos corporativos
  
  ## Contacto
  - Teléfono / WhatsApp: +51 934 202 560
  - Instagram: https://instagram.com/nyuk.pe
  - URL: https://nyuk.vercel.app/
  - Dirección: Francisco Pizarro 698, Lima 15001, Perú
  ```
- **Impact:** Enables AI search engine citations (Perplexity, ChatGPT, Gemini)
- **Effort:** 10 min

### P5. Fix Title Tag — Remove Domain Prefix
- **File:** `index.html`
- **Action:** Change:
  ```html
  <!-- Before -->
  <title>nyuk.vercel.app | Flores de Lujo Lima | Envío Gratis Hoy | Arreglos Florales Premium</title>
  <!-- After -->
  <title>Nyuk Boutique Floral | Flores de Lujo en Lima · Envío Gratis Hoy</title>
  ```
  Also update `og:title` and `twitter:title` to remove `nyuk.vercel.app |` prefix.
- **Impact:** Better click-through rate in SERPs; brand recognition
- **Effort:** 5 min

---

## 🟠 HIGH PRIORITY — Fix This Week (High Impact, Medium Effort)

### P6. Replace Tailwind CDN with Production Build
- **File:** Build config / `index.html`
- **Problem:** `<script src="https://cdn.tailwindcss.com">` loads 350KB+ unminified, render-blocking CSS-in-JS.
- **Action:** Remove Tailwind CDN and use PostCSS + Tailwind CLI with `@import 'tailwindcss'` in the Vite build pipeline. This should already be set up if using Vite.
- **Impact:** Saves ~2,230ms render-blocking time on mobile; major LCP/FCP improvement
- **Effort:** 1-2 hours (requires Vite config update + testing)

### P7. Optimize and Compress Images
- **Action:**
  1. Convert all `.png` images in `/imagenes/` to WebP format
  2. Create multiple sizes for responsive serving:
     - 400px, 800px, 1200px variants
  3. Add `srcset` and `sizes` attributes to all `<img>` tags
  4. Add `loading="lazy"` to below-fold images
  5. Add explicit `width` and `height` to prevent layout shifts
- **Expected savings:** ~9,126 KiB (mobile) → dramatic LCP improvement
- **Impact:** LCP could improve from 4.0s to <2.5s on mobile
- **Effort:** 2-3 hours

### P8. Implement Pre-rendering / SSR
- **Problem:** `<body><div id="root"></div></body>` — zero static content for crawlers without JS.
- **Action Options:**
  - **Option A (Easy):** Add `react-snap` for static pre-rendering at build time
  - **Option B (Hard):** Migrate to Vite SSR or Next.js
  - **Minimum viable:** Render at least the `<h1>`, hero text, and product names in static HTML via `index.html` template
- **Impact:** Makes content accessible to all crawlers (Bingbot, social scrapers, cache)
- **Effort:** 4-8 hours depending on option

### P9. Enhance Florist Schema
- **File:** `index.html` (JSON-LD block)
- **Actions:**
  1. Fix `openingHours` to array format: `"openingHours": ["Mo-Su 09:00-21:00"]`
  2. Remove `https://wa.me/...` from `sameAs` — keep only official social profiles
  3. Add `logo` property: `"logo": "https://nyuk.vercel.app/imagenes/favicon-round-256.png"`
  4. Add `paymentAccepted`: `"paymentAccepted": "Cash, Credit Card"`
  5. Add `currenciesAccepted`: `"currenciesAccepted": "PEN"`
  6. Expand `hasOfferCatalog.itemListElement` with all main flower arrangements
  7. Add `aggregateRating` once you have reviews
- **Impact:** Rich result eligibility (star ratings, local knowledge panel)
- **Effort:** 30 min

---

## 🟡 MEDIUM PRIORITY — Fix This Month

### P10. Add Content-Security-Policy Header
- **File:** `vercel.json`
- **Action:**
  ```json
  {
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.unicorn.studio https://esm.sh; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'"
          }
        ]
      }
    ]
  }
  ```
- **Impact:** Improves security posture; indirect trust signal
- **Effort:** 30 min

### P11. Fix Accessibility Issues
- **Buttons without accessible names:** Add `aria-label` to all `<button>` elements that have only icon children
- **Color contrast:** Review text color `#2D2D2D` against backgrounds, especially for secondary UI elements
- **Video captions:** Add `<track kind="captions">` to any `<video>` elements
- **Impact:** Accessibility score → 90+; indirect UX signal for Google
- **Effort:** 2-3 hours

### P12. Add FAQPage Schema
- **Action:** If the site has a FAQ or "How It Works" section, add:
  ```json
  {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Hacen envíos el mismo día en Lima?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, realizamos envíos el mismo día en Lima Metropolitana. Haz tu pedido antes de las 6pm."
        }
      }
    ]
  }
  ```
- **Impact:** Featured snippet eligibility in Google
- **Effort:** 1 hour

### P13. Register with Google Search Console & Bing Webmaster Tools
- **Action:** 
  1. Go to https://search.google.com/search-console/ → Add property `https://nyuk.vercel.app/`
  2. Submit sitemap URL
  3. Monitor Index Coverage errors
  4. Request indexing for homepage
- **Impact:** Confirm indexing status, get real search performance data
- **Effort:** 30 min

---

## 🟢 LOW PRIORITY — Long-term Improvements

### P14. Build Real Content Pages
- Create `/colecciones/rosas`, `/colecciones/arreglos`, `/contacto`, `/nosotros` routes
- Each page needs unique title, description, h1, and static content
- **Impact:** Multi-page site dramatically increases indexed surface area and keyword coverage

### P15. E-E-A-T Signals
- Add team page / About section
- Display certifications or press mentions
- Collect and display Google Reviews (linked via `aggregateRating` schema)
- **Impact:** Long-term authority building for competitive local queries

### P16. Content Marketing
- Add a blog (`/blog`) with articles like "Flores para aniversario en Lima", "Guía de arreglos florales para bodas"
- **Impact:** Long-tail keyword traffic; E-E-A-T demonstration

---

## Summary Table

| # | Fix | Priority | Effort | Impact |
|---|-----|----------|--------|--------|
| P1 | Remove duplicate CDN script | 🔴 Critical | 2 min | Performance |
| P2 | Create robots.txt | 🔴 Critical | 5 min | Crawlability |
| P3 | Create sitemap.xml | 🔴 Critical | 5 min | Indexing |
| P4 | Create llms.txt | 🔴 Critical | 10 min | AI Search |
| P5 | Fix title tag | 🔴 Critical | 5 min | CTR |
| P6 | Remove Tailwind CDN | 🟠 High | 1-2h | +30 mobile points |
| P7 | Optimize images | 🟠 High | 2-3h | LCP 4.0s → <2.5s |
| P8 | Pre-rendering/SSR | 🟠 High | 4-8h | Content indexability |
| P9 | Enhance Florist schema | 🟠 High | 30 min | Rich results |
| P10 | Add CSP header | 🟡 Medium | 30 min | Security/trust |
| P11 | Fix accessibility | 🟡 Medium | 2-3h | UX signals |
| P12 | Add FAQPage schema | 🟡 Medium | 1h | Featured snippets |
| P13 | Google Search Console | 🟡 Medium | 30 min | Monitoring |
| P14 | Build content pages | 🟢 Low | Ongoing | Long-term |
| P15 | E-E-A-T signals | 🟢 Low | Ongoing | Authority |
| P16 | Content marketing | 🟢 Low | Ongoing | Organic traffic |

*Estimated score after P1-P5 (30 min total): ~65/100*  
*Estimated score after P1-P9 (1-2 days total): ~78/100*  
*Estimated score after all items: ~88/100*
