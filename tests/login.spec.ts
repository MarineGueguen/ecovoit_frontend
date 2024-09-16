import { test, expect } from '@playwright/test';
import { LOCATORS, DATA } from '../src/constants/tests/login'

test('[Login] Being logged with right credentials', async ({ page }) => {  
    // TODO: add step to go from home page to login page thru navbar
    await page.goto('/connexion');
    await expect(page.getByTestId(LOCATORS.login)).toBeVisible();
    await page.getByTestId(LOCATORS.emailInput).fill(DATA.email);
    await page.getByTestId(LOCATORS.passwordInput).fill(DATA.password);
    await page.getByTestId(LOCATORS.loginButton).click();
    // await expect(page).toHaveURL('/');
});
