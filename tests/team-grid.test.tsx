import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TeamGrid } from "@/components/team-grid";

describe("company team", () => {
  it("renders the confirmed team with their supplied headshots", () => {
    const { container } = render(<TeamGrid />);
    expect(screen.getAllByTestId("team-member")).toHaveLength(4);
    expect(screen.getByText("Jean-Pierre van Eeden")).toBeVisible();
    expect(screen.getByText("Julian Hollen")).toBeVisible();
    expect(screen.getByText("CTO")).toBeVisible();
    expect(document.querySelectorAll("img[data-generated-face]")).toHaveLength(0);
    const portraits = container.querySelectorAll(".team-portrait img");
    expect(portraits).toHaveLength(4);
    expect(portraits[0]).toHaveAttribute("src", expect.stringContaining("luan-west.webp"));
    expect(portraits[1]).toHaveAttribute("src", expect.stringContaining("jean-pierre-van-eeden.webp"));
    expect(portraits[2]).toHaveAttribute("src", expect.stringContaining("julian-hollen.webp"));
    expect(portraits[3]).toHaveAttribute("src", expect.stringContaining("shoham-zahir.webp"));
    expect(screen.getByRole("link", { name: /luan west/i })).toHaveAttribute("href", "https://www.linkedin.com/in/luanwest/");
    expect(screen.getByRole("link", { name: /jean-pierre/i })).toHaveAttribute("href", "https://www.linkedin.com/in/jean-pierre-van-eeden-0a667726b/");
    expect(screen.getByRole("link", { name: /julian hollen/i })).toHaveAttribute("href", "https://www.linkedin.com/in/julianholien/");
    expect(screen.getByRole("link", { name: /shoham zahir/i })).toHaveAttribute("href", "https://www.linkedin.com/in/shoham-zahir-77151a325/");
  });
});
