Feature: Using the different functionalities of the shop

Scenario: The user orders the products by name
  Given An user on the shop page
  When I press the "order by name" button and the "search" button
  Then The products are ordered by name

  Scenario: The user orders the products by price
    Given An user on the shop page
    When I press the "order by price" button and the "search" button
    Then The products are ordered by price

  Scenario: The user searches Gel hand sanitizer
    Given An user on the shop page
    When I write "Gel" on the search bar and press the Search button
    Then The only product on screen is the Gel Hand Sanitizer

  Scenario: The user enters on the product description
    Given An user on the shop page
    When I press on a product
    Then I am on the description page

  Scenario: The user adds a product to the cart
    Given An user on the shop page
    When I press the Add to Cart button
    Then The product is in the cart