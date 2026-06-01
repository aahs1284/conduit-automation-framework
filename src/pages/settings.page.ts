import { expect, Locator, Page } from "@playwright/test";

export class SettingsPage {

    readonly page: Page;
    readonly settingsButton: Locator;
    readonly usernameInput: Locator;
    readonly bioInput: Locator;
    readonly imageUrlInput: Locator;
    readonly updateSettingsButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.settingsButton = page.getByRole('link', { name: 'Settings' });
        this.imageUrlInput = page.getByPlaceholder('URL of profile picture');
        this.usernameInput = page.getByPlaceholder('Username');
        this.bioInput = page.getByPlaceholder('Short bio about you');
        this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    }

    async gotoSettings() {
        await this.settingsButton.click();
    }

    async updateUserSettings(username: string, bio: string, imageUrl: string) {
        await this.usernameInput.fill(username);
        await this.bioInput.fill(bio);
        await this.imageUrlInput.fill(imageUrl);

        await this.updateSettingsButton.click();
    }

    async verifyUpdatedUsername(username: string) {
        await expect(
            this.page.getByRole('heading', { name: username })
        ).toBeVisible();
    }
}