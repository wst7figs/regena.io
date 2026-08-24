import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Regena homepage", () => {
  it("renders the complete homepage architecture with routed booking", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/patient demand/i);
    expect(screen.getByTestId("hero-rays")).toBeVisible();
    expect(document.querySelectorAll("[data-ray-bundle]")).toHaveLength(2);
    expect(document.querySelectorAll("[data-ambient-field]")).toHaveLength(0);
    expect(document.querySelectorAll("#book")).toHaveLength(0);
    expect(screen.getByRole("heading", { name: /built like infrastructure/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /one patient journey/i })).toBeVisible();
    expect(screen.getByTestId("leak-flow")).toBeVisible();
    expect(screen.getByTestId("architecture-map")).toBeVisible();
    expect(document.querySelectorAll("[data-leak-point]")).toHaveLength(3);
    expect(document.querySelectorAll("[data-architecture-layer]")).toHaveLength(3);
    expect(screen.getByTestId("proof-story")).toBeVisible();
    expect(document.querySelectorAll("[data-proof-metric]")).toHaveLength(4);
    expect(
      Array.from(document.querySelectorAll("[data-operating-step]")).map((node) =>
        node.getAttribute("data-operating-step"),
      ),
    ).toEqual(["build", "operate", "improve"]);
    expect(screen.getByTestId("booking-resolution")).toBeVisible();
    expect(
      Array.from(document.querySelectorAll("[data-chapter]")).map((node) =>
        node.getAttribute("data-chapter"),
      ),
    ).toEqual([
      "hero",
      "journey",
      "leakage",
      "architecture",
      "proof",
      "operating-model",
      "booking",
    ]);
    expect(screen.getByRole("contentinfo")).toBeVisible();
  });

  it("routes every booking call to action to the booking section", () => {
    render(<Home />);

    const bookingLinks = screen.getAllByRole("link", { name: /book a strategy call/i });
    expect(bookingLinks.length).toBeGreaterThanOrEqual(3);
    expect(bookingLinks.every((link) => link.getAttribute("href") === "/book")).toBe(true);
  });

  it("makes booking the primary hero action", () => {
    const { container } = render(<Home />);

    const hero = container.querySelector(".hero-section");
    expect(hero?.querySelector(".button-primary")).toHaveTextContent(/book a strategy call/i);
    expect(hero?.querySelector(".button-secondary")).toHaveTextContent(/see how the system works/i);
  });

  it("surfaces proof and concrete capabilities before the interactive journey", () => {
    const { container } = render(<Home />);
    const page = within(container);

    const capabilities = page.getByRole("region", { name: /regena capabilities/i });
    const proof = page.getByRole("region", { name: /visionmax result/i });
    expect(capabilities).toHaveTextContent(/voice/i);
    expect(capabilities).toHaveTextContent(/revenue attribution/i);
    expect(proof).toHaveTextContent(/40%/i);
    expect(proof.nextElementSibling).toHaveAttribute("id", "system");
  });

  it("anchors the full client story in a verified numeric outcome", () => {
    const { container } = render(<Home />);

    expect(within(container).getByTestId("proof-story")).toHaveTextContent(/40%/i);
  });

  it("introduces both routed solutions", () => {
    render(<Home />);
    expect(
      screen.getAllByRole("link", { name: /patient conversion system/i })
        .every((link) => link.getAttribute("href") === "/solutions/patient-conversion-system"),
    ).toBe(true);
    expect(
      screen.getAllByRole("link", { name: /growth partnership/i })
        .every((link) => link.getAttribute("href") === "/solutions/growth-partnership"),
    ).toBe(true);
  });
});
