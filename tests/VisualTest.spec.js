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

test('Verify visual appearance of the header on the Main page', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveScreenshot('main.png');
});

test('Verify visual appearance of the header on the Contuct Us page', async ({ page }) => {
    await page.goto('https://automationexercise.com/contact_us');
    await expect(page).toHaveScreenshot('contuctUs.png');
});

test('Verify visual appearance of the header on the Cart page', async ({ page }) => {
    await page.goto('https://automationexercise.com/view_cart');
    await expect(page.locator('#header')).toHaveScreenshot('header of Cart.png');
});