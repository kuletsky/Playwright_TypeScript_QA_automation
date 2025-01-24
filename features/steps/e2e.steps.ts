import { Given, When, Then, Before, After } from "@cucumber/cucumber"
import { POManager } from "../../pages_ts/POManager";
import { Browser, chromium, expect } from "@playwright/test";

// let page: Page;
let browser: Browser;
let poManager: POManager;

Before(async function () {
    // Launch the browser before each scenario
    browser = await chromium.launch();
    this.page = await browser.newPage(); // Store the page in the `this` context
    poManager = new POManager(this.page); // Initialize POManager with the page
});

After(async function () {
    // Close the browser after each scenario
    if (browser) {
        await browser.close();
    }
});


Given('Open the main page', async function () {
    await this.page.goto('https://automationexercise.com/');
});

When('Click the Signup\\/Login menu', async function () {
    // Click the 'Signup/Login' button
    await this.page.locator('.fa.fa-lock').click();
});

Then('Verify right page is opened', async function () {
    // Verify 'Login to your acount' is visible
    const loginForm = await this.page.locator('.login-form h2').textContent();
    expect(loginForm).toContain('Login to your account');
});

Then('Verify user can Signin with {string} and {string}', async function (username: string, psw: string) {
    // Verify that 'Logged in as' is visible
    const loginPage = poManager.getLoginPage();
    await loginPage.signIn(username, psw);
    const logged = await this.page.locator('a').filter({ hasText: 'Logged in as' }).textContent();
    expect(logged).toContain('Logged in as');
});