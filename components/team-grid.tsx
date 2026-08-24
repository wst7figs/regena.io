"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { teamMembers } from "@/lib/site-content";

export function TeamGrid() {
  return (
    <div className="team-system">
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <motion.a data-testid="team-member" className="team-card" key={member.name} href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name}, ${member.role} — LinkedIn`} initial={{ y: 54, rotate: index % 2 ? 1.4 : -1.4 }} whileInView={{ y: 0, rotate: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .62, delay: index * .08 }}>
            <div className="team-portrait" data-index={index + 1} aria-hidden="true"><span>{member.initials}</span><i /></div>
            <span>0{index + 1}</span><h3>{member.name}</h3><strong>{member.role}</strong><p>{member.ownership}</p><ArrowUpRight className="team-link-icon" aria-hidden="true" />
          </motion.a>
        ))}
      </div>
      <div className="ownership-map" aria-label="Regena accountability map">
        <span>One connected team</span><i /><strong>Commercial</strong><ArrowDownRight /><strong>Operations</strong><ArrowDownRight /><strong>Engineering</strong><ArrowDownRight /><strong>Strategy</strong>
      </div>
    </div>
  );
}
