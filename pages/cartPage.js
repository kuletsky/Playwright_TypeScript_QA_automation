const { expect } = require("@playwright/test");

class CartPage {

    constructor(page) {
       
        this.page = page;
        this.cartLink = page.locator('a[href*="cart"]').first();
    };

    async clickCartLink() {
        await this.cartLink.click();
    };
}
module.exports = { CartPage };