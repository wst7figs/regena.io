import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OutcomesPage from "@/app/outcomes/page";
import { TeamGrid } from "@/components/team-grid";

describe("outcomes and company", () => {
  it("shows only the verified draft proof and a methodology note", () => {
    const { container } = render(<OutcomesPage />);
    expect(container.querySelector("[data-client-story]")).toHaveTextContent(/40%/i);
    expect(screen.getByText(/observed client results are not guarantees/i)).toBeVisible();
    expect(document.querySelectorAll("[data-client-story]")).toHaveLength(1);
  });

  it("renders the confirmed team without generated portrait images", () => {
    render(<TeamGrid />);
    expect(screen.getAllByTestId("team-member")).toHaveLength(4);
    expect(screen.getByText("Jean-Pierre van Eeden")).toBeVisible();
    expect(screen.getByText("Julian Hollen")).toBeVisible();
    expect(screen.getByText("AI Engineer & Software Developer")).toBeVisible();
    expect(document.querySelectorAll("img[data-generated-face]")).toHaveLength(0);
    expect(screen.getByRole("link", { name: /luan west/i })).toHaveAttribute("href", "https://www.linkedin.com/in/luanwest/");
    expect(screen.getByRole("link", { name: /jean-pierre/i })).toHaveAttribute("href", "https://www.linkedin.com/in/jean-pierre-van-eeden-0a667726b/");
    expect(screen.getByRole("link", { name: /julian hollen/i })).toHaveAttribute("href", "https://www.linkedin.com/in/julianholien/");
    expect(screen.getByRole("link", { name: /shoham zahir/i })).toHaveAttribute("href", "https://www.linkedin.com/in/shoham-zahir-77151a325/");
  });
});
