import { test, expect } from "@playwright/test"
import { LoginPage } from "../../src/pages/login.page"

test.describe('Unfavorite article - UI Tests', () => { 
    test('User should be able to remove article from favorites', async ({ page }) => {

        const loginPage = new LoginPage(page);

        const email = 'ajra.email.testing@gmail.com'
        const password = 'MmnF695217+';

        await loginPage.goto();

        await loginPage.login(email, password);
        await page.waitForTimeout(3000);

        const favoritedArticle = page.locator('div.article-preview').filter({
            has: page.locator('button.btn.btn-sm.btn-primary')
        }).first();

        const unfavoriteButton = favoritedArticle.locator('button').first();

        await unfavoriteButton.click();

        await expect(unfavoriteButton).not.toHaveClass('btn-primary');

        await page.waitForTimeout(3000);
    });
    
})