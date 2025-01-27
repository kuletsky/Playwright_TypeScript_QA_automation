Feature: SignUp tests
    Here will be all SignUp tests
    Background:
        Given Open the main page

    # @regression
    Scenario: Verify user can successfuly SignUp with valid credentials
        When Click the Signup/Login menu
        Then Verify SignUp page is opened
        When Enter "example" and "example@mail.com"