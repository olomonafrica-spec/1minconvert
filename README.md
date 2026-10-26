# 1MinConvert — Free Image Tools MVP

A Next.js starter for a free, browser-first image utilities website. **1MinConvert is a working brand candidate only**; domain and trademark availability have not been verified.

## Included tools

- HEIC/HEIF to JPG
- WebP/JPG/PNG converter
- Image compressor
- Image resizer

The homepage leads with a HEIC-to-JPG converter so visitors can start immediately. Image processing is designed to happen in the browser using the Canvas API and `heic2any` for HEIC/HEIF decoding. Files are not intentionally uploaded to an application server by these conversion tools. The early version caps input files at 40 MB and supports one image per operation.

## Run locally

Requires Node.js 20.9+ (Node 22 is suitable) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. To verify a production build:

```bash
npm run build
npm run start
```

Packages are open-source dependencies listed in `package.json`; no paid API or account system is required.

## Before public launch

1. Confirm the final brand and domain availability. Do not treat this working name as legally cleared.
2. Set `NEXT_PUBLIC_SITE_URL` to the actual public HTTPS URL in the deployment environment; do not submit a localhost sitemap.
3. Replace `hello@example.com` with a real contact email and review the privacy and terms pages against the actual website, hosting, analytics and ads configuration. The current legal pages are starter templates, not legal advice.
4. Test conversion and download on current Chrome, Firefox, Safari and Edge, including a real HEIC file from an iPhone.
5. Test mobile layout, invalid files, large files, image transparency and output quality.
6. Add the deployed site to Google Search Console and submit `/sitemap.xml`.
7. Add the site in AdSense, verify ownership and request a site review. Existing AdSense account approval does not guarantee approval of a new site.
8. Enable ads only after the site is eligible and keep ads visually distinct from upload, convert and download controls.

## Current limitations

- One image per operation; batch tools are not included.
- Some unusual HEIC encodings may fail depending on browser and device memory.
- Canvas conversion can alter metadata and may not preserve advanced color profiles. Converting transparent images to JPG fills transparency white.
- PNG export ignores the quality slider because PNG is lossless.
- PDF, video and audio tools are not included yet; add them after the image tools are stable.

## Routes

- `/`
- `/tools/heic-to-jpg`
- `/tools/webp-converter`
- `/tools/image-compressor`
- `/tools/image-resizer`
- `/about`
- `/privacy`
- `/terms`
- `/sitemap.xml`
- `/robots.txt`

## Deployment

Compatible with standard Next.js hosting. A free tier may be sufficient within provider limits. Deployment requires access to your own hosting and publisher accounts.
