import test, { expect } from "@playwright/test"

test.describe('Edit article - API Tests', () => {

    test('User can edit an article', async ({ request }) => {

        const email = 'ajra.email.testing@gmail.com'
        const password = 'MmnF695217+';

        const responseLogin = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: {
                user: {
                    email: email,
                    password: password
                }
            }
        })

        expect(responseLogin.status()).toBe(200);

        const responseLoginJson = await responseLogin.json();

        const token = responseLoginJson.user.token;

        const articleTitle = 'article title ' + Date.now();
        const articleDescription = 'article description 17050625';
        const articleBody = 'article body body body';
        const articleTag = 'articleTag1';

        const createArticleResponse = await request.post(
            'https://conduit-api.bondaracademy.com/api/articles',
            {

                headers: {
                    'Authorization': `Token ${token}`
                },

                data: {
                    article: {
                        title: articleTitle,
                        description: articleDescription,
                        body: articleBody,
                        tags: [articleTag]
                    }
                }
            }
        )

        expect(createArticleResponse.status()).toBe(201);

        const createArticleResponseJson = await createArticleResponse.json();

        const createdArticle = createArticleResponseJson.article;

        const createdArticlePath = createdArticle.slug;

        const updatedArticleTitle = 'NOVI article title ' + Date.now();
        const updatedArticleDescription = 'novi updated article description';
        const updatedArticleBody = 'updated article body body body';

        const editArticleResponse = await request.put(
            `https://conduit-api.bondaracademy.com/api/articles/${createdArticlePath}`,
            {

                headers: {
                    'Authorization': `Token ${token}`
                },

                data: {
                    article: {
                        title: updatedArticleTitle,
                        description: updatedArticleDescription,
                        body: updatedArticleBody
                    }
                }
            }
        )

        expect(editArticleResponse.status()).toBe(200);

        const editArticleResponseJson = await editArticleResponse.json();

        expect(editArticleResponseJson.article.title).toBe(updatedArticleTitle);

        expect(editArticleResponseJson.article.description).toBe(updatedArticleDescription);

        expect(editArticleResponseJson.article.body).toBe(updatedArticleBody);

    })

})