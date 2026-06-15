import { test, expect } from '../../fixtures/api.fixtures';
import commentData from '../../test-data/comment.json';

test.describe('Delete comment - API Tests', () => {

    test('@ui @regression @smoke User can delete comment from article', async ({ request, token }) => {

        const articlesResponse = await test.step('Get available articles', async () => {
            return await request.get('/articles');
        });

        expect(articlesResponse.status()).toBe(200);

        const articlesResponseJson = await articlesResponse.json();

        expect(articlesResponseJson.articles.length)
            .toBeGreaterThan(0);

        const myFirstArticle = articlesResponseJson.articles[0];
        const myFirstArticlePath = myFirstArticle.slug;

        const commentBody =
            `${commentData.apiCommentPrefix} ${Date.now()}`;

        const createCommentResponse = await test.step('Create comment on article', async () => {
            return await request.post(
                `/articles/${myFirstArticlePath}/comments`,
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

        expect(createCommentResponse.status()).toBe(200);

        const createCommentResponseJson =
            await createCommentResponse.json();

        expect(createCommentResponseJson.comment.body)
            .toBe(commentBody);

        const commentId =
            createCommentResponseJson.comment.id;

        const deleteCommentResponse = await test.step('Delete created comment', async () => {
            return await request.delete(
                `/articles/${myFirstArticlePath}/comments/${commentId}`,
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );
        });

        await test.step('Verify comment is successfully deleted', async () => {
            expect(deleteCommentResponse.status()).toBe(200);
        });
    });
});