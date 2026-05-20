import test, { expect } from "@playwright/test"

test.describe('Favorite article - API Tests', () => {
    test('User can add article to favorites', async ({ request }) => {

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
        const myFirstArticle = articlesResponseJson.articles[0];
        const myFirstArticlePath = myFirstArticle.slug;

        const favoriteArticleResponse = await request.post(
            `https://conduit-api.bondaracademy.com/api/articles/${myFirstArticlePath}/favorite`,
            {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        )

        expect(favoriteArticleResponse.status()).toBe(200);

        const favoriteArticleResponseJson = await favoriteArticleResponse.json();

        expect(favoriteArticleResponseJson.article.favorited).toBe(true);

    })

})