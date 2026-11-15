import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/apply",
  "/company",
  "/careers",
  "/blog",
  "/blog/regena-named-an-openai-select-partner",
  "/blog/why-patient-demand-disappears-between-inquiry-and-consultation",
  "/book",
  "/privacy",
  "/terms",
];

for (const route of routes) {
  for (const viewport of [{ name: "mobile", width: 375, height: 844 }, { name: "desktop", width: 1440, height: 900 }]) {
    test(`${route} renders on ${viewport.name} without overflow or browser errors`, async ({ page }) => {
      const errors: string[] = [];
      const failedRequests: string[] = [];
      page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("requestfailed", (request) => {
        // Third-party embeds (the booking calendar) can cancel their own requests; only our origin must be clean.
        if (new URL(request.url()).hostname === new URL(page.url() || "http://127.0.0.1").hostname) failedRequests.push(`${request.method()} ${request.url()}`);
      });
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(route);

      expect(response?.ok()).toBe(true);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
      expect(await page.locator("[id]").evaluateAll((elements) => {
        const ids = elements.map((element) => element.id);
        return ids.filter((id, index) => ids.indexOf(id) !== index);
      })).toEqual([]);
      expect(errors).toEqual([]);
      expect(failedRequests).toEqual([]);
    });
  }
}

test("all internal links resolve without errors", async ({ page, request, baseURL }) => {
  const hrefs = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page.locator('a[href^="/"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")).filter((href): href is string => Boolean(href)),
    )) hrefs.add(href.split("#")[0]);
  }

  for (const href of hrefs) {
    const response = await request.get(new URL(href, baseURL).toString());
    expect(response.ok(), `${href} returned ${response.status()}`).toBe(true);
  }
});

test("keyboard users can skip repeated navigation on every route", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink, `${route} should expose a first-focus skip link`).toBeFocused();
    await skipLink.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  }
});

test("retired v1 pages send visitors to the homepage", async ({ page }) => {
  for (const route of ["/solutions", "/solutions/patient-conversion-system", "/approach", "/clinics", "/outcomes", "/quiz"]) {
    await page.goto(route);
    await expect(page, route).toHaveURL(/\/$/);
  }
});

test("booking page embeds the live Regena calendar", async ({ page }) => {
  await page.goto("/book");
  await expect(page.locator("iframe[title='Book a call with Regena']")).toHaveAttribute("src", /go\.regena\.io\/widget\/booking\//);
});
