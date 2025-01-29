const { Given, When, Then } = require("@cucumber/cucumber");


Then('Verify LogIn page is opened', async function () {
    // Verify 'Login to your account' is visible
    await this.loginPage.verifyLoginPage();
});

Then('Enter valid credentials {string} and {string}', async function (username, psw) {
    // Sign in the page
    await this.loginPage.signIn(username, psw);
});

Then('Verify User successfully log in and see text: Logged in as', async function () {
        // Verify that 'Logged in as' is visible
        await this.loginPage.verifySuccessLogin();
});

When('Enter invalid credentials {string} and {string}', async function (username, psw) {
    await this.loginPage.signIn(username, psw);
});

Then('Verify error Your email or password is incorrect! is visible', async function () {
    await this.loginPage.verifyUnsuccessLogin();
});

When('Click Logout button', {timeout: 10000}, async function () {
    await this.loginPage.clickLogout();
});

Then('Verify User navigated to Login page', async function () {
    await this.loginPage.verifyLoginPage();
});