import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page= page;
        this.emailInput = page.locator('input[placeholder="Email"]');
        this.passwordInput = page.locator('input[placeholder="Password"]');
        this.signInButton = page.locator('button:has-text("Sign in")');
    };

    async goto() {
        await this.page.goto('/login')
    };

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    };

    async verifySuccessfulLogin() {
        await expect(
            this.page.getByRole('link', { name: 'New Article' })
        ).toBeVisible();
    };

    async logout() {
        await this.page.goto('/settings');

        await this.page
        .locator('button:has-text("Or click here to logout.")')
        .click();
    };

    async verifySuccessfulLogout() {
        await expect(
            this.page.getByRole('link', { name: 'Sign in' })
        ).toBeVisible();
    }
}