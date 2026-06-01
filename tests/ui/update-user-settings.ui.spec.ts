import { test } from '../../fixtures/pages.fixture';
import settingsData from '../../test-data/settings.json';

test.describe('Update user settings - UI Tests', () => {

    test('User should be able to update user settings', async ({ page, settingsPage }) => {
        await page.goto('/');

        const updatedUsername = settingsData.usernamePrefix + Date.now();

        await settingsPage.gotoSettings();

        await settingsPage.updateUserSettings(
            updatedUsername,
            settingsData.bio,
            settingsData.imageUrl
        );

        await settingsPage.verifyUpdatedUsername(updatedUsername);
    });

});