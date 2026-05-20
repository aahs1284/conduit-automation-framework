import test from "@playwright/test"
import { LoginPage } from "../../src/pages/login.page"
import { ArticlePage } from "../../src/pages/article.page"

test.describe('Create an article UI Tests', () => { 
    test('User should be able to create an article', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const email = 'ajra.email.testing@gmail.com'
        const password = 'MmnF695217+';

        await loginPage.goto();

        await loginPage.login(email, password);
        await page.waitForTimeout(3000)

        const articlePage = new ArticlePage(page);
        const articleTitle = 'article title ' + Date.now();
        const articleDescription = 'article description 17050625';
        const articleBody = 'article body body body';
        const articleTag = 'articleTag1';

        await articlePage.gotoNewArticle();
        await articlePage.createNewArticle(articleTitle, articleDescription, articleBody, articleTag);
        await articlePage.verifySuccess(articleTitle);
        await page.waitForTimeout(3000)
    });
    
})