import { test } from '../../fixtures/pages.fixture';

test.describe('Unfavorite article - UI Tests', () => { 
    test('User should be able to remove article from favorites', async ({ loginPage, articlePage, page }) => {

        const email = process.env.TEST_EMAIL!;
        const password = process.env.TEST_PASSWORD!;

        await loginPage.goto();

        await loginPage.login(email, password);
        
        await articlePage.favoriteArticle();
        await articlePage.verifyArticleFavorited();
        await articlePage.unfavoriteArticle();
        await page.locator('body').click();
        await articlePage.verifyArticleUnfavorited();    
    });
    
})