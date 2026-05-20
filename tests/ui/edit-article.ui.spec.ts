import test from "@playwright/test"
import { LoginPage } from "../../src/pages/login.page"
import { ArticlePage } from "../../src/pages/article.page"

test.describe('Edit article - UI Tests', () => { 
    test('User should be able to edit the existing article', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const email = 'ajra17050505@gmail.com'
        const password = 'MmnF695217+';

        //pozivamo akcije iz klase login page
        await loginPage.goto();

        await loginPage.login(email, password);
        await page.waitForTimeout(3000)

        const username = 'ajra17050505';
        const myFirstArticle = page.locator('div.article-preview').filter({
            has: page.locator('.author', {hasText: username})
        }).first();

        myFirstArticle.locator('h1').click();
        
        const articlePage = new ArticlePage(page);
        const updatedArticleTitle = 'edited article title ' + Date.now();
        const updatedArticleDescription = 'edited article description';
        const updatedArticleBody = 'edited article body body body';
        const updatedArticleTag = 'editedTag';

        await articlePage.editArticle( updatedArticleTitle,updatedArticleDescription, updatedArticleBody, updatedArticleTag);
        await articlePage.verifySuccessUpdatedArticle(updatedArticleTitle);
        await page.waitForTimeout(3000)
    });
    
})