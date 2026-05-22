import { test } from '../../fixtures/pages.fixture';

test.describe('Update user settings - UI Tests', () => {

    test('User should be able to update user settings', async ({ loginPage, settingsPage }) => {

        const email = process.env.TEST_EMAIL!;
        const password = process.env.TEST_PASSWORD!;

        await loginPage.goto();

        await loginPage.login(email, password);
        await loginPage.verifySuccessfulLogin();

        const updatedUsername = 'ajra' + Date.now();
        const updatedBio = 'This is updated bio';
        const updatedImageUrl = 'https://someurl.com';

        await settingsPage.gotoSettings();

        await settingsPage.updateUserSettings(
            updatedUsername,
            updatedBio,
            updatedImageUrl,
            email,
            password
        );

        await settingsPage.verifyUpdatedUsername(updatedUsername);

    });
})