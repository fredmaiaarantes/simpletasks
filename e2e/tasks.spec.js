// @ts-check
import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';

async function signUp(page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Create a new account' }).click();
  await page
    .getByPlaceholder('Enter your username')
    .fill(`e2e-${randomUUID()}`);
  await page.getByPlaceholder('Enter your password').fill('test-password-352');
  await page.getByRole('button', { name: 'Sign up', exact: true }).click();
  await expect(page).toHaveURL(/\/tasks$/);
  await expect(page.getByText('You have 0 tasks and 0 pending.')).toBeVisible();
}

async function expectNoOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
}

test('tasks sync across tabs and persist through reload, completion, filtering and deletion', async ({
  page,
  context,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await signUp(page);

  const otherTab = await context.newPage();
  otherTab.on('pageerror', (error) => errors.push(error.message));
  await otherTab.goto('/tasks');
  await expect(
    otherTab.getByText('You have 0 tasks and 0 pending.')
  ).toBeVisible();

  const description = `Meteor 3.5.2 task ${randomUUID()}`;
  await page.getByPlaceholder('Type to add new tasks').fill(description);
  await page.getByRole('button', { name: 'Add Task' }).click();
  await expect(page.getByText('You have 1 task and 1 pending.')).toBeVisible();
  await expect(
    otherTab.getByRole('checkbox', { name: description })
  ).toBeVisible();

  await page.reload();
  await expect(
    page.getByRole('checkbox', { name: description })
  ).not.toBeChecked();
  await page.getByText(description, { exact: true }).click();
  await expect(
    otherTab.getByRole('checkbox', { name: description })
  ).toBeChecked();
  await expect(page.getByText('You have 1 task and 0 pending.')).toBeVisible();

  await page.getByRole('button', { name: 'Show Pending' }).click();
  await expect(page.getByRole('checkbox', { name: description })).toHaveCount(
    0
  );
  await page.getByRole('button', { name: 'Show All Tasks' }).click();
  await expect(page.getByRole('checkbox', { name: description })).toBeChecked();
  await page.getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(
    otherTab.getByRole('checkbox', { name: description })
  ).toHaveCount(0);
  await expect(page.getByText('You have 0 tasks and 0 pending.')).toBeVisible();
  await page.reload();
  await expect(page.getByText('You have 0 tasks and 0 pending.')).toBeVisible();
  expect(errors).toEqual([]);
});

test('sign-in and long tasks fit a narrow mobile screen', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Sign in', exact: true })
  ).toBeVisible();
  await expectNoOverflow(page);
  await signUp(page);

  const description = `Long task ${'x'.repeat(120)}`;
  await page.getByPlaceholder('Type to add new tasks').fill(description);
  await page.getByRole('button', { name: 'Add Task' }).click();
  await expect(page.getByText(description, { exact: true })).toBeVisible();
  await expectNoOverflow(page);
  await page.getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(page.getByText('You have 0 tasks and 0 pending.')).toBeVisible();
});
