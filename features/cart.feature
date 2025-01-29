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
        # And Click Continue Shopping button
        And Click View Cart Button
        Then Verify correct prices, quantity and total price
        When Remove product from cart
        Then Verify that product is removed from the cart
        
