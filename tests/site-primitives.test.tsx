import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InteriorHero, PageCta, ResultNote } from "@/components/site-primitives";

describe("site primitives", () => {
  it("renders one labelled page hero with a routed call to action", () => {
    render(
      <InteriorHero
        eyebrow="Solutions"
        title="Choose the system your clinic needs next."
        description="Two starting points. One connected operating model."
        cta={{ label: "Book a strategy call", href: "/book" }}
      />,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/choose the system/i);
    expect(screen.getByRole("link", { name: /book a strategy call/i })).toHaveAttribute(
      "href",
      "/book",
    );
  });

  it("keeps calls to action and outcome caveats explicit", () => {
    render(
      <>
        <PageCta title="Ready to find the constraint?" />
        <ResultNote>Observed client results are not guarantees.</ResultNote>
      </>,
    );
    expect(screen.getByRole("link", { name: /book a strategy call/i })).toHaveAttribute(
      "href",
      "/book",
    );
    expect(screen.getByText(/not guarantees/i)).toBeVisible();
  });
});
