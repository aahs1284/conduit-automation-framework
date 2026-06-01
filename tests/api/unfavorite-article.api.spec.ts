import { test, expect } from '../../fixtures/api.fixtures';

test.describe('Unfavorite article - API Tests', () => {

    test('User can remove article from favorites', async ({ request, token }) => {

        const articlesResponse = await request.get(
            'articles'
        );

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

        const unfavoriteArticleResponse = await request.delete(
            `articles/${myFirstArticlePath}/favorite`,
            {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        );

        expect(unfavoriteArticleResponse.status()).toBe(200);

        const unfavoriteArticleResponseJson = await unfavoriteArticleResponse.json();

        expect(unfavoriteArticleResponseJson.article.favorited).toBe(false);

    });

});