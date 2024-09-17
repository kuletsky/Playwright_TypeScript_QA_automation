const { test, expect } = require('@playwright/test');
const exp = require('constants');
const { text } = require('stream/consumers');


test('Verify title', async ({page}) => {

    const userName = page.locator('[data-qa="login-email"]');
    const userPSW = page.locator('[data-qa="login-password"]');
    const signIn = page.locator('[data-qa="login-button"]');
    const cardTitles = page.locator('.productinfo.text-center p');
    const Up = page.locator('.fa.fa-angle-up'); 

    await page.goto('https://automationexercise.com');
    await expect(page).toHaveTitle('Automation Exercise');     
    await page.locator('.fa.fa-lock').click();
    await userName.fill('trip27@lftjaguar.com1');
    await userPSW.fill('1234');
    await signIn.click();
    // await page.waitForLoadState('networkidle');
    // await cardTitles.last().waitFor();

    let text1 = console.log(await page.locator('p[style*="color"]').textContent());

    await expect(page.locator('p[style*="color"]')).toContainText('Your email or password is incorrect!');

    await userName.fill('');
    await userName.fill('trip27@lftjaguar.com');
    await signIn.click();

    console.log(await page.locator('.features_items .title').textContent());
    await expect(page.locator('.features_items .title')).toContainText('Features Items');

    
    console.log(await cardTitles.allTextContents());

    await expect(Up).toHaveAttribute('class', 'fa fa-angle-up');


});

test('Banner verify', async({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://courses.datacumulus.com/');
    const apacheLink = page.locator('a[href*="kafka.apache.org"]').first();
    
    const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'),
        apacheLink.click(),
    ])
    const text = await newPage.locator('.content-top-title').textContent();
    console.log(text);

    await expect(newPage.locator('.content-top-title')).toContainText('Apache Kafka');
    
    // newPage.pause();
   


});