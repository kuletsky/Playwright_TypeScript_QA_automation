const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POManager');
require('dotenv').config();

const dataSet = JSON.parse(JSON.stringify(require("../utils/uitestData.json")));

test.beforeEach(async ({ page }) => {
    await page.route('**/*', (route) => {
        if (route.request().url().includes('google')) {
            route.abort();
        } else {
            route.continue();
        }
    });

    await page.goto(process.env.BASE_URL);

    // Verify the page title
    await expect(page).toHaveTitle('Automation Exercise');

    // Verify the presence of a logo
    const logo = page.locator('img[alt="Website for automation practice"]');
    expect(page.locator(logo)).toBeVisible;

    // Verify URL if applicable
    await expect(page).toHaveURL(process.env.BASE_URL);
});

const testData = {
    name: 'john',
    email: 'john@gwm1sw2s3ws5cqww.com'
};

test.describe('UI tests', () => {
    test('Verify that user can successfuly SignUp with valid credentials', async ({ page }) => {
        // Verify the New user signUp is visible 
        await page.locator('.fa.fa-lock').click();
        const signUp = await page.locator('.signup-form h2').textContent();
        expect(signUp).toContain('New User Signup!')

        // Enter name and email address
        const signupNameInput = page.locator('[data-qa="signup-name"]');
        const signupEmailInput = page.locator('[data-qa="signup-email"]');

        await signupNameInput.fill(testData.name);
        await signupEmailInput.fill(testData.email);

        // Click 'signUp' button
        await page.locator('[data-qa="signup-button"]').click();

        // Verify that 'ENTER ACCOUNT INFORMATION' is visible
        await page.waitForLoadState();
        const text = await page.locator('b').first().textContent();
        expect(text).toContain('Enter Account Information');

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
        expect(account_created).toContain('Account Created!');

        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();

        // Verify that 'Logged in as Username'
        const logged = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
        expect(logged).toContain('Logged in as');

        // Click 'Delete account' button
        await page.locator('a[href*="del"]').click();

        // Verify that 'ACCOUNT DELETED!' is visible
        const del = await page.locator('b').textContent();
        expect(del).toContain('Account Deleted!')

        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();

        // Verify the page title
        await expect(page).toHaveTitle('Automation Exercise');

        // Verify the presence of a logo
        const logo = page.locator('img[alt="Website for automation practice"]');
        expect(page.locator(logo)).toBeVisible;

        // Verify URL if applicable
        await expect(page).toHaveURL(process.env.BASE_URL)
    });

    for (const data of dataSet) {
        test(`Verify that user can successfuly SignIn with valid credentials ${data.email}`, async ({ page }) => {

            const poManager = new POManager(page);
            // const email = dataSet.email;
            // const psw = dataSet.psw;
            // Click the 'Signup/Login' button
            await page.locator('.fa.fa-lock').click();

            // Verify 'Login to your acount' is visible
            const loginForm = await page.locator('.login-form h2').textContent();
            expect(loginForm).toContain('Login to your account');

            const loginPage = poManager.getLoginPage();
            await loginPage.signIn(data.email, data.psw);

            // // Enter valid email amd password
            // await page.locator('[data-qa="login-email"]').fill('trip27@lftjaguar.com');
            // await page.locator('[data-qa="login-password"]').fill('1234');

            // // Click the 'Login' button
            // await page.locator('[data-qa="login-button"]').click();

            // Verify that 'Logged in as' is visible
            const logged = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
            expect(logged).toContain('Logged in as');
        });
    };

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
        expect(error).toContain('Your email or password is incorrect!');
    });

    test('Verify user can successfuly Logout', async ({ page }) => {
        // Click the 'Signup/Login' button
        page.locator('.fa.fa-lock').click();

        // Verify 'Login to your acount' is visible
        const loginForm = await page.locator('.login-form h2').textContent();
        expect(loginForm).toContain('Login to your account');

        // Enter valid email amd password
        await page.locator('[data-qa="login-email"]').fill('trip27@lftjaguar.com');
        await page.locator('[data-qa="login-password"]').fill('1234');

        // Click the 'Login' button
        await page.locator('[data-qa="login-button"]').click();

        // Verify that 'Logged in as' is visible
        const logged = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
        expect(logged).toContain('Logged in as');

        // Click 'logout' button
        await page.locator('a[href*="/logout"]').click();

        // Verify thet user navigated to gin page
        expect(loginForm).toContain('Login to your account');
    });

    test('Verify that User cannot signUp with existing email', async ({ page }) => {
        // Verify the 'New user signUp' is visible 
        await page.locator('.fa.fa-lock').click();
        const signUp = await page.locator('.signup-form h2').textContent();
        expect(signUp).toContain('New User Signup!')

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
        expect(getinTouch).toContain('Get In Touch');

        // Fill the form
        page.on('dialog', async (dialog) => {
            console.log(dialog.message());
            await dialog.accept();
        });

        await page.locator('[data-qa="name"]').fill('John');
        await page.locator('[data-qa="email"]').fill('wqfq@fvgf.com');
        await page.locator('[data-qa="subject"]').fill('wef');
        await page.locator('[data-qa="message"]').fill('qfwf');

        // page.once('dialog', dialog => {
        //     console.log(`Dialog message: ${dialog.message()}`);
        //     dialog.accept().catch(() => { });
        // });
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('.status.alert.alert-success')).toContainText('Success! Your details have been submitted successfully.')
        await page.locator('.fa.fa-angle-double-left').click();
        // Verify the presence of a logo
        const logo = page.locator('img[alt="Website for automation practice"]');
        expect(page.locator(logo)).toBeVisible;

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
        const products = page.locator('.single-products');

        for (let i = 0; i < await products.count(); i++) {
            const productList = products.nth(i);
            await expect(productList.locator('.productinfo.text-center p')).not.toHaveText('');
            await expect(productList.locator('.productinfo.text-center h2')).not.toHaveText('');
        };

        // Click on 'View Product' of first product
        await page.locator('a[href="/product_details/1"]').click();

        // Verify User is landed to product detail page
        await expect(page).toHaveURL('${process.env.BASE_URL}/product_details/1');
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
        const products = page.locator('.single-products');

        await page.locator('#search_product').fill('Blue Top');
        await page.waitForSelector('.fa.fa-search');
        await page.locator('.fa.fa-search').click();
        await page.waitForSelector('.single-products');

        for (let i = 0; i < await products.count(); i++) {
            const searchList = products.nth(i);
            await expect(searchList.locator('.productinfo.text-center p')).toContainText('Blue Top');
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

    test('Verify user can add product in Cart', async ({ page }) => {
        // Click 'Products' button
        await page.locator('a[href*="/products"]').click();

        // Hover over first product and click "Add to cart"
        const product1 = page.locator('.single-products').first();
        const product1Name = await product1.locator('.productinfo.text-center p').textContent();
        const product1Price = await product1.locator('.productinfo.text-center h2').textContent();
        await product1.hover();
        await product1.locator('.overlay-content .btn').first().click();

        // Click 'Continue Shopping' button
        await page.locator('[data-dismiss="modal"]').click();

        // Hover over second product and click 'Add to cart'
        const product2 = page.locator('.single-products').nth(1);
        const product2Name = await product2.locator('.productinfo.text-center p').textContent();
        const product2Price = await product2.locator('.productinfo.text-center h2').textContent();
        await product2.hover();
        await page.locator('.overlay-content .btn').nth(1).click();

        // Click 'View Cart' button
        await page.locator('a[href="/view_cart"]').nth(1).click();

        // Verify both products are added to Cart
        console.log(product1Name, product2Name)
        await expect(page.locator('a[href="/product_details/1"]')).toContainText(product1Name);
        await expect(page.locator('a[href="/product_details/2"]')).toContainText(product2Name);

        // Verify correct prices, quantity and total price
        await expect(page.locator('.cart_price p').first()).toContainText(product1Price);
        await expect(page.locator('.cart_price p').nth(1)).toContainText(product2Price);

        // Verify correct quantity
        await expect(page.locator('.disabled').first()).toContainText('1');
        await expect(page.locator('.disabled').nth(1)).toContainText('1');

        // Verify correct totalPrice
        await expect(page.locator('.cart_total_price').first()).toContainText(product1Price);
        await expect(page.locator('.cart_total_price').nth(1)).toContainText(product2Price);

        // Click 'X' button corresponding to particular product
        const itemCart = page.locator('tbody tr');
        for (let i = 0; i < await itemCart.count(); i++) {
            await page.locator('.fa.fa-times').nth(i).click();
        }

        // Verify that product is removed from the cart
        await expect(page.locator('p b')).toContainText('Cart is empty!');

    });

    test('Verify product quantity in Cart', async ({ page }) => {
        //  Click 'View Product' for any product on home page
        const productFirst = await page.locator('.productinfo.text-center p').first().textContent();
        await page.locator('a[href="/product_details/1"]').click();

        // Verify product detail is opened
        await expect(page).toHaveURL('${process.env.BASE_URL}/product_details/1');
        await expect(page.locator('.product-information h2')).toBeVisible();
        await expect(page.locator('.product-information p').nth(0)).toBeVisible();
        await expect(page.locator('.product-information p').nth(1)).toBeVisible();
        await expect(page.locator('.product-information p').nth(2)).toBeVisible();
        await expect(page.locator('.product-information p').nth(3)).toBeVisible();
        await expect(page.locator('.product-information span').nth(1)).toBeVisible();

        // Increase quantity to 4
        await page.locator('#quantity').fill('4');

        // Click 'Add to cart' button
        await page.locator('.btn.btn-default.cart').click();

        // Click view cart button
        await page.locator('a[href="/view_cart"]').nth(1).click();

        // Verify that product is displayed in cart page with exact quantity
        await expect(page.locator('a[href="/product_details/1"]')).toContainText(productFirst);
        await expect(page.locator('.disabled').first()).toContainText('4');

        // Click 'X' button corresponding to particular product
        const itemCart = page.locator('tbody tr');
        for (let i = 0; i < await itemCart.count(); i++) {
            await page.locator('.fa.fa-times').nth(i).click();
        };

        // Verify that product is removed from the cart
        await expect(page.locator('p b')).toContainText('Cart is empty!');
    });

    test('Verify user can Register while Checkout', async ({ page }) => {
        // Add products to card
        await page.locator('a[data-product-id="1"]').first().click();

        // Click 'Continue Shopping' button
        await page.locator('[data-dismiss="modal"]').click();

        // Click 'Cart' button
        await page.locator('a[href="/view_cart"]').first().click();

        // Verify that cart page is displayed
        await expect(page.locator('#cart_info_table')).toBeVisible();

        // Click proceed to checkout
        await page.locator('.btn.btn-default.check_out').click();

        // Click 'Register/Login' button
        page.getByRole('link', { name: 'Register / Login' }).click();

        // Fill all details in Signup and creat account
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
        await page.waitForLoadState();
        const text = await page.locator('b').first().textContent();
        expect(text).toContain('Enter Account Information');

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
        await page.waitForLoadState();
        await expect(page.locator('b')).toContainText('Account Created!');

        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();

        // Verify that 'Logged in as Username'
        const logged = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
        expect(logged).toContain('Logged in as');

        // Click 'cart' button
        await page.locator('a[href="/view_cart"]').first().click();

        // Click 'Proceed to checkout' button
        await page.locator('.btn.btn-default.check_out').click();

        // Verify Address Details and Review Your Order
        await expect(page.locator('.address_firstname').first()).toContainText('Mr. John Cooper');
        await expect(page.locator('.address_address1').nth(1)).toContainText('address1');

        // Enter description in comment text area and click 'Place Order'
        await page.locator('.form-control').fill('1234ergf');
        await page.locator('a[href="/payment"]').click();

        // Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await page.locator('[data-qa="name-on-card"]').fill('soft');
        await page.locator('[data-qa="card-number"]').fill('1223-2132-1211-1211');
        await page.locator('[data-qa="cvc"]').fill('988');
        await page.locator('[data-qa="expiry-month"]').fill('12.23');
        await page.locator('[data-qa="expiry-year"]').fill('2030');

        // Click 'Pay and Confirm Order' button
        await page.locator('#submit').click();

        // Verify success message 'Your order has been placed successfully!'
        await expect(page.locator('.alert-success.alert').first()).toHaveText('You have been successfully subscribed!');

        // Click 'Delete Account' button
        await page.locator('a[href="/delete_account"]').click();

        // Verify 'ACCOUNT DELETED!' and click 'Continue' button
        const del = await page.locator('b').textContent();
        expect(del).toContain('Account Deleted!')
        await expect(page.locator('b')).toContainText('Account Deleted!')

        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();
    });

    test('Verify user can Register before Checkout', async ({ page }) => {
        // Verify the New user signUp is visible 
        await page.locator('.fa.fa-lock').click();
        const signUp = await page.locator('.signup-form h2').textContent();
        expect(signUp).toContain('New User Signup!')

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
        expect(text).toContain('Enter Account Information');

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
        await page.waitForLoadState();
        await expect(page.locator('b')).toContainText('Account Created!');

        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();

        // Verify that 'Logged in as Username'
        const logged = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
        expect(logged).toContain('Logged in as');

        // Add products to cart
        const product1 = page.locator('.single-products').first();
        const product1Name = await product1.locator('.productinfo.text-center p').textContent();
        await product1.hover();
        await product1.getByText('Add to cart').nth(1).click();

        // Click 'View Cart' button
        await page.locator('a[href="/view_cart"]').nth(1).click();

        // Verify both products are added to Cart
        await expect(page.locator('a[href="/product_details/1"]')).toContainText(product1Name);

        // Click 'Proceed to checkout' button
        await page.locator('.btn.btn-default.check_out').click();

        // Verify Address Details and Review Your Order
        await page.waitForLoadState();
        await expect(page.locator('.address_firstname').first()).toContainText('Mr. John Cooper');
        await expect(page.locator('.address_address1').nth(1)).toContainText('address1');

        // Enter description in comment text area and click 'Place Order'
        await page.locator('.form-control').fill('1234ergf');
        await page.locator('a[href="/payment"]').click();

        // Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await page.locator('[data-qa="name-on-card"]').fill('soft');
        await page.locator('[data-qa="card-number"]').fill('1223-2132-1211-1211');
        await page.locator('[data-qa="cvc"]').fill('988');
        await page.locator('[data-qa="expiry-month"]').fill('12.23');
        await page.locator('[data-qa="expiry-year"]').fill('2030');

        // Click 'Pay and Confirm Order' button
        await page.locator('#submit').click();

        // Verify success message 'Your order has been placed successfully!'
        await expect(page.locator('.alert-success.alert').first()).toHaveText('You have been successfully subscribed!');

        // Click 'Delete Account' button
        await page.locator('a[href="/delete_account"]').click();

        // Verify 'ACCOUNT DELETED!' and click 'Continue' button
        const del = await page.locator('b').textContent();
        expect(del).toContain('Account Deleted!')
        await expect(page.locator('b')).toContainText('Account Deleted!')

        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();
    });

    test('Verify user can Login befor Checkout', async ({ page }) => {
        // Click the 'Signup/Login' button
        page.locator('.fa.fa-lock').click();

        // Verify 'Login to your acount' is visible
        const loginForm = await page.locator('.login-form h2').textContent();
        expect(loginForm).toContain('Login to your account');

        // Enter valid email amd password
        await page.locator('[data-qa="login-email"]').fill('trip27@lftjaguar.com');
        await page.locator('[data-qa="login-password"]').fill('1234');

        // Click the 'Login' button
        await page.locator('[data-qa="login-button"]').click();

        // Verify that 'Logged in as' is visible
        const logged = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
        expect(logged).toContain('Logged in as');

        // Add products to cart
        const product1 = page.locator('.single-products').first();
        const product1Name = await page.locator('.productinfo.text-center p').first().textContent();
        await product1.hover();
        await product1.getByText('Add to cart').nth(1).click();

        // Click 'View Cart' button
        await page.locator('a[href="/view_cart"]').nth(1).click();

        // Verify the product are added to Cart
        await expect(page.locator('a[href="/product_details/1"]')).toContainText(product1Name);

        // Click 'Proceed to checkout' button
        await page.locator('.btn.btn-default.check_out').click();

        // Verify Address Details and Review Your Order
        await expect(page.locator('.address_firstname').first()).toContainText('Mr. 1234 1234');
        await expect(page.locator('.address_address1').nth(1)).toContainText('1234');

        // Enter description in comment text area and click 'Place Order'
        await page.locator('.form-control').fill('1234ergf');
        await page.locator('a[href="/payment"]').click();

        // Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await page.locator('[data-qa="name-on-card"]').fill('soft');
        await page.locator('[data-qa="card-number"]').fill('1223-2132-1211-1211');
        await page.locator('[data-qa="cvc"]').fill('988');
        await page.locator('[data-qa="expiry-month"]').fill('12.23');
        await page.locator('[data-qa="expiry-year"]').fill('2030');

        // Click 'Pay and Confirm Order' button
        await page.locator('#submit').click();

        // Verify success message 'Your order has been placed successfully!'
        await expect(page.locator('.alert-success.alert').first()).toHaveText('You have been successfully subscribed!');
    });

    test('Verify user can remove Products from the cart', async ({ page }) => {
        // Add products to cart
        const product = page.locator('.single-products').first();
        const productName = await product.locator('.productinfo.text-center p').textContent();
        await page.locator('[data-product-id="1"]').first().click();

        // Click 'View Cart' button
        await page.locator('a[href="/view_cart"]').nth(1).click();

        // Verify the product are added to Cart
        await expect(page.locator('a[href="/product_details/1"]')).toContainText(productName);

        // Click 'X' button corresponding to particular product
        await page.locator('.fa.fa-times').click();

        // Verify that product is removed from the cart
        await expect(page.locator('p b')).toContainText('Cart is empty!');
    });

    test('Verify user can view categories of products', async ({ page }) => {
        // Verify that categories are visible on left side bar
        await expect(page.locator('#accordian')).toBeVisible();

        // Click on 'Women' category
        await page.locator('a[href="#Women"]').click();

        // Click on TOPS category link under 'Women' category
        await page.locator('a[href="/category_products/2"]').click();

        // Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
        await page.waitForLoadState();
        await expect(page.locator('h2.title.text-center')).toContainText('Women - Tops Products');

        // On left side bar, click on any sub-category link of 'Men' category
        await page.locator('a[href="#Men"]').click();
        await page.locator('a[href="/category_products/3"]').click();

        // Verify that user is navigated to that category page
        await page.waitForLoadState();
        await expect(page.locator('h2.title.text-center')).toContainText('Men - Tshirts Products');
    });

    test('Verify search products and cart after login', async ({ page }) => {
        // Click on 'Products' button
        await page.locator('a[href="/products"]').click();

        // Verify user is navigated to ALL PRODUCTS page successfully
        await page.waitForLoadState();
        expect(page.locator('h2.title.text-center')).toContainText('All Products');

        // Enter product name in search input and click search button
        await page.locator('#search_product').fill('Polo');
        await page.locator('.fa.fa-search').click();

        //  Verify all the products related to search are visible
        const searchedProducts = page.locator('.single-products');

        for (let i = 0; i < await searchedProducts.count(); i++) {
            // const searchList = searchedProducts.nth(i);
            expect(searchedProducts.locator('.productinfo.text-center p').nth(i)).toContainText('Polo');
            console.log(await searchedProducts.locator('.productinfo.text-center p').nth(i).textContent());
        };

        // Add those products to cart
        for (let j = 0; j < await searchedProducts.count(); j++) {
            await searchedProducts.locator('.btn.btn-default.add-to-cart').nth(j).click();
        };

        // Click 'Cart' button and verify that products are visible in cart
        await page.locator('a').filter({ hasText: 'View Cart' }).click();

        // Click the 'Signup/Login' button
        await page.locator('.fa.fa-lock').click();

        // Verify 'Login to your acount' is visible
        const loginForm = await page.locator('.login-form h2').textContent();
        expect(loginForm).toContain('Login to your account');

        // Enter valid email amd password
        await page.locator('[data-qa="login-email"]').fill('trip27@lftjaguar.com');
        await page.locator('[data-qa="login-password"]').fill('1234');

        // Click the 'Login' button
        await page.locator('[data-qa="login-button"]').click();

        // Verify that 'Logged in as' is visible
        const logged = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
        expect(logged).toContain('Logged in as');

        // Again, go to Cart page
        await page.locator('li a[href="/view_cart"]').click();

        // Verify that those products are visible in cart after login as well
        const cartProducts = page.locator('td.cart_description')
        for (let k = 0; k < await cartProducts.count(); k++) {
            expect(cartProducts.locator('h4 a').nth(k)).toContainText('Polo');
            console.log(await cartProducts.locator('h4 a').nth(k).textContent());
        };

        // Click 'X' button corresponding to particular product
        const itemCart = page.locator('tbody tr');
        for (let i = 0; i < await itemCart.count(); i++) {
            await page.locator('.fa.fa-times').nth(i).click();
        };

        // Verify that product is removed from the cart
        await expect(page.locator('p b')).toContainText('Cart is empty!');
    });

    test('Verify can add review on product', async ({ page }) => {
        // Click on 'Products' button
        await page.locator('a[href="/products"]').click();

        // Verify user is navigated to ALL PRODUCTS page successfully
        await page.waitForLoadState();
        expect(page.locator('h2.title.text-center')).toContainText('All Products');

        // Click on 'View Product' button
        await page.locator('a[href="/product_details/1"]').click();

        // Verify 'Write Your Review' is visible
        await expect(page.locator('a[data-toggle="tab"]')).toContainText('Write Your Review');

        // Enter name, email and review
        await page.locator('#name').fill('wqf');
        await page.locator('#email').fill('qwf@ewf');
        await page.locator('#review').fill('wqfqw');

        // Click 'Submit' button
        await page.locator('#button-review').click();

        // Verify success message 'Thank you for your review.'
        await expect(page.locator('.alert-success.alert span')).toContainText('Thank you for your review.');
    });

    test('User can add to cart from Recommended items', async ({ page }) => {
        // Scroll to bottom of page
        await page.locator('.single-widget').scrollIntoViewIfNeeded();

        // Verify 'RECOMMENDED ITEMS' are visible
        await expect(page.locator('.recommended_items .title.text-center')).toContainText('recommended items');

        // Click on 'Add To Cart' on Recommended product
        await page.locator('#recommended-item-carousel a[data-product-id="4"]').click();

        //  Click on 'View Cart' button
        await page.locator('a u').click();

        // Verify that product is displayed in cart page
        await expect(page.locator('a[href="/product_details/4"]')).toContainText('Stylish Dress');

        // Click 'X' button corresponding to particular product
        const itemCart = page.locator('tbody tr');
        for (let i = 0; i < await itemCart.count(); i++) {
            await page.locator('.fa.fa-times').nth(i).click();
        };

        // Verify that product is removed from the cart
        await expect(page.locator('p b')).toContainText('Cart is empty!');
    });

    test('Verify address details in checkout page', async ({ page }) => {
        // Click 'Signup / Login' button 
        await page.locator('.fa.fa-lock').click();
        const signUp = await page.locator('.signup-form h2').textContent();
        expect(signUp).toContain('New User Signup!')

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
        await page.waitForLoadState();
        const text = await page.locator('b').first().textContent();
        expect(text).toContain('Enter Account Information');

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
        expect(account_created).toContain('Account Created!');

        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();

        // Verify that 'Logged in as Username'
        const logged = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
        expect(logged).toContain('Logged in as');

        // Add products to Cart
        const product = page.locator('.single-products').first();
        const productName = await product.locator('.productinfo.text-center p').textContent();
        await product.hover();
        await product.getByText('Add to cart').first().click();

        // Click 'View Cart' button
        await page.locator('a[href="/view_cart"]').nth(1).click();

        // Verify product are added to Cart
        console.log(productName)
        await expect(page.locator('a[href="/product_details/1"]')).toContainText(productName);

        // Click 'Proceed to checkout' button
        await page.locator('.btn.btn-default.check_out').click();

        // Verify Address Details and Review Your Order
        await expect(page.locator('.address_firstname').first()).toContainText('Mr. John Cooper');
        await expect(page.locator('.address_address1').nth(1)).toContainText('address1');

        // Click 'Delete Account' button
        await page.locator('a[href="/delete_account"]').click();

        // Verify 'ACCOUNT DELETED!' and click 'Continue' button
        const del = await page.locator('b').textContent();
        expect(del).toContain('Account Deleted!')
        await expect(page.locator('b')).toContainText('Account Deleted!')

        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();
    });

    test('Verify user can download Invoice after purchase order', async ({ page }) => {
        // Add products to card
        await page.locator('a[data-product-id="1"]').first().click();

        // Click 'Continue Shopping' button
        await page.locator('[data-dismiss="modal"]').click();

        // Click 'Cart' button
        await page.locator('a[href="/view_cart"]').first().click();

        // Verify that cart page is displayed
        await expect(page.locator('#cart_info_table')).toBeVisible();

        // Click proceed to checkout
        await page.locator('.btn.btn-default.check_out').click();

        // Click 'Register/Login' button
        page.getByRole('link', { name: 'Register / Login' }).click();

        // Fill all details in Signup and creat account
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
        await page.waitForLoadState();
        const text = await page.locator('b').first().textContent();
        expect(text).toContain('Enter Account Information');

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
        await page.waitForLoadState();
        await expect(page.locator('b')).toContainText('Account Created!');

        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();

        // Verify that 'Logged in as Username'
        const logged = await page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
        expect(logged).toContain('Logged in as');

        // Click 'cart' button
        await page.locator('a[href="/view_cart"]').first().click();

        // Click 'Proceed to checkout' button
        await page.locator('.btn.btn-default.check_out').click();

        // Verify Address Details and Review Your Order
        await expect(page.locator('.address_firstname').first()).toContainText('Mr. John Cooper');
        await expect(page.locator('.address_address1').nth(1)).toContainText('address1');

        // Enter description in comment text area and click 'Place Order'
        await page.locator('.form-control').fill('1234ergf');
        await page.locator('a[href="/payment"]').click();

        // Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await page.locator('[data-qa="name-on-card"]').fill('soft');
        await page.locator('[data-qa="card-number"]').fill('1223-2132-1211-1211');
        await page.locator('[data-qa="cvc"]').fill('988');
        await page.locator('[data-qa="expiry-month"]').fill('12.23');
        await page.locator('[data-qa="expiry-year"]').fill('2030');

        // Click 'Pay and Confirm Order' button
        await page.locator('#submit').click();

        // Verify success message 'Your order has been placed successfully!'
        await expect(page.locator('.alert-success.alert').first()).toHaveText('You have been successfully subscribed!');

        // Click 'Download Invoice' button and verify invoice is downloaded successfully.
        await page.locator('.btn.btn-default.check_out').click();

        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();

        // Click 'Delete Account' button
        await page.locator('a[href="/delete_account"]').click();

        // Verify 'ACCOUNT DELETED!' and click 'Continue' button
        const del = await page.locator('b').textContent();
        expect(del).toContain('Account Deleted!')
        await expect(page.locator('b')).toContainText('Account Deleted!')

        // Click 'Continue' button
        await page.locator('[data-qa="continue-button"]').click();
    });

    test('Verify Scroll Up using "Arrow" button and Scroll Down functionality', async ({ page }) => {
        // Scroll down page to bottom
        await page.locator('.single-widget').scrollIntoViewIfNeeded();

        // Verify 'SUBSCRIPTION' is visible
        await expect(page.locator('.single-widget h2')).toHaveText('Subscription');

        // Click on arrow at bottom right side to move upward
        await page.locator('.fa.fa-angle-up').click();

        // Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
        await expect(page.locator('.col-sm-6 h2').first()).toContainText('Full-Fledged practice website for Automation Engineers');

    });
});
