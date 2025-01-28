const { LoginPage } = require("./loginPage");
const { MainPage } = require("./mainPage");
const { SignUpPage } = require("./signUpPage");
const { ContuctUsPage } = require("./contuctUsPage");
const { ProductDetails } = require("./productDetailsPage");

class POManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.signUpPage = new SignUpPage(this.page);
        this.mainPage = new MainPage(this.page);
        this.contuctUsPage = new ContuctUsPage(this.page)
        this.productDetails = new ProductDetails(this.page)
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

    getProductDetails() {
        return this.productDetails;
    }

}
module.exports = { POManager };
