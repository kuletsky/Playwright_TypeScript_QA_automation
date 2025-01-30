Feature: cart page tests
    Here will be all Cart page tests
    Background:
        Given Open the main page

    Scenario: Verify Subscription in Cart page
        When Click Cart link
        Then Verify text: SUBSCRIPTION
        When Enter email address in input and click arrow button
        Then Verify success message text: You have been successfully subscribed!

    Scenario: Verify user can add product in Cart
        When Click Products link
        And Hover over first product and click: Add to cart
        And Click View Cart Button
        Then Verify correct prices, quantity and total price
        When Remove product from cart
        Then Verify that product is removed from the cart

    Scenario: Verify user can remove Products from the cart
        When Click Products link
        And Click add to Cart
        And Click View Cart Button
        Then Verify the product are added to Cart
        When Remove product from cart
        Then Verify that product is removed from the cart

    Scenario: User can add to cart from Recommended items
        When Scroll to recommended items
        Then Verify RECOMMENDED ITEMS are visible
        When Click on Add To Cart on Recommended product
        When Click on View Cart button
        And Verify that product is displayed in cart page
        When Remove product from cart
        Then Verify that product is removed from the cart
