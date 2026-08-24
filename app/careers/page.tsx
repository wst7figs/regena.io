import type { Metadata } from "next";
import { ArrowDown, Bot, Crosshair, Globe2 } from "lucide-react";

import { CareersApplication } from "@/components/careers-application";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InteriorPageShell, PageCta, SectionIntro } from "@/components/site-primitives";

export const metadata: Metadata = { title: "Careers", description: "Build accountable patient-growth infrastructure with Regena." };

const roles = [
  { icon: Crosshair, title: "Growth Advisor / Closer", type: "Commercial", copy: "Lead high-trust sales conversations with clinic founders. Diagnose the constraint, communicate the operating model, and close the right engagements without overselling." },
  { icon: Bot, title: "AI Systems Developer", type: "Engineering", copy: "Build reliable voice, automation, integration, and software systems that work under real clinic conditions—not just in demos." },
  { icon: Globe2, title: "General application", type: "Open field", copy: "If your work belongs at the intersection of patient experience, growth operations, and technical execution, show us the evidence." },
] as const;

export default function CareersPage() {
  return <InteriorPageShell className="careers-page"><a className="skip-link" href="#content">Skip to content</a><SiteHeader /><main id="content" tabIndex={-1}>
    <section className="careers-hero"><div className="shell"><span className="eyebrow">Careers at Regena</span><h1>Do work that still holds up when the system goes live.</h1><p>We are building a small, accountable team around clinic growth—commercial judgment, operating discipline, and engineering quality in one room.</p><a href="#open-roles">View open opportunities <ArrowDown size={16} /></a></div></section>
    <section id="open-roles" className="interior-section"><div className="shell"><SectionIntro eyebrow="Open opportunities" title="High ownership. Remote. Built around outcomes." description="Every role requires meaningful overlap with North American business hours. Compensation is discussed directly for the right fit." /><div className="role-grid">{roles.map(({ icon: Icon, title, type, copy }, index) => <article key={title}><div><Icon size={22} /><span>0{index + 1} · {type}</span></div><h2>{title}</h2><p>{copy}</p><a href="#apply">Apply for this path <ArrowDown size={15} /></a></article>)}</div></div></section>
    <section className="interior-section careers-standard"><div className="shell"><span className="eyebrow eyebrow-dark">The standard</span><div><h2>Early-stage means the edges are visible.</h2><p>You will own real work, communicate directly, use AI aggressively, and remain accountable for the judgment around it. We value evidence of execution over polished theatre.</p><ul><li>Tell the truth about what is verified.</li><li>Build around the user’s actual operating reality.</li><li>Move quickly without making reliability optional.</li><li>Leave the system clearer than you found it.</li></ul></div></div></section>
    <section id="apply" className="interior-section careers-apply"><div className="shell"><SectionIntro eyebrow="Apply" title="Show us the work behind the title." description="Your application goes directly to the Regena team. We review evidence, clarity, and ownership." /><CareersApplication /></div></section>
    <section className="interior-section"><div className="shell"><PageCta title="Prefer to understand the company before applying?" description="Read why Regena exists and meet the people building it." href="/company" /></div></section>
  </main><SiteFooter /></InteriorPageShell>;
}
