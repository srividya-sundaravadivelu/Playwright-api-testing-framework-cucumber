import { Given, When, Then } from '@cucumber/cucumber';
import { getBookingPayload } from '../../src/factory/TestDataFactory.js';
import { getAuthToken } from '../../src/utils/TokenManager.js';

Given('a booking exists', async function () {
    this.payload = getBookingPayload();
    this.response = await this.bookingClient.createBooking(this.payload);
    this.responseBody = await this.response.json();
    this.bookingId = this.responseBody.bookingid;
});

When('I retrieve the booking', async function () {
    this.response = await this.bookingClient.getBookingById(this.bookingId);
});

When('I update the booking details', async function () {
    this.response = await this.bookingClient.updateBooking(this.bookingId, this.payload);
});

When('I delete the booking', async function () {
    const token = await getAuthToken(this.apiRequest); // reuse same token
    this.response = await this.bookingClient.deleteBooking(this.bookingId, token);
    console.log('Delete Response:', this.response.status());
});
Then('the booking should no longer exist', async function () {
    this.response = await this.bookingClient.getBookingById(this.bookingId);
    console.log('Get Response after Deletion:', this.response.status());
    if (this.response.status() !== 404) {
        throw new Error('Booking still exists after deletion');
    }
});

