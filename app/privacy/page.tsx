import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How 1MinConvert handles information when you use our online file tools.",
};

const contactEmail = "contact@1minconvert.com";

export default function PrivacyPage() {
  return (
    <div className="simple-page">
      <div className="container simple-page-inner legal-copy">
        <span className="section-kicker">LEGAL INFORMATION</span>
        <h1>Privacy policy</h1>
        <p className="simple-lead">
          This policy explains how 1MinConvert handles information when you visit the site and use its file tools.
        </p>
        <p><strong>Last updated:</strong> October 26, 2026</p>

        <h2>Files you process</h2>
        <p>
          The image tools currently offered by 1MinConvert are designed to process selected files in your browser. The
          conversion features do not intentionally upload the selected image to a 1MinConvert file-processing server.
          Your browser temporarily holds the selected file and any generated output while you use a tool. You are
          responsible for saving the result you want to keep. This description applies to the tools as currently
          implemented; the policy will be updated if future tools process files differently.
        </p>

        <h2>Technical information</h2>
        <p>
          When you visit a website, the hosting provider and related infrastructure may process technical information
          such as your IP address, browser and device details, requested page, referring page, and the date and time of
          a request for delivery, security, troubleshooting and abuse prevention. The exact logs and retention periods
          depend on the services used to host the live site.
        </p>

        <h2>Cookies, analytics and advertising</h2>
        <p>
          1MinConvert does not claim that no cookies or similar technologies are used in every configuration. If
          analytics, advertising or other third-party features are enabled, those providers may use cookies or similar
          technologies and may process information under their own privacy policies. Before advertising is activated,
          this policy and any required consent controls must reflect the actual advertising setup, including Google
          AdSense where used.
        </p>

        <h2>How information is used</h2>
        <p>
          Technical information may be used to deliver the site, protect its security, diagnose errors, understand
          aggregate usage where analytics are enabled, and comply with legal obligations. We do not ask you to create an
          account to use the current image tools.
        </p>

        <h2>Third-party services and links</h2>
        <p>
          The site may rely on third-party hosting, domain, security, analytics or advertising services. Those services
          have their own terms and privacy practices. External links take you to sites we do not control.
        </p>

        <h2>Retention and your choices</h2>
        <p>
          Files processed locally remain under your browser's control; closing the page or tab normally clears the
          temporary in-page state, but you should not treat the browser as a permanent backup. Technical logs and
          information held by third-party services are retained according to the relevant provider's settings and
          policies. You can contact us with a privacy question or request using the email below. Rights available to you
          may depend on your location and applicable law.
        </p>

        <h2>Children</h2>
        <p>
          The site is intended as a general-purpose utility and is not designed to collect personal information from
          children. Please contact us if you believe personal information has been provided inappropriately.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy when the site's features, hosting or advertising arrangements change. The date at
          the top indicates when this page was last updated.
        </p>

        <h2>Contact</h2>
        <p>Privacy questions can be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
        <div className="legal-warning">
          This page describes the current intended product and is not legal advice. Before public launch, confirm that
          the live hosting, analytics, cookie, consent and advertising configuration matches this policy and obtain any
          jurisdiction-specific review required for your circumstances.
        </div>
      </div>
    </div>
  );
}
