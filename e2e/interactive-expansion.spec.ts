import { expect, test } from "@playwright/test";

test("desktop menus close after the pointer leaves their complete boundary", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const solutions = page.getByRole("button", { name: "Solutions" }).first();
  await solutions.click();
  await expect(solutions).toHaveAttribute("aria-expanded", "true");
  await page.locator("main").hover({ position: { x: 20, y: 300 } });
  await expect(solutions).toHaveAttribute("aria-expanded", "false");
});

test("Company introduces the operating conviction before linked team profiles", async ({ page }) => {
  await page.goto("/company");
  const conviction = page.getByRole("heading", { level: 1 });
  const luan = page.getByRole("link", { name: /Luan West.*CEO.*Co-founder/i });
  await expect(conviction).toBeVisible();
  await expect(luan).toHaveAttribute("href", "https://www.linkedin.com/in/luanwest/");
  expect(await conviction.evaluate((element) => element.getBoundingClientRect().top + scrollY)).toBeLessThan(
    await luan.evaluate((element) => element.getBoundingClientRect().top + scrollY),
  );
});

test("clinic diagnostic keeps the result on-page after email delivery", async ({ page }) => {
  await page.route("**/api/diagnostic", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, delivery: "sent" }) });
  });
  await page.goto("/quiz");
  await page.getByRole("button", { name: /continue to journey/i }).click();
  await page.getByRole("button", { name: /continue to fit/i }).click();
  await page.getByRole("button", { name: /see my result/i }).click();
  await page.getByLabel(/full name/i).fill("Clinic Owner");
  await page.getByLabel(/work email/i).fill("owner@example.com");
  await page.getByLabel(/clinic name/i).fill("North Clinic");
  await page.getByLabel(/send my report/i).check();
  await page.getByRole("button", { name: /reveal my clinic result/i }).click();
  await expect(page.getByRole("heading", { name: /patient conversion system/i })).toBeVisible();
  await expect(page.getByText(/illustrative estimate, not a guarantee/i)).toBeVisible();
  await expect(page.getByText("Your report was sent.")).toBeVisible();
});

test("Careers submits a private résumé application without leaving the page", async ({ page }) => {
  await page.route("**/api/careers", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, stored: "private", delivery: "sent" }) });
  });
  await page.goto("/careers");
  await page.getByLabel("Full name").fill("Avery Smith");
  await page.getByLabel("Email").fill("avery@example.com");
  await page.getByLabel(/location and time zone/i).fill("Toronto · ET");
  await page.getByLabel(/relevant experience/i).fill("Built reliable automation and voice systems for service businesses.");
  await page.getByLabel(/why regena/i).fill("I own implementation quality and communicate clearly after launch.");
  await page.getByLabel("Résumé").setInputFiles({ name: "resume.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.7 resume") });
  await page.getByLabel(/I consent/i).check();
  await page.getByRole("button", { name: /send application/i }).click();
  await expect(page.getByText(/application received/i)).toBeVisible();
});

test("Blog index reaches a complete article with a working table of contents", async ({ page }) => {
  await page.goto("/blog");
  await page.getByRole("link", { name: /read why patient demand disappears/i }).click();
  await expect(page).toHaveURL(/why-patient-demand-disappears/);
  await expect(page.getByRole("navigation", { name: /in this article/i })).toBeVisible();
  const firstSection = page.getByRole("heading", { name: "Demand is a moving state, not a lead record" });
  await page.getByRole("link", { name: "Demand is a moving state, not a lead record" }).click();
  await expect(firstSection).toBeInViewport();
});

test("new experiences remain usable under reduced motion and on mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/quiz", "/careers", "/blog", "/company"]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  }
});
