import { test } from '../../fixtures/pages.fixture';

test.describe('Log out - UI Tests', () => {
    test('@sanity @regression @ui User should be able to log out successfully', async ({ loginPage }) => {

        await loginPage.logout();

        await loginPage.verifySuccessfulLogout();
    });
});