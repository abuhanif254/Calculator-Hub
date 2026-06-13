export interface TraceOptions {
  mode: 'logo' | 'icon' | 'illustration' | 'lineart' | 'bw' | 'detailed';
  quality: 'fast' | 'balanced' | 'high' | 'ultra';
  colorCount: number;
  colorMode: 'color' | 'grayscale' | 'monochrome' | 'bw';
  simplify: number; // 0 (none) to 5 (max)
  smoothing: number; // 0 (sharp) to 100 (smooth)
  removeBackground: boolean;
  edgeSensitivity: number; // 0 to 100 (controls color classification threshold)
  cornerPrecision: number; // 0 to 100
  strokeColor?: string;
  strokeWidth?: number;
}

export interface TraceStats {
  pathCount: number;
  colorCount: number;
  fileSize: number;
  optimizationScore: number;
}

export class ImageTracer {
  /**
   * Helper to compute squared Euclidean distance between two colors
   */
  private static colorDistSq(c1: [number, number, number], c2: [number, number, number]): number {
    const dr = c1[0] - c2[0];
    const dg = c1[1] - c2[1];
    const db = c1[2] - c2[2];
    return dr * dr + dg * dg + db * db;
  }

  /**
   * Performs K-Means clustering on the sampled pixels to create a color palette
   */
  private static quantizeColors(
    pixels: Uint8ClampedArray,
    maxColors: number,
    colorMode: 'color' | 'grayscale' | 'monochrome' | 'bw'
  ): [number, number, number][] {
    const palette: [number, number, number][] = [];

    if (colorMode === 'bw') {
      return [[0, 0, 0], [255, 255, 255]];
    }

    if (colorMode === 'monochrome') {
      return [[0, 0, 0], [255, 255, 255]];
    }

    if (colorMode === 'grayscale') {
      const step = Math.max(1, Math.floor(255 / (maxColors - 1)));
      for (let i = 0; i < maxColors; i++) {
        const val = Math.min(255, i * step);
        palette.push([val, val, val]);
      }
      return palette;
    }

    // Step 1: Sample pixels to build unique color list
    const stepSize = Math.max(1, Math.floor(pixels.length / 4000)); // Sample ~1000 pixels
    const samples: [number, number, number][] = [];
    const colorCounts: Record<string, number> = {};

    for (let i = 0; i < pixels.length; i += stepSize * 4) {
      if (pixels[i + 3] < 128) continue; // Skip transparent
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      samples.push([r, g, b]);
      const key = `${r},${g},${b}`;
      colorCounts[key] = (colorCounts[key] || 0) + 1;
    }

    if (samples.length === 0) {
      return [[0, 0, 0]];
    }

    // Step 2: Initialize centroids with most popular colors
    const uniqueColors = Object.keys(colorCounts)
      .map(k => {
        const parts = k.split(',').map(Number);
        return {
          color: [parts[0], parts[1], parts[2]] as [number, number, number],
          count: colorCounts[k]
        };
      })
      .sort((a, b) => b.count - a.count);

    // Select up to maxColors distinct popular colors
    const centroids: [number, number, number][] = [];
    for (const uc of uniqueColors) {
      if (centroids.length >= maxColors) break;
      // Ensure we don't pick centroids that are too similar
      const isDistinct = centroids.every(c => this.colorDistSq(c, uc.color) > 400); // dist > 20
      if (isDistinct) {
        centroids.push(uc.color);
      }
    }

    // Fallback if not enough centroids
    while (centroids.length < Math.min(maxColors, uniqueColors.length)) {
      const remaining = uniqueColors.find(uc => !centroids.includes(uc.color));
      if (!remaining) break;
      centroids.push(remaining.color);
    }

    if (centroids.length === 0) {
      centroids.push([0, 0, 0]);
    }

    // Step 3: Run 3 iterations of K-Means to refine centroids
    const iterations = 3;
    for (let iter = 0; iter < iterations; iter++) {
      const sums = centroids.map(() => [0, 0, 0]);
      const counts = centroids.map(() => 0);

      for (const sample of samples) {
        let minDist = Infinity;
        let bestIdx = 0;
        for (let i = 0; i < centroids.length; i++) {
          const dist = this.colorDistSq(sample, centroids[i]);
          if (dist < minDist) {
            minDist = dist;
            bestIdx = i;
          }
        }
        sums[bestIdx][0] += sample[0];
        sums[bestIdx][1] += sample[1];
        sums[bestIdx][2] += sample[2];
        counts[bestIdx]++;
      }

      for (let i = 0; i < centroids.length; i++) {
        if (counts[i] > 0) {
          centroids[i] = [
            Math.round(sums[i][0] / counts[i]),
            Math.round(sums[i][1] / counts[i]),
            Math.round(sums[i][2] / counts[i])
          ];
        }
      }
    }

    return centroids;
  }

