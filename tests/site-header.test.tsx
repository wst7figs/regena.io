import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SiteHeader } from "@/components/site-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("SiteHeader", () => {
  it("opens and closes the mobile navigation while keeping the booking destination available", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    expect(document.querySelector(".site-header")).toHaveAttribute(
      "data-scrolled",
      "false",
    );

    const menuButton = screen.getByRole("button", { name: /open navigation/i });
    await user.click(menuButton);

    expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeVisible();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /book a strategy call/i })[0]).toHaveAttribute(
      "href",
      "/book",
    );
  });

  it("opens the Solutions menu and exposes both solution routes", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const trigger = screen.getByRole("button", { name: /solutions/i });
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /^patient conversion system/i })).toHaveAttribute(
      "href",
      "/solutions/patient-conversion-system",
    );
    expect(screen.getByRole("link", { name: /^regena growth partnership/i })).toHaveAttribute(
      "href",
      "/solutions/growth-partnership",
    );

    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the Solutions menu after the pointer leaves its complete boundary", async () => {
    vi.useFakeTimers();
    render(<SiteHeader />);
    const trigger = screen.getByRole("button", { name: /^solutions/i });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.pointerLeave(trigger.closest(".solutions-nav")!);
    act(() => vi.advanceTimersByTime(200));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    vi.useRealTimers();
  });

  it("opens Company as a separate menu and closes Solutions", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const solutions = screen.getByRole("button", { name: /^solutions/i });
    await user.click(solutions);
    const company = screen.getByRole("button", { name: /^company/i });
    await user.click(company);
    expect(solutions).toHaveAttribute("aria-expanded", "false");
    expect(company).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /careers/i })).toHaveAttribute("href", "/careers");
  });
});
