import { expect, Locator, Page } from "@playwright/test";

export class ArticlePage {
    readonly page: Page;
    readonly newArticleButton: Locator;
    readonly articleTitleInput: Locator;
    readonly articleDescriptionInput: Locator;
    readonly articleBodyInput: Locator;
    readonly articleTagInput: Locator;
    readonly publishArticleButton: Locator;
    readonly editArticleButton: Locator;
    readonly deleteArticleButton: Locator;
    readonly favoriteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newArticleButton = page.getByRole('link', { name: 'New Article' });
        this.articleTitleInput = page.getByPlaceholder('Article Title');
        this.articleDescriptionInput = page.getByPlaceholder("What's this article about?");
        this.articleBodyInput = page.getByPlaceholder('Write your article (in markdown)');
        this.articleTagInput = page.getByPlaceholder('Enter tags');
        this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
        this.editArticleButton = page.getByRole('link', { name: 'Edit Article' });
        this.deleteArticleButton = page.getByRole('button', { name: 'Delete Article' }).first();
        this.favoriteButton = page.locator('div.article-preview button').first();
    }

    async gotoNewArticle() {
        await this.newArticleButton.click();
    }

    async createNewArticle(articleTitle: string, articleDescription: string, articleBody: string, articleTag: string) {
        await this.articleTitleInput.fill(articleTitle);
        await this.articleDescriptionInput.fill(articleDescription);
        await this.articleBodyInput.fill(articleBody);
        await this.articleTagInput.fill(articleTag);
        await this.publishArticleButton.click();
    }

    async verifySuccess(articleTitle: string) {
        await expect(
            this.page.getByRole('heading', { name: articleTitle })
        ).toBeVisible();
    }

    async editArticle(articleTitle: string, articleDescription: string, articleBody: string, articleTag: string) {
        await this.editArticleButton.first().click();

        await this.articleTitleInput.fill(articleTitle);
        await this.articleDescriptionInput.fill(articleDescription);
        await this.articleBodyInput.fill(articleBody);
        await this.articleTagInput.fill(articleTag);

        await this.publishArticleButton.click();
    }

    async verifySuccessUpdatedArticle(updatedArticleBody: string) {
        await expect(
            this.page.getByText(updatedArticleBody)
        ).toBeVisible();
    }

    async deleteArticle() {
        await this.deleteArticleButton.click();
    }

    async favoriteArticle() {
        await this.favoriteButton.click();
    }

    async verifyArticleFavorited() {
        await expect(this.favoriteButton).toHaveClass(/btn-primary/);
    }

    async unfavoriteArticle() {
        await this.favoriteButton.click();
    }

    async verifyArticleUnfavorited() {
        await expect(this.favoriteButton).toHaveClass(/btn-outline-primary/);
    }
}