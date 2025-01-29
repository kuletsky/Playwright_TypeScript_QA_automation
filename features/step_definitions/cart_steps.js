const { When, Then } = require('@cucumber/cucumber');


When('Click Cart link', async function () {
    await this.cartPage.clickCartLink();
});

When('Click Products link', async function () {
    await this.cartPage.clickProductsLink();
});

When('Hover over first product and click: Add to cart', async function () {
    await this.cartPage.clickHoverAddtoCart();
})

// When('Click Continue Shopping button', async function () {
//     await this.cartPage.clickContinueBTN();
// })

When('Click View Cart Button', { timeout: 10000 }, async function () {
    await this.cartPage.clickViewCart();
});

Then('Verify correct prices, quantity and total price', { timeout: 30000 }, async function () {
    await this.cartPage.verifyPrice();
});

When('Remove product from cart', async function () {
    await this.cartPage.removeProduct();
})

Then('Verify that product is removed from the cart', {timeout:10000}, async function () {
    await this.cartPage.verifyEmptyCart();
})