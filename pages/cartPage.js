const { expect } = require("@playwright/test");

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartLink = page.locator('a[href*="cart"]').first();
        this.productsLink = page.locator('a[href*="/products"]');
        this.product = page.locator('.single-products').first();
        this.productName = this.product.locator('.productinfo.text-center p');
        this.productPriceLocator = this.product.locator('.productinfo.text-center h2'); // Store Locator
        this.productNameLocator = this.product.locator('.productinfo.text-center p');
        this.addToCartBTN = this.product.locator('.overlay-content .btn').first();
        this.viewCartBTN = page.locator('a[href="/view_cart"]').nth(1);
        this.price = page.locator('.cart_price p').first();
        this.quantity = page.locator('.disabled').first();
        this.totalPrice = page.locator('.cart_total_price').first();
        this.name = page.locator('a[href="/product_details/1"]');
        this.deleteBTN = page.locator('.fa.fa-times');
        this.emptyCardText = page.locator('p b');
    }

    async clickCartLink() {
        await this.cartLink.click();
    }

    async clickProductsLink() {
        await this.productsLink.click();
        this.productPrice = await this.productPriceLocator.textContent();
        this.productName = await this.productNameLocator.textContent();
        console.log(this.productName, this.productPrice);
    }

    async clickHoverAddtoCart() {
        await this.product.hover();
        await this.addToCartBTN.click();
    }

    async clickViewCart() {
        await this.viewCartBTN.click();
    }

    async verifyPrice() {
        await expect(this.name).toContainText(this.productName);
        // Verify correct price
        await expect(this.price).toContainText(this.productPrice);

        // Verify correct quantity
        await expect(this.quantity).toContainText('1');

        // Verify correct total price
        await expect(this.totalPrice).toContainText(this.productPrice);
    };

    async removeProduct() {
        const itemCart = this.page.locator('tbody tr');
        for (let i = 0; i < await itemCart.count(); i++) {
            await this.deleteBTN.nth(i).click();
        }
        // const itemCart = this.page.locator('tbody tr');
        // console.log(await itemCart.count())
        // for (let i = 0; i < await itemCart.count(); i++) {
        //     console.log(i);
        //     await this.page.locator('.fa.fa-times').nth(i).click();
        // }
    };

    async verifyEmptyCart() {
        await this.page.waitForSelector('p b', { state: 'visible', timeout: 5000 });
        await expect(this.emptyCardText).toContainText('Cart is empty!');
    };


};
module.exports = { CartPage };
