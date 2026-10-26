import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, FileImage, FileText, FileType, Gauge, Globe2, LockKeyhole, Maximize2, ShieldCheck, Zap } from "lucide-react";
import { HeroHeicConverter } from "@/components/hero-heic-converter";
import { tools } from "@/lib/tools";

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="container hero-content hero-content-action-first">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="live-dot"/> FREE ONLINE IMAGE TOOL</div>
            <h1>HEIC to JPG.<br/><span>Done in seconds.</span></h1>
            <p className="hero-description">Turn iPhone photos into easy-to-share JPG files. Upload your photo, convert it, and download it right here.</p>
            <div className="hero-reassurance hero-reassurance-prominent"><span><span className="mini-check" aria-hidden="true">✓</span> No sign-up</span><span><span className="mini-check" aria-hidden="true">✓</span> 100% free</span><span><span className="mini-check" aria-hidden="true">✓</span> Files stay on your device</span></div>
            <div className="hero-actions"><Link href="#tools" className="text-link">Explore all image tools <ArrowDownRight size={15}/></Link></div>
          </div>
          <HeroHeicConverter />
        </div>
        <div className="container hero-bottom"><span>NO ACCOUNT. NO APP TO INSTALL.</span><div><span>HEIC TO JPG</span><i/> <span>WEBP CONVERSION</span><i/> <span>IMAGE COMPRESSION</span></div></div>
      </section>

      <section className="tools-section section" id="tools">
        <div className="container">
          <div className="section-heading"><div><span className="section-kicker">THE TOOLKIT</span><h2>Small tasks. <span>Made simple.</span></h2><p>Get the file you need without downloading another app.</p></div><div className="tool-count"><strong>04</strong><span>tools available<br/>in this first release</span></div></div>
          <div className="tools-grid">
            {tools.map((tool, index) => {
              const iconMap = { "file-image": FileImage, "file-type": FileType, gauge: Gauge, maximize: Maximize2 } as const;
              const Icon = iconMap[tool.iconKey];
              const tone = ["blue", "coral", "green", "violet"][index];
              return <Link href={`/tools/${tool.slug}`} className="tool-card" key={tool.slug}><div className={`tool-card-icon icon-${tone}`}><Icon size={23} strokeWidth={1.9}/></div><div className="tool-card-category">{tool.category}</div><h3>{tool.shortTitle}</h3><p>{tool.description}</p><div className="tool-card-link">Open tool <ArrowUpRight size={16}/></div><div className="card-number">0{index + 1}</div></Link>;
            })}
          </div>
          <div className="coming-strip"><div className="coming-icon"><FileText size={20}/></div><div><strong>PDF tools are on the roadmap</strong><p>Merge, split, compress and organize PDFs. We're adding tools in stages, with reliability first.</p></div><span className="coming-label">COMING NEXT</span></div>
        </div>
      </section>

      <section className="privacy-section section" id="why-us">
        <div className="container privacy-layout">
          <div className="privacy-copy"><span className="section-kicker">A BETTER WAY TO GET IT DONE</span><h2>Useful first.<br/><span>Complicated never.</span></h2><p>Online tools should make a job easier, not make you create an account or wonder where your files went.</p><Link href="/about" className="text-link">Our approach <ArrowUpRight size={15}/></Link></div>
          <div className="principles-grid"><div className="principle-card"><div className="principle-icon principle-indigo"><LockKeyhole size={21}/></div><h3>Privacy-minded</h3><p>Supported tools process files in your browser instead of uploading them to our servers.</p></div><div className="principle-card"><div className="principle-icon principle-orange"><Zap size={21}/></div><h3>Simple by design</h3><p>Clear controls, helpful settings and an easy path from input to download.</p></div><div className="principle-card"><div className="principle-icon principle-green"><Globe2 size={21}/></div><h3>Made for everyone</h3><p>Works on modern desktop and mobile browsers, with no software to install.</p></div><div className="principle-card"><div className="principle-icon principle-pink"><ShieldCheck size={21}/></div><h3>Clear about limits</h3><p>We explain supported formats and known limitations rather than promising magic.</p></div></div>
        </div>
      </section>

      <section className="closing-section"><div className="container closing-card"><div className="closing-decoration"/><div><span className="section-kicker">READY WHEN YOU ARE</span><h2>What do you need to do today?</h2><p>Pick a tool and get straight to work. No account, no extra steps.</p></div><Link href="#tools" className="button button-dark">Find your tool <ArrowRight size={17}/></Link></div></section>
    </>
  );
}
