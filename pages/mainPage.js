require('dotenv').config();
const { expect } = require("@playwright/test");

class MainPage {

    constructor(page) {

        this.page = page;
        this.signInLink = page.locator('.fa.fa-lock');
        this.verifyMainPageLogo = page.locator('img[alt="Website for automation practice"]');
        this.scrollDownMain = page.locator('.single-widget');
        this.textSubscribe = page.locator('.single-widget h2');
        this.subsribeForm = page.locator('#susbscribe_email');
        this.subscribeBTN = page.locator('#subscribe');
        this.textSuccessSubscribe = page.locator('.alert-success.alert');
    };


    async goToMain() {
        await this.page.goto(process.env.BASE_URL);
    };


    async linkSignIn() {
        await this.signInLink.click();
    };

    async verifyMainPage() {
        await expect(this.verifyMainPageLogo).toBeVisible();
    };

    async scrollDown() {
        await this.scrollDownMain.scrollIntoViewIfNeeded();
    };

    async verifyTextSubsribe() {
        await expect(this.textSubscribe).toContainText('Subscription');
    };

    async enterEmailandSubscribe() {
        await this.subsribeForm.fill('qdwq@fwf.com');
        await this.subscribeBTN.click();
    };

    async verifyTextSuccessSubscribe() {
        await expect(this.textSuccessSubscribe).toContainText('You have been successfully subscribed!');
    };
}
module.exports = { MainPage };