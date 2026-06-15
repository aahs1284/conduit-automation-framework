import { test } from '../../fixtures/pages.fixture';
import articleData from '../../test-data/article.json';

test.describe('Edit article - UI Tests', () => {

    test('@ui @regression @smoke User should be able to edit the existing article', async ({ articlePage, page }) => {

        await test.step('Open home page', async () => {
            await page.goto('/');
        });

        const myFirstArticle = page.locator('div.article-preview').filter({
            has: page.locator('.author', { hasText: articleData.authorUsername })
        }).first();

        await test.step('Open article for editing', async () => {
            await myFirstArticle.locator('h1').click();
        });

        const updatedArticleTitle = 'Edited article title ' + Date.now();

        await test.step('Edit article details', async () => {
            await articlePage.editArticle(
                updatedArticleTitle,
                articleData.updatedDescription,
                articleData.updatedBody,
                articleData.updatedTag
            );
        });

        await test.step('Verify article is successfully updated', async () => {
            await articlePage.verifySuccessUpdatedArticle(articleData.updatedBody);
        });
    });

});