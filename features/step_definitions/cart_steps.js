const { When, Then } = require('@cucumber/cucumber');


When('Click Cart link', async function () {
    await this.cartPage.clickCartLink();
});