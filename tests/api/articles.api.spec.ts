import test, { expect } from "@playwright/test"

test.describe('Create an article - API Tests', () => { 
       
    test('User can create an article', async ({ request }) => {

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

        const response = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
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
        })

        expect(response.status()).toBe(201);

        
    })
})