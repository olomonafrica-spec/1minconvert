"use client";

import { useState } from "react";
import Link from "next/link";

const contactEmail = "contact@1minconvert.com";

export default function ContactPage() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <div className="simple-page">
      <div className="container simple-page-inner contact-page">
        <span className="section-kicker">GET IN TOUCH</span>
        <h1>Contact 1MinConvert</h1>
        <p className="simple-lead">
          Questions, feedback, a problem with a converter, or a privacy request?
          Reach us directly by email.
        </p>

        <section
          className="legal-copy"
          aria-label="Contact email"
          style={{ maxWidth: 600, padding: "28px", border: "1px solid #dbe5f2", borderRadius: 18, background: "#fff" }}
        >
          <p style={{ margin: "0 0 8px", fontSize: 14, color: "#52647a" }}>Our email address</p>
          <p style={{ margin: "0 0 20px", overflowWrap: "anywhere", fontSize: "clamp(1.1rem, 3vw, 1.45rem)", fontWeight: 750, color: "#102347" }}>
            {contactEmail}
          </p>
          <button
            type="button"
            className="button button-primary"
            onClick={copyEmail}
            style={{ cursor: "pointer" }}
          >
            {copyState === "copied" ? "Copied!" : "Copy email address"}
          </button>
          <p role="status" aria-live="polite" style={{ marginTop: 14, color: "#52647a" }}>
            {copyState === "copied"
              ? "Email copied. Paste it into Gmail or your preferred email app."
              : copyState === "failed"
                ? "Automatic copying is unavailable. Select the email above and copy it manually."
                : "Copy the address and paste it into your email service to send us a message."}
          </p>
        </section>

        <p className="contact-privacy-note" style={{ marginTop: 22 }}>
          Please don't send passwords, payment details, or confidential files.
          Read our <Link href="/privacy">Privacy Policy</Link> for more information.
        </p>
      </div>
    </div>
  );
}
