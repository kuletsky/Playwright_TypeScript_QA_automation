const {test, expect} = require('@playwright/test');
const exp = require('constants');

test('Browser context test',  async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://automationexercise.com/'); 

}); 

test.only('Register User',  async ({page})=>
    {
        await page.goto('https://automationexercise.com/');
        
        // Verify the page title
        await expect(page).toHaveTitle('Automation Exercise');

        // Verify the presence of a logo
        const logo = await page.locator('img[alt="Website for automation practice"]')
        await expect(page.locator(logo)).toBeVisible;

        // Verify URL if applicable
        await expect(page).toHaveURL('https://automationexercise.com/')
        
        // Verify the New user signUp is visible 
        await page.locator('.fa.fa-lock').click();
        const signUp = await page.locator('.signup-form h2').textContent();
        await expect(signUp).toBe('New User Signup!')

        // Enter name and email address
        const testData = {
            name: 'john',
            email: 'john@gm.com'
        };

        const signupNameInput = page.locator('[data-qa="signup-name"]');
        const signupEmailInput = page.locator('[data-qa="signup-email"]');

        // Verify that input fields contain the expected values
        await signupNameInput.fill(testData.name);
        await expect(signupNameInput).toHaveValue(testData.name);

        await signupEmailInput.fill(testData.email);
        await expect(signupEmailInput).toHaveValue(testData.email);

        // Verify 
        

    }); 
    