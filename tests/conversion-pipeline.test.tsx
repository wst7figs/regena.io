import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ConversionPipeline } from "@/components/conversion-pipeline";

describe("ConversionPipeline", () => {
  it("repairs each conversion handoff and preserves a text equivalent", async () => {
    const user = userEvent.setup();
    render(<ConversionPipeline />);

    expect(screen.getAllByRole("button")).toHaveLength(6);
    await user.click(screen.getByRole("button", { name: /book/i }));
    expect(screen.getByRole("region", { name: /active conversion stage/i })).toHaveTextContent(
      /confirmed consultation/i,
    );
    expect(screen.getByText(/voice, chat, qualification, scheduling, attendance, and visibility/i)).toBeVisible();
  });
});
