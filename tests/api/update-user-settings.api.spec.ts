import { test, expect } from '../../fixtures/api.fixtures';
import settingsData from '../../test-data/settings.json';

test.describe('Manage user profile - API Tests', () => {

    test('User should be able to update user settings via API', async ({ request, token }) => {

        const updatedUsername =
            settingsData.usernamePrefix + Date.now();

        const updateUserResponse = await request.put(
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