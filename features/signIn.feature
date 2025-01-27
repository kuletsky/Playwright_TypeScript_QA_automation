Feature: SignIn tests
    Here will be all SignIn tests
    Background:
        Given Open the main page

    @regression
    Scenario: Verify user can successfuly SignIn
        When Click the Signup/Login menu
        Then Verify LogIn page is opened
        And Verify user can Signin with "1234@1234.com" and "1234"
