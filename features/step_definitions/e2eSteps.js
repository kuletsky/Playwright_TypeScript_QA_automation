const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../pages/POManager");
const playwright = require("@playwright/test");

Given('Open the main page', async function () {
    // Launch the browser and initialize context
    this.browser = await playwright.chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage(); // Store the page in the `this` context
    this.poManager = new POManager(this.page); // Initialize POManager with the page
    this.loginPage = this.poManager.getLoginPage();

    await this.loginPage.goTo();
});

When('Click the Signup\\/Login menu', async function () {
    await this.loginPage.linkSignIn();
});

Then('Verify right page is opened', async function () {
    // Verify 'Login to your account' is visible
    await this.loginPage.verifyLoginPage();
});

Then('Verify user can Signin with {string} and {string}', async function (username, psw) {
    // Sign in the page
    await this.loginPage.signIn(username, psw);

    // Verify that 'Logged in as' is visible
    await this.loginPage.verifySuccessLogin();
});

// Optional: Add cleanup logic after scenarios
const { After } = require("@cucumber/cucumber");

After(async function () {
    // Close browser and clean up after tests
    if (this.browser) {
        await this.browser.close();
    }
});