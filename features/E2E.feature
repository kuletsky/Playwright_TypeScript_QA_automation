Feature: E2E
    Here wiil be all E2E tests
    Background:
        Given Open the main page

    Scenario: Verify user can successfuly SignIn
        When Click the Signup/Login menu
        Then Verify right page is opened
        And Verify user can Signin with "1234@1234.com" and "1234"
