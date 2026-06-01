import test, { expect } from "@playwright/test";

test.describe('Login API Tests', () => {

    test('User should sign in successfully via API', async ({ request }) => {

        const response = await request.post(
            'https://conduit-api.bondaracademy.com/api/users/login',
            {
                data: {
                    user: {
                        email: process.env.TEST_EMAIL,
                        password: process.env.TEST_PASSWORD
                    }
                }
            }
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.user.email).toBe(process.env.TEST_EMAIL);
        expect(responseBody.user.token).toBeTruthy();
    });
});