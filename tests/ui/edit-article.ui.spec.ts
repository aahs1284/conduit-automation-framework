import { test } from '../../fixtures/pages.fixture';
import articleData from '../../test-data/article.json';

test.describe('Edit article - UI Tests', () => {

    test('User should be able to edit the existing article', async ({ articlePage, page }) => {

        await page.goto('/');

        const myFirstArticle = page.locator('div.article-preview').filter({
            has: page.locator('.author', { hasText: articleData.authorUsername })
        }).first();

        await myFirstArticle.locator('h1').click();

        const updatedArticleTitle = 'Edited article title ' + Date.now();

        await articlePage.editArticle(
            updatedArticleTitle,
            articleData.updatedDescription,
            articleData.updatedBody,
            articleData.updatedTag
        );

        await articlePage.verifySuccessUpdatedArticle(articleData.updatedBody);
    });

});