import { test, expect } from '../../fixtures/pages.fixture';

test.describe('Log out - UI Tests', () => { 
    test('User should be able to log out successfully', async ({ loginPage }) => {

        const email = process.env.TEST_EMAIL!;
        const password = process.env.TEST_PASSWORD!;

        await loginPage.goto();

        await loginPage.login(email, password);
        await loginPage.verifySuccessfulLogin();
        
        await loginPage.logout();
        await loginPage.verifySuccessfulLogout();
    });
})