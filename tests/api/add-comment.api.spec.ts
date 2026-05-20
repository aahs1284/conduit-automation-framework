import test, { expect } from "@playwright/test"

test.describe('Comment article - API Tests', () => { 
    test('User should be able to comment article via API', async ({ request }) => {

        const email = 'ajra.email.testing@gmail.com'
        const password = 'MmnF695217+';

        const responseLogin = await request.post(
            'https://conduit-api.bondaracademy.com/api/users/login',
            {
                data: {
                    user: {
                        email: email,
                        password: password
                    }
                }
            }
        )

        expect(responseLogin.status()).toBe(200);

        const responseLoginJson = await responseLogin.json();

        const token = responseLoginJson.user.token;

        const articlesResponse = await request.get(
            'https://conduit-api.bondaracademy.com/api/articles'
        );

        expect(articlesResponse.status()).toBe(200);

        const articlesResponseJson = await articlesResponse.json();
        const myFirstApiArticle = articlesResponseJson.articles[0];
        const myFirstApiArticleIdentifier = myFirstApiArticle.slug;
        const commentBody = 'This is my API test comment ' + Date.now();

        const commentResponse = await request.post(
            `https://conduit-api.bondaracademy.com/api/articles/${myFirstApiArticleIdentifier}/comments`,
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

        expect(commentResponse.status()).toBe(200);

        const commentResponseJson = await commentResponse.json();

        expect(commentResponseJson.comment.body).toBe(commentBody);

    })

})