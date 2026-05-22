import { test } from '../../fixtures/pages.fixture';

test.describe('Create an article UI Tests', () => { 
    test('User should be able to create an article', async ({ loginPage,articlePage }) => {

        const email = process.env.TEST_EMAIL!;
        const password = process.env.TEST_PASSWORD!;

        const articleTitle = 'article title ' + Date.now();
        const articleDescription = 'article description';
        const articleBody = 'article body';
        const articleTag = 'articleTag1';

        await loginPage.goto();

        await loginPage.login(email, password);
        await loginPage.verifySuccessfulLogin();

        await articlePage.gotoNewArticle();
        await articlePage.createNewArticle(articleTitle, articleDescription, articleBody, articleTag);
        await articlePage.verifySuccess(articleTitle);
    });
    
})