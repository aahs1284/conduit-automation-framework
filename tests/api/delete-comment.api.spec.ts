import test, { expect } from "@playwright/test"

test.describe('Delete comment - API Tests', () => {

    test('User can delete comment from article', async ({ request }) => {

        const email = 'ajra.email.testing@gmail.com'
        const password = 'MmnF695217+';

        const responseLogin = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: {
                user: {
                    email: email,
                    password: password
                }
            }
        })

        expect(responseLogin.status()).toBe(200);

        const responseLoginJson = await responseLogin.json();

        const token = responseLoginJson.user.token;

        const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles');

        expect(articlesResponse.status()).toBe(200);

        const articlesResponseJson = await articlesResponse.json();
        const myFirstArticle = articlesResponseJson.articles[0];
        const myFirstArticlePath = myFirstArticle.slug;
        const commentBody = 'This is my API test comment ' + Date.now();

        const createCommentResponse = await request.post(
            `https://conduit-api.bondaracademy.com/api/articles/${myFirstArticlePath}/comments`,
            {
                headers: {
                    'Authorization': `Token ${token}`
                },
                data: {
                    comment: {
                        body: commentBody
                    }
                }
            }
        )
        
        expect(createCommentResponse.status()).toBe(200);

        const createCommentResponseJson = await createCommentResponse.json();

        expect(createCommentResponseJson.comment.body).toBe(commentBody);
        
        const commentId = createCommentResponseJson.comment.id;

        const deleteCommentResponse = await request.delete(
            `https://conduit-api.bondaracademy.com/api/articles/${myFirstArticlePath}/comments/${commentId}`,
            {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        )
        expect(deleteCommentResponse.status()).toBe(200);
    })
})