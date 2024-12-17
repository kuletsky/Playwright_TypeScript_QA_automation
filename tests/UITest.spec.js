const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/');
        // Verify the page title
        await expect(page).toHaveTitle('Automation Exercise');

        // Verify the presence of a logo
        const logo = await page.locator('img[alt="Website for automation practice"]');
        await expect(page.locator(logo)).toBeVisible;
    
        // Verify URL if applicable
        await expect(page).toHaveURL('https://automationexercise.com/');
});

const testData = {
    name: 'john',
    email: 'john@gm123456789012.com'
};

test.describe('Login tests', () => {
    test('Verify that user can successfuly SignUp with valid credentials',  async ({ page }) => {
        // Verify the New user signUp is visible 
        await page.locator('.fa.fa-lock').click();
        const signUp = await page.locator('.signup-form h2').textContent();
        await expect(signUp).toContain('New User Signup!')
    
        // Enter name and email address
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
            
        // Verify that 'Account created!' is visible
        const account_created = await page.locator('b').textContent();
        await expect(account_created).toContain('Account Created!');
            
        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();
    
        // Verify that 'Logged in as Username'
        const logged = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
        await expect(logged).toContain('Logged in as');
    
        // Click 'Delete account' button
        await page.locator('a[href*="del"]').click();
    
        // Verify that 'ACCOUNT DELETED!' is visible
        const del = await page.locator('b').textContent();
        await expect(del).toContain('Account Deleted!')
    
        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();        
    
        // Verify the page title
        await expect(page).toHaveTitle('Automation Exercise');
    
        // Verify the presence of a logo
        const logo = await page.locator('img[alt="Website for automation practice"]');
        await expect(page.locator(logo)).toBeVisible;
    
        // Verify URL if applicable
        await expect(page).toHaveURL('https://automationexercise.com/')
    
        // await page.pause();
    }); 
        
    test('Verify that user can successfuly SignIn with valid credentials', async ({ page }) => {
        // Click the 'Signup/Login' button
        page.locator('.fa.fa-lock').click();
          
        // Verify 'Login to your acount' is visible
        const loginForm = await page.locator('.login-form h2').textContent();
        await expect(loginForm).toContain('Login to your account');
        
        // Enter valid email amd password
        await page.locator('[data-qa="login-email"]').fill('trip27@lftjaguar.com');
        await page.locator('[data-qa="login-password"]').fill('1234');
    
        // Click the 'Login' button
        await page.locator('[data-qa="login-button"]').click();
            
        // Verify that 'Logged in as' is visible
        const logged = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
        await expect(logged).toContain('Logged in as');
    });
        
    test('Verify that user cannot SignIn with invalid credentials', async ({ page }) => {
        // Click the 'Signup/Login' button
        page.locator('.fa.fa-lock').click();
    
        // Enter invalid crdentials
        await page.locator('[data-qa="login-email"]').fill('trip27@lftjaguar.com');
        await page.locator('[data-qa="login-password"]').fill('1234r5');
    
        // Click the 'Login' button
        await page.locator('[data-qa="login-button"]').click();
    
        // Verify error 'Your email or password is incorrect!' is vissible
        const error = await page.getByText('Your email or password is incorrect!').textContent();
        await expect(error).toContain('Your email or password is incorrect!');
    });
    
    test('Verify user can successfuly Logout', async( {page} ) => {
        // Click the 'Signup/Login' button
        page.locator('.fa.fa-lock').click();
          
        // Verify 'Login to your acount' is visible
        const loginForm = await page.locator('.login-form h2').textContent();
        await expect(loginForm).toContain('Login to your account');
        
        // Enter valid email amd password
        await page.locator('[data-qa="login-email"]').fill('trip27@lftjaguar.com');
        await page.locator('[data-qa="login-password"]').fill('1234');
    
        // Click the 'Login' button
        await page.locator('[data-qa="login-button"]').click();
            
        // Verify that 'Logged in as' is visible
        const logged = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
        await expect(logged).toContain('Logged in as');
    
        // Click 'logout' button
        await page.locator('a[href*="/logout"]').click();
            
        // Verify thet user navigated to gin page
        await expect(loginForm).toContain('Login to your account');
    });
    
    test.only('Verify that User cannot signUp with existing email', async( {page} ) => {
        // Verify the 'New user signUp' is visible 
        await page.locator('.fa.fa-lock').click();
        const signUp = await page.locator('.signup-form h2').textContent();
        await expect(signUp).toContain('New User Signup!')
    
        // Enter name and already registered email address
        const signupNameInput = page.locator('[data-qa="signup-name"]');
        const signupEmailInput = page.locator('[data-qa="signup-email"]');
        await signupNameInput.fill(testData.name);
        await signupEmailInput.fill('trip27@lftjaguar.com');
    
        // Click 'signUp' button
        await page.locator('[data-qa="signup-button"]').click();

        // Verify error 'Email Adress already exist!' is visible
        const regError = await page.getByText('Email Address already exist!').textContent();
        expect(regError).toContain('Email Address already exist!');

    });
});