  /**
   * Helper to check if a pixel is background/transparent
   */
  private static isBgColor(
    c: [number, number, number],
    bgRef: [number, number, number] | null,
    alpha: number,
    threshold: number
  ): boolean {
    if (alpha < 128) return true;
    if (bgRef === null) return false;
    // Euclidean distance comparison
    const dist = Math.sqrt(this.colorDistSq(c, bgRef));
    return dist < threshold;
  }

  /**
   * Ramer-Douglas-Peucker Polyline Simplification
   */
  private static simplifyDP(points: [number, number][], tolerance: number): [number, number][] {
    if (points.length <= 2) return points;
    const sqTolerance = tolerance * tolerance;

    // Find the point furthest from the first point (since it's a closed loop)
    let maxSqDist = -1;
    let splitIdx = -1;
    const firstPoint = points[0];
    for (let i = 1; i < points.length; i++) {
      const dx = points[i][0] - firstPoint[0];
      const dy = points[i][1] - firstPoint[1];
      const sqDist = dx * dx + dy * dy;
      if (sqDist > maxSqDist) {
        maxSqDist = sqDist;
        splitIdx = i;
      }
    }

    if (splitIdx === -1 || maxSqDist <= sqTolerance) {
      return [firstPoint];
    }

    const result: [number, number][] = [];
    
    // Recursive solver for line segment
    const simplifyStep = (first: number, last: number) => {
      let maxSqSegDist = sqTolerance;
      let index = -1;
      
      const p1 = points[first];
      const p2 = points[last];
      const dx = p2[0] - p1[0];
      const dy = p2[1] - p1[1];
      const lenSq = dx * dx + dy * dy;

      for (let i = first + 1; i < last; i++) {
        const p = points[i];
        let sqSegDist = 0;
        
        if (lenSq === 0) {
          const ddx = p[0] - p1[0];
          const ddy = p[1] - p1[1];
          sqSegDist = ddx * ddx + ddy * ddy;
        } else {
          const t = ((p[0] - p1[0]) * dx + (p[1] - p1[1]) * dy) / lenSq;
          if (t < 0) {
            const ddx = p[0] - p1[0];
            const ddy = p[1] - p1[1];
            sqSegDist = ddx * ddx + ddy * ddy;
          } else if (t > 1) {
            const ddx = p[0] - p2[0];
            const ddy = p[1] - p2[1];
            sqSegDist = ddx * ddx + ddy * ddy;
          } else {
            const projX = p1[0] + dx * t;
            const projY = p1[1] + dy * t;
            const ddx = p[0] - projX;
            const ddy = p[1] - projY;
            sqSegDist = ddx * ddx + ddy * ddy;
          }
        }

        if (sqSegDist > maxSqSegDist) {
          index = i;
          maxSqSegDist = sqSegDist;
        }
      }

      if (index > -1) {
        simplifyStep(first, index);
        result.push(points[index]);
        simplifyStep(index, last);
      }
    };

    result.push(points[0]);
    simplifyStep(0, splitIdx);
    result.push(points[splitIdx]);
    simplifyStep(splitIdx, points.length - 1);
    result.push(points[points.length - 1]);

    return result;
  }

