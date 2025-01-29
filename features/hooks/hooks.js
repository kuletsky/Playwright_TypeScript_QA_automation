// Launch the browser and initialize context
const { Before, After, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require("@playwright/test");
const { POManager } = require("../../pages/POManager");

// let browser; // Shared browser instance
// const lock = new Promise((resolve) => resolve()); // Lock to synchronize browser launch

// Before(async function () {
//     // Synchronize browser launch
//     await lock.then(async () => {
//         if (!browser) {
//             console.log("Launching shared browser...");
//             browser = await playwright.chromium.launch();
//         }
//     });

//     this.context = await browser.newContext(); // Create an isolated context for each scenario
//     this.page = await this.context.newPage(); // Create an isolated page for each scenario

//     this.poManager = new POManager(this.page);
//     this.loginPage = this.poManager.getLoginPage();
//     this.signUpPage = this.poManager.getSignUpPage();
//     this.mainPage = this.poManager.getMainPage();
//     this.contuctUsPage = this.poManager.getContuctUsPage();
//     this.productDetails = this.poManager.getProductDetails();
// });

// After(async function () {
//     console.log("Closing page and context...");
//     if (this.page && !this.page.isClosed()) {
//         await this.page.close();
//         console.log("Page closed.");
//     }
//     if (this.context) {
//         await this.context.close();
//         console.log("Context closed.");
//     }
// });

// // Close the shared browser once after all tests
// process.on("exit", async () => {
//     if (browser) {
//         console.log("Closing shared browser...");
//         await browser.close();
//     }
// });

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
    // this.productDetail = this.poManager.getProductDetail();
    this.cartPage = this.poManager.getCartPage();
});

// After(async function () {
//     console.log("Closing page and context...");
//     if (this.page && !this.page.isClosed()) {
//         await this.page.close();
//         console.log("Page closed.");
//     }
//     if (this.context) {
//         await this.context.close();
//         console.log("Context closed.");
//     }
// });
// After(async function () {
//     await this.page.close(); // May close the page before the test finishes
// });

After(async function () {
    // Close the browser after each scenario
    if (this.browser) {
        await this.browser.close();
    }
});

// Before(async function () {
//     if (!global.browser) {
//         global.browser = await playwright.chromium.launch();
//     }
    
//     this.context = await global.browser.newContext();
//     this.page = await this.context.newPage();

//     this.poManager = new POManager(this.page);
//     this.loginPage = this.poManager.getLoginPage();
//     this.signUpPage = this.poManager.getSignUpPage();
//     this.mainPage = this.poManager.getMainPage();
//     this.contuctUsPage = this.poManager.getContuctUsPage();
//     this.productDetails = this.poManager.getProductDetails();
// });

// After(async function () {
//     console.log("Closing page and context...");
//     if (this.page && !this.page.isClosed()) {
//         await this.page.close();
//         console.log("Page closed.");
//     }
//     if (this.context) {
//         await this.context.close();
//         console.log("Context closed.");
//     }
// });

// AfterStep(async function ({ result }) {

//     if (result.status === Status.FAILED) {
//         await this.page.screenshot({ path: 'screenshot.png' });
//     }
// });


