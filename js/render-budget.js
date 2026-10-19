/* Delivery resolution only: preserve CSS geometry, image UVs and animation clocks. */
(function () {
  'use strict';
  const root = new URL('../', document.currentScript.src);
  const compactQuery = matchMedia('(max-width: 1024px)');
  const coarseQuery = matchMedia('(pointer: coarse)');
  const compact = () => compactQuery.matches || coarseQuery.matches;
  const sprites = new Set([
    'avatar_body.webp', 'avatar_wing_left.webp', 'avatar_wing_right.webp', 'avatar_train.webp',
    'photorealistic_glinda_bubble_orb.webp', 'photorealistic_purple_iris_orb.webp',
    'butterfly-cinematic.webp', 'butterfly-monarch.webp', 'butterfly-swallowtail.webp',
    'butterfly-orange-tip.webp', 'eye-iris-natural.webp', 'crystal_nebula_panorama.webp',
    'crystal_glass_specular.webp', 'merch-eye-believe-hoodie-lavender.webp',
    'chakra-watercolor-transparent.webp', 'aura-silhouette-glow.webp',
    'notes-by-beth.webp', 'portrait.webp', 'merch-eye-believe-hat-black.webp'
  ]);
  function assetUrl(path) {
    const url = new URL(path.replace(/^(?:\.\.\/)+(?=images\/)/, ''), root);
    const file = url.pathname.split('/').pop();
    if (url.origin === root.origin && sprites.has(file)) {
      return new URL('images/runtime/' + (compact() ? 'mobile/' : 'desktop/') + file, root).href;
    }
    return url.href;
  }
  function pixelRatio(width, height, maxRatio = 3) {
    const maxPixels = compact() ? 1500000 : 8000000;
    return Math.min(devicePixelRatio || 1, maxRatio, compact() ? 1.5 : 3,
      Math.sqrt(maxPixels / Math.max(1, width * height)));
  }
  function resizeCanvas(canvas, width, height, ratio) {
    const bw = Math.max(1, Math.round(width * ratio));
    const bh = Math.max(1, Math.round(height * ratio));
    // Reassigning even identical canvas dimensions discards/reallocates its buffer.
    if (canvas.width !== bw) canvas.width = bw;
    if (canvas.height !== bh) canvas.height = bh;
  }
  function setImage(img, path) {
    const url = new URL(path.replace(/^(?:\.\.\/)+(?=images\/)/, ''), root);
    const file = url.pathname.split('/').pop();
    if (url.origin === root.origin && /\/images\/[^/]+\.webp$/.test(url.pathname)) {
      const stem = file.slice(0, -5);
      // All responsive candidates share the original crop and alpha channel.
      img.srcset = [192, 480, 960, 1440].map(w =>
        new URL('images/display/' + stem + '-' + w + '.webp', root).href + ' ' + w + 'w').join(', ');
      if (!img.sizes) img.sizes = '(max-width: 768px) calc(100vw - 32px), 600px';
    } else {
      img.removeAttribute('srcset');
    }
    img.src = url.href;
  }
  function thumbnailUrl(path) {
    const url = new URL(path.replace(/^(?:\.\.\/)+(?=images\/)/, ''), root);
    if (url.origin === root.origin && /\/images\/[^/]+\.webp$/.test(url.pathname)) {
      const stem = url.pathname.split('/').pop().slice(0, -5);
      return new URL('images/display/' + stem + '-192.webp', root).href;
    }
    return url.href;
  }
  window.BethGraphics = { assetUrl, pixelRatio, resizeCanvas, setImage, thumbnailUrl };
})();
