const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../pages/POManager");
const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");

Given('Open the main page', async function () {
    // Launch the browser and initialize context
    this.browser = await playwright.chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage(); // Store the page in the `this` context
    this.poManager = new POManager(this.page); // Initialize POManager with the page

    await this.page.goto('https://automationexercise.com/');
});

When('Click the Signup\\/Login menu', async function () {
    // Ensure `this.page` is used consistently
    await this.page.locator('.fa.fa-lock').click();
});

Then('Verify right page is opened', async function () {
    // Verify 'Login to your account' is visible
    const loginForm = await this.page.locator('.login-form h2').textContent();
    expect(loginForm).toContain('Login to your account');
});

Then('Verify user can Signin with {string} and {string}', async function (username, psw) {
    // Use the POManager to sign in
    const loginPage = this.poManager.getLoginPage();
    await loginPage.signIn(username, psw);

    // Verify that 'Logged in as' is visible
    const logged = await this.page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
    expect(logged).toContain('Logged in as');
});

// Optional: Add cleanup logic after scenarios
const { After } = require("@cucumber/cucumber");

After(async function () {
    // Close browser and clean up after tests
    if (this.browser) {
        await this.browser.close();
    }
});