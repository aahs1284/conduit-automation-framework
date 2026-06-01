import { test, expect } from '../../fixtures/pages.fixture';
import articleData from '../../test-data/article.json';

test.describe('Delete article - UI Tests', () => {

    test('User should be able to delete the article', async ({ articlePage, page }) => {

        await page.goto('/');

        const myFirstArticle = page.locator('div.article-preview').filter({
            has: page.locator('.author', { hasText: articleData.authorUsername })
        }).first();

        await myFirstArticle.locator('h1').click();

        await articlePage.deleteArticle();

        await expect(page).toHaveURL('/');
    });

});