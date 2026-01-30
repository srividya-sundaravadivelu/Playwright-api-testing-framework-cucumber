import { loadJson } from './JsonFileLoader.js';

export function getBookingPayload(fileName = 'bookingPayload.json') {
    return loadJson(`src/testdata/${fileName}`);
}

export function createBookingWithName(firstname, lastname) {
    const payload = getBookingPayload();
    payload.firstname = firstname;
    payload.lastname = lastname;
    return payload;
}