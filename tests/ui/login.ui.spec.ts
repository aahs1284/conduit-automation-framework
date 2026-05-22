import { test, expect } from '../../fixtures/pages.fixture';

test.describe('SignIn UI Tests', () => { 
    test('User should sign in successfully', async ({ loginPage }) => {

        const email = process.env.TEST_EMAIL!;
        const password = process.env.TEST_PASSWORD!;

        await loginPage.goto();

        await loginPage.login(email, password);
    await loginPage.verifySuccessfulLogin();
    
    })
})