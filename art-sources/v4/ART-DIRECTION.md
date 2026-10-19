# Version 4 art direction and provenance

## Logo

Reference: Beth’s supplied screenshot of the original hero logo, copied here as `reference-original-hero-logo.png`.

Brief: retain the approved Beth Elise flowing script and small-caps subtitle, the thin dark lettering outline, the luminous halo, and the exact delivery canvas. Replace the previous gold botanical crest with delicate paired fairy wings, crescent moon, compass star, scattered small stars, sprigs and a floral lower garland closer to the supplied reference.

Implementation: new native SVG ornament paths; approved v3 light/dark raster lettering is embedded as a clipped layer, with a narrow vector filter outline applied only to that lettering. The included `logo-master.svg` and `logo-dark-master.svg` are self-contained editable masters. PNG/WebP delivery files are 4096×2746. The new ornaments are vector artwork. The inherited lettering was originally generated at 1533×1026 and exported at 4096×2746; the larger export does not add native 4K detail to those raster letters. No generative raster calls were used in this round. Earlier prompts and art reports remain in the version folder.

## aEye

Brief: remove the unsettling flesh-toned cutout while retaining a detailed violet iris and existing gaze/blink behavior.

Implementation: the v3 natural violet iris texture (native generation 1254×1254; runtime export 2048×2048) is reused. The new shared paint uses an ivory/pearl sclera with soft optical shading, a fine cool rim and restrained lashes. No skin, tear duct or red capillaries are painted. The old skin asset remains archived with inherited files but is no longer requested by the shared renderer. All gaze/blink clocks and assistant flight states remain in the unchanged main rig.

## Forest

The original 4128×2304 forest image remains byte-identical. A separate canvas paint layer uses measured image UV anchors and the actual CSS cover / center-bottom transform. It adds cap/gill emission, moss bounce light, rising spores, slow mist and pool ripples. Time-based effects become a fixed frame under reduced-motion preferences. No interactive image-map or portal coordinates were changed.
