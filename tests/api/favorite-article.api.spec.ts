import { test, expect } from '../../fixtures/api.fixtures';

test.describe('Favorite article - API Tests', () => {
    test('@regression @apiUser can add article to favorites', async ({ request, token }) => {

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

        await test.step('Verify article is added to favorites', async () => {
            expect(favoriteArticleResponse.status()).toBe(200);

            const favoriteArticleResponseJson = await favoriteArticleResponse.json();

            expect(favoriteArticleResponseJson.article.favorited).toBe(true);
        });

    });

});