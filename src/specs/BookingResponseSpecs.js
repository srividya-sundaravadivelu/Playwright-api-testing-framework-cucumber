// src/specs/BookingResponseSpecs.js
import { expect } from '@playwright/test';

export function validateGetBookingByIdResponse(response, body) {
    expect(response.status()).toBe(200);
    expect(body.firstname).toBeTruthy();
    expect(body.lastname).toBeTruthy();
    expect(body.bookingdates).toBeDefined();
}
