import { test, expect, Locator, Page } from '@playwright/test'
export class LoginPage {

    signinEmail: Locator;
    signinPSW: Locator;
    btnSignIn: Locator;
    page: Page;


    constructor(page: Page) {

        this.signinEmail = page.locator('[data-qa="login-email"]');
        this.signinPSW = page.locator('[data-qa="login-password"]');
        this.btnSignIn = page.locator('[data-qa="login-button"]');
    }

    async signIn(username: string, password: string) {
        // Enter email amd password
        await this.signinEmail.fill(username);
        await this.signinPSW.fill(password);

        // Click the 'Login' button
        await this.btnSignIn.click();

    }
}
module.exports = { LoginPage };