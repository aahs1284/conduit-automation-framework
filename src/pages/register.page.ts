import { expect, Locator, Page } from "@playwright/test";

export class RegisterPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;   
    readonly passwordInput: Locator;
    readonly signUpButton: Locator;

    /**
     *
     */
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[placeholder="Username"]');
        this.emailInput = page.locator('input[placeholder="Email"]');
        this.passwordInput = page.locator('input[placeholder="Password"]');
        this.signUpButton = page.locator('button:has-text("Sign up")');  
    }

    async goto() {
        await this.page.goto('/register')
    }

    async register(username: string, email: string, password: string) {
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signUpButton.click();
    }

    async verifySuccess(username: string) {
        await expect(
            this.page.locator(`a.nav-link:has-text("${username}")`)
        ).toBeVisible();
    }
}