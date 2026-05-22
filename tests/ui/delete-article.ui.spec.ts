import { test, expect } from '../../fixtures/pages.fixture';

test.describe('Delete article - UI Tests', () => { 
    test('User should be able to delete the article', async ({ loginPage, articlePage, page }) => {

        const email = process.env.TEST_EMAIL!;
        const password = process.env.TEST_PASSWORD!;

        await loginPage.goto();

        await loginPage.login(email, password);
        await loginPage.verifySuccessfulLogin();

        const username = 'aahs1284';
        const myFirstArticle = page.locator('div.article-preview').filter({
            has: page.locator('.author', {hasText: username})
        }).first();

        await myFirstArticle.locator('h1').click();
        await articlePage.deleteArticle();
        
        await expect(page).toHaveURL('/');
    });
    
})