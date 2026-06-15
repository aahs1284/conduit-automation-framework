import { test, expect } from '../../fixtures/api.fixtures';
import settingsData from '../../test-data/settings.json';

test.describe('Manage user profile - API Tests', () => {

    test('@regression @api User should be able to update user settings via API', async ({ request, token }) => {

        const updatedUsername =
            settingsData.usernamePrefix + Date.now();

        const updateUserResponse = await test.step('Update user settings', async () => {
            return await request.put(
                'user',
                {
                    headers: {
                        Authorization: `Token ${token}`
                    },

                    data: {
                        user: {
                            username: updatedUsername,
                            bio: settingsData.bio,
                            image: settingsData.imageUrl,
                        }
                    }
                }
            );
        });

        await test.step('Verify user settings are updated', async () => {
            expect(updateUserResponse.status()).toBe(200);

            const updateUserResponseJson = await updateUserResponse.json();

            expect(updateUserResponseJson.user.username)
                .toBe(updatedUsername);

            expect(updateUserResponseJson.user.bio)
                .toBe(settingsData.bio);

            expect(updateUserResponseJson.user.image)
                .toBe(settingsData.imageUrl);
        });
    });
});