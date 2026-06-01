// fixtures/api.fixture.ts
import { test as base, expect } from '@playwright/test';

type ApiFixtures = {
  token: string;
};

export const test = base.extend<ApiFixtures>({
  token: async ({ request }, use) => {
    const responseLogin = await request.post(
      'users/login',
      {
        data: {
          user: {
            email: process.env.TEST_EMAIL,
            password: process.env.TEST_PASSWORD,
          },
        },
      }
    );

    expect(responseLogin.status()).toBe(200);

    const responseLoginJson = await responseLogin.json();
    await use(responseLoginJson.user.token);
  },
});

export { expect };