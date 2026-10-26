import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole, Sparkles, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About 1MinConvert",
  description: "Learn about 1MinConvert's simple, free and privacy-minded online file tools.",
};

export default function AboutPage() {
  return (
    <div className="simple-page">
      <div className="container simple-page-inner">
        <span className="section-kicker">ABOUT 1MINCONVERT</span>
        <h1>Useful tools should feel effortless.</h1>
        <p className="simple-lead">
          1MinConvert is being built to make everyday file tasks easier. Choose a tool, process a supported file and
          download the result without creating an account.
        </p>
        <div className="about-values">
          <div>
            <LockKeyhole size={23}/>
            <h2>Privacy-minded</h2>
            <p>The current image tools are designed to process files in your browser rather than upload them to a 1MinConvert conversion server.</p>
          </div>
          <div>
            <Zap size={23}/>
            <h2>Simple by design</h2>
            <p>Clear actions and useful defaults help you complete a task without learning a complicated application.</p>
          </div>
          <div>
            <Sparkles size={23}/>
            <h2>Growing carefully</h2>
            <p>We add tools as we can make them useful, dependable and clear about their limitations.</p>
          </div>
        </div>
        <p>Questions or feedback? Email <a href="mailto:contact@1minconvert.com">contact@1minconvert.com</a>, or read our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>.</p>
      </div>
    </div>
  );
}
