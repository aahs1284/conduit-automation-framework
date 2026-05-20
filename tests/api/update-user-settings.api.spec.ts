import test, { expect } from "@playwright/test"

test.describe('Manage user profile - API Tests', () => {

    test('User should be able to update user settings via API', async ({ request }) => {

        const email = 'ajra.email.testing@gmail.com'

        const password = 'MmnF695217+';

        const responseLogin = await request.post(
            'https://conduit-api.bondaracademy.com/api/users/login',
            {
                data: {
                    user: {
                        email: email,
                        password: password
                    }
                }
            }
        )

        expect(responseLogin.status()).toBe(200);

        const responseLoginJson = await responseLogin.json();

        const token = responseLoginJson.user.token;

        const updatedUsername = 'ajra' + Date.now();

        const updatedBio = 'This is my updated bio';

        const updatedImageUrl = 'https://someURL.com';

        const updateUserResponse = await request.put(
            'https://conduit-api.bondaracademy.com/api/user',
            {
                headers: {
                    'Authorization': `Token ${token}`
                },

                data: {
                    user: {
                        username: updatedUsername,
                        bio: updatedBio,
                        image: updatedImageUrl,
                        email: email,
                        password: password
                    }
                }
            }
        )

        expect(updateUserResponse.status()).toBe(200);

        const updateUserResponseJson = await updateUserResponse.json();

        expect(updateUserResponseJson.user.username).toBe(updatedUsername);
        expect(updateUserResponseJson.user.bio).toBe(updatedBio);
        expect(updateUserResponseJson.user.image).toBe(updatedImageUrl);
        expect(updateUserResponseJson.user.email).toBe(email);
    })
})