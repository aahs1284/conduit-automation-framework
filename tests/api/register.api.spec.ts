import test, { expect } from "@playwright/test";

test.describe('Register API Tests', () => { 
    test('@smoke @regression @api User should sign up successfully via API', async ({ request }) => {
        const uniqueId = Date.now();

        const username = `user${uniqueId}`;
        const email = `user${uniqueId}@gmail.com`;
        const password = 'MmnF695217+';

        const response = await request.post(
            'https://conduit-api.bondaracademy.com/api/users',
            {
                data: {
                    user: {
                        username: username,
                        email: email,
                        password: password
                    }
                }
            }
        );

        expect(response.status()).toBe(201);
    });
});