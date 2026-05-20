import { test, expect } from "@playwright/test"
import { LoginPage } from "../../src/pages/login.page"

test.describe('Favorite article - UI Tests', () => { 
    test('User should be able to add article to favorites', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const email = 'ajra.email.testing@gmail.com'
        const password = 'MmnF695217+';

        await loginPage.goto();

        await loginPage.login(email, password);
        await page.waitForTimeout(3000);

        const username = 'aahs1284';

        const myFirstArticle = page.locator('div.article-preview').filter({
            has: page.locator('.author', { hasText: username })
        }).first();

        const favoriteButton = myFirstArticle.locator('button').first();

        await favoriteButton.click();

        await expect(favoriteButton).toHaveClass('btn-primary');

        await page.waitForTimeout(3000);
    });
    
})