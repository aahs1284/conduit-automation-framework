import { Locator, Page, expect } from "@playwright/test";

export class CommentPage {
    readonly page: Page;
    readonly commentInput: Locator;
    readonly commentButton: Locator;
    readonly deleteCommentButton: Locator;

    constructor(page: Page) {
        this.page= page;
        this.commentInput = page.locator('textarea[placeholder="Write a comment..."]');
        this.commentButton = page.locator('button:has-text("Post Comment")');
        this.deleteCommentButton = page.locator('.mod-options i.ion-trash-a').first();
    };

    async addComment(comment: string) {
        await this.commentInput.fill(comment);
        await this.commentButton.click();
    };
    async verifyComment(comment: string) {
        await expect(
            this.page.locator('.card-text', { hasText: comment })
        ).toBeVisible();
    };
    
    async deleteComment(){
         await this.deleteCommentButton.click();
    };

    async verifyCommentDeleted(comment: string) {

        await expect(
            this.page.getByText(comment)
        ).not.toBeVisible();
    }

    

}