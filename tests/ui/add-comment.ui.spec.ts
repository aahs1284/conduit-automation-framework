import { test } from '../../fixtures/pages.fixture';
import articleData from '../../test-data/article.json';
import commentData from '../../test-data/comment.json';

test.describe('Comment article - UI Tests', () => {

    test('@smoke @regression @ui User should be able to add comment on article', async ({ commentPage, page }) => {

        await test.step('Open home page', async () => {
            await page.goto('/');
        });

        const myFirstArticle = page.locator('div.article-preview').filter({
            has: page.locator('.author', {
                hasText: articleData.authorUsername
            })
        }).first();

        await test.step('Open article for commenting', async () => {
            await myFirstArticle.locator('h1').click();
        });

        const comment = `${commentData.commentPrefix} ${Date.now()}`;

        await test.step('Add comment to article', async () => {
            await commentPage.addComment(comment);
        });

        await test.step('Verify comment is successfully added', async () => {
            await commentPage.verifyComment(comment);
        });
    });

});