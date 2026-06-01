import { test, expect } from '../../fixtures/api.fixtures';
import articleData from '../../test-data/article.json';

test.describe('Edit article - API Tests', () => {
  test('User can edit an article', async ({ request, token }) => {

    const articleTitle = 'article title ' + Date.now();

    const createArticleResponse = await request.post('articles', {
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

    expect(createArticleResponse.status()).toBe(201);

    const createArticleResponseJson = await createArticleResponse.json();
    const createdArticleSlug = createArticleResponseJson.article.slug;

    const updatedArticleTitle = 'NOVI article title ' + Date.now();

    const editArticleResponse = await request.put(`articles/${createdArticleSlug}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
        data: {
          article: {
            title: updatedArticleTitle,
            description: articleData.updatedDescription,
            body: articleData.updatedBody,
          },
        },
      }
    );

    expect(editArticleResponse.status()).toBe(200);

    const editArticleResponseJson = await editArticleResponse.json();

    expect(editArticleResponseJson.article.title)
      .toBe(updatedArticleTitle);

    expect(editArticleResponseJson.article.description)
      .toBe(articleData.updatedDescription);

    expect(editArticleResponseJson.article.body)
      .toBe(articleData.updatedBody);
  });
});