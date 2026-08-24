import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Cta = { label: string; href: string };

export function InteriorPageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`interior-page ${className}`.trim()}>{children}</div>;
}

export function InteriorHero({
  eyebrow,
  title,
  description,
  cta,
  variant = "interface",
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cta?: Cta;
  variant?: "interface" | "editorial" | "conversion";
  children?: ReactNode;
}) {
  return (
    <section className={`interior-hero interior-hero-${variant}`}>
      <div className="interior-hero-glow" aria-hidden="true" />
      <div className="shell interior-hero-grid">
        <div className="interior-hero-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {cta ? <a className="button button-primary" href={cta.href}>{cta.label}<ArrowUpRight size={16} /></a> : null}
        </div>
        {children ? <div className="interior-hero-visual">{children}</div> : null}
      </div>
    </section>
  );
}

export function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <header className="section-intro-grid">
      <span className="eyebrow">{eyebrow}</span>
      <div><h2>{title}</h2>{description ? <p>{description}</p> : null}</div>
    </header>
  );
}

export function SignalDivider({ label }: { label: string }) {
  return <div className="signal-divider" aria-hidden="true"><span>{label}</span><i /></div>;
}

export function ResultNote({ children }: { children: ReactNode }) {
  return <aside className="result-note"><span>Method note</span><p>{children}</p></aside>;
}

export function PageCta({
  eyebrow = "A focused first conversation",
  title,
  description = "Map the current constraint, then decide what deserves to be rebuilt first.",
  href = "/book",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
}) {
  return (
    <section className="page-cta">
      <div className="page-cta-signal" aria-hidden="true" />
      <div><span className="eyebrow eyebrow-dark">{eyebrow}</span><h2>{title}</h2><p>{description}</p></div>
      <a className="button button-light" href={href}>Book a strategy call <ArrowUpRight size={17} /></a>
    </section>
  );
}
