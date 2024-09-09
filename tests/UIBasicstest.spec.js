const { test, expect } = require('@playwright/test');


test.only('Verify title', async ({page}) => {

    await page.goto('https://automationexercise.com');
    await expect(page).toHaveTitle('Automation Exercise');     
    await page.locator('.fa.fa-lock').click();
    await page.locator('[data-qa="login-email"]').fill('trip27@lftjaguar.com');
    await page.locator('[data-qa="login-password"]').fill('12314');
    await page.locator('[data-qa="login-button"]').click();
    let text1 = console.log(await page.locator('p[style*="color"]').textContent());
    await expect(page.locator('p[style*="color"]')).toContainText('Your email or password is incorrect!')
    await page.pause()
});