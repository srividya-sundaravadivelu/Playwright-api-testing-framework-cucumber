import { expect } from '@playwright/test';

export function assertBookingMatches(payload, booking) {
    expect(booking.firstname).toBe(payload.firstname);
    expect(booking.lastname).toBe(payload.lastname);
    expect(booking.totalprice).toBe(payload.totalprice);
    expect(booking.depositpaid).toBe(payload.depositpaid);
    expect(booking.bookingdates.checkin).toBe(payload.bookingdates.checkin);
    expect(booking.bookingdates.checkout).toBe(payload.bookingdates.checkout);
    expect(booking.additionalneeds).toBe(payload.additionalneeds);
}
