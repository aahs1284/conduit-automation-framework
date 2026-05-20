import test, { expect } from "@playwright/test"

test.describe('Login API Tests', () => { 
    test('User should sign in successfully via API', async ({ request }) => {
        const email = 'ajra.email.testing@gmail.com'
        const password = 'MmnF695217+';

        const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
            data: {
                user: {
                    email: email,
                    password: password
                }
            }
        })

        expect(response.status()).toBe(200);
    })
})