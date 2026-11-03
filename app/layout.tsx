
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://1minconvert.com";
const adsenseId = "ca-pub-7148962958151517";
const gaId = "G-P2X8P75880";

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

  // AdSense ownership verification
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
        {/* Google AdSense */}
        <Script
          id="google-adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('js', new Date());

            gtag('config', '${gaId}', {
              anonymize_ip: true,
              send_page_view: true
            });
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
