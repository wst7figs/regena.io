"use client";

import { ArrowUpRight, ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { siteNav, solutions } from "@/lib/site-content";

type DesktopMenu = "solutions" | "company" | null;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<DesktopMenu>(null);
  const [mobileMenu, setMobileMenu] = useState<DesktopMenu>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const solutionsMenuRef = useRef<HTMLDivElement | null>(null);
  const companyMenuRef = useRef<HTMLDivElement | null>(null);
  const solutionsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const companyTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setIsScrolled(value > 24));

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openMenu === "solutions") solutionsTriggerRef.current?.focus();
      if (openMenu === "company") companyTriggerRef.current?.focus();
      setOpenMenu(null);
      setIsOpen(false);
    };
    const closeOutside = (event: MouseEvent) => {
      if (!openMenu) return;
      const root = openMenu === "solutions" ? solutionsMenuRef.current : companyMenuRef.current;
      if (root && !root.contains(event.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("mousedown", closeOutside);
    return () => {
      cancelClose();
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("mousedown", closeOutside);
    };
  }, [openMenu]);

  const closeNavigation = () => {
    setIsOpen(false);
    setOpenMenu(null);
    setMobileMenu(null);
  };

  const menuBoundaryProps = {
    onPointerEnter: cancelClose,
    onPointerLeave: scheduleClose,
    onBlur: (event: React.FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenMenu(null);
    },
  };

  return (
    <header className="site-header" data-scrolled={isScrolled}>
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Regena home">REGENA</Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="solutions-nav" ref={solutionsMenuRef} {...menuBoundaryProps}>
            <button ref={solutionsTriggerRef} type="button" aria-expanded={openMenu === "solutions"} aria-controls="solutions-navigation" onClick={() => setOpenMenu((current) => current === "solutions" ? null : "solutions")}>
              Solutions <ChevronDown aria-hidden="true" size={13} />
            </button>
            {openMenu === "solutions" ? (
              <div className="solutions-menu" id="solutions-navigation">
                <div className="solutions-menu-grid">
                  {solutions.map((solution, index) => (
                    <Link className="solutions-menu-card" href={solution.href} key={solution.slug} aria-label={`${solution.name} — ${solution.shortDescription}`} onClick={closeNavigation}>
                      <span>0{index + 1} · {solution.eyebrow}</span><strong>{solution.name}</strong><small>{solution.shortDescription}</small>
                    </Link>
                  ))}
                </div>
                <Link className="solutions-menu-compare" href="/solutions" onClick={closeNavigation}>Compare solutions <ArrowUpRight aria-hidden="true" size={15} /></Link>
                <Link className="solutions-menu-diagnostic" href="/quiz" onClick={closeNavigation}><Sparkles aria-hidden="true" size={15} /><span><strong>Not sure what you need?</strong><small>Take the clinic diagnostic</small></span><ArrowUpRight aria-hidden="true" size={15} /></Link>
              </div>
            ) : null}
          </div>
          {siteNav.slice(1).map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
          <div className="solutions-nav company-nav" ref={companyMenuRef} {...menuBoundaryProps}>
            <button ref={companyTriggerRef} type="button" aria-expanded={openMenu === "company"} aria-controls="company-navigation" onClick={() => setOpenMenu((current) => current === "company" ? null : "company")}>
              Company <ChevronDown aria-hidden="true" size={13} />
            </button>
            {openMenu === "company" ? <div className="solutions-menu company-menu" id="company-navigation"><Link href="/company" onClick={closeNavigation}><span>About Regena</span><small>Why the company exists and who is accountable.</small></Link><Link href="/careers" onClick={closeNavigation}><span>Careers</span><small>Build patient-growth infrastructure with us.</small></Link></div> : null}
          </div>
        </nav>

        <Link className="button button-dark header-cta" href="/book">Book a strategy call <ArrowUpRight aria-hidden="true" size={16} /></Link>
        <button className="menu-button" type="button" aria-label={isOpen ? "Close navigation" : "Open navigation"} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen((current) => !current)}>{isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>

      {isOpen ? <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation"><div className="shell mobile-nav-inner">
        <button className="mobile-solutions-trigger" type="button" aria-expanded={mobileMenu === "solutions"} aria-controls="mobile-solutions-navigation" onClick={() => setMobileMenu((current) => current === "solutions" ? null : "solutions")}>Solutions <ChevronDown aria-hidden="true" size={16} /></button>
        {mobileMenu === "solutions" ? <div className="mobile-solutions-list" id="mobile-solutions-navigation">{solutions.map((solution) => <Link href={solution.href} key={solution.slug} onClick={closeNavigation}><strong>{solution.name}</strong><small>{solution.shortDescription}</small></Link>)}<Link href="/solutions" onClick={closeNavigation}>Compare solutions</Link><Link href="/quiz" onClick={closeNavigation}>Take the clinic diagnostic</Link></div> : null}
        {siteNav.slice(1).map((item) => <Link key={item.href} href={item.href} onClick={closeNavigation}>{item.label}</Link>)}
        <button className="mobile-solutions-trigger" type="button" aria-expanded={mobileMenu === "company"} aria-controls="mobile-company-navigation" onClick={() => setMobileMenu((current) => current === "company" ? null : "company")}>Company <ChevronDown aria-hidden="true" size={16} /></button>
        {mobileMenu === "company" ? <div className="mobile-solutions-list" id="mobile-company-navigation"><Link href="/company" onClick={closeNavigation}>About Regena</Link><Link href="/careers" onClick={closeNavigation}>Careers</Link></div> : null}
        <Link className="button button-dark" href="/book" onClick={closeNavigation}>Book a strategy call <ArrowUpRight aria-hidden="true" size={16} /></Link>
      </div></nav> : null}
    </header>
  );
}
