import { test } from '../../fixtures/pages.fixture';
import articleData from '../../test-data/article.json';
import commentData from '../../test-data/comment.json';

test.describe('Comment article - UI Tests', () => {

    test('User should be able to add and delete comment on article', async ({ page, commentPage }) => {
        await page.goto('/');

        const myFirstArticle = page.locator('div.article-preview').filter({
            has: page.locator('.author', {
                hasText: articleData.authorUsername
            })
        }).first();

        await myFirstArticle.locator('h1').click();

        const comment = `${commentData.commentPrefix} ${Date.now()}`;

        await commentPage.addComment(comment);
        await commentPage.verifyComment(comment);

        await commentPage.deleteComment();
        await commentPage.verifyCommentDeleted(comment);
    });

});