import test from "@playwright/test"
import { LoginPage } from "../../src/pages/login.page"
import { ArticlePage } from "../../src/pages/article.page"

test.describe('Comment article - UI Tests', () => { 
    test('User should be able to add comment on article', async ({ page }) => {

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

        await myFirstArticle.locator('h1').click();

        const articlePage = new ArticlePage(page);

        const comment = 'This is my test comment ' + Date.now();

        await articlePage.addComment(comment);

        await articlePage.verifyComment(comment);

        await page.waitForTimeout(3000);
    });
    
})