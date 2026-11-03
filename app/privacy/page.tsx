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
        <p><strong>Last updated:</strong> November 3, 2026</p>

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
          We use Google Analytics 4 to measure visits and website usage when you accept optional tracking.
          Google Analytics may process usage events, browser and device information, and similar identifiers.
          We do not intentionally send your uploaded images, filenames or document contents to Analytics.
          We use Google AdSense for advertising and site verification. Google and its partners may use cookies,
          identifiers and similar technologies for ad delivery, measurement and personalization according to your
          choices and applicable law. Google's privacy information is available at
          {" "}<a href="https://policies.google.com/privacy">Google Privacy Policy</a>.
        </p>
        <p>
          Our privacy banner lets you accept or reject optional Google analytics and advertising storage, and
          reopen preferences later. A small browser storage value remembers your choice. Essential technical
          operations may still be necessary to deliver and protect the website. Consent settings and the use of
          Google advertising technologies may vary by region; additional certified consent management is required
          where Google's publisher rules apply.
        </p>

        <h2>Contact by email</h2>
        <p>
          Our contact page offers an email link rather than an online form. If you email us, we receive the email
          address, message and any details you voluntarily include. Messages sent to contact@1minconvert.com are
          forwarded to the site's support inbox using our domain email forwarding service. We use them to respond
          to your enquiry and retain them as needed for support, record-keeping and legal obligations.
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

      </div>
    </div>
  );
}
