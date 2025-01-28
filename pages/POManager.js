const { LoginPage } = require("./loginPage");
const { MainPage } = require("./mainPage");
const { SignUpPage } = require("./signUpPage");
const { contuctUsPage } = require("./contuctUsPage");

class POManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.signUpPage = new SignUpPage(this.page);
        this.mainPage = new MainPage(this.page);
        this.contuctUsPage = new contuctUsPage(this.page)
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

    getcontuctUsPage() {
        return this.contuctUsPage;
    };

}
module.exports = { POManager };
