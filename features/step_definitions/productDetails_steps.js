const { When, Then } = require('@cucumber/cucumber');


When('Click on Products link', async function () {
    this.productDetails.clickProductLink();
});

// Then('Verify the page is navigated successfuly', function () {

// });


// Then('Verify the all list of products is visible', function () {

// });


// When('Click on View product of first product', function () {

// });


// Then('Verify User is landed to product detail page', function () {

// });