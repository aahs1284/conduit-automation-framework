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
        
        //note: hardcoded value, edit before running tests
        const articleTitle = 'NOVI-article-title-1779265681749-53475';

        const response = await request.delete('https://conduit-api.bondaracademy.com/api/articles/' + articleTitle, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })

        expect(response.status()).toBe(204);
    })
})