import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ApproachBlueprint } from "@/components/approach-blueprint";
import { ClinicDiagnostic } from "@/components/clinic-diagnostic";

describe("approach and clinic routing", () => {
  it("presents all six operating stages", () => {
    render(<ApproachBlueprint />);
    expect(screen.getAllByRole("button")).toHaveLength(6);
    expect(screen.getByRole("button", { name: /audit/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /improve/i })).toBeVisible();
  });

  it("routes clinic conditions without claiming universal qualification", async () => {
    const user = userEvent.setup();
    render(<ClinicDiagnostic />);
    await user.click(screen.getByRole("button", { name: /existing demand/i }));
    expect(screen.getByTestId("clinic-route")).toHaveTextContent(/patient conversion/i);
    expect(screen.getByText(/fit guidance/i)).toBeVisible();
  });
});
