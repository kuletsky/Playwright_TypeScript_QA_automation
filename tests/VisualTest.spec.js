const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.route('**/*', (route) => {
        if (route.request().url().includes('google')) {
            route.abort();
        } else {
            route.continue();
        }
    });
});

test('Verify visual Main page', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveScreenshot('main.png');
});

test('Verify visual contuct Us page', async ({ page }) => {
    await page.goto('https://automationexercise.com/contact_us');
    await expect(page).toHaveScreenshot('contuctUs.png');
    await expect(locator('wegf')).toMatch
});