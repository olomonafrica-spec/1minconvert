import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact 1MinConvert with questions, feedback or privacy requests.",
};

export default function ContactPage() {
  return (
    <div className="simple-page">
      <div className="container simple-page-inner legal-copy">
        <span className="section-kicker">GET IN TOUCH</span>
        <h1>Contact 1MinConvert</h1>
        <p className="simple-lead">Questions about a tool, a privacy concern or feedback about the site? Send us an email.</p>
        <p><strong>Email:</strong> <a href="mailto:contact@1minconvert.com">contact@1minconvert.com</a></p>
        <p>Please do not email confidential files or sensitive personal information unless it is necessary for your request.</p>
        <p>For information about how we handle site and tool usage, read our <a href="/privacy">Privacy Policy</a>.</p>
      </div>
    </div>
  );
}
