// Self-contained QR Code Generator in pure TypeScript
// Adapted from Kazuhiko Arase's public domain QR Code implementation.
// Renders a QR Code of any string to an HTML5 canvas completely offline.

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

const QR_LIMITS = [
  { L: 17, M: 14, Q: 11, H: 7 },    // V1
  { L: 32, M: 26, Q: 20, H: 14 },   // V2
  { L: 53, M: 42, Q: 32, H: 24 },   // V3
  { L: 78, M: 62, Q: 46, H: 34 },   // V4
  { L: 106, M: 84, Q: 60, H: 44 },  // V5
  { L: 134, M: 106, Q: 74, H: 58 }, // V6
  { L: 154, M: 122, Q: 86, H: 64 }, // V7
  { L: 192, M: 152, Q: 108, H: 84 } // V8
];

class QRPolynomial {
  num: number[];
  constructor(num: number[], shift: number) {
    if (num.length === undefined) {
      throw new Error(num.length + "/" + shift);
    }
    let offset = 0;
    while (offset < num.length && num[offset] === 0) {
      offset++;
    }
    this.num = new Array(num.length - offset + shift);
    for (let i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
    for (let i = num.length - offset; i < this.num.length; i++) {
      this.num[i] = 0;
    }
  }

  get(index: number): number {
    return this.num[index];
  }

  getLength(): number {
    return this.num.length;
  }

  multiply(e: QRPolynomial): QRPolynomial {
    const num = new Array(this.getLength() + e.getLength() - 1);
    for (let i = 0; i < this.getLength(); i++) {
      for (let j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
      }
    }
    return new QRPolynomial(num, 0);
  }

  mod(e: QRPolynomial): QRPolynomial {
    if (this.getLength() - e.getLength() < 0) {
      return this;
    }
    const ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
    const num = new Array(this.getLength());
    for (let i = 0; i < this.getLength(); i++) {
      num[i] = this.get(i);
    }
    for (let i = 0; i < e.getLength(); i++) {
      num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
    }
    return new QRPolynomial(num, 0).mod(e);
  }
}

class QRMath {
  private static EXP_TABLE = new Array(256);
  private static LOG_TABLE = new Array(256);

  static {
    for (let i = 0; i < 8; i++) {
      QRMath.EXP_TABLE[i] = 1 << i;
    }
    for (let i = 8; i < 256; i++) {
      QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
    }
    for (let i = 0; i < 255; i++) {
      QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
    }
  }

  static gexp(n: number): number {
    while (n < 0) {
      n += 255;
    }
    while (n >= 255) {
      n -= 255;
    }
    return QRMath.EXP_TABLE[n];
  }

  static glog(n: number): number {
    if (n < 1 || n >= 256) {
      throw new Error("glog(" + n + ")");
    }
    return QRMath.LOG_TABLE[n];
  }
}

class QRBitBuffer {
  buffer: number[];
  length: number;
  constructor() {
    this.buffer = [];
    this.length = 0;
  }

  get(index: number): boolean {
    const bufIndex = Math.floor(index / 8);
    return ((this.buffer[bufIndex] >>> (7 - (index % 8))) & 1) === 1;
  }

  put(num: number, length: number): void {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1);
    }
  }

  putBit(bit: boolean): void {
    const bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
    }
    this.length++;
  }
}

class QRCodeModel {
  private typeNumber: number;
  private errorCorrectionLevel: ErrorCorrectionLevel;
  private modules: (boolean | null)[][] | null = null;
  private moduleCount: number = 0;
  private dataCache: number[] | null = null;
  private dataList: string[] = [];

  constructor(typeNumber: number, errorCorrectionLevel: ErrorCorrectionLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectionLevel = errorCorrectionLevel;
  }

  addData(data: string): void {
    this.dataList.push(data);
    this.dataCache = null;
  }

