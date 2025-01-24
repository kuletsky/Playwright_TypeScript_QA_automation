Feature: E2E
    Here wiil be all E2E tests

    Scenario: Verify user can successfuly SignIn
        Given Go to the Main Page
        When Click the Signup/Login menu
        Then Verify right page is opened
        And Verify user can Signin with "1234@1234.com" and "1234"
