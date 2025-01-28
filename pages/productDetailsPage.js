

class ProductDetails {

    constructor(page) {

        this.page = page;
        this.ProductDetails = page.locator('a[href="/products"]');

    };


    async clickProductLink() {
        await this.ProductDetails.click();
    };


}
module.exports = { ProductDetails };
