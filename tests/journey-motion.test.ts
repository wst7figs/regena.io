import { describe, expect, it } from "vitest";

import {
  clampProgress,
  getJourneyStageIndex,
  getStageLocalProgress,
  getStageRange,
} from "@/lib/journey-motion";

describe("journey motion helpers", () => {
  it("clamps scroll progress to the supported range", () => {
    expect(clampProgress(-0.2)).toBe(0);
    expect(clampProgress(0.45)).toBe(0.45);
    expect(clampProgress(1.4)).toBe(1);
  });

  it("maps progress into five stable stage indices", () => {
    expect(
      [0, 0.19, 0.2, 0.4, 0.79, 0.8, 1].map((value) =>
        getJourneyStageIndex(value, 5),
      ),
    ).toEqual([0, 0, 1, 2, 3, 4, 4]);
  });

  it("returns stage ranges and local progress", () => {
    expect(getStageRange(2, 5)).toEqual([0.4, 0.6]);
    expect(getStageLocalProgress(0.5, 2, 5)).toBeCloseTo(0.5);
    expect(getStageLocalProgress(0.2, 2, 5)).toBe(0);
  });
});
