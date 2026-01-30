import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { validateSchema } from '../../src/utils/SchemaValidator.js';
import { assertBookingMatches } from '../../src/utils/BookingAssertions.js';
import { loadJson } from '../../src/factory/JsonFileLoader.js';
import { createBookingWithName } from '../../src/factory/TestDataFactory.js';


Then('the response should return the correct booking details', async function () {

    expect(this.response.status()).toBe(200);

    //console.log('Response Body:', this.responseBody);

    const bookingByIdSchema = loadJson('schemas/booking_by_id_schema.json');

    // Validate the response schema
    validateSchema(this.responseBody.booking, bookingByIdSchema);

    // Assert that the booking details match the payload used to create the booking
    assertBookingMatches(this.payload, this.responseBody.booking);
});

Given('I create a booking with firstname {string} and lastname {string}', async function (firstname, lastname) {
    this.payload = createBookingWithName(firstname, lastname);
    this.response = await this.bookingClient.createBooking(this.payload);
    this.responseBody = await this.response.json();
    this.bookingId = this.responseBody.bookingid;
    //console.log(`Created booking with ID: ${this.bookingId}`);
});

When('I retrieve the booking by firstname {string} and lastname {string}', async function (firstname, lastname) {
    this.response = await this.bookingClient.getBooking(firstname, lastname);
});

Then('I should get a list of booking IDs matching the name', async function () {
    expect(this.response.status()).toBe(200);

    // Extract booking IDs from the response
    const bookingList = await this.response.json();
    //console.log('Booking IDs response:', bookingList);

    if (bookingList.length === 0) {
        throw new Error('No bookings found with the given firstname and lastname');
    }

    // Extract just the IDs
    const bookingIds = bookingList.map(b => b.bookingid);

    // Assert that your created bookingId is present
    expect(bookingIds).toContain(this.bookingId);
});
