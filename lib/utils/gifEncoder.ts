// Self-contained client-side LZW GIF encoder and color quantizer (TypeScript Port of gifenc)

export interface GIFEncoderOptions {
  initialCapacity?: number;
  auto?: boolean;
}

export interface WriteFrameOptions {
  transparent?: boolean;
  transparentIndex?: number;
  delay?: number;
  palette?: number[][];
  repeat?: number;
  colorDepth?: number;
  dispose?: number;
  first?: boolean;
}

export interface QuantizeOptions {
  format?: 'rgb565' | 'rgba4444' | 'rgb444';
  clearAlpha?: boolean;
  clearAlphaColor?: number;
  clearAlphaThreshold?: number;
  oneBitAlpha?: boolean | number;
  useSqrt?: boolean;
}

// ═══════════════════════════════════════════════════════
// Expandable Byte Buffer Stream Helper
// ═══════════════════════════════════════════════════════
function createBuffer(capacity = 256) {
  let pos = 0;
  let buf = new Uint8Array(capacity);

  function ensureCapacity(needed: number) {
    const len = buf.length;
    if (len >= needed) return;
    const maxLimit = 1024 * 1024;
    const nextSize = Math.max(needed, len * (len < maxLimit ? 2 : 1.125) >>> 0);
    const oldBuf = buf;
    buf = new Uint8Array(nextSize);
    if (pos > 0) {
      buf.set(oldBuf.subarray(0, pos), 0);
    }
  }

  return {
    get buffer() { return buf.buffer; },
    reset() { pos = 0; },
    bytesView() { return buf.subarray(0, pos); },
    bytes() { return buf.slice(0, pos); },
    writeByte(val: number) {
      ensureCapacity(pos + 1);
      buf[pos] = val;
      pos++;
    },
    writeBytes(arr: Uint8Array | number[], offset = 0, length = arr.length) {
      ensureCapacity(pos + length);
      for (let i = 0; i < length; i++) {
        buf[pos++] = arr[i + offset];
      }
    },
    writeBytesView(arr: Uint8Array, offset = 0, length = arr.byteLength) {
      ensureCapacity(pos + length);
      buf.set(arr.subarray(offset, offset + length), pos);
      pos += length;
    }
  };
}

type StreamType = ReturnType<typeof createBuffer>;

// ═══════════════════════════════════════════════════════
// LZW Compression Engine
// ═══════════════════════════════════════════════════════
const LZW_MAX_BITS = 12;
const HASH_SIZE = 5003;
const MASK_TABLE = [
  0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535
];

