import { test, expect } from '../../fixtures/api.fixtures';
import commentData from '../../test-data/comment.json';

test.describe('Comment article - API Tests', () => {

    test('@ui @regression @smoke User should be able to comment article via API', async ({ request, token }) => {

        const articlesResponse = await test.step('Get available articles', async () => {
            return await request.get('/articles');
        });

        expect(articlesResponse.status()).toBe(200);

        const articlesResponseJson = await articlesResponse.json();

        const myFirstApiArticle = articlesResponseJson.articles[0];
        const myFirstApiArticleIdentifier = myFirstApiArticle.slug;

        const commentBody =
            `${commentData.apiCommentPrefix} ${Date.now()}`;

        const commentResponse = await test.step('Add comment to article', async () => {
            return await request.post(
                `/articles/${myFirstApiArticleIdentifier}/comments`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    },

                    data: {
                        comment: {
                            body: commentBody
                        }
                    }
                }
            );
        });

        await test.step('Verify comment is successfully added', async () => {
            expect(commentResponse.status()).toBe(200);

            const commentResponseJson = await commentResponse.json();

            expect(commentResponseJson.comment.body)
                .toBe(commentBody);
        });

    });

});