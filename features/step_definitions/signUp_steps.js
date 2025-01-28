const { Given, When, Then } = require("@cucumber/cucumber");


Then('Verify SignUp page is opened', async function () {
    await this.signUpPage.verifySignUpPage();
});

When('Enter {string} and {string}', async function (name, email) {
    await this.signUpPage.signUp(name, email);

});

Then('Verify that ENTER ACCOUNT INFORMATION is visible', async function () {
    await this.signUpPage.verifyFormEnterAccount();
});

When('Fill detailse: Title, Name, Email, Password, Date of birth', async function () {
    await this.signUpPage.fillFormAccount();
});

Then('Verify that Account created! is visible', async function () {
    await this.signUpPage.verifyAccountCreated();
});

When('Click Continue button', async function () {
    await this.signUpPage.continue();
});

When('Click Delete account button', async function () {
    await this.signUpPage.deleteAccount();
});

Then('Verify that ACCOUNT DELETED! is visible', async function () {
    await this.signUpPage.verifyAccountDeleted();
});
