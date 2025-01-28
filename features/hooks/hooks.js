// Launch the browser and initialize context
const { Before, After, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require("@playwright/test");
const { POManager } = require("../../pages/POManager");

Before(async function () {
    // Launch the browser and initialize context before each scenario
    this.browser = await playwright.chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // Initialize the POManager and make it available for all steps
    this.poManager = new POManager(this.page);
    this.loginPage = this.poManager.getLoginPage();
    this.signUpPage = this.poManager.getSignUpPage();
    this.mainPage = this.poManager.getMainPage();
    this.contuctUsPage = this.poManager.getContuctUsPage();
    this.productDetails = this.poManager.getProductDetails();

});

After(async function () {
    // Close the browser after each scenario
    if (this.browser) {
        await this.browser.close();
    }
});

AfterStep(async function ({ result }) {

    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot.png' });
    }
});

