import { test } from '../../fixtures/pages.fixture';
import articleData from '../../test-data/article.json';

test.describe('Create an article UI Tests', () => {

    test('User should be able to create an article', async ({ page, articlePage }) => {

        const articleTitle = 'article title ' + Date.now(); //ne bi trebao u json jer se svaki put generise novi/dinamicno

        await page.goto('/');

        await articlePage.gotoNewArticle();

        await articlePage.createNewArticle(
            articleTitle,
            articleData.description,
            articleData.body,
            articleData.tag
        );

        await articlePage.verifySuccess(articleTitle);
    });

});