import Link from "next/link";
import { ArrowUpRight, Command, Github, ShieldCheck, Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" aria-label="1MinConvert home">
          <span className="brand-mark"><Command size={21} strokeWidth={2.5} /></span>
          <span className="brand-word">1MIN<span>CONVERT</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/#tools">All tools</Link>
          <Link href="/#why-us">Why 1MinConvert</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link href="/#tools" className="nav-cta">Explore tools <ArrowUpRight size={16} /></Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand-block">
          <Link href="/" className="brand brand-footer">
            <span className="brand-mark"><Command size={20} strokeWidth={2.5} /></span>
            <span className="brand-word">1MIN<span>CONVERT</span></span>
          </Link>
          <p>Thoughtful online tools for everyday file tasks. Simple to use, clear about privacy.</p>
        </div>
        <div className="footer-col"><strong>Tools</strong><Link href="/tools/heic-to-jpg">HEIC to JPG</Link><Link href="/tools/webp-converter">WebP converter</Link><Link href="/tools/image-compressor">Image compressor</Link><Link href="/tools/image-resizer">Image resizer</Link></div>
        <div className="footer-col"><strong>Info</strong><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms of use</Link><a href="mailto:hello@example.com">Contact</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} 1MinConvert. Free tools, built with care.</span><span className="footer-local"><ShieldCheck size={14}/> File processing happens locally where supported.</span></div>
    </footer>
  );
}
