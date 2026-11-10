// @ts-check
import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';

test('new user can create, persist, complete, filter, and remove a task', async ({
  page,
}) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('/');
  await page.getByRole('button', { name: 'Create a new account' }).click();
  await page
    .getByPlaceholder('Enter your username')
    .fill(`upgrade-${randomUUID()}`);
  await page.getByPlaceholder('Enter your password').fill('tasks-password-123');
  await page.getByRole('button', { name: 'Sign up', exact: true }).click();
  await page.waitForURL('**/tasks');

  const description = 'Verify task persistence after upgrading Meteor';
  const task = page.getByRole('checkbox', { name: description, exact: true });

  await page.getByPlaceholder('Type to add new tasks').fill(description);
  await page.getByRole('button', { name: 'Add Task', exact: true }).click();
  await expect(task).toBeVisible();
  await expect(task).not.toBeChecked();

  await page.reload();
  await expect(task).toBeVisible();
  await page.getByText(description, { exact: true }).click();
  await expect(task).toBeChecked();

  await page.reload();
  await expect(task).toBeChecked();
  await page.getByRole('button', { name: 'Show Pending', exact: true }).click();
  await expect(task).toHaveCount(0);
  await page
    .getByRole('button', { name: 'Show All Tasks', exact: true })
    .click();
  await expect(task).toBeChecked();

  await page.getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(task).toHaveCount(0);
  await page.reload();
  await expect(page.getByPlaceholder('Type to add new tasks')).toBeVisible();
  await expect(page.getByRole('checkbox')).toHaveCount(0);
  await expect(page.getByText('You have 0 tasks and 0 pending.')).toBeVisible();
  expect(pageErrors).toEqual([]);
});
