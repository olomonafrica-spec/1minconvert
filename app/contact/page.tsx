import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact 1MinConvert with questions, feedback or privacy requests.",
};

export default function ContactPage() {
  return (
    <div className="simple-page">
      <div className="container simple-page-inner contact-page">
        <span className="section-kicker">GET IN TOUCH</span>
        <h1>How can we help?</h1>
        <p className="simple-lead">
          Found a problem with a converter, have a suggestion, or need to ask a privacy question? Send us a message below.
        </p>

        <ContactForm />

        <p className="contact-privacy-note">
          Please do not include passwords, payment details, or confidential files. Read our <Link href="/privacy">Privacy Policy</Link> to learn how contact-form submissions are handled.
        </p>
        <p className="contact-email-fallback">
          Prefer email? <a href="mailto:contact@1minconvert.com">contact@1minconvert.com</a>
        </p>
      </div>
    </div>
  );
}
