import { test } from '../../fixtures/pages.fixture';
import articleData from '../../test-data/article.json';

test.describe('Create an article UI Tests', () => {

    test('@smoke @sanity @regression @ui User should be able to create an article', async ({ page, articlePage }) => {

        const articleTitle = 'article title ' + Date.now(); //ne bi trebao u json jer se svaki put generise novi/dinamicno

        await test.step('Open home page', async () => {
            await page.goto('/');
        });

        await test.step('Navigate to New Article page', async () => {
            await articlePage.gotoNewArticle();
        });

        await test.step('Create new article', async () => {
            await articlePage.createNewArticle(
                articleTitle,
                articleData.description,
                articleData.body,
                articleData.tag
            );
        });

        await test.step('Verify article is successfully created', async () => {
            await articlePage.verifySuccess(articleTitle);
        });
    });

});