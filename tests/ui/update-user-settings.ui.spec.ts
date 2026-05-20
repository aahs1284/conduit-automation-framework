import test from "@playwright/test"
import { LoginPage } from "../../src/pages/login.page"
import { SettingsPage } from "../../src/pages/settings.page"

test.describe('Update user settings - UI Tests', () => {

    test('User should be able to update user settings', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const email = 'ajra17050505@gmail.com';
        const password = 'MmnF695217+';

        await loginPage.goto();

        await loginPage.login(email, password);

        await page.waitForTimeout(1000);

        const settingsPage = new SettingsPage(page);

        const updatedUsername = 'ajra' + Date.now();

        const updatedBio = 'This is updated bio';

        const updatedImageUrl = 'https://api.realworld.io/images/demo-avatar.png';

        await settingsPage.gotoSettings();

        await settingsPage.updateUserSettings(
            updatedUsername,
            updatedBio,
            updatedImageUrl,
            email,
            password
        );

        await settingsPage.verifyUpdatedUsername(updatedUsername);

        await page.waitForTimeout(3000);
    });
})