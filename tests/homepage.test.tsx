import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Regena homepage (Offer v4)", () => {
  it("leads with the 100-in-90 promise and the per-patient price for med spas and aesthetic clinics", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/100 new patients in 90 days/i);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/\$60/);
    expect(screen.getAllByText(/med spas and aesthetic clinics/i).length).toBeGreaterThan(0);
  });

  it("keeps the ICP broad and drops the retired v3 terms", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/only pay when|no retainer|injectable-only|laser clinics and med spas|monthly cap|also your invoice|before it's billed/i);
  });

  it("never shows the per-patient price without the total and ad spend beside it", () => {
    const { container } = render(<Home />);
    const lede = container.querySelector(".v2-lede")?.textContent ?? "";
    expect(lede).toMatch(/\$6,000/);
    expect(lede).toMatch(/\$2,500 a month/);
    expect(lede).toMatch(/plus ad spend/i);
  });

  it("routes every primary call to action to the apply funnel", () => {
    render(<Home />);
    const ctas = screen.getAllByRole("link", { name: /check (if )?your city/i });
    expect(ctas.length).toBeGreaterThanOrEqual(2);
    ctas.forEach((link) => expect(link).toHaveAttribute("href", "/apply"));
  });

  it("never shows retired v3 prices, client results or the retired positioning", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\$750|per completed appointment|\$2,?000/);
    expect(text).not.toMatch(/regenerative|longevity|Northline|Regenix/i);
  });

  it("spells out what counts and that misses are refunded", () => {
    render(<Home />);
    const counts = document.getElementById("counts");
    expect(counts).not.toBeNull();
    expect(within(counts as HTMLElement).getByText(/every patient we miss, you get back/i)).toBeVisible();
    expect(within(counts as HTMLElement).getByText(/marks each appointment as showed or no-show/i)).toBeVisible();
  });

  it("has the anchor sections the navigation points to", () => {
    render(<Home />);
    for (const id of ["how", "counts", "fit", "faq"]) expect(document.getElementById(id)).not.toBeNull();
  });
});
