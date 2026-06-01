import { test, expect } from '../../fixtures/api.fixtures';
import articleData from '../../test-data/article.json';

test.describe('Delete article - API Tests', () => {
  test('User can delete an article', async ({ request, token }) => {

    const articlesResponse = await request.get(
      `articles?author=${articleData.authorUsername}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    expect(articlesResponse.status()).toBe(200);

    const articlesResponseJson = await articlesResponse.json();

    const articleSlug = articlesResponseJson.articles[0].slug;

    const deleteArticleResponse = await request.delete(
      `articles/${articleSlug}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    expect(deleteArticleResponse.status()).toBe(204);
  });
});