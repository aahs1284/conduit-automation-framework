import test from "@playwright/test"
import { LoginPage } from "../../src/pages/login.page"

test.describe('SignIn UI Tests', () => { 
    test('User should sign in successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const email = 'ajra17050505@gmail.com'
        const password = 'MmnF695217+';

        //pozivamo akcije iz klase login page
        await loginPage.goto();

        await loginPage.login(email, password);
        await page.waitForTimeout(3000)
    })
})