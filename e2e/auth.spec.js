// @ts-check
import { test, expect } from '@playwright/test';

async function loginWithUsernameAndPassword(page, username, password) {
  await page.goto('/');
  await page.getByPlaceholder('Enter your username').fill(username);
  await page.getByPlaceholder('Enter your password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/tasks');
}

test('user can sign in with username and password and see Sign Out button', async ({ page }) => {
  await loginWithUsernameAndPassword(page, 'fredmaia', 'abc123');
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});

test('user can sign out with username and password', async ({ page }) => {
  await loginWithUsernameAndPassword(page, 'fredmaia', 'abc123');
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

// GitHub keeps blocking the tests, so I'm disabling it for now

// async function loginWithGithub(page, context) {
//   const [popup] = await Promise.all([
//     context.waitForEvent('page'),
//     page.getByRole('button', { name: /github/i }).click(),
//   ]);
//   await popup.waitForURL(/github\.com\/login/);
//   await popup.getByLabel('Username or email address').fill(process.env.GITHUB_USER);
//   await popup.getByLabel('Password').fill(process.env.GITHUB_PASSWORD);
//   await popup.getByRole('button', { name: 'Sign in' }).click();
//   // If your app asks for authorization, approve it
//   // await popup.getByRole('button', { name: /authorize/i }).click();
//   await popup.waitForEvent('close');
//   await page.waitForURL('**/tasks');
// }

// test('user can sign in with GitHub (full flow)', async ({ page, context }) => {
//   await page.goto('/');
//   await loginWithGithub(page, context);
//   await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
// });

// test('user can sign out with GitHub', async ({ page, context }) => {
//   await page.goto('/');
//   await loginWithGithub(page, context);
//   await page.getByRole('button', { name: 'Sign Out' }).click();
//   await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
// });