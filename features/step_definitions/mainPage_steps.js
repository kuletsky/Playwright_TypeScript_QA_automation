const { Given, When, Then } = require("@cucumber/cucumber");

Given('Open the main page', {timeout: 10000}, async function () {
    await this.mainPage.goToMain();
});

When('Click the Signup\\/Login menu', async function () {
    await this.mainPage.linkSignIn();
});



Then('Then Verify user can see Main page', async function () {
    await this.mainPage.verifyMainPage();
});


When('Scroll down to footer', async function () {
    await this.mainPage.scrollDown();
});

Then('Verify text: SUBSCRIPTION', async function () {
    await this.mainPage.verifyTextSubsribe();
});

When('Enter email address in input and click arrow button', async function () {
    await this.mainPage.enterEmailandSubscribe();
});

Then('Verify success message text: You have been successfully subscribed!', async function () {
    await this.mainPage.verifyTextSuccessSubscribe();
});