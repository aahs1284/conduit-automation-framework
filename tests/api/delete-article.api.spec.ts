import { test, expect } from '../../fixtures/api.fixtures';
import articleData from '../../test-data/article.json';

test.describe('Delete article - API Tests', () => {
  test('@ui @regression @smoke User can delete an article', async ({ request, token }) => {

    const articlesResponse = await test.step('Get user articles', async () => {
      return await request.get(
        `articles?author=${articleData.authorUsername}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
    });

    expect(articlesResponse.status()).toBe(200);

    const articlesResponseJson = await articlesResponse.json();

    const articleSlug = articlesResponseJson.articles[0].slug;

    const deleteArticleResponse = await test.step('Delete selected article', async () => {
      return await request.delete(
        `articles/${articleSlug}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
    });

    await test.step('Verify article is successfully deleted', async () => {
      expect(deleteArticleResponse.status()).toBe(204);
    });
  });
});