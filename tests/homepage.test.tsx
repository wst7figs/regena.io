import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Regena homepage (v2)", () => {
  it("leads with patients in the chair for med spas and aesthetic clinics", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/patients in your chair/i);
    expect(screen.getAllByText(/med spas and aesthetic clinics/i).length).toBeGreaterThan(0);
  });

  it("keeps the ICP broad and never makes claims that contradict older partner terms", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/only pay when|nothing else|no retainer|injectable-only|\$100 a day|laser clinics and med spas/i);
  });

  it("routes every primary call to action to the apply funnel", () => {
    render(<Home />);
    const ctas = screen.getAllByRole("link", { name: /check (if )?your area/i });
    expect(ctas.length).toBeGreaterThanOrEqual(2);
    ctas.forEach((link) => expect(link).toHaveAttribute("href", "/apply"));
  });

  it("never shows Regena prices, client results or the retired positioning", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\$750|\$75\b|\$2,?000/);
    expect(text).not.toMatch(/regenerative|longevity|Northline|Regenix/i);
  });

  it("spells out what counts and that no-shows are never billed", () => {
    render(<Home />);
    const counts = document.getElementById("counts");
    expect(counts).not.toBeNull();
    expect(within(counts as HTMLElement).getByText(/you never pay for a no-show/i)).toBeVisible();
    expect(within(counts as HTMLElement).getByText(/marks each appointment as showed or no-show/i)).toBeVisible();
  });

  it("has the anchor sections the navigation points to", () => {
    render(<Home />);
    for (const id of ["how", "counts", "fit", "faq"]) expect(document.getElementById(id)).not.toBeNull();
  });
});
