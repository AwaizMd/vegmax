# Verification — catalogue updates

## 16 October 2026 — bill catalogue expansion

- Added all 33 missing bill items, including regular green chillies, for 50 products across seven categories.
- Added Everyday Vegetables, Fruits & Coconut, and Dairy categories; existing product photos and galleries remain in place.
- Added 33 representative Wikimedia Commons photos with source, author, license, and modification records in the public manifest, asset documentation, and credits page.
- Inspected contact sheets of all added images and replaced unsuitable images of mint, ginger, and green capsicum. Reference photos are identified on product detail pages.
- Final static build and TypeScript checking passed. Export verification passed for 64 public routes, 59 catalogue photographs, 2,182 internal links, metadata, calls, WhatsApp messages, hours, and static assets.
- GitHub Actions repeats the build and verification with the `/vegmax` deployment prefix before publishing.
- No fresh interactive browser/responsive visual pass, phone call, or WhatsApp message is claimed. Search indexing remains disabled pending the existing Maps confirmation.

## 15 October 2026 — supplied photo catalogue

Passed:

- Production static build and TypeScript checking.
- 28 public pages: 17 product pages, four category pages, and seven other public pages.
- All 26 supplied photographs appear in a product image or product gallery; hero and bulk imagery also use supplied photos.
- WebP validity and distinct catalogue photograph hashes; provenance for each photo.
- 806 checked internal links and all referenced product/gallery images resolve in the export.
- Unique page titles, descriptions, and one H1 per page.
- Primary call link `tel:+919849099812` and alternate call link `tel:+919052872238`.
- WhatsApp destination `919849099812`, product-specific names, encoded messages, optional quantities/details, and missing-contact safety.
- “Open 24/7” is visible and `Mo-Su 00:00-24:00` is included in business structured data.
- Old stock product routes and image files are removed from the export.
- Local font assets, preview robots, sitemap output, and static 404.
- The cropped cabbage image was inspected as a local file; it contains no WhatsApp sender/reply interface.

Limitations:

- Browser automation could not acquire access to the local preview due to the browser URL policy. No alternate browser control or policy bypass was attempted. This update has not received a fresh interactive browser or responsive visual pass; the existing responsive layouts are retained, with styles added for photo galleries, contact details, and the opening-hours strip.
- No phone calls or WhatsApp messages were sent. Link destinations and message contents were verified in the exported HTML and message-generation functions.
- No Lighthouse score is claimed. The owner cross-check of the supplied Maps listing remains pending; preview indexing protection is retained.

## GitHub Pages deployment preparation

- Added the `/vegmax` build-time base path and shared image/asset path handling.
- Moved local fonts into Next.js's font pipeline so font paths work on subdirectory hosting.
- Preserved root-path local development and active header navigation under both root and subdirectory URLs.
- The workflow builds and runs the export checks before deployment. Export checks resolve all local page, image, script, and font references after removing the configured hosting prefix.
- Canonical and WhatsApp product URLs are supplied via `NEXT_PUBLIC_SITE_URL`. Search indexing remains disabled until the Maps check is completed.
- The GitHub Pages build passed locally, including the full export verification under `/vegmax/`.
- Source is pushed to `https://github.com/AwaizMd/vegmax` and GitHub Pages is configured with HTTPS and GitHub Actions as its build source. Deployment target: `https://awaizmd.github.io/vegmax/`. The workflow must pass build and export verification before publishing.
