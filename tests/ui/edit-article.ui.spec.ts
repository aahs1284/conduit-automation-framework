import { test } from '../../fixtures/pages.fixture';

test.describe('Edit article - UI Tests', () => { 
    test('User should be able to edit the existing article', async ({ loginPage, articlePage, page }) => {

        const email = process.env.TEST_EMAIL!;
        const password = process.env.TEST_PASSWORD!;

        await loginPage.goto();

        await loginPage.login(email, password);

        const username = 'aahs1284';
        const myFirstArticle = page.locator('div.article-preview').filter({
            has: page.locator('.author', {hasText: username})
        }).first();

        await myFirstArticle.locator('h1').click();
        
        const updatedArticleTitle = 'Edited article title ' + Date.now();
        const updatedArticleDescription = 'Edited article description';
        const updatedArticleBody = 'Edited article body 01';
        const updatedArticleTag = 'EditedTag';

        await articlePage.editArticle( updatedArticleTitle,updatedArticleDescription, updatedArticleBody, updatedArticleTag);
        await articlePage.verifySuccessUpdatedArticle(updatedArticleTitle);
        await page.waitForTimeout(3000)
    });
    
})