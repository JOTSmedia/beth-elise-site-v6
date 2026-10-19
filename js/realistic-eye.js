/* Pearl-and-glass aEye finish. The existing rig supplies gaze and blink state. */
(function () {
  'use strict';
  const imageBase = new URL('../images/', document.currentScript.src);
  const iris = new Image();
  iris.src = window.BethGraphics ? window.BethGraphics.assetUrl('images/eye-iris-natural.webp')
    : new URL('eye-iris-natural.webp', imageBase).href;

  window.BethRealisticEye = {
    draw(ctx, cx, cy, radius, gazeX, gazeY, blinkPhase) {
      const r = radius;
      const open = Math.max(0.035, 1 - Math.max(0, Math.min(1, blinkPhase || 0)));
      const aperture = () => {
        ctx.beginPath();
        ctx.moveTo(-r * 0.84, 0);
        ctx.bezierCurveTo(-r * 0.45, -r * 0.55, r * 0.38, -r * 0.51, r * 0.84, 0);
        ctx.bezierCurveTo(r * 0.40, r * 0.43, -r * 0.42, r * 0.40, -r * 0.84, 0);
        ctx.closePath();
      };
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, open);
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Soft pearl sclera; no flesh, capillaries, tear duct or skin texture.
      const pearl = ctx.createRadialGradient(-r * 0.2, -r * 0.1, r * 0.05, 0, 0, r * 0.9);
      pearl.addColorStop(0, '#f8f8f1');
      pearl.addColorStop(0.5, '#e1e9e7');
      pearl.addColorStop(0.83, '#b6c9ce');
      pearl.addColorStop(1, '#71858f');
      aperture(); ctx.fillStyle = pearl; ctx.fill();
      ctx.save(); aperture(); ctx.clip();
      const ix = Math.max(-0.9, Math.min(0.9, gazeX || 0)) * r * 0.24;
      const iy = Math.max(-0.85, Math.min(0.85, gazeY || 0)) * r * 0.13;
      const irisR = r * 0.38;
      if (iris.complete && iris.naturalWidth) {
        ctx.drawImage(iris, ix - irisR, iy - irisR, irisR * 2, irisR * 2);
      } else {
        ctx.fillStyle = '#827292'; ctx.beginPath(); ctx.arc(ix, iy, irisR, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#17151f'; ctx.beginPath(); ctx.arc(ix, iy, irisR * 0.3, 0, Math.PI * 2); ctx.fill();
      }
      const lidShadow = ctx.createLinearGradient(0, -r * 0.4, 0, r * 0.32);
      lidShadow.addColorStop(0, 'rgba(18,25,39,.48)');
      lidShadow.addColorStop(0.36, 'rgba(18,25,39,.07)');
      lidShadow.addColorStop(0.62, 'rgba(255,255,255,0)');
      lidShadow.addColorStop(1, 'rgba(25,37,43,.20)');
      ctx.fillStyle = lidShadow; ctx.fillRect(-r, -r * 0.6, r * 2, r * 1.2);
      ctx.restore();

      // A fine cool-metal edge and restrained lashes keep the silhouette gentle.
      aperture(); ctx.strokeStyle = '#5f687c'; ctx.lineWidth = Math.max(0.65, r * 0.024); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-r * 0.68, r * 0.12);
      ctx.bezierCurveTo(-r * 0.28, r * 0.35, r * 0.35, r * 0.33, r * 0.69, r * 0.11);
      ctx.strokeStyle = 'rgba(231,247,245,.66)'; ctx.lineWidth = Math.max(0.5, r * 0.016); ctx.stroke();
      ctx.lineCap = 'round';
      for (let i = 0; i < 11; i++) {
        const t = (i + 1) / 12;
        const x = r * (-0.74 + t * 1.48);
        const y = -r * 0.39 * Math.sin(t * Math.PI);
        const length = r * (0.11 + 0.045 * Math.sin(t * Math.PI));
        ctx.beginPath(); ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + (t - 0.5) * r * 0.07, y - length * 0.65,
          x + (t - 0.5) * r * 0.14, y - length);
        ctx.strokeStyle = 'rgba(50,45,64,.75)'; ctx.lineWidth = Math.max(0.45, r * 0.016); ctx.stroke();
      }
      ctx.restore();
      return true;
    }
  };
})();
