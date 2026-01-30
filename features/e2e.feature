@e2e @smoke
Feature: End to End Booking Lifecycle

Scenario: Complete booking lifecycle
  Given a booking exists
  When I retrieve the booking
  And I update the booking details
  And I delete the booking
  Then the booking should no longer exist