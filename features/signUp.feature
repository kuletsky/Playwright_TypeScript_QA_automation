Feature: SignUp tests
    Here will be all SignUp tests
    Background:
        Given Open the main page

    # @regression
    Scenario: Verify user can successfuly SignUp with valid credentials
        When Click the Signup/Login menu
        Then Verify SignUp page is opened
        When Enter "example" and "example@smail.com"
        Then Verify that ENTER ACCOUNT INFORMATION is visible
        When Fill detailse: Title, Name, Email, Password, Date of birth
        Then Verify that Account created! is visible
        When Click Continue button
        When Click Delete account button
        Then Verify that ACCOUNT DELETED! is visible

    Scenario: Verify that User cannot signUp with existing email
        When Click the Signup/Login menu
        Then Verify SignUp page is opened
        When Enter "Drew" and "trip27@lftjaguar.com"
        Then Verify error text: Email Adress already exist!