"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

type Choice = "accepted" | "rejected";
const storageKey = "1minconvert-analytics-consent-v1";

export function PrivacyControls({ measurementId }: { measurementId: string }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved === "accepted" || saved === "rejected") {
        setChoice(saved);
      } else {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
    setReady(true);
  }, []);

  function choose(next: Choice) {
    const wasAccepted = choice === "accepted";
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // This preference lasts only until the page is refreshed if storage is blocked.
    }
    setChoice(next);
    setOpen(false);
    // Once GA4 has loaded, unmounting a script cannot undo it. Reload to
    // prevent further analytics requests after consent is withdrawn.
    if (wasAccepted && next === "rejected") {
      window.location.reload();
    }
  }

  return (
    <>
      {ready && choice === "accepted" && (
        <>
          <Script
            id="ga4-library"
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-config" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', '${measurementId}', {send_page_view: true});
          `}</Script>
        </>
      )}
      {ready && (
        <button type="button" className="privacy-settings-link" onClick={() => setOpen(true)}>
          Analytics preferences
        </button>
      )}
      {ready && open && (
        <div className="privacy-banner" role="dialog" aria-modal="false" aria-label="Analytics preferences">
          <div className="privacy-banner-copy">
            <strong>Your privacy matters</strong>
            <p>
              We use optional Google Analytics to understand visits to 1MinConvert.
              Choose whether to allow analytics tracking. Advertising privacy
              choices are managed separately where required. See our <a href="/privacy">Privacy Policy</a>.
            </p>
          </div>
          <div className="privacy-banner-actions">
            <button type="button" className="privacy-reject" onClick={() => choose("rejected")}>Reject analytics</button>
            <button type="button" className="privacy-accept" onClick={() => choose("accepted")}>Accept analytics</button>
          </div>
        </div>
      )}
    </>
  );
}
