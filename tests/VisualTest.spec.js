// const { test, expect } = require('@playwright/test');
// require('dotenv').config();

// test.beforeEach(async ({ page }) => {
//     await page.route('**/*', (route) => {
//         if (route.request().url().includes('google')) {
//             route.abort();
//         } else {
//             route.continue();
//         }
//     });
// });

// test('Verify visual appearance of the header on the Main page', async ({ page }) => {
//     await page.goto(process.env.BASE_URL);
//     await expect(page).toHaveScreenshot('main.png');
// });

// test('Verify visual appearance of the header on the Contuct Us page', async ({ page }) => {
//     await page.goto('${process.env.BASE_URL}/contact_us');
//     await expect(page).toHaveScreenshot('contuctUs.png');
// });

// test('Verify visual appearance of the header on the Cart page', async ({ page }) => {
//     await page.goto('${process.env.BASE_URL}/view_cart');
//     await expect(page.locator('#header')).toHaveScreenshot('header of Cart.png');
// });