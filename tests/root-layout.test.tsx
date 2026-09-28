import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  IBM_Plex_Mono: () => ({ variable: "font-mono" }),
  Instrument_Sans: () => ({ variable: "font-instrument" }),
}));

import RootLayout from "@/app/layout";

describe("RootLayout", () => {
  it("tolerates browser extensions that add attributes before hydration", () => {
    const documentTree = RootLayout({ children: <main>Content</main> });
    const body = documentTree.props.children;

    expect(body.props.suppressHydrationWarning).toBe(true);
  });
});
