import { expect, test, type Page } from "@playwright/test";

for (const width of [375, 768, 1024, 1440]) {
  test(`homepage fits ${width}px without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/patients in your chair/i);
  });
}

test("primary calls to action open the apply funnel", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("link", { name: /check if your area is open/i }).first().click();
  await expect(page).toHaveURL(/\/apply$/);
  await expect(page.getByRole("heading", { level: 1, name: /check if your area is open/i })).toBeVisible();
});

async function fillContact(page: Page, region: string, country: "CA" | "US" = "CA") {
  await page.goto("/apply");
  await page.evaluate(() => localStorage.removeItem("regena-apply-v1"));
  await page.reload();
  await page.locator("#name").fill("Test Owner");
  await page.locator("#clinic").fill("Test Clinic");
  await page.locator("#email").fill("owner@example.test");
  await page.locator("#phone").fill("555 010 0100");
  await page.locator("#country").selectOption(country);
  await page.locator("#region").fill(region);
  await page.locator("#city").fill("Testville");
  await page.getByRole("checkbox", { name: /I agree that Regena can contact me/i }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Step 2 of 2")).toBeVisible();
}

async function answerQuestions(page: Page) {
  await page.getByLabel("Injectables").check();
  await page.getByLabel("Under $25k").check();
  await page.getByLabel("Not sure", { exact: true }).check();
  await page.getByLabel("Not right now").check();
  await page.getByRole("button", { name: /see if we're a fit/i }).click();
}

test("apply funnel: a small injectables clinic still gets the calendar, pre-filled", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await fillContact(page, "Ontario");
  await answerQuestions(page);
  await expect(page.getByRole("heading", { name: /pick a time with luan/i })).toBeVisible();
  const src = await page.locator("iframe[title='Book a call with Regena']").getAttribute("src");
  const url = new URL(src ?? "");
  expect(url.hostname).toBe("go.regena.io");
  expect(url.searchParams.get("full_name")).toBe("Test Owner");
  expect(url.searchParams.get("email")).toBe("owner@example.test");
});

test("apply funnel: Florida gets a polite not-a-fit", async ({ page }) => {
  await fillContact(page, "FL", "US");
  await answerQuestions(page);
  await expect(page.getByRole("heading", { name: /not the right fit yet/i })).toBeVisible();
  await expect(page.getByText(/florida/i)).toBeVisible();
});

test("apply funnel: missing details are explained, not silently ignored", async ({ page }) => {
  await page.goto("/apply");
  await page.evaluate(() => localStorage.removeItem("regena-apply-v1"));
  await page.reload();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator(".apply-errors")).toContainText("Please agree to be contacted");
});
