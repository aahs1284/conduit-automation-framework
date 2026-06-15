import { test, expect } from '@playwright/test';
import { users } from '../../test-data/users';

test.describe('Login API Tests', () => {
    for (const user of users) {
        test(`@smoke @sanity @api @regression User ${user.username} should sign in successfully via API`, async ({ request }) => {

            const response = await test.step('Send login request', async () => {
                return await request.post('users/login', {
                    data: {
                        user: {
                            email: user.email,
                            password: user.password
                        }
                    }
                });
            });

            await test.step('Verify successful login response', async () => {
                expect(response.status()).toBe(200);

                const responseBody = await response.json();

                expect(responseBody.user.email).toBe(user.email);
                expect(responseBody.user.token).toBeTruthy();
            });
        });
    }
});