import test, { expect } from "@playwright/test"

test.describe('Delete comment - API Tests', () => {

    test('User can delete comment from article', async ({ request }) => {

        // Definišemo email korisnika za login
        const email = 'ajra.email.testing@gmail.com'

        // Definišemo password korisnika za login
        const password = 'MmnF695217+';

        // Šaljemo login request da dobijemo token
        const responseLogin = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: {
                user: {
                    email: email,
                    password: password
                }
            }
        })

        // Provjeravamo da je login uspješan
        expect(responseLogin.status()).toBe(200);

        // Pretvaramo login response u JSON
        const responseLoginJson = await responseLogin.json();

        // Iz login response-a uzimamo token
        const token = responseLoginJson.user.token;

        // Šaljemo GET request da dohvatimo listu svih articles
        const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles');

        // Provjeravamo da je GET articles request uspješan
        expect(articlesResponse.status()).toBe(200);

        const articlesResponseJson = await articlesResponse.json();
        const myFirstArticle = articlesResponseJson.articles[0];
        const myFirstArticlePath = myFirstArticle.slug;
        const commentBody = 'This is my API test comment ' + Date.now();

        const createCommentResponse = await request.post(
            `https://conduit-api.bondaracademy.com/api/articles/${myFirstArticlePath}/comments`,
            {
                headers: {
                    'Authorization': `Token ${token}`
                },
                data: {
                    comment: {
                        body: commentBody
                    }
                }
            }
        )
        
        expect(createCommentResponse.status()).toBe(200);

        const createCommentResponseJson = await createCommentResponse.json();

        expect(createCommentResponseJson.comment.body).toBe(commentBody);
        
        const commentId = createCommentResponseJson.comment.id;

        const deleteCommentResponse = await request.delete(
            `https://conduit-api.bondaracademy.com/api/articles/${myFirstArticlePath}/comments/${commentId}`,
            {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        )

        // Provjeravamo da je komentar uspješno obrisan
        expect(deleteCommentResponse.status()).toBe(200);




        })
})