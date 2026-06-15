import { test, expect } from '../../fixtures/api.fixtures';

test.describe('Unfavorite article - API Tests', () => {

    test('@regression @api User can remove article from favorites', async ({ request, token }) => {

        const articlesResponse = await test.step('Get available articles', async () => {
            return await request.get('articles');
        });

        expect(articlesResponse.status()).toBe(200);

        const articlesResponseJson = await articlesResponse.json();

        const myFirstArticle = articlesResponseJson.articles[0];

        const myFirstArticlePath = myFirstArticle.slug;

        const favoriteArticleResponse = await test.step('Add article to favorites', async () => {
            return await request.post(
                `articles/${myFirstArticlePath}/favorite`,
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            );
        });

        expect(favoriteArticleResponse.status()).toBe(200);

        const unfavoriteArticleResponse = await test.step('Remove article from favorites', async () => {
            return await request.delete(
                `articles/${myFirstArticlePath}/favorite`,
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            );
        });

        await test.step('Verify article is removed from favorites', async () => {
            expect(unfavoriteArticleResponse.status()).toBe(200);

            const unfavoriteArticleResponseJson = await unfavoriteArticleResponse.json();

            expect(unfavoriteArticleResponseJson.article.favorited).toBe(false);
        });

    });

});