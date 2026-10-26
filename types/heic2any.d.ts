declare module "heic2any" {
  type OutputType = "image/jpeg" | "image/png" | "image/gif";
  interface Options {
    blob: Blob;
    toType?: OutputType;
    quality?: number;
  }
  export default function heic2any(options: Options): Promise<Blob | Blob[]>;
}
