@createBooking
Feature: Create Booking API
    As a user of the Restful Booker API 
    I want to create a new booking
    So that I can reserve accommodations

  Scenario: Create a new booking
    Given the Restful Booker API is available
    When I create a booking with valid payload
    Then the booking should be created successfully
