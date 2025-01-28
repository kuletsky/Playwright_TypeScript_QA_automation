const { When, Then } = require("@cucumber/cucumber");

When('Click on Contuct us link', async function () {
    await this.contuctUsPage.clickContuctUsLink();
});

Then('Verify visible text: Get in touch', { timeout: 10000 }, async function () {
    await this.contuctUsPage.verifyTextGetinTouch();
});

When('Fill the form with test Data: {string}, {string}, {string}, {string}', async function (name, email, subject, message) {
    await this.contuctUsPage.fillContuctUsForm(name, email, subject, message);    
});

When('Click Submit button', { timeout: 10000 }, async function () {
    await this.contuctUsPage.clickSubmit();
});

// Then('Verify message: Success! Your details have been submitted successfully.', { timeout: 10000 }, async function () {
//     await this.contuctUsPage.verifyTextSubmited();
// });

// When('Click Home button', async function () {

// });

// Then('Verify user can see Main page', async function () {

// });