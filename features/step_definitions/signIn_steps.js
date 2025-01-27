const { Given, When, Then } = require("@cucumber/cucumber");


Then('Verify LogIn page is opened', async function () {
    // Verify 'Login to your account' is visible
    await this.loginPage.verifyLoginPage();
});

Then('Verify user can Signin with {string} and {string}', async function (username, psw) {
    // Sign in the page
    await this.loginPage.signIn(username, psw);

    // Verify that 'Logged in as' is visible
    await this.loginPage.verifySuccessLogin();
});
