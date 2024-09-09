const { test, expect } = require('@playwright/test');


test.only('Verify title', async ({page}) => {

    await page.goto('https://automationexercise.com');
    await expect(page).toHaveTitle('Google');     
    await page.locator('.fa.fa-home').click()
    // page.locator

});