const { test, expect } = require('@playwright/test');
const exp = require('constants');
const { syncBuiltinESMExports } = require('module');

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

test.describe('UI tests', () => {
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
    
    test('Verify user can successfuly Logout', async({ page }) => {
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
    
    test('Verify that User cannot signUp with existing email', async({ page }) => {
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

    test('Verify user can navigate to Contact Us Form', async ({ page }) => {
    // Click on "Contuct Us" button
    await page.locator('a[href*="contact"]').click();

    // Verify "Get in touch" is visible
    const getinTouch = await page.locator('.contact-form h2').textContent();
    await expect(getinTouch).toContain('Get In Touch');

    // Fill the form
    page.on('dialog', async (dialog) => {
        console.log(dialog.message()); 
        await dialog.accept();         
      });

    await page.locator('[data-qa="name"]').fill('John');
    await page.locator('[data-qa="email"]').fill('wqfq@fvgf.com');
    await page.locator('[data-qa="subject"]').fill('wef');
    await page.locator('[data-qa="message"]').fill('qfwf');

    // Upload a file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('test-data.json');

    // Click "Submit" button
    // page.on('dialog', async (dialog) => {
    //     console.log(dialog.message()); 
    //     await dialog.accept();         
    //   });
    // await page.locator('[data-qa="submit-button"]').click();
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept().catch(() => {});
      });
      await page.getByRole('button', { name: 'Submit' }).click();
    // await page.waitForSelector('.status.alert.alert-success')
    // Verify success message "Success! Your details have been submitted successfully" is visible
    // const msg = await page.locator('.status.alert.alert-success').textContent();
    // await expect(msg).toContain('Success! Your details have been submitted successfully.');
    //   await expect(page.locator('.status.alert.alert-success')).toHaveText('Success! Your details have been submitted successfully');
    // await page.pause();
    });

    test('Verify that user can navigate to Test Cases Page', async ({ page }) => {
        await page.locator('a[href*="test"]').first().click();
        await expect(page.locator('h2 b')).toHaveText('Test Cases');

    });

    test('Verify that user can navigate All products page and product detail page', async ({ page }) => {
        await page.locator('a[href="/products"]').click();

        // Verify that the page is navigated successfuly 
        await expect(page.locator('.title.text-center')).toHaveText('All Products');

        // Verify that all list of products is visible
        const products = await page.locator('.single-products');
          
        for (let i = 0; i < await products.count(); i++) {
            const productList = products.nth(i);
            await expect(productList.locator('.productinfo.text-center p')).not.toHaveText('');
            await expect(productList.locator('.productinfo.text-center h2')).not.toHaveText('');
        };

        // Click on 'View Product' of first product
        await page.locator('a[href="/product_details/1"]').click();

        // Verify User is landed to product detail page
        await expect(page).toHaveURL('https://automationexercise.com/product_details/1');
        await expect(page.locator('.product-information h2')).toBeVisible();
        await expect(page.locator('.product-information p').nth(0)).toBeVisible();
        await expect(page.locator('.product-information p').nth(1)).toBeVisible();
        await expect(page.locator('.product-information p').nth(2)).toBeVisible();
        await expect(page.locator('.product-information p').nth(3)).toBeVisible();
        await expect(page.locator('.product-information span').nth(1)).toBeVisible();
    });

    test('Verify that user can search a product', async ({ page }) => {
        await page.locator('a[href="/products"]').click();
        // Verify that the page is navigated successfuly 
        await expect(page.locator('.title.text-center')).toHaveText('All Products');

        // Verify that all list of products is visible
        const products = await page.locator('.single-products');

        await page.locator('#search_product').fill('Polo');
        await page.locator('.fa.fa-search').click();
        
        // const products1 = .productinfo.text-center p
        for (let i = 0; i < await products.count(); i++) {
            const searchList = products.nth(i);
            expect(await searchList.locator('.productinfo.text-center p')).toContainText('Polo');
        };

    });
    
    test('Verify that user can succcessfully subscribe', async ({ page }) => {
        // Verify text Subscription
        await page.locator('.single-widget').scrollIntoViewIfNeeded();
        await expect(page.locator('.single-widget h2')).toHaveText('Subscription');    

        // Enter email address in input and click arrow button
        await page.locator('#susbscribe_email').fill('wef@weg.com');
        await page.locator('#subscribe').click();
        
        // Verify success message 'You have been successfully subscribed!' is visible
        await expect(page.locator('.alert-success.alert')).toContainText('You have been successfully subscribed!')
    });

    test('Verify Subscription in Cart page', async ({ page }) => {
        // Click 'Cart' button
        await page.locator('a[href*="cart"]').first().click();
        
        // Verify text Subscription
        await page.locator('.single-widget').scrollIntoViewIfNeeded();
        await expect(page.locator('.single-widget h2')).toHaveText('Subscription');    
 
        // Enter email address in input and click arrow button
        await page.locator('#susbscribe_email').fill('wef@weg.com');
        await page.locator('#subscribe').click();
         
        // Verify success message 'You have been successfully subscribed!' is visible
        await expect(page.locator('.alert-success.alert')).toContainText('You have been successfully subscribed!')
    });

    test.only('Verify user can add product in Cart', async ({ page }) => {
        // Click 'Products' button
        await page.locator('a[href*="/products"]').click();

        // Hover over first product and click "Add to cart"
        const product1 = await page.locator('.single-products').first();
        const product1Name = await product1.locator('.productinfo.text-center p').textContent();
        await product1.hover();
        await product1.getByText('Add to cart').nth(1).click();

        // Click 'Continue Shopping' button
        await page.locator('[data-dismiss="modal"]').click();

        // Hover over second product and click 'Add to cart'
        const product2 = await page.locator('.single-products').nth(1);
        const product2Name = await product2.locator('.productinfo.text-center p').textContent();
        await product2.hover();
        await product2.getByText('Add to cart').nth(1).click();

        // Click 'View Cart' button
        await page.locator('a[href="/view_cart"]').nth(1).click();

        // Verify both products are added to Cart
        console.log(product1Name, product2Name)
        await expect(page.locator('a[href="/product_details/1"]')).toContainText(product1Name);
        await expect(page.locator('a[href="/product_details/2"]')).toContainText(product2Name);

        await page.pause();


    });
});
