import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ApproachBlueprint } from "@/components/approach-blueprint";
import { ConversionPipeline } from "@/components/conversion-pipeline";
import { GrowthSignal } from "@/components/growth-signal";
import { useScrollStages } from "@/components/scroll-story";

function ScrollStageHarness() {
  const { active, setActive, register } = useScrollStages(3);

  return <div>
    <output aria-label="active stage">{active}</output>
    <button type="button" onClick={() => setActive(2)}>Select stage 3</button>
    {[0, 1, 2].map((index) => <div key={index} ref={register(index)} data-stage-index={index} />)}
  </div>;
}

describe("scroll-led system stories", () => {
  it("shows all six conversion handoffs and synchronizes direct selection", () => {
    render(<ConversionPipeline />);
    expect(screen.getAllByRole("button", { name: /stage/i })).toHaveLength(6);
    fireEvent.click(screen.getByRole("button", { name: /stage 6.*visibility/i }));
    expect(screen.getByRole("region", { name: /active conversion stage/i })).toHaveTextContent(/commercial value becomes visible/i);
  });

  it("makes Growth Partnership inclusion and capacity visible", () => {
    render(<GrowthSignal />);
    expect(screen.getByText("Patient Conversion System")).toBeVisible();
    expect(screen.getByText(/clinic capacity/i)).toBeVisible();
    expect(screen.getAllByRole("button", { name: /growth stage/i })).toHaveLength(5);
  });

  it("marks the approach as a scroll story without removing direct controls", () => {
    render(<ApproachBlueprint />);
    expect(screen.getByTestId("approach-scroll-story")).toBeVisible();
    expect(screen.getAllByRole("button")).toHaveLength(6);
  });

  it("keeps a directly selected stage active when a stale intersection arrives", () => {
    const originalObserver = globalThis.IntersectionObserver;
    let emitIntersection: IntersectionObserverCallback | undefined;

    class ControlledIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly thresholds = [0];

      constructor(callback: IntersectionObserverCallback) {
        emitIntersection = callback;
      }

      disconnect() {}
      observe() {}
      takeRecords() { return []; }
      unobserve() {}
    }

    globalThis.IntersectionObserver = ControlledIntersectionObserver;

    try {
      const { container } = render(<ScrollStageHarness />);
      fireEvent.click(screen.getByRole("button", { name: "Select stage 3" }));

      const staleMarker = container.querySelector<HTMLElement>("[data-stage-index='1']");
      expect(staleMarker).not.toBeNull();

      act(() => {
        emitIntersection?.([
          {
            boundingClientRect: staleMarker!.getBoundingClientRect(),
            intersectionRatio: 1,
            intersectionRect: staleMarker!.getBoundingClientRect(),
            isIntersecting: true,
            rootBounds: null,
            target: staleMarker!,
            time: 0,
          },
        ], {} as IntersectionObserver);
      });

      expect(screen.getByLabelText("active stage")).toHaveTextContent("2");
    } finally {
      globalThis.IntersectionObserver = originalObserver;
    }
  });
});
