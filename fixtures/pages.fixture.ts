export { expect } from '@playwright/test';
import { test as base } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { ArticlePage } from '../src/pages/article.page';
import { RegisterPage } from '../src/pages/register.page';
import { CommentPage } from '../src/pages/comment.page';
import { SettingsPage } from '../src/pages/settings.page';

type Pages = {
    loginPage: LoginPage;
    articlePage: ArticlePage;
    registerPage: RegisterPage;
    commentPage: CommentPage;
    settingsPage: SettingsPage;
};

export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    articlePage: async ({ page }, use) => {
        await use(new ArticlePage(page));
    },

    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    commentPage: async ({ page }, use) => {
        await use(new CommentPage(page));
    },
    settingsPage: async ({ page }, use) => {
        await use(new SettingsPage(page));
    }
});

