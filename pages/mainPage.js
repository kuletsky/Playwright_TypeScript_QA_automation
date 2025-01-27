const { expect } = require("@playwright/test");

class MainPage {

    constructor(page) {

        this.page = page;
        this.signInLink = page.locator('.fa.fa-lock');
    }


    async goToMain() {
        await this.page.goto('https://automationexercise.com/');
    }


    async linkSignIn() {
        await this.signInLink.click();
    }

}
module.exports = { MainPage };