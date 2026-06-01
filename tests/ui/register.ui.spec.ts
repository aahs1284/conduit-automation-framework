import { test, expect } from '../../fixtures/pages.fixture';

test.describe('SignUp UI Tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('User should sign up successfully', async ({ registerPage, page }) => {
    await page.goto('/register');

    const username = 'user' + Date.now();
    const email = `user${Date.now()}@test.com`;
    const password = 'MmnF695217+';

    await registerPage.register(username, email, password);

    await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible();
  });
});