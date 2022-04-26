Feature: Registering a new user

  Scenario: The user is registered in the site
    Given A registered user
    When I fill the data in the form and press login
    Then The orders of this client are available

Scenario: The user is not registered in the site
  Given An unregistered user
  When I access the register form, fill the data in it and press submit
  Then A confirmation message should be shown in the screen