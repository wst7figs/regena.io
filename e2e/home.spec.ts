import { expect, test } from "@playwright/test";

for (const width of [375, 768, 1024, 1440]) {
  test(`homepage fits ${width}px without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );

    expect(overflow).toBe(false);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}

test("booking calls to action reach the focused booking page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("link", { name: "Book a strategy call" }).first().click();

  await expect(page).toHaveURL(/\/book$/);
  await expect(page.getByRole("heading", { level: 1, name: /find where your patient journey/i })).toBeVisible();
});

test("desktop scroll advances the patient journey", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const story = page.locator("[data-active-stage]");
  await story.scrollIntoViewIfNeeded();
  await page.locator('[data-scroll-marker="book"]').scrollIntoViewIfNeeded();

  await expect(story).toHaveAttribute("data-active-stage", "book");
  await expect(page.locator(".journey-story-shell")).toBeInViewport();
  await expect(page.getByRole("tab", { name: "Book" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("mobile uses the vertical journey instead of the sticky desktop scene", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  await expect(page.locator(".journey-mobile-story")).toBeVisible();
  await expect(page.locator(".journey-sticky")).toBeHidden();
  await expect(page.locator("[data-mobile-stage]")).toHaveCount(5);
});

test("reduced motion exposes the complete journey without a scroll trap", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.locator("[data-stage-copy]")).toHaveCount(5);
  const storyHeight = await page
    .locator(".journey-scroll-story")
    .evaluate((element) => element.getBoundingClientRect().height);
  expect(storyHeight).toBeLessThan(2700);
});

test("below-the-fold content stays visible before scroll reveals run", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const heading = page.getByRole("heading", { name: /the lead is rarely the problem/i });
  const opacity = await heading.evaluate((element) => getComputedStyle(element.closest(".reveal")!).opacity);

  expect(opacity).toBe("1");
});

test("hero rays flow unless reduced motion is requested", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const bundles = page.locator("[data-ray-bundle]");
  await expect(bundles).toHaveCount(2);
  const animatedNames = await bundles.evaluateAll((elements) =>
    elements.map((element) => getComputedStyle(element).animationName),
  );
  expect(animatedNames.every((name) => name !== "none")).toBe(true);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  const reducedNames = await bundles.evaluateAll((elements) =>
    elements.map((element) => getComputedStyle(element).animationName),
  );
  expect(reducedNames).toEqual(["none", "none"]);
});

test("hero rays retain visible contrast around the hero interface", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const rayOpacity = await page
    .getByTestId("hero-rays")
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity));
  const auraOpacity = await page
    .locator(".hero-ray-aura")
    .first()
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity));

  expect(rayOpacity).toBeGreaterThanOrEqual(1);
  expect(auraOpacity).toBeGreaterThanOrEqual(0.2);
});

test("hero call meter uses a continuous independent voice cadence", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const cadence = await page.locator(".hero-waveform i").evaluateAll((bars) =>
    bars.map((bar) => {
      const styles = getComputedStyle(bar);
      return {
        delay: styles.animationDelay,
        duration: styles.animationDuration,
        iterations: styles.animationIterationCount,
      };
    }),
  );

  expect(new Set(cadence.map(({ duration }) => duration)).size).toBeGreaterThanOrEqual(6);
  expect(cadence.every(({ iterations }) => iterations === "infinite")).toBe(true);
  expect(cadence.some(({ delay }) => delay.startsWith("-"))).toBe(true);
});

test("proof arrives before the shortened desktop journey", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const proofTop = await page
    .getByRole("region", { name: /visionmax result/i })
    .evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
  const journeyHeight = await page
    .locator(".journey-scroll-story")
    .evaluate((element) => element.getBoundingClientRect().height);

  expect(proofTop).toBeLessThan(1200);
  expect(journeyHeight).toBeGreaterThan(3500);
  expect(journeyHeight).toBeLessThan(4800);
});

test("primary navigation and journey explanations remain readable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const navSize = await page
    .locator(".desktop-nav > a")
    .first()
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
  const journeyCopySize = await page
    .locator(".journey-story-label small")
    .first()
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));

  expect(navSize).toBeGreaterThanOrEqual(12);
  expect(journeyCopySize).toBeGreaterThanOrEqual(12);
});

test("homepage produces no browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await page.locator("footer").scrollIntoViewIfNeeded();

  expect(errors).toEqual([]);
});
