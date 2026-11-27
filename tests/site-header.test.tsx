import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/site-header";

describe("SiteHeader", () => {
  it("links to the v2 sections and the apply funnel", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: /how it works/i })).toHaveAttribute("href", "/#how");
    expect(screen.getByRole("link", { name: /check your city/i })).toHaveAttribute("href", "/apply");
  });

  it("opens and closes the mobile navigation", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: /open navigation/i }));
    expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
  });
});
