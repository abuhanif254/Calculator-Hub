declare module 'heic2any' {
  interface Heic2AnyOptions {
    blob: Blob | File;
    toType?: string;
    quality?: number;
    multiple?: boolean;
    gifInterval?: number;
  }
  function heic2any(options: Heic2AnyOptions): Promise<Blob | Blob[]>;
  export default heic2any;
}
