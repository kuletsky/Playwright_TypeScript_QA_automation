const { test, expect } = require('@playwright/test');
const exp = require('constants');
const { execPath } = require('process');
const { text } = require('stream/consumers');


test('Login User with correct email and password', async ({page}) => {

    const userName = page.locator('[data-qa="login-email"]');
    const userPSW = page.locator('[data-qa="login-password"]');
    const signUpMenu = page.locator('.fa.fa-lock');
    const loginBTN = page.locator('[data-qa="login-button"]');
    const cardTitles = page.locator('.productinfo.text-center p');
    

    await page.goto('https://automationexercise.com');
    await expect(page).toHaveTitle('Automation Exercise');     
    await signUpMenu.click();
    await userName.fill('trip27@lftjaguar.com1');
    await userPSW.fill('1234');
    await loginBTN.click();
 
    await expect(page.locator('p[style*="color"]')).toContainText('Your email or password is incorrect!');

    await userName.fill('');
    await userName.fill('trip27@lftjaguar.com');
    await signInBTN.click();

    console.log(await page.locator('.features_items .title').textContent());
    await expect(page.locator('.features_items .title')).toContainText('Features Items');

    
    console.log(await cardTitles.allTextContents());

    await expect(Up).toHaveAttribute('class', 'fa fa-angle-up');


});

test('Verify Kafka', async({browser}) =>{
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

test.only('Add products in cart', async ({page}) => {

    const userName = page.locator('[data-qa="login-email"]');
    const userPSW = page.locator('[data-qa="login-password"]');
    const signUpMenu = page.locator('.fa.fa-lock');
    const loginBTN = page.locator('[data-qa="login-button"]');
    const products = page.locator('.productinfo.text-center');
    const productName = 'Men Tshirt'
    const cart = page.locator('li a[href*="/view"]');
    
    await page.goto('https://automationexercise.com');
    await expect(page).toHaveTitle('Automation Exercise');     
    await signUpMenu.click();
    await userName.fill('trip27@lftjaguar.com');
    await userPSW.fill('1234');
    await loginBTN.click();

    // console.log(await products.locator('p').allTextContents());
    const count = await products.count();
    console.log(count)

    // console.log(products.nth('2').locator('p').textContent())
    
    for(let i =0; i < count; ++i)
    {
        if(await products.nth(i).locator('h2').textContent() === productName)
        {
            console.log(await products.nth(i).locator('h2').textContent());
            await products.nth(i).locator('a').click();
            await page.locator('[data-dismiss="modal"]').click();
            break;
        }
    }

    await cart.click();
    await page.locator('div table').waitFor();

    await expect(page.locator('h4 a[href*="/product"]')).toContainText(productName);
    await page.locator('.btn.btn-default.check_out').click();
    await expect(page.locator('h4 a[href*="/product"]')).toContainText(productName);
    await page.locator('.btn.btn-default.check_out').click();
    


    // await page.pause();

});