# Beth Elise — version 6 mobile memory fix

Saved locally October 19, 2026. Continues completed v5 without overwriting it. The published v5 website has not been changed.

## Reported problem and finding

Beth reported an iPhone 16 Pro failing in both Safari (“a problem repeatedly occurred”) and Chrome (“can’t open this page”). The published index, main script and cinematic stylesheet match the local v5 files.

The v5 loader eagerly requested and decoded 17 large images, pinning about 958 MiB of RGBA image pixels before accounting for the rest of the page, canvas backing stores, glow surfaces and browser overhead. This included an unused full-size avatar. Two optical UI icons were also 4096×4096 each. A 960px crystal canvas multiplied by device pixel ratio 3 allocated a 2880×2880 backing buffer despite displaying at 280px on a phone. These findings strongly indicate graphics memory exhaustion; the physical-device crash was not instrumented.

## Changes

- Removed the whole-site eager decode cache. Each image now loads through its actual consumer.
- Added screen-sized copies of existing artwork and responsive image candidates. Full-resolution originals remain intact.
- Added small canvas textures and 192px optical UI icons.
- Limited phone canvas backing density to 1.5, with a 1.5-megapixel per-canvas budget, while preserving logical drawing coordinates.
- Sized the crystal backing store to its rendered footprint and avoided reallocating unchanged buffers during resize events.
- Kept product swatches, modal images and cart thumbnails responsive when they change.
- Deferred the offscreen YouTube iframe until it is near view.

The complete mobile canvas-texture/background set represents about 51 MiB of RGBA pixels. This is a bitmap-size calculation, not an instrumented process-memory measurement. At a modeled iPhone 402×874 / DPR 3 viewport, one hero canvas falls from about 12 MiB to 3 MiB. The 280px crystal buffer falls from about 31.6 MiB to 0.67 MiB.

## Preserved

All 195 original image files, self-hosted fonts/licenses, original CSS and cinematic CSS are byte-identical to v5. The forest and butterfly drawing code, original logo/glow, animation timings/state transitions, portal contour, mobile over-logo placement, forms, navigation, cart quantities/prices and audio behavior are preserved. Changes are confined to delivery URLs, backing-store allocation and lazy loading. No new image generation occurred; provenance remains with the source artwork and in `delivery-provenance-v6.json`.

## Validation and limits

All ten pages retain their interactive structure and attributes. All 225 responsive candidate references and widths were checked. All 432 raster files pass integrity checks; all local dependencies resolve. Shared/inline JavaScript passes syntax checks. Memory-budget, repeated-resize and product-variant URL tests pass across phone, tablet, landscape and desktop models, including DPR 3. Reports are saved in this folder.

Automatic browser security review blocked access to the local preview. No v6 browser screenshot, live scrolling/cart interaction test or physical iPhone validation is claimed. The code and asset fix is ready for an iPhone Safari/Chrome retest after uploading.

Local preview is served at http://127.0.0.1:4173/index.html. This package is static and needs no build step. Saving it does not deploy it.
