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
    readonly commentInput: Locator;
    readonly postCommentButton: Locator;
    readonly deleteCommentButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.newArticleButton=page.locator('a:has-text("New Article")');
        this.articleTitleInput = page.locator('input[placeholder="Article Title"]');
        this.articleDescriptionInput = page.locator(`input[placeholder="What's this article about?"]`);
        this.articleBodyInput = page.locator('textarea[placeholder="Write your article (in markdown)"]');
        this.articleTagInput = page.locator('input[placeholder="Enter tags"]');
        this.publishArticleButton = page.locator('button:has-text("Publish Article")');
        this.editArticleButton = page.locator('.btn:has-text("Edit Article")').first();
        this.commentInput = page.locator('textarea[placeholder="Write a comment..."]');
        this.postCommentButton = page.locator('button:has-text("Post Comment")');
        this.deleteCommentButton = page.locator('.mod-options i.ion-trash-a').first();
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
            this.page.locator(`h1:has-text("${articleTitle}")`)
        ).toBeVisible();
    }

    async editArticle(articleTitle:string, articleDescription:string, articleBody:string, articleTag:string) {
        await this.editArticleButton.click();

        await this.articleTitleInput.fill(articleTitle);
        await this.articleDescriptionInput.fill(articleDescription);
        await this.articleBodyInput.fill(articleBody);
        await this.articleTagInput.fill(articleTag);

        await this.publishArticleButton.click();
    }

    async verifySuccessUpdatedArticle(updatedArticleTitle: string) {
        await expect(
            this.page.locator(`h1:has-text("${updatedArticleTitle}")`)
        ).toBeVisible();
    }

    async addComment(comment: string) {
        await this.commentInput.fill(comment);
        await this.postCommentButton.click();
    }

    async verifyComment(comment: string) {
        await expect(
            this.page.locator('.card-text', { hasText: comment })
        ).toBeVisible();
    }

    async deleteComment() {
        await this.deleteCommentButton.click();
    }

    async verifyCommentDeleted(comment: string) {
        await expect(
           this.page.locator('.card-text', { hasText: comment })
    ).not.toBeVisible();
}
}