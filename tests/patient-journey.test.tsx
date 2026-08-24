import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PatientJourney } from "@/components/patient-journey";

describe("PatientJourney", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(cleanup);

  it("moves between stages with arrow keys and exposes the active stage", async () => {
    const user = userEvent.setup();
    render(<PatientJourney />);

    const acquire = screen.getByRole("tab", { name: /acquire/i });
    acquire.focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tab", { name: /respond/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent(/answer immediately/i);
  });

  it("keeps all five stage descriptions in document order", () => {
    const { container } = render(<PatientJourney />);

    expect(
      Array.from(container.querySelectorAll("[data-stage-copy]")).map((node) =>
        node.getAttribute("data-stage-copy"),
      ),
    ).toEqual(["acquire", "respond", "qualify", "book", "enroll"]);
  });

  it("activates a stage with pointer input and requests its scroll marker", async () => {
    const user = userEvent.setup();
    render(<PatientJourney />);

    await user.click(screen.getByRole("tab", { name: /book/i }));

    expect(screen.getByRole("tab", { name: /book/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(document.querySelector("[data-active-stage]")).toHaveAttribute(
      "data-active-stage",
      "book",
    );
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
