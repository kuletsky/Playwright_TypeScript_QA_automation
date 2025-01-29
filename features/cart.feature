Feature: cart page tests
    Here will be all Cart page tests
    Background:
        Given Open the main page

    Scenario: Verify Subscription in Cart page
        When Click Cart link
        Then Verify text: SUBSCRIPTION
        When Enter email address in input and click arrow button
        Then Verify success message text: You have been successfully subscribed!
