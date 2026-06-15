import { test, expect } from '../../fixtures/api.fixtures';
import articleData from '../../test-data/article.json';

test.describe('Create an article - API Tests', () => {
  test('@smoke @regression @api @sanity User can create an article', async ({ request, token }) => {
    const articleTitle = 'article title ' + Date.now();

    const response = await test.step('Create a new article', async () => {
      return await request.post('articles', {
        headers: {
          Authorization: `Token ${token}`,
        },
        data: {
          article: {
            title: articleTitle,
            description: articleData.apiDescription,
            body: articleData.apiBody,
            tags: [articleData.tag],
          },
        },
      });
    });

    await test.step('Verify article is successfully created', async () => {
      expect(response.status()).toBe(201);
    });
  });
});