const { expect } = require("@playwright/test");

class ContuctUsPage {

    constructor(page) {

        this.page = page;
        this.contuctUsLink = page.locator('a[href*="contact"]');
        this.textGetinTouch = page.locator('.contact-form h2');
        this.name = page.locator('[data-qa="name"]');
        this.email = page.locator('[data-qa="email"]');
        this.subject = page.locator('[data-qa="subject"]');
        this.message = page.locator('[data-qa="message"]');
        this.submitBTN = page.getByRole('button', { name: 'Submit' });
        this.textSubmited = page.locator('.status.alert.alert-success');


        this.page.on('dialog', async (dialog) => {
            console.log("Dialog Message: ", dialog.message());
            await dialog.accept();
        });
    }


    async clickContuctUsLink() {
        await this.contuctUsLink.click();
    };

    async verifyTextGetinTouch() {
        console.log(await this.textGetinTouch.textContent())
        await expect(this.textGetinTouch).toContainText('Get In Touch');
    };

    async fillContuctUsForm(name, email, subject, message) {
        await this.name.fill(name);
        await this.email.fill(email);
        await this.subject.fill(subject);
        await this.message.fill(message);
    };

    async clickSubmit() {
        await this.submitBTN.click();
    };

    // async verifyTextSubmited() {
    //     await expect(this.textSubmited).toContainText('Success! Your details have been submitted successfully.', { timeout: 10000 });
    // };


}
module.exports = { ContuctUsPage };