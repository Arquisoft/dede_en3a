Feature: Accessing every element in the navbar

Scenario: The user access the about us section of the navbar
  Given An user on the home page
  When I press the About Us button in the navbar
  Then I am in the About Us page

Scenario: The user access the contact section of the navbar
  Given An user on the home page
  When I press the Contact button in the navbar
  Then I am in the Contact page

Scenario: The user access the orders section of the navbar
  Given An user on the home page
  When I press the Orders button in the navbar
  Then I am in the Orders page

Scenario: The user opens the cart
  Given An user on the home page
  When I press the Cart button in the navbar
  Then The Cart is opened

  Scenario: The user opens the login
    Given An user on the home page
    When I press the profile button in the navbar
    Then The login pop-up appears
