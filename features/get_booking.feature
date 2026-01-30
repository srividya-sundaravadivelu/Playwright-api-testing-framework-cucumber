@getBooking
Feature: Get Booking by ID or by name

  @getBookingByID
  Scenario: Retrieve booking by ID
    Given I create a booking with valid payload
    When I retrieve the booking
    Then the response should return the correct booking details

  @getBookingByName
  Scenario Outline: Retrieve booking IDs filtered by name
    Given I create a booking with firstname "<firstname>" and lastname "<lastname>"
    When I retrieve the booking by firstname "<firstname>" and lastname "<lastname>"
    Then I should get a list of booking IDs matching the name

    Examples:
      | firstname  | lastname   |
      | John_12345 | Doe _12345 |
