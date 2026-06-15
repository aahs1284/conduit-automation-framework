import { test, expect } from '../../fixtures/pages.fixture';
import articleData from '../../test-data/article.json';

test.describe('Delete article - UI Tests', () => {

    test('@sanity @ui @regression @smoke User should be able to delete the article', async ({ articlePage, page }) => {

        await test.step('Open home page', async () => {
            await page.goto('/');
        });

        const myFirstArticle = page.locator('div.article-preview').filter({
            has: page.locator('.author', { hasText: articleData.authorUsername })
        }).first();

        await test.step('Open article for deletion', async () => {
            await myFirstArticle.locator('h1').click();
        });

        await test.step('Delete article', async () => {
            await articlePage.deleteArticle();
        });

        await test.step('Verify article is successfully deleted', async () => {
            await expect(page).toHaveURL('/');
        });
    });

});