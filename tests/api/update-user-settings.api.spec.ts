import test, { expect } from "@playwright/test"

test.describe('Manage user profile - API Tests', () => {

    test('User should be able to update user settings via API', async ({ request }) => {

        const email = 'ajra17050505@gmail.com'

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

        const updatedBio = 'This is updated bio';

        const updatedImageUrl = 'https://someURL.com';

        // Šaljemo PUT request za update user settings
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

        // Provjeravamo da je update uspješan
        expect(updateUserResponse.status()).toBe(200);

        // Pretvaramo update response u JSON
        const updateUserResponseJson = await updateUserResponse.json();

        // Provjeravamo da je username updateovan
        expect(updateUserResponseJson.user.username).toBe(updatedUsername);

        // Provjeravamo da je bio updateovan
        expect(updateUserResponseJson.user.bio).toBe(updatedBio);

        // Provjeravamo da je image updateovan
        expect(updateUserResponseJson.user.image).toBe(updatedImageUrl);

        // Provjeravamo da email ostaje isti
        expect(updateUserResponseJson.user.email).toBe(email);
    })
})