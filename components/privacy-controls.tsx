"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

type Choice = "accepted" | "rejected";
const key = "1minconvert-consent-v1";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function updateGoogle(choice: Choice) {
  const allowed = choice === "accepted" ? "granted" : "denied";
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) { window.dataLayer?.push(args); };
  window.gtag("consent", "update", {
    analytics_storage: allowed,
    ad_storage: allowed,
    ad_user_data: allowed,
    ad_personalization: allowed,
  });
}

export function PrivacyControls({ measurementId }: { measurementId: string }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved === "accepted" || saved === "rejected") {
      setChoice(saved);
      updateGoogle(saved);
    } else {
      setOpen(true);
    }
    setReady(true);
  }, []);

  function choose(next: Choice) {
    localStorage.setItem(key, next);
    updateGoogle(next);
    setChoice(next);
    setOpen(false);
  }

  return <>
    {ready && choice === "accepted" && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-consented" strategy="afterInteractive">{`
        window.dataLayer=window.dataLayer||[];
        function gtag(){dataLayer.push(arguments);}
        gtag('js',new Date());
        gtag('config','${measurementId}',{send_page_view:true});
      `}</Script>
    </>}
    {ready && <button type="button" className="privacy-settings-link" onClick={() => setOpen(true)}>Cookie preferences</button>}
    {ready && open && <div className="privacy-banner" role="dialog" aria-modal="false" aria-label="Privacy choices">
      <div className="privacy-banner-copy"><strong>Your privacy matters</strong><p>We use optional Google Analytics to understand visits and Google AdSense for advertising. Choose whether to allow optional analytics and advertising storage. You can change your choice anytime. See our <a href="/privacy">Privacy Policy</a>.</p></div>
      <div className="privacy-banner-actions"><button type="button" className="privacy-reject" onClick={() => choose("rejected")}>Reject optional</button><button type="button" className="privacy-accept" onClick={() => choose("accepted")}>Accept optional</button></div>
    </div>}
  </>;
}
