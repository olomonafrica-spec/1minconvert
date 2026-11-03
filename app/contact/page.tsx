import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact 1MinConvert for support, suggestions, privacy or business enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <div className="simple-page"><div className="container simple-page-inner contact-page">
    <span className="section-kicker">GET IN TOUCH</span>
    <h1>Contact 1MinConvert</h1>
    <p className="simple-lead">Found a problem with a converter, have a suggestion or need to ask a privacy question? Email us directly.</p>
    <div className="legal-copy"><h2>Email support</h2><p><a href="mailto:contact@1minconvert.com?subject=1MinConvert%20Enquiry">contact@1minconvert.com</a></p>
    <p><a className="button button-primary" href="mailto:contact@1minconvert.com?subject=1MinConvert%20Enquiry">Send us an email</a></p>
    <p>Please don't email confidential files, passwords or payment details. Read our <Link href="/privacy">Privacy Policy</Link> for more information.</p></div>
  </div></div>;
}
