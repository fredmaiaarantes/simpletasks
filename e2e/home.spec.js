// @ts-check
import { test, expect } from '@playwright/test';

test('has Simple Tasks title', async ({ page }) => {
  try {
    await page.goto('/');
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Simple Tasks/);
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});

test('sign in page has sign in button', async ({ page }) => {
  try {
    await page.goto('/');
    
    // Check if the sign in button is visible
    const signInButton = page.getByRole('button', { name: 'Sign in' });
    await expect(signInButton).toBeVisible();
    
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});