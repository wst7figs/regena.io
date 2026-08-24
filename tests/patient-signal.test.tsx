import { render } from "@testing-library/react";
import { motionValue } from "motion/react";
import { describe, expect, it } from "vitest";

import { PatientSignal } from "@/components/patient-signal";

describe("PatientSignal", () => {
  it("renders the base, live progress, and outcome progress as one path", () => {
    const { container } = render(
      <PatientSignal
        id="journey-test"
        path="M0 50 C100 0 200 100 300 50"
        progress={motionValue(0.6)}
        outcomeProgress={motionValue(0.2)}
        viewBox="0 0 300 100"
      />,
    );

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector('[data-signal-path="base"]')).toHaveAttribute(
      "d",
      "M0 50 C100 0 200 100 300 50",
    );
    expect(container.querySelector('[data-signal-path="mineral"]')).toBeInTheDocument();
    expect(container.querySelector('[data-signal-path="outcome"]')).toBeInTheDocument();
    expect(container.querySelector("#journey-test-mineral-gradient")).toBeInTheDocument();
    expect(container.querySelector("#journey-test-outcome-gradient")).toBeInTheDocument();
  });
});
