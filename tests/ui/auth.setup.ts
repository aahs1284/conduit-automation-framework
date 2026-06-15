import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {

    const email = process.env.TEST_EMAIL!;
    const password = process.env.TEST_PASSWORD!;

    await page.goto('/');

    await page.getByRole('link', { name: 'Sign in' }).click();

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    

    await page.getByRole('button', { name: 'Sign in' }).click();
    console.log(process.env.TEST_EMAIL);
    console.log(process.env.TEST_PASSWORD);

    await expect(
        page.getByRole('link', { name: 'New Article' })
    ).toBeVisible();

    await page.context().storageState({
        path: '.auth/user.json'
    });
});