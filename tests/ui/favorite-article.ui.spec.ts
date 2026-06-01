import { test } from '../../fixtures/pages.fixture';

test.describe('Favorite article - UI Tests', () => {

    test('User should be able to add article to favorites', async ({ page, articlePage }) => {
        await page.goto('/');

        await articlePage.favoriteArticle();
        await articlePage.verifyArticleFavorited();

    });

});