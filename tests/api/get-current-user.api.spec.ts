import { test, expect } from '../../fixtures/api.fixtures';

test.describe('Get current user - API Tests', () => {

    test('@api @regression User should be able to get current user data', async ({ request, token }) => {

        const response = await test.step('Get current user data', async () => {
            return await request.get('user', {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
        });

        await test.step('Verify current user data', async () => {
            expect(response.status()).toBe(200);

            const responseBody = await response.json();

            expect(responseBody.user).toBeTruthy();
            expect(responseBody.user.email).toBe(process.env.TEST_EMAIL);
            expect(responseBody.user.username).toBeTruthy();
            expect(responseBody.user.token).toBeTruthy();
        });
    });
});