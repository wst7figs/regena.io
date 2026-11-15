import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CareersPage from "@/app/careers/page";

describe("CareersPage", () => {
  it("lists the approved opportunities and complete application fields", () => {
    render(<CareersPage />);
    expect(screen.getByRole("heading", { name: /social media intern/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /appointment setter/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /chief sales officer/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /general application/i })).toBeVisible();
    expect(screen.getByRole("option", { name: "Chief Sales Officer (CSO)" })).toBeVisible();
    expect(screen.getByLabelText(/résumé/i)).toHaveAttribute("accept", ".pdf,.doc,.docx");
    expect(screen.getByLabelText(/^linkedin/i)).toBeVisible();
    expect(screen.getByLabelText(/^x /i)).toBeVisible();
    expect(screen.getByLabelText(/portfolio/i)).toBeVisible();
  });
});
