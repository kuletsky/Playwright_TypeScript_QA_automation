const { expect } = require("@playwright/test");

class SignUpPage {

    constructor(page) {
        this.page = page;
        this.signFormHeader = page.locator('.signup-form h2');
        this.nameInput = page.locator('[data-qa="signup-name"]');
        this.emailInput = page.locator('[data-qa="signup-email"]');
        this.btnSignUp = page.locator('[data-qa="signup-button"]');

    }

    async verifySignUpPage() {
        await expect(this.signFormHeader).toContainText('New User Signup!');
    }

    async signUp(name, email) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.btnSignUp.click();
    }
}
module.exports = { SignUpPage };