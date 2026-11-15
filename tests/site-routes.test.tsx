import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ApplyPage from "@/app/apply/page";
import BookPage from "@/app/book/page";
import CareersPage from "@/app/careers/page";
import CompanyPage from "@/app/company/page";
import PrivacyPage from "@/app/privacy/page";
import TermsPage from "@/app/terms/page";

describe("site routes", () => {
  it("renders Company with one h1, the apply route and no prices", () => {
    const { container } = render(<CompanyPage />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.querySelector('a[href="/apply"]')).not.toBeNull();
    expect(container.textContent).not.toMatch(/\$\d|starting at|regenerative|longevity/i);
  });

  it.each([["Book", BookPage], ["Apply", ApplyPage], ["Careers", CareersPage]] as const)("renders %s with one h1", (_, Page) => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it.each([["Privacy", PrivacyPage, /effective november 16, 2026/i], ["Terms", TermsPage, /effective september 27, 2026/i]] as const)(
    "renders %s with one h1, an effective date, and the confirmed legal contact",
    (_, Page, date) => {
      const { container } = render(<Page />);
      expect(container.querySelectorAll("h1")).toHaveLength(1);
      expect(container).toHaveTextContent(date);
      expect(container).toHaveTextContent(/Regena Technologies Inc\./);
      expect(container).not.toHaveTextContent(/Regenix/i);
      expect(container.querySelector('a[href="mailto:contact@regena.io"]')).not.toBeNull();
    },
  );

  it("discloses texts and advertising measurement in the privacy notice", () => {
    const { container } = render(<PrivacyPage />);
    expect(container).toHaveTextContent(/reply STOP/i);
    expect(container).toHaveTextContent(/Meta Pixel/);
  });
});
