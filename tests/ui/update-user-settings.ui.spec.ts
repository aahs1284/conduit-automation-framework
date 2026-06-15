import { test } from '../../fixtures/pages.fixture';
import settingsData from '../../test-data/settings.json';

test.describe('Update user settings - UI Tests', () => {

    test('@regression @ui User should be able to update user settings', async ({ page, settingsPage }) => {

        await test.step('Open home page', async () => {
            await page.goto('/');
        });

        const updatedUsername = settingsData.usernamePrefix + Date.now();

        await test.step('Navigate to settings page', async () => {
            await settingsPage.gotoSettings();
        });

        await test.step('Update user settings', async () => {
            await settingsPage.updateUserSettings(
                updatedUsername,
                settingsData.bio,
                settingsData.imageUrl
            );
        });

        await test.step('Verify user settings are updated', async () => {
            await settingsPage.verifyUpdatedUsername(updatedUsername);
        });
    });

});