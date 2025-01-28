const { expect } = require("@playwright/test");

class SignUpPage {

    constructor(page) {
        this.page = page;
        this.signFormHeader = page.locator('.signup-form h2');
        this.nameInput = page.locator('[data-qa="signup-name"]');
        this.emailInput = page.locator('[data-qa="signup-email"]');
        this.btnSignUp = page.locator('[data-qa="signup-button"]');
        this.formEnterAccount = page.locator('b').first();
        this.gender = page.locator('#id_gender1');
        this.nameField = page.locator('#name');
        this.emailField = page.locator('#email');
        this.pswd = page.locator('#password');
        this.newsletters = page.locator('[for="newsletter"]');
        this.offers = page.locator('[for="optin"]');
        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.company = page.locator('#company');
        this.address1 = page.locator('#address1');
        this.address2 = page.locator('#address2');
        this.country = page.locator('select#country');
        this.state = page.locator('#state');
        this.city = page.locator('#city');
        this.zipcode = page.locator('#zipcode');
        this.mobileNumber = page.locator('#mobile_number');
        this.createBTN = page.locator('[data-qa="create-account"]');
        this.accountCreated = page.locator('b');
        this.deleteBTN = page.locator('a[href*="del"]');
        this.continueBTN = page.locator('[data-qa="continue-button"]');
        this.accountDeleted = page.locator('b');
        this.emailExistMSG = page.locator('[action="/signup"] p');



    };


    async verifySignUpPage() {
        // Verify the signup page header contains the expected text
        await expect(this.signFormHeader).toContainText('New User Signup!');
    };


    async signUp(name, email) {
        this.expectedName = name;
        this.expectedEmail = email;
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.btnSignUp.click();
    };

    async verifyFormEnterAccount() {
        // Verify the account information form contains the expected text
        await expect(this.formEnterAccount).toContainText('Enter Account Information');
    };

    async fillFormAccount() {
        await this.gender.check();
        // Verify the name and email fields have the expected values
        const nameValue = await this.nameField.getAttribute('value');
        const emailValue = await this.emailField.getAttribute('value');

        expect(nameValue).toBe(this.expectedName);
        expect(emailValue).toBe(this.expectedEmail);      // await this.name.fill('john');

        await this.pswd.fill('1234');

        await this.newsletters.check();
        await this.offers.check();

        // Fill details
        await this.firstName.fill('Ivan');
        await this.lastName.fill('Grooper');
        await this.company.fill('Kuletsky Software');
        await this.address1.fill('address1');
        await this.address2.fill('address2');
        await this.country.selectOption('United States');
        await this.state.fill('MD');
        await this.city.fill('Goodwil');
        await this.zipcode.fill('111111');
        await this.mobileNumber.fill('12345678');
        await this.createBTN.click();
    };

    async verifyAccountCreated() {
        await expect(this.accountCreated).toContainText('Account Created!');
    };

    async continue() {
        await this.continueBTN.click();
    };

    async deleteAccount() {
        await this.deleteBTN.click();
    };

    async verifyAccountDeleted() {
        await expect(this.accountDeleted).toContainText('Account Deleted!');
    };

    async verifyErrorMsg() {
        await expect(this.emailExistMSG).toContainText('Email Address already exist!');
    };


}
module.exports = { SignUpPage };