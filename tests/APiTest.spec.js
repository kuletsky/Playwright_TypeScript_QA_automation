const { test, expect, request } = require('@playwright/test');
let webContext;
require('dotenv').config();

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(process.env.BASE_URL);
    await page.locator('.fa.fa-lock').click();

    // Enter valid email amd password
    await page.locator('[data-qa="login-email"]').fill('trip27@lftjaguar.com');
    await page.locator('[data-qa="login-password"]').fill('1234');

    // Click the 'Login' button
    await page.locator('[data-qa="login-button"]').click();

    // Storage cookies
    await context.storageState({ path: './utils/state.json' });

    // Inject cookies
    webContext = await browser.newContext({ storageState: './utils/state.json' });
});

test('Verify that user can successfuly SignIn with valid credentials', async () => {
    // LogIn
    const page = await webContext.newPage();

    // Go to mainPage
    await page.goto(process.env.BASE_URL);

    // Verify that user loged in successfuly 
    await expect(page.locator('a').filter({ hasText: 'Logged in as' })).toContainText('Logged in as');
});

test('Fetch products list via API', async ({ request }) => {
    // Create a new API context
    // const apiContext = await request.newContext();

    // Perform the GET request
    const response = await request.get(`${process.env.BASE_URL}/api/productsList`);

    // Check if the response status code is 200
    expect(response.status()).toBe(200);

    // Verify that the  response is in JSON format
    const responseBody = await response.json();

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

test('Verify POST request returns 405 Method Not Allowed', async ({ request }) => {
    // Send a POST request to the API URL
    const response = await request.post(`${process.env.BASE_URL}/api/productsList`);

    // Verify the response code is 405 (Method Not Allowd)
    // await expect(response.status()).toBe(405);

    // Verify the response body message 
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe("This request method is not supported.");
});

test('Fetch all brands list', async ({ request }) => {
    const response = await request.get(`${process.env.BASE_URL}/api/brandsList`);

    // Check if the response status code is 200
    expect(response.status()).toBe(200);

    // Verify the response body message
    const responseBody = await response.json();

    expect(responseBody).toBeDefined();

    // Verify that the response contains fields in the expected fields
    expect(responseBody).toHaveProperty('brands');
    expect(responseBody.brands).toBeInstanceOf(Array); // Ensure it's an array of products

    // Optionally, check the first brand in the list
    const firstBrand = responseBody.brands[0];
    expect(firstBrand).toHaveProperty('id');
    expect(firstBrand).toHaveProperty('brand');
});

test('Verify PUT request returns 405 Method Not allowed', async ({ request }) => {
    // Send a PUT request to the API endpoint
    const response = await request.put(`${process.env.BASE_URL}/api/brandsList`);

     // Verify the response body contains the expected response code and message
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');
});

test('Verify POST to SearchProduct request', async ({ request }) => {
    // Create the request payload
    const payload = {
        search_porduct: 'tshirt',
    };

    // Send a POST request to the API endpoint
    const response = await request.post(`${process.env.BASE_URL}/api/searchProduct`, {
        headers: {
            'Content-Type': 'application/json', // Ensure the correct content type
        },
        data: JSON.stringify(payload), // Properly stringify the payload
    });

    // Check if the response status code is 200
    expect(response.status()).toBe(200);

    // Parse the response body as Json
    const responseBody = await response.json();

    // Verify that response searched products
    // console.log('Response Json', responseBody);
});

test('POST To Search Product without search_product parameter', async ({ request }) => {
    const response = await request.post(`${process.env.BASE_URL}/api/searchProduct`);
    const responseBody = await response.json();

    // Verify the error message in the response body
    expect(responseBody).toHaveProperty('responseCode', 400);
    expect(responseBody).toHaveProperty('message', 'Bad request, search_product parameter is missing in POST request.');
});

test('Verify POST to verifyLogin request with unvalid credentials', async ({ request }) => {
    // Define the request payload with valid email and password
    const requestBody = {
        email: 'testuser@example.com', // Replace with a valid email
        password: 'testpassword123',  // Replace with a valid password
    };

    // Send the POST request
    const response = await request.post(`${process.env.BASE_URL}/api/verifyLogin`, {
        headers: {
            'Content-Type': 'application/json', // Ensure the correct content type
        },
        data: JSON.stringify(requestBody), // Pass the email and password
    });

    // Parse the response
    const responseBody = await response.json();

    // Verify the success message in the response body
    expect(responseBody).toHaveProperty('responseCode', 400);
    expect(responseBody).toHaveProperty('message', 'Bad request, email or password parameter is missing in POST request.');
});

test('Verify DELETE method returns 405 Metgod not allowed', async ({ request }) => {
    const response = await request.delete(`${process.env.BASE_URL}/api/verifyLogin`)
    const responseBody = await response.json();


    // Verify the response message in the response body
    expect(responseBody).toHaveProperty('responseCode', 405);
    expect(responseBody).toHaveProperty('message', 'This request method is not supported.');
});

