import { test, expect } from '@playwright/test';
import { LOCATORS } from '../src/constants/tests/journeysList';

test("Display message if user didn't make research of a journey yet", async ({ page }) => {
  await page.goto("/trajets");
  await expect(page.getByTestId(LOCATORS.noResearch)).toBeVisible();
  await expect(page.getByTestId(LOCATORS.noFounds)).toBeHidden();
  await expect(page.getByTestId(LOCATORS.journeyCard)).toBeHidden();
})