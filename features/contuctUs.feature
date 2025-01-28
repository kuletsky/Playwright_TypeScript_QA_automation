Feature: ContuctUs tests
    Here will be all ContuctUs tests
    Background:
        Given Open the main page

    Scenario: Verify user can navigate to Contact Us Form and submit
        When Click on Contuct us link
        Then Verify visible text: Get in touch
        When Fill the form with test Data: "Iva", "sf@ewf.com", "subject", "messega"
        And Click Submit button
        # Then Verify message: Success! Your details have been submitted successfully.
        # When Click Home button
        # Then Verify user can see Main page
