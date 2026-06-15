import { test } from '../../fixtures/pages.fixture';

test.describe('Favorite article - UI Tests', () => {

    test('@sanity @ui @regression User should be able to add article to favorites', async ({ page, articlePage }) => {

        await test.step('Open home page', async () => {
            await page.goto('/');
        });

        await test.step('Add article to favorites', async () => {
            await articlePage.favoriteArticle();
        });

        await test.step('Verify article is added to favorites', async () => {
            await articlePage.verifyArticleFavorited();
        });

    });

});