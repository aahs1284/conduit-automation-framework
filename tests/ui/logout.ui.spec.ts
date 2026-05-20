import test from "@playwright/test"
import { LoginPage } from "../../src/pages/login.page"

test.describe('Log out - UI Tests', () => { 
    test('User should be able to log out successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const email = 'ajra.email.testing@gmail.com'
        const password = 'MmnF695217+';

        //pozivamo akcije iz klase login page
        await loginPage.goto();

        await loginPage.login(email, password);
        await page.waitForTimeout(3000)

        await page.goto('/settings');
        await page.locator('button:has-text("Or click here to logout.")').click();
        await page.waitForTimeout(3000)
    });
    
})