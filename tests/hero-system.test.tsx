import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroSystem } from "@/components/hero-system";

describe("HeroSystem", () => {
  it("renders one connected environment with five ordered system stages", () => {
    const { container } = render(<HeroSystem />);

    expect(screen.getByTestId("hero-system")).toHaveAttribute(
      "aria-label",
      "An inquiry moving through the Regena patient-growth system",
    );
    expect(
      Array.from(container.querySelectorAll("[data-system-stage]")).map(
        (node) => node.getAttribute("data-system-stage"),
      ),
    ).toEqual(["acquire", "respond", "qualify", "book", "enroll"]);
    expect(container.querySelectorAll('[data-signal-path="mineral"]')).toHaveLength(1);
  });
});
