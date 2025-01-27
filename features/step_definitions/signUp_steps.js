const { Given, When, Then } = require("@cucumber/cucumber");


Then('Verify SignUp page is opened', async function () {
    // this.signUpPage = this.poManager.getSignUpPage();

    // Verify 'New User Signup!' is visible
    await this.signUpPage.verifySignUpPage();
})

When('Enter {string} and {string}', async function (name, email) {
    // this.signUpPage = this.poManager.getSignUpPage();
    await this.signUpPage.signUp(name, email);

});