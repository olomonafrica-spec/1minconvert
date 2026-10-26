export type ToolSlug = "heic-to-jpg" | "webp-converter" | "image-compressor" | "image-resizer";
export type ToolDefinition = {
  slug: ToolSlug;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  iconKey: "file-image" | "file-type" | "gauge" | "maximize";
  eyebrow: string;
  inputHint: string;
  action: string;
  outputNote: string;
  seoTitle: string;
  seoDescription: string;
};

export const tools: ToolDefinition[] = [
  {
    slug: "heic-to-jpg",
    title: "HEIC to JPG Converter",
    shortTitle: "HEIC to JPG",
    description: "Convert iPhone HEIC photos into widely compatible JPG images in a few clicks.",
    category: "Image conversion",
    iconKey: "file-image",
    eyebrow: "IPHONE PHOTO CONVERTER",
    inputHint: "Choose a HEIC or HEIF photo",
    action: "Convert to JPG",
    outputNote: "Your photo is converted in this browser. It is not uploaded to our server.",
    seoTitle: "HEIC to JPG Converter — Free Online Tool",
    seoDescription: "Convert HEIC and HEIF photos to JPG in your browser. No account required. Download the converted image to your device.",
  },
  {
    slug: "webp-converter",
    title: "WebP Image Converter",
    shortTitle: "WebP converter",
    description: "Convert WebP images to JPG or PNG, or convert common images into WebP.",
    category: "Image conversion",
    iconKey: "file-type",
    eyebrow: "CHANGE IMAGE FORMAT",
    inputHint: "Choose a JPG, PNG or WebP image",
    action: "Convert image",
    outputNote: "Choose an output format and download your converted image locally.",
    seoTitle: "WebP Converter — Convert WebP, JPG and PNG Free",
    seoDescription: "Convert WebP to JPG or PNG, or convert JPG and PNG to WebP online with this free browser-based image converter.",
  },
  {
    slug: "image-compressor",
    title: "Image Compressor",
    shortTitle: "Image compressor",
    description: "Reduce image file sizes for websites, email and sharing while balancing image quality.",
    category: "Image optimization",
    iconKey: "gauge",
    eyebrow: "MAKE IMAGES SMALLER",
    inputHint: "Choose a JPG, PNG or WebP image",
    action: "Compress image",
    outputNote: "Compression runs on your device. Results depend on the image and selected settings.",
    seoTitle: "Image Compressor — Reduce Image Size Free",
    seoDescription: "Compress JPG, PNG and WebP images in your browser. Adjust quality and download a smaller image without creating an account.",
  },
  {
    slug: "image-resizer",
    title: "Image Resizer",
    shortTitle: "Image resizer",
    description: "Resize photos to exact pixel dimensions for websites, forms and social posts.",
    category: "Image editing",
    iconKey: "maximize",
    eyebrow: "RESIZE TO ANY DIMENSION",
    inputHint: "Choose a JPG, PNG or WebP image",
    action: "Resize image",
    outputNote: "Set your target width or height. Keep proportions on to avoid stretching the image.",
    seoTitle: "Image Resizer — Resize Images Online Free",
    seoDescription: "Resize images to a specific width and height for free in your browser. Keep proportions, preview the result and download it.",
  },
];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
