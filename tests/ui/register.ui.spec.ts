import { test, expect } from '../../fixtures/pages.fixture';

test.describe('SignUp UI Tests', () => {

    test('User should sign up successfully', async ({ registerPage }) => {

        const username = 'aahsRegister02';
        const email = 'ajra-register02@gmail.com';
        const password = 'MmnF695217+';

        await registerPage.goto();

        await registerPage.register(username, email, password);
        await registerPage.verifySuccess(username);
    });
});