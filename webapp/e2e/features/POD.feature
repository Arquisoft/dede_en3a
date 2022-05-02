Feature: Introduce the POD

Scenario: The user introduces their POD
  Given A user
  When I go to the cart and introduce the POD
  Then The checkout button appears