function lzwEncode(
  width: number,
  height: number,
  indexedPixels: Uint8Array,
  colorDepth: number,
  stream: StreamType,
  obuf = new Uint8Array(256),
  htab = new Int32Array(HASH_SIZE),
  codetab = new Int32Array(HASH_SIZE)
) {
  const initCodeSize = Math.max(2, colorDepth);
  obuf.fill(0);
  codetab.fill(0);
  htab.fill(-1);

  let cur_accum = 0;
  let cur_bits = 0;
  let n_bits = initCodeSize + 1;
  let maxcode = (1 << n_bits) - 1;
  let clear_flg = false;
  const g_init_bits = n_bits;
  const clear_code = 1 << (g_init_bits - 1);
  const EOF_code = clear_code + 1;
  let free_ent = clear_code + 2;
  let a_count = 0;
  let ent = indexedPixels[0];
  let shft = 0;

  for (let y = HASH_SIZE; y < 65536; y *= 2) ++shft;
  shft = 8 - shft;
  stream.writeByte(initCodeSize);
  output(clear_code);

  const len = indexedPixels.length;
  for (let i = 1; i < len; i++) {
    const m = indexedPixels[i];
    const fcode = (m << LZW_MAX_BITS) + ent;
    let idx = (m << shft) ^ ent;
    if (htab[idx] === fcode) {
      ent = codetab[idx];
      continue;
    }
    const disp = idx === 0 ? 1 : HASH_SIZE - idx;
    while (htab[idx] >= 0) {
      idx -= disp;
      if (idx < 0) idx += HASH_SIZE;
      if (htab[idx] === fcode) {
        ent = codetab[idx];
        break;
      }
    }
    if (htab[idx] !== fcode) {
      output(ent);
      ent = m;
      if (free_ent < (1 << LZW_MAX_BITS)) {
        codetab[idx] = free_ent++;
        htab[idx] = fcode;
      } else {
        htab.fill(-1);
        free_ent = clear_code + 2;
        clear_flg = true;
        output(clear_code);
      }
    }
  }

  output(ent);
  output(EOF_code);
  stream.writeByte(0);
  return stream.bytesView();

  function output(code: number) {
    cur_accum &= MASK_TABLE[cur_bits];
    if (cur_bits > 0) {
      cur_accum |= code << cur_bits;
    } else {
      cur_accum = code;
    }
    cur_bits += n_bits;

    while (cur_bits >= 8) {
      obuf[a_count++] = cur_accum & 255;
      if (a_count >= 254) {
        stream.writeByte(a_count);
        stream.writeBytesView(obuf, 0, a_count);
        a_count = 0;
      }
      cur_accum >>= 8;
      cur_bits -= 8;
    }

    if (free_ent > maxcode || clear_flg) {
      if (clear_flg) {
        n_bits = g_init_bits;
        maxcode = (1 << n_bits) - 1;
        clear_flg = false;
      } else {
        ++n_bits;
        if (n_bits === LZW_MAX_BITS) {
          maxcode = 1 << n_bits;
        } else {
          maxcode = (1 << n_bits) - 1;
        }
      }
    }

    if (code === EOF_code) {
      while (cur_bits > 0) {
        obuf[a_count++] = cur_accum & 255;
        if (a_count >= 254) {
          stream.writeByte(a_count);
          stream.writeBytesView(obuf, 0, a_count);
          a_count = 0;
        }
        cur_accum >>= 8;
        cur_bits -= 8;
      }
      if (a_count > 0) {
        stream.writeByte(a_count);
        stream.writeBytesView(obuf, 0, a_count);
        a_count = 0;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════
// Quantization Helpers
// ═══════════════════════════════════════════════════════
function rgb565Key(r: number, g: number, b: number) {
  return (r << 8 & 63488) | (g << 2 & 992) | (b >> 3);
}

function rgba4444Key(r: number, g: number, b: number, a: number) {
  return (r >> 4) | (g & 240) | ((b & 240) << 4) | ((a & 240) << 8);
}

function rgb444Key(r: number, g: number, b: number) {
  return ((r >> 4) << 8) | (g & 240) | (b >> 4);
}

function clampVal(t: number, min: number, max: number) {
  return t < min ? min : t > max ? max : t;
}

function sqr(t: number) {
  return t * t;
}

function distSq(c1: number[], c2: number[]) {
  let s = 0;
  for (let n = 0; n < c1.length; n++) {
    const r = c1[n] - c2[n];
    s += r * r;
  }
  return s;
}

interface QuantizeNode {
  ac: number;
  rc: number;
  gc: number;
  bc: number;
  cnt: number;
  nn: number;
  fw: number;
  bk: number;
  tm: number;
  mtm: number;
  err: number;
}

function createQuantizeNode(): QuantizeNode {
  return { ac: 0, rc: 0, gc: 0, bc: 0, cnt: 0, nn: 0, fw: 0, bk: 0, tm: 0, mtm: 0, err: 0 };
}

function calculateError(nodes: QuantizeNode[], index: number, useSqrt: boolean) {
  let bestIdx = 0;
  let minDist = 1e100;
  const node = nodes[index];
  const cnt = node.cnt;
  const ac = node.ac;
  const rc = node.rc;
  const gc = node.gc;
  const bc = node.bc;

  for (let next = node.fw; next !== 0; next = nodes[next].fw) {
    const h = nodes[next];
    const b = h.cnt;
    const w = (cnt * b) / (cnt + b);
    if (w >= minDist) continue;

    let d = 0;
    if (useSqrt) {
      d += w * sqr(h.ac - ac);
      if (d >= minDist) continue;
      d += w * sqr(h.rc - rc);
      if (d >= minDist) continue;
      d += w * sqr(h.gc - gc);
      if (d >= minDist) continue;
      d += w * sqr(h.bc - bc);
      if (d < minDist) {
        minDist = d;
        bestIdx = next;
      }
    } else {
      d += w * sqr(h.ac - ac) + w * sqr(h.rc - rc) + w * sqr(h.gc - gc) + w * sqr(h.bc - bc);
      if (d < minDist) {
        minDist = d;
        bestIdx = next;
      }
    }
  }
  node.err = minDist;
  node.nn = bestIdx;
}

export function quantize(rgba: Uint8Array | Uint8ClampedArray, maxColors: number, options: QuantizeOptions = {}) {
  if (!rgba || !rgba.buffer) throw new Error("quantize() expected RGBA data buffer");
  const {
    format = 'rgb565',
    clearAlpha = true,
    clearAlphaColor = 0,
    clearAlphaThreshold = 0,
    oneBitAlpha = false,
    useSqrt = true
  } = options;

  const pixels = new Uint32Array(rgba.buffer);
  const isRGBA4444 = format === 'rgba4444';
  const tableSize = format === 'rgb444' ? 4096 : 65536;
  const nodes: (QuantizeNode | null)[] = new Array(tableSize).fill(null);
  const len = pixels.length;

  if (isRGBA4444) {
    for (let o = 0; o < len; ++o) {
      const pixel = pixels[o];
      const a = (pixel >> 24) & 255;
      const b = (pixel >> 16) & 255;
      const g = (pixel >> 8) & 255;
      const r = pixel & 255;
      const key = rgba4444Key(r, g, b, a);
      const node = nodes[key] || (nodes[key] = createQuantizeNode());
      node.rc += r;
      node.gc += g;
      node.bc += b;
      node.ac += a;
      node.cnt++;
    }
  } else if (format === 'rgb444') {
    for (let o = 0; o < len; ++o) {
      const pixel = pixels[o];
      const b = (pixel >> 16) & 255;
      const g = (pixel >> 8) & 255;
      const r = pixel & 255;
      const key = rgb444Key(r, g, b);
      const node = nodes[key] || (nodes[key] = createQuantizeNode());
      node.rc += r;
      node.gc += g;
      node.bc += b;
      node.cnt++;
    }
  } else {
    for (let o = 0; o < len; ++o) {
      const pixel = pixels[o];
      const b = (pixel >> 16) & 255;
      const g = (pixel >> 8) & 255;
      const r = pixel & 255;
      const key = rgb565Key(r, g, b);
      const node = nodes[key] || (nodes[key] = createQuantizeNode());
      node.rc += r;
      node.gc += g;
      node.bc += b;
      node.cnt++;
    }
  }

  const validNodes: QuantizeNode[] = [];
  let w = 0;
  for (let u = 0; u < tableSize; ++u) {
    const node = nodes[u];
    if (node !== null) {
      const factor = 1 / node.cnt;
      if (isRGBA4444) node.ac *= factor;
      node.rc *= factor;
      node.gc *= factor;
      node.bc *= factor;
      validNodes[w++] = node;
    }
  }

  const activeNodesCount = w;
  let useSqrtCalc = useSqrt;
  if (sqr(maxColors) / activeNodesCount < 0.022) {
    useSqrtCalc = false;
  }

  for (let u = 0; u < activeNodesCount - 1; ++u) {
    validNodes[u].fw = u + 1;
    validNodes[u + 1].bk = u;
    if (useSqrtCalc) validNodes[u].cnt = Math.sqrt(validNodes[u].cnt);
  }
  if (useSqrtCalc && activeNodesCount > 0) {
    validNodes[activeNodesCount - 1].cnt = Math.sqrt(validNodes[activeNodesCount - 1].cnt);
  }

  const heap = new Uint32Array(activeNodesCount + 1);
  for (let u = 0; u < activeNodesCount; ++u) {
    calculateError(validNodes, u, useSqrtCalc);
    const err = validNodes[u].err;
    let bIdx = ++heap[0];
    let parent = 0;
    while (bIdx > 1 && (parent = bIdx >> 1, !(validNodes[heap[parent]].err <= err))) {
      heap[bIdx] = heap[parent];
      bIdx = parent;
    }
    heap[bIdx] = u;
  }

  const steps = activeNodesCount - maxColors;
  const limitNodeIdx = tableSize - 1;

  for (let u = 0; u < steps; ) {
    let targetNode: QuantizeNode;
    while (true) {
      const rootIdx = heap[1];
      targetNode = validNodes[rootIdx];
      if (targetNode.tm >= targetNode.mtm && validNodes[targetNode.nn].mtm <= targetNode.tm) break;

      if (targetNode.mtm === limitNodeIdx) {
        heap[1] = heap[heap[0]--];
      } else {
        calculateError(validNodes, rootIdx, useSqrtCalc);
        targetNode.tm = u;
      }
      const err = targetNode.err;
      let bIdx = 1;
      let child = 0;
      while ((child = bIdx + bIdx) <= heap[0]) {
        if (child < heap[0] && validNodes[heap[child]].err > validNodes[heap[child + 1]].err) child++;
        if (err <= validNodes[heap[child]].err) break;
        heap[bIdx] = heap[child];
        bIdx = child;
      }
      heap[bIdx] = rootIdx;
    }

    const mergeNode = validNodes[targetNode.nn];
    const m1 = targetNode.cnt;
    const m2 = mergeNode.cnt;
    const invCount = 1 / (m1 + m2);

    if (isRGBA4444) {
      targetNode.ac = invCount * (m1 * targetNode.ac + m2 * mergeNode.ac);
    }
    targetNode.rc = invCount * (m1 * targetNode.rc + m2 * mergeNode.rc);
    targetNode.gc = invCount * (m1 * targetNode.gc + m2 * mergeNode.gc);
    targetNode.bc = invCount * (m1 * targetNode.bc + m2 * mergeNode.bc);
    targetNode.cnt += mergeNode.cnt;
    targetNode.mtm = ++u;

    validNodes[mergeNode.bk].fw = mergeNode.fw;
    validNodes[mergeNode.fw].bk = mergeNode.bk;
    mergeNode.mtm = limitNodeIdx;
  }

  const palette: number[][] = [];
  let u = 0;
  while (true) {
    let rVal = clampVal(Math.round(validNodes[u].rc), 0, 255);
    let gVal = clampVal(Math.round(validNodes[u].gc), 0, 255);
    let bVal = clampVal(Math.round(validNodes[u].bc), 0, 255);
    let aVal = 255;
    if (isRGBA4444) {
      aVal = clampVal(Math.round(validNodes[u].ac), 0, 255);
      if (oneBitAlpha) {
        const threshold = typeof oneBitAlpha === 'number' ? oneBitAlpha : 127;
        aVal = aVal <= threshold ? 0 : 255;
      }
      if (clearAlpha && aVal <= clearAlphaThreshold) {
        rVal = gVal = bVal = clearAlphaColor;
        aVal = 0;
      }
    }
    const color = isRGBA4444 ? [rVal, gVal, bVal, aVal] : [rVal, gVal, bVal];
    if (!paletteExists(palette, color)) {
      palette.push(color);
    }
    u = validNodes[u].fw;
    if (u === 0) break;
  }
  return palette;
}

function paletteExists(palette: number[][], color: number[]) {
  const len = palette.length;
  for (let i = 0; i < len; i++) {
    const c = palette[i];
    const rgbMatch = c[0] === color[0] && c[1] === color[1] && c[2] === color[2];
    const alphaMatch = c.length >= 4 && color.length >= 4 ? c[3] === color[3] : true;
    if (rgbMatch && alphaMatch) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════════
// Apply Palette mapping
// ═══════════════════════════════════════════════════════
export function applyPalette(rgba: Uint8Array | Uint8ClampedArray, palette: number[][], format = 'rgb565'): Uint8Array {
  if (!rgba || !rgba.buffer) throw new Error("applyPalette() expected RGBA data");
  if (palette.length > 256) throw new Error("applyPalette() only works with 256 colors or less");

  const pixels = new Uint32Array(rgba.buffer);
  const rLen = pixels.length;
  const hashSize = format === 'rgb444' ? 4096 : 65536;
  const indices = new Uint8Array(rLen);
  const cache = new Array(hashSize);
  const isRGBA4444 = format === 'rgba4444';

  if (isRGBA4444) {
    for (let a = 0; a < rLen; a++) {
      const p = pixels[a];
      const alpha = (p >> 24) & 255;
      const b = (p >> 16) & 255;
      const g = (p >> 8) & 255;
      const r = p & 255;
      const key = rgba4444Key(r, g, b, alpha);
      let mapped = cache[key];
      if (mapped === undefined) {
        mapped = findNearestColorRGBA(r, g, b, alpha, palette);
        cache[key] = mapped;
      }
      indices[a] = mapped;
    }
  } else {
    const keyFunc = format === 'rgb444' ? rgb444Key : rgb565Key;
    for (let l = 0; l < rLen; l++) {
      const p = pixels[l];
      const b = (p >> 16) & 255;
      const g = (p >> 8) & 255;
      const r = p & 255;
      const key = keyFunc(r, g, b);
      let mapped = cache[key];
      if (mapped === undefined) {
        mapped = findNearestColorRGB(r, g, b, palette);
        cache[key] = mapped;
      }
      indices[l] = mapped;
    }
  }
  return indices;
}

function findNearestColorRGBA(r: number, g: number, b: number, a: number, palette: number[][]) {
  let index = 0;
  let minDist = 1e100;
  const pLen = palette.length;
  for (let c = 0; c < pLen; c++) {
    const color = palette[c];
    const alphaVal = color[3] ?? 255;
    let dist = sqr(alphaVal - a);
    if (dist > minDist) continue;
    dist += sqr(color[0] - r);
    if (dist > minDist) continue;
    dist += sqr(color[1] - g);
    if (dist > minDist) continue;
    dist += sqr(color[2] - b);
    if (dist < minDist) {
      minDist = dist;
      index = c;
    }
  }
  return index;
}

function findNearestColorRGB(r: number, g: number, b: number, palette: number[][]) {
  let index = 0;
  let minDist = 1e100;
  const pLen = palette.length;
  for (let c = 0; c < pLen; c++) {
    const color = palette[c];
    let dist = sqr(color[0] - r);
    if (dist > minDist) continue;
    dist += sqr(color[1] - g);
    if (dist > minDist) continue;
    dist += sqr(color[2] - b);
    if (dist < minDist) {
      minDist = dist;
      index = c;
    }
  }
  return index;
}

// ═══════════════════════════════════════════════════════
// GIF Encoder Output Builder
// ═══════════════════════════════════════════════════════
export function GIFEncoder(options: GIFEncoderOptions = {}) {
  const { initialCapacity = 4096, auto = true } = options;
  const stream = createBuffer(initialCapacity);
  const htab = new Int32Array(HASH_SIZE);
  const codetab = new Int32Array(HASH_SIZE);
  const obuf = new Uint8Array(256);
  let isHeaderWritten = false;

  return {
    reset() {
      stream.reset();
      isHeaderWritten = false;
    },
    finish() {
      // GIF trailer
      stream.writeByte(0x3B);
    },
    bytes() {
      return stream.bytes();
    },
    bytesView() {
      return stream.bytesView();
    },
    get buffer() {
      return stream.buffer;
    },
    get stream() {
      return stream;
    },
    writeHeader() {
      writeString(stream, "GIF89a");
    },
    writeFrame(indexedPixels: Uint8Array, width: number, height: number, frameOpts: WriteFrameOptions = {}) {
      const {
        transparent = false,
        transparentIndex = 0,
        delay = 0,
        palette = null,
        repeat = 0,
        colorDepth = 8,
        dispose = -1,
        first = false
      } = frameOpts;

      let isFirstFrame = false;
      if (auto) {
        if (!isHeaderWritten) {
          isFirstFrame = true;
          writeString(stream, "GIF89a");
          isHeaderWritten = true;
        }
      } else {
        isFirstFrame = Boolean(first);
      }

      width = Math.max(0, Math.floor(width));
      height = Math.max(0, Math.floor(height));

      if (isFirstFrame) {
        if (!palette) throw new Error("First frame must include a { palette } option");
        writeLogicalScreenDescriptor(stream, width, height, palette, colorDepth);
        writeGlobalColorTable(stream, palette);
        if (repeat >= 0) {
          writeNetscapeLoopingExtension(stream, repeat);
        }
      }

      const hundredthsOfSecond = Math.round(delay / 10);
      writeGraphicControlExtension(stream, dispose, hundredthsOfSecond, transparent, transparentIndex);

      const hasLocalPalette = Boolean(palette) && !isFirstFrame;
      writeImageDescriptor(stream, width, height, hasLocalPalette ? palette : null);
      if (hasLocalPalette && palette) {
        writeGlobalColorTable(stream, palette);
      }

      lzwEncode(width, height, indexedPixels, colorDepth, stream, obuf, htab, codetab);
    }
  };
}

function writeGraphicControlExtension(
  stream: StreamType,
  dispose: number,
  delay: number,
  transparent: boolean,
  transparentIndex: number
) {
  stream.writeByte(0x21); // extension introducer
  stream.writeByte(0xF9); // graphic control label
  stream.writeByte(4);    // block size

  let disposalMethod = 0;
  if (dispose >= 0) {
    disposalMethod = dispose & 7; // disposal method (0-3)
  }
  const transparentFlag = transparent ? 1 : 0;
  const packedFields = (disposalMethod << 2) | transparentFlag;

  stream.writeByte(packedFields);
  writeShort(stream, delay); // delay time (1/100ths of second)
  stream.writeByte(transparentIndex || 0); // transparent color index
  stream.writeByte(0); // block terminator
}

function writeLogicalScreenDescriptor(
  stream: StreamType,
  width: number,
  height: number,
  palette: number[][],
  colorDepth = 8
) {
  writeShort(stream, width);
  writeShort(stream, height);

  const globalColorTableFlag = 1;
  const sortFlag = 0;
  const colorTableSizeExponent = Math.max(Math.ceil(Math.log2(palette.length)), 1) - 1;
  const packedFields = (globalColorTableFlag << 7) | ((colorDepth - 1) << 4) | (sortFlag << 3) | colorTableSizeExponent;

  const backgroundColorIndex = 0;
  const pixelAspectRatio = 0;

  stream.writeBytes([packedFields, backgroundColorIndex, pixelAspectRatio]);
}

function writeNetscapeLoopingExtension(stream: StreamType, repeat: number) {
  stream.writeByte(0x21); // extension introducer
  stream.writeByte(0xFF); // application extension label
  stream.writeByte(11);   // block size
  writeString(stream, "NETSCAPE2.0");
  stream.writeByte(3);    // sub-block size
  stream.writeByte(1);    // loop sub-block ID
  writeShort(stream, repeat); // repeat count (0 = infinite)
  stream.writeByte(0);    // block terminator
}

function writeGlobalColorTable(stream: StreamType, palette: number[][]) {
  const exponent = Math.max(Math.ceil(Math.log2(palette.length)), 1);
  const colorCount = 1 << exponent;
  for (let n = 0; n < colorCount; n++) {
    let rgb = [0, 0, 0];
    if (n < palette.length) {
      rgb = palette[n];
    }
    stream.writeByte(rgb[0]);
    stream.writeByte(rgb[1]);
    stream.writeByte(rgb[2]);
  }
}

function writeImageDescriptor(stream: StreamType, width: number, height: number, localPalette: number[][] | null) {
  stream.writeByte(0x2C); // image separator
  writeShort(stream, 0);  // image left position
  writeShort(stream, 0);  // image top position
  writeShort(stream, width);
  writeShort(stream, height);

  if (localPalette) {
    const localColorTableFlag = 1;
    const interlaceFlag = 0;
    const sortFlag = 0;
    const exponent = Math.max(Math.ceil(Math.log2(localPalette.length)), 1) - 1;
    const packed = (localColorTableFlag << 7) | (interlaceFlag << 6) | (sortFlag << 5) | exponent;
    stream.writeByte(packed);
  } else {
    stream.writeByte(0);
  }
}

function writeShort(stream: StreamType, val: number) {
  stream.writeByte(val & 255);
  stream.writeByte((val >> 8) & 255);
}

function writeString(stream: StreamType, str: string) {
  for (let i = 0; i < str.length; i++) {
    stream.writeByte(str.charCodeAt(i));
  }
}
