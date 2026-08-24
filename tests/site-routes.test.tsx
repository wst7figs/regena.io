import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ApproachPage from "@/app/approach/page";
import BookPage from "@/app/book/page";
import ClinicsPage from "@/app/clinics/page";
import CompanyPage from "@/app/company/page";
import OutcomesPage from "@/app/outcomes/page";
import PrivacyPage from "@/app/privacy/page";
import SolutionsPage from "@/app/solutions/page";
import GrowthPage from "@/app/solutions/growth-partnership/page";
import ConversionPage from "@/app/solutions/patient-conversion-system/page";
import TermsPage from "@/app/terms/page";

const commercialRoutes = [
  ["Solutions", SolutionsPage],
  ["Patient Conversion System", ConversionPage],
  ["Regena Growth Partnership", GrowthPage],
  ["Our Approach", ApproachPage],
  ["For Clinics", ClinicsPage],
  ["Outcomes", OutcomesPage],
  ["Company", CompanyPage],
] as const;

describe("site routes", () => {
  it.each(commercialRoutes)("renders %s with one h1 and a booking route", (_, Page) => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.querySelector('a[href="/book"]')).not.toBeNull();
    expect(container.textContent).not.toMatch(/\$\d|starting at/i);
  });

  it("renders the focused booking route with one h1", () => {
    const { container } = render(<BookPage />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it.each([["Privacy", PrivacyPage], ["Terms", TermsPage]] as const)(
    "renders %s with one h1 and a visible legal draft notice",
    (_, Page) => {
      const { container } = render(<Page />);
      expect(container.querySelectorAll("h1")).toHaveLength(1);
      expect(container).toHaveTextContent(/draft for legal review/i);
    },
  );
});
