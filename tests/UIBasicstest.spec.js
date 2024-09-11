const { test, expect } = require('@playwright/test');


test('Verify title', async ({page}) => {

    const userName = page.locator('[data-qa="login-email"]');
    const userPSW = page.locator('[data-qa="login-password"]');
    const signIn = page.locator('[data-qa="login-button"]');
    const cardTitles = page.locator('.productinfo.text-center p');


    await page.goto('https://automationexercise.com');
    await expect(page).toHaveTitle('Automation Exercise');     
    await page.locator('.fa.fa-lock').click();
    await userName.fill('trip27@lftjaguar.com1');
    await userPSW.fill('1234');
    await signIn.click();
    // await page.waitForLoadState('networkidle');
    // await cardTitles.waitFor();

    let text1 = console.log(await page.locator('p[style*="color"]').textContent());

    await expect(page.locator('p[style*="color"]')).toContainText('Your email or password is incorrect!');

    await userName.fill('');
    await userName.fill('trip27@lftjaguar.com');
    await signIn.click();

    console.log(await page.locator('.features_items .title').textContent());
    await expect(page.locator('.features_items .title')).toContainText('Features Items');

    
    console.log(await cardTitles.allTextContents());

});