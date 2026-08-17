Feature: Ecommerce Validation
  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<Username>" and "<Password>"
    Then Verify Error message is displayed

# this is paramaterise data
  Examples:
      | Username                      | Password          |
      | Admin                         | Learning@830$3mK2 |
      | hello                         | Iamhello          |
  