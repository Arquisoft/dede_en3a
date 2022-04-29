Feature: Using the different functionalities of the shop

  Scenario: The user searches Gel hand sanitizer
    Given A user on the shop page
    When I write "Hand" on the search bar and press the Search button
    Then The only product on screen is the Gel Hand Sanitizer

  Scenario: The user adds a product to the cart
    Given A user on the shop page
    When I press the Add to Cart button
    Then The product is in the cart