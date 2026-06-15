import { test } from '../../fixtures/pages.fixture';

test.describe('Unfavorite article - UI Tests', () => {

    test('@ui @regression User should be able to remove article from favorites', async ({ page, articlePage }) => {

        await test.step('Open home page', async () => {
            await page.goto('/');
        });

        await test.step('Add article to favorites', async () => {
            await articlePage.favoriteArticle();
        });

        await test.step('Verify article is added to favorites', async () => {
            await articlePage.verifyArticleFavorited();
        });

        await test.step('Remove article from favorites', async () => {
            await articlePage.unfavoriteArticle();
        });

        await test.step('Refresh article state', async () => {
            await page.locator('body').click();
        });

        await test.step('Verify article is removed from favorites', async () => {
            await articlePage.verifyArticleUnfavorited();
        });

    });

});