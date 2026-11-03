
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://1minconvert.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "1MinConvert — Free Online Image Converter",
    template: "%s | 1MinConvert",
  },

  description:
    "Convert HEIC to JPG, switch between JPG, PNG and WebP, compress images and resize photos online. Free, fast and no sign-up required.",

  applicationName: "1MinConvert",

  keywords: [
    "image converter",
    "HEIC to JPG",
    "JPG to PNG",
    "PNG to JPG",
    "WebP converter",
    "image compressor",
    "image resizer",
    "free online converter",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "1MinConvert",
    title: "1MinConvert — Free Online Image Tools",
    description:
      "Convert, compress and resize images online for free. No sign-up required.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          id="google-adsense"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7148962958151517"
          crossOrigin="anonymous"
        />

        {children}
      </body>
    </html>
  );
}
