import test from "@playwright/test"
import { LoginPage } from "../../src/pages/login.page"

test.describe('Delete article - UI Tests', () => { 
    test('User should be able to delete the article', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const email = 'ajra.email.testing@gmail.com'
        const password = 'MmnF695217+';

        await loginPage.goto();

        await loginPage.login(email, password);
        await page.waitForTimeout(3000)

        const username = 'aahs1284';
        const myFirstArticle = page.locator('div.article-preview').filter({
            has: page.locator('.author', {hasText: username})
        }).first();

        await myFirstArticle.locator('h1').click();

        const deleteBtn = page.locator('.btn:has-text("Delete Article")').first();
        deleteBtn.click();

        await page.waitForTimeout(3000)
    });
    
})