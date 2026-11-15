import { expect, test } from "@playwright/test";

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
