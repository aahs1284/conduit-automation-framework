import test from "@playwright/test"
import { RegisterPage } from "../../src/pages/register.page"

test.describe('SignUp UI Tests', () => { 
    test('User should sign up successfully', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const username = 'aahsRegister01';
        const email = 'ajra-register01@gmail.com'
        const password = 'MmnF695217+';

        await registerPage.goto();

        await registerPage.register(username, email, password);
        await registerPage.verifySuccess(username)
    })
})