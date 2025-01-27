const { Given, When, Then } = require("@cucumber/cucumber");

Given('Open the main page', async function () {
    await this.mainPage.goToMain();
});


When('Click the Signup\\/Login menu', async function () {
    await this.mainPage.linkSignIn();
});