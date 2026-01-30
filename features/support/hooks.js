import { Before, After, AfterStep } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { BookingClient } from '../../src/clients/bookingClient.js';
import { envConfig } from '../../src/config/env.config.js';
import { getAuthToken } from '../../src/utils/TokenManager.js';

Before(async function () {

    // Initialize API context
    this.apiRequest = await request.newContext({
        baseURL: envConfig.baseURL,
        extraHTTPHeaders: {
            ...envConfig.headers
        }
    });

    this.token = await getAuthToken(this.apiRequest);

    this.authApiRequest = await request.newContext({
        baseURL: envConfig.baseURL,
        extraHTTPHeaders: {
            ...envConfig.headers,
            Cookie: `token=${this.token}`
        }
    });

    // Initialize API client
    this.bookingClient = new BookingClient(
        this.apiRequest,
        this.authApiRequest
    );
});

After(async function () {
    await this.apiRequest?.dispose();
    await this.authApiRequest?.dispose();
});



