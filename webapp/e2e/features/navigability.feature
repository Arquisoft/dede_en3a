Feature: Accessing every element in the navbar

  Scenario: The user access the shop through the navbar
    Given A user on the home page
    When I press the Shop button in the navbar
    Then I am in the Shop page

Scenario: The user access the about us section of the navbar
  Given A user on the home page
  When I press the About Us button in the navbar
  Then I am in the About Us page

Scenario: The user access the contact section of the navbar
  Given A user on the About Us page
  When I press the Contact button in the navbar
  Then I am in the Contact page

Scenario: The user access the orders section of the navbar
  Given A user on the contact page
  When I press the Orders button in the navbar
  Then I am in the Orders page

  Scenario: The user access the home page
    Given A user on the orders page
    When I press the home button in the navbar
    Then I am in the home page

  Scenario: The user access the shop through the Start Shopping button of Home page
    Given A user on the home page
    When I press the Start Shopping button
    Then I am in the Shop page

