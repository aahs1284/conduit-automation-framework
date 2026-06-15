import { test, expect } from '../../fixtures/api.fixtures';
import { mainUser } from '../../test-data/users';

test.describe('Get profile - API Tests', () => {

    test('@api @regression User should be able to get profile by username', async ({ request }) => {

        const response = await test.step('Get profile by username', async () => {
            return await request.get(`profiles/${mainUser.username}`);
        });

        await test.step('Verify profile data', async () => {
            expect(response.status()).toBe(200);

            const responseBody = await response.json();

            expect(responseBody.profile).toBeTruthy();
            expect(responseBody.profile.username).toBe(mainUser.username);
            expect(typeof responseBody.profile.following).toBe('boolean');
        });
    });
});