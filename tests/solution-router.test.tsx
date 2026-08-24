import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SolutionRouter } from "@/components/solution-router";

describe("SolutionRouter", () => {
  it("routes existing demand to conversion and broader demand to partnership", async () => {
    const user = userEvent.setup();
    render(<SolutionRouter />);

    await user.click(screen.getByRole("button", { name: /already generating demand/i }));
    expect(screen.getByTestId("solution-recommendation")).toHaveTextContent(/patient conversion/i);

    await user.click(screen.getByRole("button", { name: /need more demand/i }));
    expect(screen.getByTestId("solution-recommendation")).toHaveTextContent(/growth partnership/i);
  });
});
