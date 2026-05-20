import { expect, Locator, Page } from "@playwright/test";

export class SettingsPage {

    readonly page: Page;
    readonly settingsButton: Locator;
    readonly usernameInput: Locator;
    readonly bioInput: Locator;
    readonly imageUrlInput: Locator;
    readonly updateSettingsButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.settingsButton = page.locator('a:has-text("Settings")');

        this.imageUrlInput = page.locator('input[placeholder="URL of profile picture"]');
        this.usernameInput = page.locator('input[placeholder="Username"]');
        this.bioInput = page.locator('textarea[placeholder="Short bio about you"]');
        this.emailInput = page.locator('input[placeholder="Email"]');
        this.passwordInput = page.locator('input[placeholder="New Password"]');
        this.updateSettingsButton = page.locator('button:has-text("Update Settings")');
    }

    async gotoSettings() {
        await this.settingsButton.click();
    }

    async updateUserSettings(username: string,bio: string, imageUrl: string, email: string, password: string) {

        await this.usernameInput.fill(username);
        await this.bioInput.fill(bio);
        await this.imageUrlInput.fill(imageUrl);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        await this.updateSettingsButton.click();
    }

    async verifyUpdatedUsername(username: string) {

        await expect(
            this.page.locator('.user-info')
        ).toContainText(username);
    }
}
