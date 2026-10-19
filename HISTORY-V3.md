# Beth Elise — cinematic version 3

Saved locally on October 19, 2026. Continues completed version 2; versions 1 and 2 are preserved. No public deployment has been performed.

## This round

- Four photographic butterfly varieties: existing blue morpho, plus amber monarch, yellow tiger swallowtail, and ivory/orange great orange-tip interpretations. Perched butterflies vary by species while retaining their established perches and flutter timing.
- Ambient butterflies now choose independent random destinations, curve gently, keep separation, and turn at boundaries. Density is reduced to 10 on desktop and 6 on mobile in the hero; footer density is 6/4. The original single Beth assistant is retained.
- Desktop portal retains the original 64-node tree-circle contour in the original image-map coordinate system, with no translation or scale change. On layouts up to 1024px wide, it opens over the center of the logo and fits within the logo area. Portal highlights, navigation targets, timing and state transitions are preserved.
- The existing flowing script logo has a thin black outline confined to its lettering/subtitle band. Its ivory, teal and violet glow remains. Navigation sizing and hero glow are refined for legibility; the matching dark logo remains on light surfaces.
- The loader and aEye assistant share new photographic sclera/lash and violet iris layers. The iris still follows the existing gaze state, and blinks use the existing blink state. The original procedural paint remains as an asset-loading fallback. Loader and assistant canvas backing resolution supports device-pixel ratios up to 3.
- Text remains caps/small caps and descriptive copy remains justified. Fonts remain self-hosted, with their licenses.

## Assets and provenance

New images were generated with built-in ImageGen. Exact prompts and native PNGs are in `art-sources/v3/`; the 4096px masters are delivery upscales. Runtime WebPs are 2048px wide. The butterfly and iris generations were native 1254×1254; the eye shell was native 1774×887. Do not describe these exports as native 4K or 8K detail. `butterfly-art-report-v3.json` and `eye-art-report-v3.json` record both sizes. Earlier art reports and prompts are retained for inherited imagery.

The logo outline is a deterministic SVG/CSS effect using the original logo pixels; the script lettering itself has not been regenerated or distorted. All pre-existing raster assets remain unchanged from v2.

## Verification

- All ten pages retain their existing interactive element attributes, image maps, IDs and navigation/form/cart hooks. The only added HTML dependency is the shared eye paint script.
- JavaScript syntax, local asset references and image integrity checked.
- Seeded motion simulations across desktop, phone and footer sizes confirm finite, bounded movement, independent wandering and separation. See `motion-verification-v3.json`.
- Browser checks at 320, 390, 768, 1024, 1280 and 1440px widths found no horizontal overflow; caps and justified copy confirmed. Desktop portal inspected inside the tree opening; mobile portal inspected over the logo. Assistant menu open/close verified. See `layout-verification-v3.json` and screenshots.
- Existing audio, checkout, forms and location behavior are preserved by code comparison. No real purchase, form submission, location permission or audible output was exercised in this round.

Serve this folder with a static web server and open `index.html`. No new account, API key, backend or runtime package is required. Future completed rounds should be saved as `beth-elise-site-v4`, then v5, etc.
