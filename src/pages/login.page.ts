import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.logoutButton = page.getByRole('button', {
            name: 'Or click here to logout.'
        });
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }

    async verifySuccessfulLogin() {
        await expect(
            this.page.getByRole('link', { name: 'New Article' })
        ).toBeVisible();
    }

    async logout() {
        await this.page.goto('/settings');
        await this.logoutButton.click();
    }

    async verifySuccessfulLogout() {
        await expect(
            this.page.getByRole('link', { name: 'Sign in' })
        ).toBeVisible();
    }
}