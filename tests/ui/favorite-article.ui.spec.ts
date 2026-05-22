import { test } from '../../fixtures/pages.fixture';

test.describe('Favorite article - UI Tests', () => { 
    test('User should be able to add article to favorites', async ({ loginPage, articlePage }) => {

        const email = process.env.TEST_EMAIL!;
        const password = process.env.TEST_PASSWORD!;

        await loginPage.goto();

        await loginPage.login(email, password);
        await loginPage.verifySuccessfulLogin();
        await articlePage.favoriteArticle();
        await articlePage.verifyArticleFavorited();        

    });
})