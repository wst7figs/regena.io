import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GrowthSignal } from "@/components/growth-signal";

describe("GrowthSignal", () => {
  it("connects acquisition to conversion without channel guarantees", () => {
    render(<GrowthSignal />);
    expect(screen.getByText(/acquisition channels/i)).toBeVisible();
    expect(screen.getByText(/patient conversion system/i)).toBeVisible();
    expect(screen.getByText(/revenue visibility/i)).toBeVisible();
    expect(screen.queryByText(/guaranteed/i)).not.toBeInTheDocument();
  });
});
