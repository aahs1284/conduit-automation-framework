import { test, expect } from '../../fixtures/pages.fixture';

test.describe('Comment article - UI Tests', () => { 
    test('User should be able to add comment on article', async ({ loginPage, page, commentPage }) => {

        const email = process.env.TEST_EMAIL!;
        const password = process.env.TEST_PASSWORD!;

        await loginPage.goto();

        await loginPage.login(email, password);
        await page.waitForTimeout(3000);

        const username = 'aahs1284';

        const myFirstArticle = page.locator('div.article-preview').filter({
            has: page.locator('.author', { hasText: username })
        }).first();

        await myFirstArticle.locator('h1').click();

        const comment = 'This is my test comment ' + Date.now();

        await commentPage.addComment(comment);
        await commentPage.verifyComment(comment);
        await commentPage.deleteComment();
        await commentPage.verifyCommentDeleted(comment);

    });
    
})