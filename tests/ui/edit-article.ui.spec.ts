import test from "@playwright/test"
import { LoginPage } from "../../src/pages/login.page"
import { ArticlePage } from "../../src/pages/article.page"

test.describe('Edit article - UI Tests', () => { 
    test('User should be able to edit the existing article', async ({ page }) => {
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
        
        const articlePage = new ArticlePage(page);
        const updatedArticleTitle = 'Edited article title ' + Date.now();
        const updatedArticleDescription = 'Edited article description';
        const updatedArticleBody = 'Edited article body 01';
        const updatedArticleTag = 'EditedTag';

        await articlePage.editArticle( updatedArticleTitle,updatedArticleDescription, updatedArticleBody, updatedArticleTag);
        await articlePage.verifySuccessUpdatedArticle(updatedArticleTitle);
        await page.waitForTimeout(3000)
    });
    
})