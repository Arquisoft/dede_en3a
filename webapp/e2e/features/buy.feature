Feature: Buying something

Scenario: The user access the shop through the navbar
  Given A not logged user on the home page
  When I open the profile and login, add a product to the cart, enter my POD and buy it
  Then The product is correctly bought
