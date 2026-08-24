import { expect, test } from "@playwright/test";

const routes = [
  "/solutions",
  "/solutions/patient-conversion-system",
  "/solutions/growth-partnership",
  "/approach",
  "/clinics",
  "/outcomes",
  "/company",
  "/careers",
  "/quiz",
  "/blog",
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
      page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()}`));
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

test("desktop Solutions navigation routes both engagements", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Solutions" }).first();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: /^Patient Conversion System/ }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});

test("mobile Solutions accordion exposes both engagements", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: /open navigation/i }).click();
  const trigger = page.getByRole("button", { name: "Solutions" }).last();
  await trigger.click();
  await expect(page.getByRole("link", { name: /^Patient Conversion System/ }).last()).toBeVisible();
  await expect(page.getByRole("link", { name: /^Regena Growth Partnership/ }).last()).toBeVisible();
});

test("booking preview validates and advances locally", async ({ page }) => {
  await page.goto("/book");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Enter a valid work email.")).toBeVisible();

  await page.getByLabel("Full name").fill("Luan West");
  await page.getByLabel("Work email").fill("luan@example.com");
  await page.getByLabel("Phone").fill("7805550100");
  await page.getByLabel("Clinic name").fill("Example Clinic");
  await page.getByLabel("Role").fill("Owner");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Step 2 of 4")).toBeVisible();
});

test("booking preview completes all four steps without transmitting personal data", async ({ page }) => {
  const writeRequests: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
      writeRequests.push(`${request.method()} ${request.url()}`);
    }
  });

  await page.goto("/book");
  await page.getByLabel("Full name").fill("Review User");
  await page.getByLabel("Work email").fill("review@example.com");
  await page.getByLabel("Phone").fill("7805550100");
  await page.getByLabel("Clinic name").fill("Review Clinic");
  await page.getByLabel("Role").fill("Owner");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("Clinic type").selectOption("Longevity");
  await page.getByLabel("Number of locations").selectOption("1");
  await page.getByLabel("Approximate monthly patient inquiries").selectOption("50-99");
  await page.getByLabel("Yes").check();
  await page.getByLabel("Demand and conversion").check();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.locator('button[name="date"]').first().click();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Regena Growth Partnership")).toBeVisible();
  await page.locator('button[name="time"]').first().click();
  await page.getByRole("button", { name: "Finish preview" }).click();

  await expect(page.getByRole("heading", { name: "Your strategy-call path is ready." })).toBeVisible();
  await expect(page.getByText(/has not created an appointment or transmitted/i)).toBeVisible();
  expect(writeRequests).toEqual([]);

  await page.getByRole("button", { name: "Restart preview" }).click();
  await expect(page.getByText("Step 1 of 4")).toBeVisible();
  await expect(page.getByLabel("Full name")).toHaveValue("");
});

test("all internal links resolve without errors", async ({ page, request, baseURL }) => {
  const hrefs = new Set<string>();
  for (const route of ["/", ...routes]) {
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
  for (const route of ["/", ...routes]) {
    await page.goto(route);
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink, `${route} should expose a first-focus skip link`).toBeFocused();
    await skipLink.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  }
});

test("solution and clinic routers update their recommended path", async ({ page }) => {
  await page.goto("/solutions");
  await page.getByRole("button", { name: /need more demand and conversion/i }).click();
  const solution = page.getByTestId("solution-recommendation");
  await expect(solution.getByText("Regena Growth Partnership")).toBeVisible();
  await expect(solution.getByRole("link", { name: /explore solution/i })).toHaveAttribute("href", "/solutions/growth-partnership");

  await page.goto("/clinics");
  await page.getByRole("button", { name: /not sure where it breaks/i }).click();
  const clinicRoute = page.getByTestId("clinic-route");
  await expect(clinicRoute.getByText("Clinic-growth diagnostic")).toBeVisible();
  await expect(clinicRoute.getByRole("link", { name: /view next step/i })).toHaveAttribute("href", "/book");
});

test("interactive operating diagrams respond to every stage", async ({ page }) => {
  await page.goto("/solutions/patient-conversion-system");
  for (const [index, stage, state] of [
    [1, "Inquiry", "New inquiry visible"],
    [2, "Response", "Live conversation started"],
    [3, "Qualification", "Qualified patient"],
    [4, "Booking", "Confirmed consultation"],
    [5, "Attendance", "Consultation protected"],
    [6, "Visibility", "Journey measurable"],
  ] as const) {
    await page.locator(".pipeline-tabs").getByRole("button", { name: `Stage ${index}: ${stage}` }).click();
    await expect(page.getByRole("region", { name: "Active conversion stage" })).toContainText(state);
  }

  await page.goto("/approach");
  for (const stage of ["Audit", "Architect", "Build", "Launch", "Operate", "Improve"]) {
    await page.locator(".blueprint-rail").getByRole("button", { name: new RegExp(`\\b${stage}\\b`, "i") }).click();
    await expect(page.locator(".blueprint-view")).toContainText(stage);
  }
});

test("signature interactions remain complete under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/solutions/patient-conversion-system");
  await expect(page.getByText(/voice, chat, qualification, scheduling, attendance, and visibility/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /stage 6: visibility/i })).toBeVisible();
});
