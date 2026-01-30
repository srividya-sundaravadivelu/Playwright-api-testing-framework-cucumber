export async function attachApiCall(world, payload, response) {
    if (payload) {
        await world.attach(
            `REQUEST:\n${JSON.stringify(payload, null, 2)}`,
            'text/plain'
        );
    }

    if (response) {
        const body = await response.json();
        await world.attach(
            `RESPONSE:\nStatus: ${response.status()}\n${JSON.stringify(body, null, 2)}`,
            'text/plain'
        );
    }
}
