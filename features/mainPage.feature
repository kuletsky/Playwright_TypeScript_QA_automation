Feature: Main page tests
    Here will be all Main page tests
    Background:
        Given Open the main page

    Scenario: Verify user can succcessfully subscribe
        Then Then Verify user can see Main page
        When Scroll down to footer
        Then Verify text: SUBSCRIPTION
        When Enter email address in input and click arrow button
        Then Verify success message text: You have been successfully subscribed!
