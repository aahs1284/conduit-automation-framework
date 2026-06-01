import { test } from '../../fixtures/pages.fixture';

test.describe('Unfavorite article - UI Tests', () => {

    test('User should be able to remove article from favorites', async ({ page, articlePage }) => {
        await page.goto('/');
        
        await articlePage.favoriteArticle();
        await articlePage.verifyArticleFavorited();

        await articlePage.unfavoriteArticle();

        await page.locator('body').click();

        await articlePage.verifyArticleUnfavorited();

    });

});