const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll( async({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage(); 

    await page.goto('https://automationexercise.com/');
    await page.locator('.fa.fa-lock').click();
    
    // Enter valid email amd password
    await page.locator('[data-qa="login-email"]').fill('trip27@lftjaguar.com');
    await page.locator('[data-qa="login-password"]').fill('1234');

    // Click the 'Login' button
    await page.locator('[data-qa="login-button"]').click();

    // Storage cookies
    await context.storageState({path: 'state.json'});

    // Inject cookies
    webContext = await browser.newContext({storageState: 'state.json'});
});

test('Verify that user can successfuly SignIn with valid credentials', async () => {
    // LogIn
    const page = await webContext.newPage();   

    // Go to mainPage
    await page.goto('https://automationexercise.com/');
    
    // Verify that user loged in successfuly 
    await expect(page.locator('a').filter({ hasText: 'Logged in as' })).toContainText('Logged in as');
});