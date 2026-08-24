import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { BookingFlow } from "@/components/booking-flow";

describe("BookingFlow", () => {
  it("moves through local qualification without transmitting data", async () => {
    const user = userEvent.setup();
    render(<BookingFlow />);

    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(screen.getByText(/enter a valid work email/i)).toBeVisible();

    await user.type(screen.getByLabelText(/full name/i), "Luan West");
    await user.type(screen.getByLabelText(/work email/i), "luan@example.com");
    await user.type(screen.getByLabelText(/phone/i), "7805550100");
    await user.type(screen.getByLabelText(/clinic name/i), "Example Clinic");
    await user.type(screen.getByLabelText(/^role/i), "Owner");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(screen.getByText(/step 2 of 4/i)).toBeVisible();
    expect(screen.getByRole("button", { name: /back/i })).toBeVisible();
  });

  it("associates step-two validation messages with their controls", async () => {
    const user = userEvent.setup();
    render(<BookingFlow />);

    await user.type(screen.getByLabelText(/full name/i), "Review User");
    await user.type(screen.getByLabelText(/work email/i), "review@example.com");
    await user.type(screen.getByLabelText(/phone/i), "7805550100");
    await user.type(screen.getByLabelText(/clinic name/i), "Review Clinic");
    await user.type(screen.getByLabelText(/^role/i), "Owner");
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(screen.getByRole("combobox", { name: /clinic type/i })).toHaveAttribute("aria-describedby", "clinicType-error");
    expect(screen.getByRole("group", { name: "Primary bottleneck" })).toHaveAttribute("aria-describedby", "bottleneck-error");
    expect(screen.getByText("Clinic type is required.")).toHaveAttribute("id", "clinicType-error");
    expect(screen.getByText("Primary bottleneck is required.")).toHaveAttribute("id", "bottleneck-error");
  });
});
