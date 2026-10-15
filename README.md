# Vegmax

A Next.js App Router static catalogue for Vegmax, Bowenpally, Hyderabad. TypeScript, Tailwind CSS, GSAP/ScrollTrigger, Lucide icons, and an adapted Animate UI accordion. No backend, accounts, checkout, database, or payments.

## Run

Node.js 22 or newer:

```sh
npm ci
npm run dev
```

Development: http://127.0.0.1:3000

To build and serve the static output:

```sh
npm run build
npm run verify
npm start
```

Static preview: http://127.0.0.1:4173. `npm start` serves `out/` without a Next.js runtime. Rebuild after editing products or business information. Next.js required execution outside the Windows filesystem sandbox to canonicalize the workspace during this session.

## Current catalogue

The old stock-photo catalogue has been replaced with **17 products using all 26 owner-supplied photographs**. Repeat photographs are grouped into galleries on the relevant product pages.

- Red capsicum and yellow capsicum.
- Green zucchini and yellow zucchini.
- Broccoli, asparagus, and baby carrot.
- Cucumber, cherry tomatoes, red cabbage, iceberg lettuce, and pak choi / bok choy.
- Red chilli peppers and green jalapeño peppers.
- Thyme, rosemary, and pea eggplant (Turkey berry).

Names are based on the supplied photographs; trade names and chilli varieties can be adjusted in `src/lib/products.ts`. Availability, prices, packing, quantities, and fulfilment remain subject to direct enquiry. The photos do not establish farm ownership or ongoing stock availability.

## Confirmed business updates

The owner supplied these details on 15 October 2026:

- Open **24 hours, seven days a week**.
- Primary call and WhatsApp: **+91 98490 99812** (`tel:+919849099812`, WhatsApp digits `919849099812`).
- Additional call number: **+91 90528 72238** (`tel:+919052872238`).

All contacts and opening hours are centralized in `src/lib/business.ts`. Product-specific WhatsApp actions prepare messages to the primary number; primary and alternate call actions are available on product details. Both numbers appear in the header, contact section/page, and footer; mobile uses the primary call number. The enquiry builder also opens a prepared WhatsApp message. No message is sent automatically.

## Remaining release configuration

The production domain (`siteUrl`) and owner cross-check of the supplied Maps destination (`mapsOwnerConfirmed`) are still pending. Email stays `null`. Confirm the listed address and commercial terms directly before launch. The current export retains `noindex`, disallows crawling, and has an intentionally empty sitemap until the domain is set.

```sh
npm run release
```

This checks required contacts/domain and Maps confirmation before building. It validates configuration shape; the owner establishes the underlying facts. Normal `npm run build` works for previews while the domain/Maps check is pending.

Upload the contents of `out/` to a static host. Build command for an indexed release: `npm run release`; output directory: `out`. Serve directory `index.html` files and use `404.html` for unknown routes. Do not add a catch-all SPA rewrite. No server functions or image optimization endpoint are required.

### GitHub Pages

Repository: https://github.com/coderxplr-dev/vegmax

Intended deployment URL: https://coderxplr-dev.github.io/vegmax/

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds, verifies, and deploys pushes to `main`. For first-time setup, enable GitHub Pages with the source set to **GitHub Actions** in the repository settings. It sets `NEXT_PUBLIC_BASE_PATH=/vegmax` and `NEXT_PUBLIC_SITE_URL=https://coderxplr-dev.github.io/vegmax`. Normal local builds leave the base path empty. Images use the shared `assetPath` helper, while Next.js handles page links and locally bundled fonts.

This initial online deployment retains the preview's search-indexing protection until the supplied Maps destination is owner-confirmed. Its canonical and product enquiry URLs use the deployment URL. After verifying the listing, set `mapsOwnerConfirmed` in `src/lib/business.ts` to `true` and push to enable indexing and the sitemap. Deploying this preview does not assert that the Maps check has been completed.

Dependencies, `.next/`, `out/`, `.deploy/`, local environment files, and TypeScript caches are excluded from Git. The action creates the production build artifact directly; generated output is not committed to the source branch.

## Editing and images

- Business contacts, hours, address, domain: `src/lib/business.ts`.
- Products, aliases, category membership, culinary descriptions, galleries, related products: `src/lib/products.ts`.
- WhatsApp formatting: `src/lib/enquiries.ts`.
- SEO/structured data: `src/lib/seo.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`.
- Styles: `src/app/globals.css`.
- All website images: `public/images/`, with provenance in `public/image-sources.json`, `ASSET-SOURCES.md`, and `/credits/`.

Original photographs in the two supplied Downloads folders remain untouched. Website copies are optimized as WebP. The WhatsApp interface is removed from the alternate cabbage image; background people are omitted from the alternate red capsicum image. The hero and bulk image reuse the supplied capsicum photographs. All previous stock photos have been removed from the source and final export.

To re-import the same photos while the original Downloads paths exist:

```sh
node scripts/import-owner-photos.mjs
```

This is optional; a normal build uses the already bundled images. Do not run it for a different batch without updating its explicit file mapping.

Fraunces and Manrope are locally hosted under SIL Open Font License 1.1; licences in `public/fonts/`. The adapted Animate UI component uses MIT + Commons Clause; see `THIRD-PARTY-LICENSES.md`.

## Verification

`npm run verify` checks all public exported routes, local images and fonts, internal links, unique titles/descriptions/H1, all 26 supplied photos across 17 products, related-product targets, per-product WhatsApp encoding, correct primary/alternate call links, opening hours, removed stock products/assets, preview robots, and the static 404. Pure message checks cover optional quantities, optional details, absolute product URLs under a synthetic production configuration, and safe missing-contact behavior.

The bulk form stores no personal data in local storage and provides validation, a message preview, and copy functionality. Sending happens in WhatsApp. Core catalogue content is build-rendered HTML; mobile navigation, filtering, and enquiry building use small client components. GSAP, CSS, and the adapted accordion implement reduced-motion support.

No Lighthouse score, production deployment, real-device performance result, test phone call, or sent WhatsApp message is claimed. Final browser verification results are recorded in `VERIFICATION.md`.
