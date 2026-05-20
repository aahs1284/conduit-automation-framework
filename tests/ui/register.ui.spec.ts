import test from "@playwright/test"
import { RegisterPage } from "../../src/pages/register.page"

test.describe('SignUp UI Tests', () => { 
    test('User should sign up successfully', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const username = 'ajra17050505';
        const email = 'ajra17050505@gmail.com'
        const password = 'MmnF695217+';

        //pozivamo akcije iz klase register page
        await registerPage.goto();

        await registerPage.register(username, email, password);
        await registerPage.verifySuccess(username)
    })
})