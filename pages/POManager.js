const { LoginPage } = require("./loginPage");
const { MainPage } = require("./mainPage");
const { SignUpPage } = require("./signUpPage")

class POManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.signUpPage = new SignUpPage(this.page);
        this.mainPage = new MainPage(this.page);
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

}
module.exports = { POManager };
