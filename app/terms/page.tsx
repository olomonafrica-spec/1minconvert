import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using 1MinConvert's online file tools.",
};

export default function TermsPage() {
  return (
    <div className="simple-page">
      <div className="container simple-page-inner legal-copy">
        <span className="section-kicker">LEGAL INFORMATION</span>
        <h1>Terms of use</h1>
        <p className="simple-lead">
          By using 1MinConvert, you agree to use the site lawfully and to check converted files before relying on them.
        </p>
        <p><strong>Last updated:</strong> October 26, 2026</p>

        <h2>Using the tools</h2>
        <p>
          1MinConvert provides browser-based utilities for supported image and file tasks. You may use the tools only
          for lawful purposes and in a way that does not interfere with the site, its security, or other users.
        </p>

        <h2>Your files and rights</h2>
        <p>
          You are responsible for ensuring you have the rights and permissions needed to select, convert, modify and
          share any file you use with the tools. Do not use the site to violate copyright, privacy, confidentiality or
          other rights, or to process unlawful content.
        </p>

        <h2>Output and quality</h2>
        <p>
          Conversion results depend on the source file, browser, format and settings. Some formats or files may not be
          supported, and conversion can change image quality, metadata, colour or other properties. Check every output
          before using, publishing or relying on it. Keep your own copy of important original files.
        </p>

        <h2>Availability and changes</h2>
        <p>
          We aim to keep the tools available and useful, but do not guarantee uninterrupted access, error-free operation,
          compatibility with every device, or support for every file. Features may be changed, limited or discontinued
          to maintain security and reliability.
        </p>

        <h2>Third-party services and advertising</h2>
        <p>
          The site may use third-party hosting, security, analytics or advertising services. Third-party services are
          subject to their own terms and policies. If ads are displayed, they should be clearly distinguishable from
          tool controls and download actions.
        </p>

        <h2>No professional advice</h2>
        <p>
          The tools are provided for general convenience and do not provide legal, financial, medical or other
          professional advice. You are responsible for deciding whether an output is suitable for your purpose.
        </p>

        <h2>Disclaimer</h2>
        <p>
          To the extent permitted by applicable law, the site and tools are provided on an "as available" basis without
          warranties that every feature will meet every requirement. Nothing in these terms excludes rights or remedies
          that cannot lawfully be excluded in your jurisdiction.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms as the service changes. Continued use after updated terms are posted means you use
          the site subject to the revised terms, to the extent permitted by applicable law.
        </p>

        <h2>Contact</h2>
        <p>Questions about these terms can be sent to <a href="mailto:contact@1minconvert.com">contact@1minconvert.com</a>.</p>
        <div className="legal-warning">
          These terms are a general starting point, not legal advice. They should be checked against the operator's
          location, intended audience and applicable laws before launch.
        </div>
      </div>
    </div>
  );
}
