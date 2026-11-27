"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { siteNav } from "@/lib/site-content";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setIsScrolled(value > 24));

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <header className="site-header" data-scrolled={isScrolled}>
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Regena home">REGENA</Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {siteNav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>

        <Link className="button button-dark header-cta" href="/apply">Check your city <ArrowUpRight aria-hidden="true" size={16} /></Link>
        <button className="menu-button" type="button" aria-label={isOpen ? "Close navigation" : "Open navigation"} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen((current) => !current)}>{isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>

      {isOpen ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <div className="shell mobile-nav-inner">
            {siteNav.map((item) => <Link key={item.href} href={item.href} onClick={close}>{item.label}</Link>)}
            <Link className="button button-dark" href="/apply" onClick={close}>Check your city <ArrowUpRight aria-hidden="true" size={16} /></Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
