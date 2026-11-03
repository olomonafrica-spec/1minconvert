
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import {
  SiteHeader,
  SiteFooter,
} from "@/components/site-shell";

import { PrivacyControls } from "@/components/privacy-controls";

const siteUrl = "https://1minconvert.com";
const adsenseId = "ca-pub-7148962958151517";
const measurementId = "G-P2X8P75880";

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

  // Google AdSense ownership verification
  other: {
    "google-adsense-account": adsenseId,
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
        {/* Google AdSense verification */}
        <Script
          id="google-adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Website navigation */}
        <SiteHeader />

        {/* Main page content */}
        <main id="main-content">{children}</main>

        {/* Website footer */}
        <SiteFooter />

        {/* Privacy preferences and consent-controlled GA4 */}
        <PrivacyControls measurementId={measurementId} />
      </body>
    </html>
  );
}
