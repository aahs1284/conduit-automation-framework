import { expect, Locator, Page } from "@playwright/test";


export class ArticlePage {
    readonly page: Page;
    readonly newArticleButton: Locator;
    readonly articleTitleInput: Locator;
    readonly articleDescriptionInput: Locator;
    readonly articleBodyInput: Locator;
    readonly articleTagInput: Locator
    readonly publishArticleButton: Locator;
    readonly editArticleButton: Locator;
    readonly favoriteButton: Locator;
    readonly unfavoriteButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.newArticleButton = page.locator('a.nav-link:has-text("New Article")');; //note to self: imaju articles koji se zovu new article pa ne moze naci a/link
        this.articleTitleInput = page.locator('input[placeholder="Article Title"]');
        this.articleDescriptionInput = page.locator(`input[placeholder="What's this article about?"]`);
        this.articleBodyInput = page.locator('textarea[placeholder="Write your article (in markdown)"]');
        this.articleTagInput = page.locator('input[placeholder="Enter tags"]');
        this.publishArticleButton = page.locator('button:has-text("Publish Article")');
        this.editArticleButton = page.locator('.btn:has-text("Edit Article")').first();
        this.favoriteButton = page.locator('div.article-preview button').first();
        this.unfavoriteButton = page.locator('div.article-preview button').first();
    };

    async gotoNewArticle() {
        await this.newArticleButton.click();
    };

    async createNewArticle(articleTitle: string, articleDescription: string, articleBody: string, articleTag: string) {
        await this.articleTitleInput.fill(articleTitle);
        await this.articleDescriptionInput.fill(articleDescription);
        await this.articleBodyInput.fill(articleBody);
        await this.articleTagInput.fill(articleTag);
        await this.publishArticleButton.click();

    };

    async verifySuccess(articleTitle: string) {
        await expect(
            this.page.locator(`h1:has-text("${articleTitle}")`)
        ).toBeVisible();
    };

    async editArticle(articleTitle:string, articleDescription:string, articleBody:string, articleTag:string) {
        await this.editArticleButton.click();

        await this.articleTitleInput.fill(articleTitle);
        await this.articleDescriptionInput.fill(articleDescription);
        await this.articleBodyInput.fill(articleBody);
        await this.articleTagInput.fill(articleTag);

        await this.publishArticleButton.click();
    };

    async verifySuccessUpdatedArticle(updatedArticleTitle: string) {
        await expect(
            this.page.locator(`h1:has-text("${updatedArticleTitle}")`)
        ).toBeVisible();
    };

    async deleteArticle() {
        await this.page
            .locator('.btn:has-text("Delete Article")')
            .first()
            .click();
    };

    async favoriteArticle() {
        await this.favoriteButton.click();
    }

    async verifyArticleFavorited() {

    await expect(this.favoriteButton)
        .toHaveClass(/btn-primary/);
}

    async unfavoriteArticle() {
        await this.unfavoriteButton.click();
    }

    async verifyArticleUnfavorited() {

    await expect(this.unfavoriteButton)
        .toHaveClass(/btn-outline-primary/);
    }
    
}