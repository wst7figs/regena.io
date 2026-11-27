import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { footerGroups } from "@/lib/site-content";
import { legalName } from "@/lib/v2-content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-enterprise">
        <div className="footer-brand">
          <Link className="wordmark" href="/">REGENA</Link>
          <p>100 new patients in 90 days for med spas and aesthetic clinics. Every patient we miss, you get back.</p>
          <a className="footer-book" href="/apply">Check if your city is open <ArrowUpRight size={15} /></a>
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
          <span>Edmonton, Alberta · Working with clinics across Canada and the US</span>
          <span>© 2026 {legalName}</span>
        </div>
      </div>
    </footer>
  );
}
