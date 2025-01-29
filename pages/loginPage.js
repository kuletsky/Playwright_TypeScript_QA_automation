const { expect } = require("@playwright/test");

class LoginPage {

    constructor(page) {

        this.page = page;
        this.signinEmail = page.locator('[data-qa="login-email"]');
        this.signinPSW = page.locator('[data-qa="login-password"]');
        this.btnSignIn = page.locator('[data-qa="login-button"]');
        this.loginFormHeader = page.locator('.login-form h2');
        this.loggedInText = page.locator('a').filter({ hasText: 'Logged in as' });
        this.credintialsIscorrect = page.getByText('Your email or password is incorrect!');
        this.btnLogout = page.locator('a[href*="/logout"]');
    };


    async signIn(username, password) {
        // Enter email amd password
        await this.signinEmail.fill(username);
        await this.signinPSW.fill(password);

        // Click the 'Login' button
        await this.btnSignIn.click();
    };

    async verifyLoginPage() {
        await expect(this.loginFormHeader).toContainText('Login to your account');
    };

    async verifySuccessLogin() {
        await expect(this.loggedInText).toContainText('Logged in as');
    };

    async verifyUnsuccessLogin() {
        await expect(this.credintialsIscorrect).toContainText('Your email or password is incorrect!');
    };

    async clickLogout() {
        await this.btnLogout.click();
    };


}
module.exports = { LoginPage };