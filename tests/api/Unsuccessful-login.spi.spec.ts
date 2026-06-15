import { test, expect } from '@playwright/test';
import { mainUser } from '../../test-data/users';

test.describe('Negative login - API Tests', () => {

    test('@api @regression User should not be able to login with invalid password', async ({ request }) => {

        const response = await test.step('Send login request with invalid password', async () => {
            return await request.post('users/login', {
                data: {
                    user: {
                        email: mainUser.email,
                        password: 'WrongPassword123!'
                    }
                }
            });
        });

        await test.step('Verify login is rejected', async () => {
            expect(response.status()).toBe(403);

            const responseBody = await response.json();

            expect(responseBody.errors).toBeTruthy();
        });
    });
});