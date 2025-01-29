const { LoginPage } = require("./loginPage");
const { MainPage } = require("./mainPage");
const { SignUpPage } = require("./signUpPage");
const { ContuctUsPage } = require("./contuctUsPage");
const { CartPage } = require("./cartPage");
// const { ProductDetail } = require("./productDetailPage");

class POManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.signUpPage = new SignUpPage(this.page);
        this.mainPage = new MainPage(this.page);
        this.contuctUsPage = new ContuctUsPage(this.page);
        this.cartPage = new CartPage(this.page);
        // this.productDetail = new ProductDetail(this.page)
    }

    getLoginPage() {
        return this.loginPage;
    }

    getSignUpPage() {
        return this.signUpPage;
    }

    getMainPage() {
        return this.mainPage;
    }

    getContuctUsPage() {
        return this.contuctUsPage;
    };

    // getProductDetail() {
    //     return this.productDetail;
    // };

    getCartPage() {
        return this.cartPage;
    }

}
module.exports = { POManager };
