Feature: Ecommerce Validation
  @Regression
  Scenario: Placing the Order
    Given a login to Ecommerce application with "kunikajain27@gmail.com" and "Kunikajain@02"
    When Add "ZARA COAT 3" to cart
    Then the "kunikajain27@gmail.com" and Verify "ZARA COAT 4" is displayed in the cart
    Then Enter valid details and Verify order in present in the OrderHistory

  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<Username>" and "<Password>"
    Then Verify Error message is displayed

    # this is paramaterise data
    Examples:
      | Username | Password          |
      | Admin    | Learning@830$3mK2 |
      | hello    | Iamhello          |