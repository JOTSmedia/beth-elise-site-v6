# Beth Elise — cinematic version 4

Saved locally on October 19, 2026. Continues completed v3. Earlier completed versions remain intact; nothing has been deployed publicly.

## This round

- Logo ornaments now follow the supplied original reference: fairy wings, crescent, stars, botanical sprigs and a floral garland. The approved script lettering, small-caps subtitle, dark lettering outline and original-style glow are retained. Matching light and dark versions, browser icons and sharing artwork are included.
- The hero forest has mapped mushroom cap/gill glow, soft reflected light on the moss, floating spores, drifting mist and gentle pool ripples. The background image and all interaction coordinates remain unchanged.
- aEye uses a smooth pearl/glass surround in place of flesh-toned skin, with the detailed violet iris, restrained lashes and the existing gaze, blink and flight behavior. This shared paint appears in the loader, home-base assistant and its other animated states.
- Desktop portal remains inside the original tree circle. Mobile/tablet portal remains centered over the logo. The v3 butterfly species and spaced random paths are retained.

## Resolution and source files

New logo ornament artwork is vector-based, with editable self-contained SVG masters in `art-sources/v4/`. Delivery logos are 4096×2746 PNG/WebP. The approved lettering is an inherited raster layer, originally generated at 1533×1026; its 4096-pixel delivery export is not native 4K detail. The retained violet iris was generated at 1254×1254 and exported at 2048×2048. See `art-sources/v4/ART-DIRECTION.md` and earlier reports for full provenance. No new raster image generation was used for this refinement.

## Verification

Main JavaScript is byte-identical to v3 apart from one optional forest-paint call. Portal timing, state transitions, map coordinates, butterflies, navigation, forms, audio, cart and Beth choreography are preserved. Structural comparison checks all ten pages; JavaScript syntax, local dependencies and image integrity are checked. New paint tests verify finite geometry, restored canvas state, time variation and stable reduced-motion frames. Browser checks cover desktop and phone layout and assistant opening/closing. No purchases, form submissions, GPS permissions or audible output were exercised.

Serve the folder with a static web server and open `index.html`; no new runtime package, API key or account is required. Save the next completed round as `beth-elise-site-v5`.
