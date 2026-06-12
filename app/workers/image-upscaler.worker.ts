self.onmessage = async (e: MessageEvent) => {
  const { imageBitmap, scale, mode } = e.data;

  try {
    const width = imageBitmap.width * scale;
    const height = imageBitmap.height * scale;

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d', { alpha: true });

    if (!ctx) {
      throw new Error("Could not get 2d context for OffscreenCanvas");
    }

    // High quality bicubic-like scaling in modern browsers
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(imageBitmap, 0, 0, width, height);

    // Apply specific enhancement modes (simulated AI logic via matrices)
    if (mode === 'high-detail' || mode === 'photo' || mode === 'text') {
      const imageData = ctx.getImageData(0, 0, width, height);
      applySharpening(imageData, mode);
      ctx.putImageData(imageData, 0, 0);
    }

    // Determine mime type based on input or force PNG to avoid loss during upscale
    const blob = await canvas.convertToBlob({ type: 'image/png', quality: 1.0 });
    
    // Transfer back
    self.postMessage({ status: 'success', blob });
  } catch (err: any) {
    self.postMessage({ status: 'error', error: err.message });
  }
};

function applySharpening(imageData: ImageData, mode: string) {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;

  // Simple convolution matrix for sharpening
  let weights = [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0
  ];

  if (mode === 'text') {
    // Aggressive sharpening for text
    weights = [
      -1, -1, -1,
      -1,  9, -1,
      -1, -1, -1
    ];
  } else if (mode === 'photo') {
    // Softer sharpening for portraits to avoid skin artifacts
    weights = [
      0, -0.5, 0,
      -0.5, 3, -0.5,
      0, -0.5, 0
    ];
  }

  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side / 2);
  const src = new Uint8ClampedArray(data);
  const sw = width;
  const sh = height;
  const w = sw;
  const h = sh;

  // We don't want to sharpen the alpha channel.
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sy = y;
      const sx = x;
      const dstOff = (y * w + x) * 4;
      let r = 0, g = 0, b = 0;

      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = Math.min(Math.max(sy + cy - halfSide, 0), sh - 1);
          const scx = Math.min(Math.max(sx + cx - halfSide, 0), sw - 1);
          const srcOff = (scy * sw + scx) * 4;
          const wt = weights[cy * side + cx];

          r += src[srcOff] * wt;
          g += src[srcOff + 1] * wt;
          b += src[srcOff + 2] * wt;
        }
      }

      data[dstOff] = Math.min(Math.max(r, 0), 255);
      data[dstOff + 1] = Math.min(Math.max(g, 0), 255);
      data[dstOff + 2] = Math.min(Math.max(b, 0), 255);
    }
  }
}
