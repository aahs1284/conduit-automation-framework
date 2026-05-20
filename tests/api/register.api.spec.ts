import test, { expect } from "@playwright/test"

test.describe('Register API Tests', () => { 
    test('User should sign up successfully via API', async ({ request }) => {
        const username = 'aahs1284a';
        const email = 'ajra.email.testing@gmail.com';
        const password = 'MmnF695217+';

        const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: {
                user: {
                    email: email,
                    password: password,
                    username: username,
                }
            }
        })

        expect(response.status()).toBe(200);
    })
})