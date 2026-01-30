import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getBookingPayload } from '../../src/factory/TestDataFactory.js';
import { assertBookingMatches } from '../../src/utils/BookingAssertions.js';

Given('the Restful Booker API is available', async function () {
    const response = await this.bookingClient.ping();
    if (response.status() !== 201) throw new Error('API not available');
});

When('I create a booking with valid payload', async function () {
    this.payload = getBookingPayload();
    this.response = await this.bookingClient.createBooking(this.payload);
    this.responseBody = await this.response.json();
    this.bookingId = this.responseBody.bookingid;
});

Then('the booking should be created successfully', async function () {
    expect(this.response.status()).toBe(200);
    assertBookingMatches(this.payload, this.responseBody.booking);
});
