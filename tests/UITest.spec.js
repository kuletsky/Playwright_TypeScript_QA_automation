const {test, expect} = require('@playwright/test');
const exp = require('constants');
const { ADDRGETNETWORKPARAMS } = require('dns');
// const testData = require('./test-data.json')

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
        await expect(signUp).toContain('New User Signup!')

        // Enter name and email address
        const testData = {
            name: 'john',
            email: 'john@gm1.com'
        };

        const signupNameInput = page.locator('[data-qa="signup-name"]');
        const signupEmailInput = page.locator('[data-qa="signup-email"]');

        // Verify that input fields contain the expected values
        await signupNameInput.fill(testData.name);
        await expect(signupNameInput).toHaveValue(testData.name);

        await signupEmailInput.fill(testData.email);
        await expect(signupEmailInput).toHaveValue(testData.email);

        // Click 'signUp' button
        await page.locator('[data-qa="signup-button"]').click();
        
        // Verify that 'ENTER ACCOUNT INFORMATION' is visible
        const text = await page.locator('b').first().textContent();
        await expect(text).toContain('Enter Account Information');
        
        // Fill detailse: Title, Name, Email, Password, Date of birth
            
            // Verify title radio botton works
            const title = page.locator('#id_gender1');
            await title.check();
            await expect(title).toBeChecked();
            await expect(page.locator('#id_gender2')).not.toBeChecked();

            // Veryfy that Name field contains the expected name
            const name = page.locator('#name');
            await name.fill('');
            await name.fill('john');
            await expect(name).toHaveValue('john'); 

            const email = page.locator('#email');

            // Verify that pswd contains the expected password
            const pswd = page.locator('#password');
            await pswd.fill('1234');
            await expect(pswd).toHaveValue('1234')

            await page.locator('[for="newsletter"]').check();
            await page.locator('[for="optin"]').check();

           
            // Fill details
            await page.locator('#first_name').fill('John');
            await page.locator('#last_name').fill('Cooper');
            await page.locator('#company').fill('Kuletsky Software');
            await page.locator('#address1').fill('address1');
            await page.locator('#address2').fill('address2');
            await page.locator('select#country').selectOption('United States');
            await page.locator('#state').fill('MD');
            await page.locator('#city').fill('Goodwil');
            await page.locator('#zipcode').fill('111111');
            await page.locator('#mobile_number').fill('12345678');
         await page.locator('[data-qa="create-account"]').click();
        
        await page.pause();


    }); 
    