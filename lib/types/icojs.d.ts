declare module 'icojs' {
  export interface IcoImage {
    width: number;
    height: number;
    type: 'png' | 'bmp';
    bpp: number;
    buffer: ArrayBuffer;
  }

  export function isIco(buffer: ArrayBuffer | Buffer): boolean;

  export function decodeIco(buffer: ArrayBuffer | Buffer): Promise<IcoImage[]>;
}
