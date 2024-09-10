const { test, expect } = require('@playwright/test');


test('Verify title', async ({page}) => {

    const userName = page.locator('[data-qa="login-email"]');
    const signIn = page.locator('[data-qa="login-button"]');

    await page.goto('https://automationexercise.com');
    await expect(page).toHaveTitle('Automation Exercise');     
    await page.locator('.fa.fa-lock').click();
    await userName.fill('trip27@lftjaguar.com1');
    await page.locator('[data-qa="login-password"]').fill('1234');
    await signIn.click();
    let text1 = console.log(await page.locator('p[style*="color"]').textContent());

    await expect(page.locator('p[style*="color"]')).toContainText('Your email or password is incorrect!');

    await userName.fill('');
    await userName.fill('trip27@lftjaguar.com');
    await signIn.click();

    console.log(await page.locator('.features_items .title').textContent());
    await expect(page.locator('.features_items .title')).toContainText('Features Items');

    // await page.pause()
});