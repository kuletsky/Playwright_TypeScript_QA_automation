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

test('Verify visual Main page', async({ page }) => {
    await page.goto('https://automationexercise.com/');
    await expect(await page.screenshot()).toMatchSnapshot('/screenshorts/main.png')

});