  /**
   * Core conversion process.
   * Runs asynchronously and reports progress via callback to maintain UI interactivity.
   */
  public static async convert(
    imgData: ImageData,
    options: TraceOptions,
    onProgress?: (percent: number, status: string) => void
  ): Promise<{ svg: string; stats: TraceStats }> {
    const W = imgData.width;
    const H = imgData.height;
    const pixels = imgData.data;

    if (onProgress) onProgress(5, "Quantizing colors...");
    await new Promise(r => setTimeout(r, 0));

    // 1. Color Quantization
    const palette = this.quantizeColors(pixels, options.colorCount, options.colorMode);
    
    // Auto-detect corner pixel for background removal reference
    let bgRefColor: [number, number, number] | null = null;
    if (options.removeBackground) {
      bgRefColor = [pixels[0], pixels[1], pixels[2]];
      // If corner is transparent, default reference to white
      if (pixels[3] < 128) {
        bgRefColor = [255, 255, 255];
      }
    }

    const bgThreshold = 10 + (100 - options.edgeSensitivity) * 0.8; // Map edge sensitivity to distance

    if (onProgress) onProgress(15, "Mapping image grid...");
    await new Promise(r => setTimeout(r, 0));

    // 2. Map pixels to color indices
    const grid = new Int16Array(W * H);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = (y * W + x) * 4;
        const alpha = pixels[idx + 3];
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const color: [number, number, number] = [r, g, b];

        if (alpha < 128 || (options.removeBackground && this.isBgColor(color, bgRefColor, alpha, bgThreshold))) {
          grid[y * W + x] = -1; // Background/Transparent
        } else {
          // Find nearest color in palette
          let minDist = Infinity;
          let bestIdx = 0;
          for (let i = 0; i < palette.length; i++) {
            const dist = this.colorDistSq(color, palette[i]);
            if (dist < minDist) {
              minDist = dist;
              bestIdx = i;
            }
          }
          grid[y * W + x] = bestIdx;
        }
      }
    }

    // 3. Trace boundaries for each color layer
    const pathElements: string[] = [];
    let totalPaths = 0;
    const totalLayers = palette.length;

    for (let cIdx = 0; cIdx < totalLayers; cIdx++) {
      if (onProgress) {
        const pct = 15 + Math.round((cIdx / totalLayers) * 70);
        onProgress(pct, `Tracing color layer ${cIdx + 1} of ${totalLayers}...`);
      }
      await new Promise(r => setTimeout(r, 0));

      // Build directed boundary edges for this layer
      // Nodes are encoded as y * 4096 + x
      const adj = new Map<number, number[]>();

      const addEdge = (u: number, v: number) => {
        let list = adj.get(u);
        if (!list) {
          list = [];
          adj.set(u, list);
        }
        list.push(v);
      };

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const isActive = grid[y * W + x] === cIdx;
          if (!isActive) continue;

          // Check 4 neighbors to determine boundaries
          // Above (y-1)
          const isAboveActive = y > 0 && grid[(y - 1) * W + x] === cIdx;
          if (!isAboveActive) {
            addEdge((y << 12) | x, (y << 12) | (x + 1));
          }
          // Right (x+1)
          const isRightActive = x < W - 1 && grid[y * W + (x + 1)] === cIdx;
          if (!isRightActive) {
            addEdge((y << 12) | (x + 1), ((y + 1) << 12) | (x + 1));
          }
          // Below (y+1)
          const isBelowActive = y < H - 1 && grid[(y + 1) * W + x] === cIdx;
          if (!isBelowActive) {
            addEdge(((y + 1) << 12) | (x + 1), ((y + 1) << 12) | x);
          }
          // Left (x-1)
          const isLeftActive = x > 0 && grid[y * W + (x - 1)] === cIdx;
          if (!isLeftActive) {
            addEdge(((y + 1) << 12) | x, (y << 12) | x);
          }
        }
      }

      // Decompose edges into loops
      const loops: [number, number][][] = [];
      for (const [startNode, edges] of adj) {
        while (edges.length > 0) {
          const path: number[] = [startNode];
          const pathSet = new Set<number>([startNode]);
          let curr = startNode;

          while (true) {
            const nextList = adj.get(curr);
            if (!nextList || nextList.length === 0) break;
            const next = nextList.pop()!;

            if (pathSet.has(next)) {
              const cycleStartIdx = path.indexOf(next);
              const cycleNodes = path.slice(cycleStartIdx);
              
              const loopCoords: [number, number][] = cycleNodes.map(node => [
                node & 0xFFF,
                node >> 12
              ]);
              loops.push(loopCoords);

              for (let i = cycleStartIdx; i < path.length; i++) {
                pathSet.delete(path[i]);
              }
              path.length = cycleStartIdx;

              if (path.length === 0) break;
              curr = path[path.length - 1];
            } else {
              path.push(next);
              pathSet.add(next);
              curr = next;
            }
          }
        }
      }

      if (loops.length === 0) continue;

      // Simplify loops
      const dpTolerance = options.simplify * 0.6; // Scale simplify factor (0 to 3.0px)
      const simplifiedLoops = loops.map(loop => {
        if (dpTolerance === 0) return loop;
        return this.simplifyDP(loop, dpTolerance);
      }).filter(loop => loop.length >= 3);

      if (simplifiedLoops.length === 0) continue;

      // Construct path data
      let pathData = '';
      const tension = options.smoothing / 100; // 0 to 1

      for (const loop of simplifiedLoops) {
        // Remove duplicate endpoint if present
        if (loop.length > 1 && loop[0][0] === loop[loop.length - 1][0] && loop[0][1] === loop[loop.length - 1][1]) {
          loop.pop();
        }
        if (loop.length < 3) continue;

        const N = loop.length;
        pathData += `M${loop[0][0].toFixed(1)} ${loop[0][1].toFixed(1)}`;

        if (tension === 0) {
          // Sharp straight lines
          for (let i = 1; i < N; i++) {
            pathData += `L${loop[i][0].toFixed(1)} ${loop[i][1].toFixed(1)}`;
          }
        } else {
          // Fit Bézier Curves
          for (let i = 0; i < N; i++) {
            const p = loop[i];
            const pPrev = loop[(i - 1 + N) % N];
            const pNext = loop[(i + 1) % N];
            const pNext2 = loop[(i + 2) % N];

            const dx1 = pNext[0] - pPrev[0];
            const dy1 = pNext[1] - pPrev[1];
            const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) || 0.001;

            const dx2 = pNext2[0] - p[0];
            const dy2 = pNext2[1] - p[1];
            const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) || 0.001;

            const segLen = Math.sqrt((pNext[0] - p[0]) ** 2 + (pNext[1] - p[1]) ** 2);
            const scale = (tension / 3.0) * segLen;

            const cp1X = p[0] + (dx1 / len1) * scale;
            const cp1Y = p[1] + (dy1 / len1) * scale;

            const cp2X = pNext[0] - (dx2 / len2) * scale;
            const cp2Y = pNext[1] - (dy2 / len2) * scale;

            pathData += `C${cp1X.toFixed(1)} ${cp1Y.toFixed(1)},${cp2X.toFixed(1)} ${cp2Y.toFixed(1)},${pNext[0].toFixed(1)} ${pNext[1].toFixed(1)}`;
          }
        }
        pathData += 'Z';
        totalPaths++;
      }

      if (pathData) {
        const rgb = palette[cIdx];
        const hex = '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
        
        if (options.mode === 'lineart') {
          const sCol = options.strokeColor || '#000000';
          const sWid = options.strokeWidth || 2;
          pathElements.push(`<path d="${pathData}" fill="none" stroke="${sCol}" stroke-width="${sWid}" stroke-linecap="round" stroke-linejoin="round" />`);
        } else {
          pathElements.push(`<path d="${pathData}" fill="${hex}" />`);
        }
      }
    }

    if (onProgress) onProgress(90, "Assembling SVG document...");
    await new Promise(r => setTimeout(r, 0));

    // 4. Build output SVG markup
    // Wrap paths in viewBox, include fill-rule="evenodd" to handle holes correctly
    const svgContent = pathElements.join('\n  ');
    const svgDoc = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="100%" fill-rule="evenodd" clip-rule="evenodd">
  ${svgContent}
</svg>`;

    const finalSvg = svgDoc;
    const finalSize = new Blob([finalSvg]).size;

    // Calculate an optimization score based on path efficiency
    // Formula: Ratio of path size to overall output dimensions, scaled by simplification
    const baseRatio = Math.min(100, Math.round(100 - (totalPaths / (W * H)) * 1000));
    const optScore = Math.max(10, Math.min(100, baseRatio + options.simplify * 8));

    if (onProgress) onProgress(100, "Done!");

    return {
      svg: finalSvg,
      stats: {
        pathCount: totalPaths,
        colorCount: totalLayers,
        fileSize: finalSize,
        optimizationScore: optScore
      }
    };
  }
}
