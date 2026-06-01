import { test, expect } from '../../fixtures/api.fixtures';

test.describe('Favorite article - API Tests', () => {
    test('User can add article to favorites', async ({ request, token }) => {

        const articlesResponse = await request.get('articles');

        expect(articlesResponse.status()).toBe(200);

        const articlesResponseJson = await articlesResponse.json();
        const myFirstArticle = articlesResponseJson.articles[0];
        const myFirstArticlePath = myFirstArticle.slug;

        const favoriteArticleResponse = await request.post(
            `articles/${myFirstArticlePath}/favorite`,
            {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        );

        expect(favoriteArticleResponse.status()).toBe(200);

        const favoriteArticleResponseJson = await favoriteArticleResponse.json();

        expect(favoriteArticleResponseJson.article.favorited).toBe(true);

    });

});