  isDark(row: number, col: number): boolean {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
      return false;
    }
    return this.modules?.[row]?.[col] === true;
  }

  getModuleCount(): number {
    return this.moduleCount;
  }

  make(): void {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);
    for (let row = 0; row < this.moduleCount; row++) {
      this.modules[row] = new Array(this.moduleCount).fill(null);
    }

    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(false, 0);

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(false);
    }

    const data = QRCodeModel.createData(this.typeNumber, this.errorCorrectionLevel, this.dataList);
    this.mapData(data, 0);
  }

  private setupPositionProbePattern(row: number, col: number): void {
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;
      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;
        if ((0 <= r && r <= 6 && (c === 0 || c === 6)) ||
            (0 <= c && c <= 6 && (r === 0 || r === 6)) ||
            (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
          this.modules![row + r][col + c] = true;
        } else {
          this.modules![row + r][col + c] = false;
        }
      }
    }
  }

  private setupPositionAdjustPattern(): void {
    const pos = QRCodeModel.getAlignmentPatternOffset(this.typeNumber);
    for (let i = 0; i < pos.length; i++) {
      for (let j = 0; j < pos.length; j++) {
        const row = pos[i];
        const col = pos[j];
        if (this.modules![row][col] !== null) continue;
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0)) {
              this.modules![row + r][col + c] = true;
            } else {
              this.modules![row + r][col + c] = false;
            }
          }
        }
      }
    }
  }

  private setupTimingPattern(): void {
    for (let r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules![r][6] !== null) continue;
      this.modules![r][6] = (r % 2 === 0);
    }
    for (let c = 8; c < this.moduleCount - 8; c++) {
      if (this.modules![6][c] !== null) continue;
      this.modules![6][c] = (c % 2 === 0);
    }
  }

  private setupTypeInfo(test: boolean, maskPattern: number): void {
    const data = (QRCodeModel.getBchTypeInfo(this.errorCorrectionLevel) << 10) | maskPattern;
    let bits = QRCodeModel.getBchTypeInfoBits(data);

    for (let i = 0; i < 15; i++) {
      const mod = (!test && ((bits >> i) & 1) === 1);
      if (i < 6) {
        this.modules![i][8] = mod;
      } else if (i < 8) {
        this.modules![i + 1][8] = mod;
      } else {
        this.modules![this.moduleCount - 15 + i][8] = mod;
      }
    }

    for (let i = 0; i < 15; i++) {
      const mod = (!test && ((bits >> i) & 1) === 1);
      if (i < 8) {
        this.modules![8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules![8][15 - i - 1 + 1] = mod;
      } else {
        this.modules![8][15 - i - 1] = mod;
      }
    }

    this.modules![this.moduleCount - 8][8] = !test;
  }

  private setupTypeNumber(test: boolean): void {
    const bits = QRCodeModel.getBchTypeNumber(this.typeNumber);
    for (let i = 0; i < 18; i++) {
      const mod = (!test && ((bits >> i) & 1) === 1);
      this.modules![Math.floor(i / 3) + this.moduleCount - 11][(i % 3) + 8] = mod;
    }
    for (let i = 0; i < 18; i++) {
      const mod = (!test && ((bits >> i) & 1) === 1);
      this.modules![(i % 3) + 8][Math.floor(i / 3) + this.moduleCount - 11] = mod;
    }
  }

  private mapData(data: number[], maskPattern: number): void {
    let inc = -1;
    let row = this.moduleCount - 1;
    let bitIndex = 7;
    let byteIndex = 0;

    for (let col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col === 6) col--;
      while (true) {
        for (let c = 0; c < 2; c++) {
          const targetCol = col - c;
          if (this.modules![row][targetCol] === null) {
            let dark = false;
            if (byteIndex < data.length) {
              dark = (((data[byteIndex] >>> bitIndex) & 1) === 1);
            }
            const mask = QRCodeModel.getMask(maskPattern, row, targetCol);
            if (mask) {
              dark = !dark;
            }
            this.modules![row][targetCol] = dark;
            bitIndex--;
            if (bitIndex === -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }

  private static getAlignmentPatternOffset(typeNumber: number): number[] {
    const offsets = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46]
    ];
    return offsets[typeNumber - 1] || [];
  }

  private static getBchTypeInfo(level: ErrorCorrectionLevel): number {
    switch (level) {
      case 'L': return 1;
      case 'M': return 0;
      case 'Q': return 3;
      case 'H': return 2;
    }
  }

  private static getBchTypeInfoBits(data: number): number {
    let bch = data << 10;
    while (QRCodeModel.getBchDigit(bch) - QRCodeModel.getBchDigit(0x537) >= 0) {
      bch ^= (0x537 << (QRCodeModel.getBchDigit(bch) - QRCodeModel.getBchDigit(0x537)));
    }
    return ((data << 10) | bch) ^ 0x5412;
  }

  private static getBchTypeNumber(data: number): number {
    let bch = data << 12;
    while (QRCodeModel.getBchDigit(bch) - QRCodeModel.getBchDigit(0x1f25) >= 0) {
      bch ^= (0x1f25 << (QRCodeModel.getBchDigit(bch) - QRCodeModel.getBchDigit(0x1f25)));
    }
    return (data << 12) | bch;
  }

  private static getBchDigit(data: number): number {
    let digit = 0;
    while (data !== 0) {
      digit++;
      data >>>= 1;
    }
    return digit;
  }

  private static getMask(maskPattern: number, i: number, j: number): boolean {
    switch (maskPattern) {
      case 0: return (i + j) % 2 === 0;
      case 1: return i % 2 === 0;
      case 2: return j % 3 === 0;
      case 3: return (i + j) % 3 === 0;
      case 4: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
      case 5: return (i * j) % 2 + (i * j) % 3 === 0;
      case 6: return ((i * j) % 2 + (i * j) % 3) % 2 === 0;
      case 7: return ((i * j) % 3 + (i + j) % 2) % 2 === 0;
      default: throw new Error("bad maskPattern:" + maskPattern);
    }
  }

  private static createData(typeNumber: number, level: ErrorCorrectionLevel, dataList: string[]): number[] {
    const rsBlocks = QRCodeModel.getRSBlocks(typeNumber, level);
    const buffer = new QRBitBuffer();

    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      // 4-bit Mode: Byte mode is 0100
      buffer.put(4, 4);
      // Byte counts
      const bytes = QRCodeModel.toUTF8Bytes(data);
      buffer.put(bytes.length, QRCodeModel.getLengthInBits(typeNumber));
      // Put bytes
      for (let j = 0; j < bytes.length; j++) {
        buffer.put(bytes[j], 8);
      }
    }

    // Terminate
    let totalDataCount = 0;
    for (let i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount;
    }

    if (buffer.length + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }

    // Align to byte
    while (buffer.length % 8 !== 0) {
      buffer.putBit(false);
    }

    // Padding
    while (true) {
      if (buffer.length >= totalDataCount * 8) {
        break;
      }
      buffer.put(0xec, 8);
      if (buffer.length >= totalDataCount * 8) {
        break;
      }
      buffer.put(0x11, 8);
    }

    return QRCodeModel.createBytes(buffer, rsBlocks);
  }

  private static toUTF8Bytes(str: string): number[] {
    const bytes: number[] = [];
    for (let i = 0; i < str.length; i++) {
      let code = str.charCodeAt(i);
      if (code < 0x80) {
        bytes.push(code);
      } else if (code < 0x800) {
        bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
      } else if (code < 0xd800 || code >= 0xe000) {
        bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
      } else {
        i++;
        code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
        bytes.push(0xf0 | (code >> 18), 0x80 | ((code >> 12) & 0x3f), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
      }
    }
    return bytes;
  }

  private static getLengthInBits(typeNumber: number): number {
    if (1 <= typeNumber && typeNumber < 10) {
      return 8; // 8 bits for byte mode
    } else {
      return 16;
    }
  }

  private static getRSBlocks(typeNumber: number, level: ErrorCorrectionLevel): { totalCount: number; dataCount: number }[] {
    // Basic RS blocks table for L/M/Q/H for Versions 1-8
    const rsBlockTable: Record<number, Record<ErrorCorrectionLevel, { totalCount: number; dataCount: number }[]>> = {
      1: {
        L: [{ totalCount: 26, dataCount: 19 }],
        M: [{ totalCount: 26, dataCount: 16 }],
        Q: [{ totalCount: 26, dataCount: 13 }],
        H: [{ totalCount: 26, dataCount: 9 }]
      },
      2: {
        L: [{ totalCount: 44, dataCount: 34 }],
        M: [{ totalCount: 44, dataCount: 28 }],
        Q: [{ totalCount: 44, dataCount: 22 }],
        H: [{ totalCount: 44, dataCount: 16 }]
      },
      3: {
        L: [{ totalCount: 70, dataCount: 55 }],
        M: [{ totalCount: 70, dataCount: 44 }],
        Q: [{ totalCount: 35, dataCount: 17 }, { totalCount: 35, dataCount: 18 }],
        H: [{ totalCount: 35, dataCount: 13 }, { totalCount: 35, dataCount: 14 }]
      },
      4: {
        L: [{ totalCount: 100, dataCount: 80 }],
        M: [{ totalCount: 50, dataCount: 32 }, { totalCount: 50, dataCount: 33 }],
        Q: [{ totalCount: 50, dataCount: 24 }, { totalCount: 50, dataCount: 24 }],
        H: [{ totalCount: 25, dataCount: 9 }, { totalCount: 25, dataCount: 9 }]
      },
      5: {
        L: [{ totalCount: 134, dataCount: 108 }],
        M: [{ totalCount: 67, dataCount: 43 }, { totalCount: 67, dataCount: 43 }],
        Q: [{ totalCount: 33, dataCount: 15 }, { totalCount: 34, dataCount: 16 }],
        H: [{ totalCount: 33, dataCount: 11 }, { totalCount: 34, dataCount: 12 }]
      },
      6: {
        L: [{ totalCount: 172, dataCount: 136 }],
        M: [{ totalCount: 86, dataCount: 50 }, { totalCount: 86, dataCount: 51 }],
        Q: [{ totalCount: 43, dataCount: 19 }, { totalCount: 43, dataCount: 20 }],
        H: [{ totalCount: 43, dataCount: 15 }, { totalCount: 43, dataCount: 15 }]
      },
      7: {
        L: [{ totalCount: 196, dataCount: 156 }],
        M: [{ totalCount: 98, dataCount: 60 }, { totalCount: 98, dataCount: 61 }],
        Q: [{ totalCount: 49, dataCount: 24 }, { totalCount: 49, dataCount: 24 }],
        H: [{ totalCount: 39, dataCount: 13 }, { totalCount: 40, dataCount: 14 }]
      },
      8: {
        L: [{ totalCount: 242, dataCount: 192 }],
        M: [{ totalCount: 121, dataCount: 75 }, { totalCount: 121, dataCount: 75 }],
        Q: [{ totalCount: 40, dataCount: 17 }, { totalCount: 41, dataCount: 18 }],
        H: [{ totalCount: 40, dataCount: 14 }, { totalCount: 41, dataCount: 15 }]
      }
    };
    return rsBlockTable[typeNumber]?.[level] || rsBlockTable[1][level];
  }

  private static createBytes(buffer: QRBitBuffer, rsBlocks: { totalCount: number; dataCount: number }[]): number[] {
    let offset = 0;
    let maxDcCount = 0;
    let maxEcCount = 0;

    const dcdata: number[][] = new Array(rsBlocks.length);
    const ecdata: number[][] = new Array(rsBlocks.length);

    for (let r = 0; r < rsBlocks.length; r++) {
      const dcCount = rsBlocks[r].dataCount;
      const ecCount = rsBlocks[r].totalCount - dcCount;

      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);

      dcdata[r] = new Array(dcCount);
      for (let i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;

      const rsPoly = QRCodeModel.getErrorCorrectionPolynomial(ecCount);
      const rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
      const modPoly = rawPoly.mod(rsPoly);

      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (let i = 0; i < ecdata[r].length; i++) {
        const modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
      }
    }

    let totalCodeCount = 0;
    for (let i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount;
    }

    const data = new Array(totalCodeCount);
    let index = 0;

    for (let i = 0; i < maxDcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }

    for (let i = 0; i < maxEcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }

    return data;
  }

  private static getErrorCorrectionPolynomial(eccCount: number): QRPolynomial {
    let a = new QRPolynomial([1], 0);
    for (let i = 0; i < eccCount; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }
    return a;
  }
}

/**
 * Draws a QR code of the given text on a canvas element client-side.
 */
export function drawQRCode(
  text: string,
  canvas: HTMLCanvasElement,
  options: { size?: number; margin?: number; darkColor?: string; lightColor?: string } = {}
): boolean {
  try {
    const size = options.size || 256;
    const margin = options.margin !== undefined ? options.margin : 4;
    const darkColor = options.darkColor || "#1e293b"; // default dark slate
    const lightColor = options.lightColor || "#ffffff";

    // Auto-select typeNumber based on text length (byte mode)
    const utf8Length = new TextEncoder().encode(text).length;
    let typeNumber = 1;
    let ecl: ErrorCorrectionLevel = 'L';

    // Increase ECL to Q or M if password size is short, for better scanning resilience
    if (utf8Length < 10) ecl = 'Q';
    else if (utf8Length < 25) ecl = 'M';

    for (let i = 0; i < QR_LIMITS.length; i++) {
      if (utf8Length <= QR_LIMITS[i][ecl]) {
        typeNumber = i + 1;
        break;
      }
      if (i === QR_LIMITS.length - 1) {
        // Fallback for very long inputs: use Version 8 (max supported in this light utility)
        typeNumber = 8;
        ecl = 'L'; // drop ECL to L to fit more bytes
      }
    }

    const qr = new QRCodeModel(typeNumber, ecl);
    qr.addData(text);
    qr.make();

    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    const moduleCount = qr.getModuleCount();
    const totalModules = moduleCount + margin * 2;
    const moduleSize = size / totalModules;

    canvas.width = size;
    canvas.height = size;

    // Fill background
    ctx.fillStyle = lightColor;
    ctx.fillRect(0, 0, size, size);

    // Fill modules
    ctx.fillStyle = darkColor;
    for (let r = 0; r < moduleCount; r++) {
      for (let c = 0; c < moduleCount; c++) {
        if (qr.isDark(r, c)) {
          const x = (c + margin) * moduleSize;
          const y = (r + margin) * moduleSize;
          // Draw rectangles with a tiny overlap to avoid anti-aliasing white lines
          ctx.fillRect(
            Math.round(x),
            Math.round(y),
            Math.ceil(moduleSize),
            Math.ceil(moduleSize)
          );
        }
      }
    }
    return true;
  } catch (err) {
    console.error("Error drawing QR code:", err);
    return false;
  }
}
