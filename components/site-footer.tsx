import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { footerGroups } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-enterprise">
        <div className="footer-brand">
          <Link className="wordmark" href="/">REGENA</Link>
          <p>Patient-growth infrastructure for regenerative and longevity clinics.</p>
          <a className="footer-book" href="/book">Book a strategy call <ArrowUpRight size={15} /></a>
          <a className="footer-contact" href="mailto:contact@regena.io">contact@regena.io</a>
        </div>
        <div className="footer-groups">
          {footerGroups.map((group) => (
            <nav aria-label={`${group.label} links`} key={group.label}>
              <span>{group.label}</span>
              {group.links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
            </nav>
          ))}
        </div>
        <div className="footer-meta">
          <span>Edmonton · Working across North America</span>
          <span>© 2026 Regenix Technologies Incorporated</span>
        </div>
      </div>
    </footer>
  );
}
