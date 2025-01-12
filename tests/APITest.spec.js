const { test, expect, request, chromium } = require('@playwright/test');

const loginPayload = {
    email: "kuletsky@gmail.com", 
    password: "AbricosLen04ka",
};

test('sf', async () => {
    console.log('Launching the browser...');
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the login page and extract the CSRF token
    console.log('Navigating to login page...');
    await page.goto('https://auth.polar.com/login');
    console.log('Page loaded successfully.');

    // Extract the CSRF token from the page
    console.log('Extracting CSRF token...');
    const csrfToken = await page.locator('[data-testid="csrf-token-input"]').getAttribute('value');
    console.log('Extracted CSRF Token:', csrfToken);

    // Create a new request context for performing the login request
    console.log('Creating a new API context...');
    const apiContext = await request.newContext();

    // Prepare the full login payload with the extracted CSRF token
    const fullLoginPayload = {
        email: loginPayload.email,
        password: loginPayload.password,
        csrfmiddlewaretoken: csrfToken,
    };

    console.log('Prepared Login Payload:', fullLoginPayload);

    // Perform the POST request with the CSRF token and login data
    console.log('Sending login request...');
    const loginResponse = await apiContext.post('https://auth.polar.com/login', {
        data: fullLoginPayload,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'X-CSRFToken': csrfToken, // Adding CSRF token in headers as well
        },
    });

    // Log the response status and body for debugging
    console.log('Login Response Status:', loginResponse.status());
    const responseText = await loginResponse.text();
    console.log('Login Response Body:', responseText);

    // Check the response to ensure successful login
    if (loginResponse.status() === 403) {
        console.error('Login failed! Please check the credentials, CSRF token, and request headers.');
    }

    console.log('Verifying login response...');
    expect(loginResponse.ok()).toBeTruthy();
    console.log('Login successful!');

    // Close the browser after the test is done
    await browser.close();
});
