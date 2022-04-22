Feature: Accessing the shop

Scenario: The user access the shop through the navbar
  Given An user on the home page
  When I press the Shop button in the navbar
  Then I am in the Shop page

Scenario: The user access the shop through the Start Shopping button of Home page
  Given An user on the home page
  When I pres the Start Shopping button
  Then I am in the Shop page