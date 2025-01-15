const { test, expect, request } = require('@playwright/test');
const exp = require('constants');
let webContext;

test.beforeAll(async ({ browser }) => {
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
    await context.storageState({ path: 'state.json' });

    // Inject cookies
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test('Verify that user can successfuly SignIn with valid credentials', async () => {
    // LogIn
    const page = await webContext.newPage();

    // Go to mainPage
    await page.goto('https://automationexercise.com/');

    // Verify that user loged in successfuly 
    await expect(page.locator('a').filter({ hasText: 'Logged in as' })).toContainText('Logged in as');
});

test.only('Fetch products list via API', async () => {
    // Create a new API context
    const apiContext = await request.newContext();

    // Perform the GET request
    const response = await apiContext.get('https://automationexercise.com/api/productsList');

    // Check if the response status code is 200
    expect(response.status()).toBe(200);

    // Verify that the  response is in JSON format
    const responseBody = await response.json();
    // console.log(responseBody);
    expect(responseBody).toBeDefined();

    // Verify that the response contains fields in the expected fields
    expect(responseBody).toHaveProperty('products');
    expect(responseBody.products).toBeInstanceOf(Array); // Ensure it's an array of products

    // Optionally, check the first product in the list
    const firstProduct = responseBody.products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');
    expect(firstProduct).toHaveProperty('category');



});