import { setWorldConstructor } from '@cucumber/cucumber';

export class CustomWorld {
    constructor() {
        this.apiRequest = null;    // Playwright API context
        this.bookingClient = null; // BookingClient instance
        this.payload = null;       // Will hold scenario-specific payload
        this.response = null;      // API response
        this.responseBody = null;  // Parsed response JSON
        this.bookingId = null;     // Booking ID
    }
}

setWorldConstructor(CustomWorld);
