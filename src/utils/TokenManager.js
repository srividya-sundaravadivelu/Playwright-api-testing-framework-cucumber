let token = null;

export async function getAuthToken(apiRequest) {
    if (token) return token;

    const response = await apiRequest.post('/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    const body = await response.json();
    token = body.token;
    return token;
}
