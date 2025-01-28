Feature: SignIn tests
    Here will be all SignIn tests
    Background:
        Given Open the main page

    @regression
    Scenario: Verify user can successfuly SignIn
        When Click the Signup/Login menu
        Then Verify LogIn page is opened
        When Enter valid credentials "1234@1234.com" and "1234"
        Then Verify User successfully log in and see text: Logged in as

    Scenario: Verify that user cannot SignIn with invalid credentials
        When Click the Signup/Login menu
        Then Verify LogIn page is opened
        When Enter invalid credentials "000@000.com" and "000"
        Then Verify error Your email or password is incorrect! is visible

    Scenario: Verify user can successfuly Logout
        When Click the Signup/Login menu
        Then Verify LogIn page is opened
        When Enter valid credentials "1234@1234.com" and "1234"
        Then Verify User successfully log in and see text: Logged in as
        When Click Logout button
        Then Verify User navigated to Login page