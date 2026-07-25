import {test,expect} from '@playwright/test';

test('EventHub login page loads,', async ({page}) => {

/*
 * Playwright actions return Promises because browser events take time over the network.
 * Using 'await' pauses JavaScript execution until the browser completely finishes the task.
 * This guarantees elements exist before interacting, eliminating timing errors and flaky tests.
 */
  await openLoginPage(page);
  await page.waitForTimeout(3000); 
  // Assert the Email field located by placeholder is visible
  const emailField = page.getByPlaceholder('you@email.com');
  await expect(emailField).toBeVisible();
  const signInButton = page.getByRole('textbox', { name: 'Password' });
  await expect(signInButton).toBeVisible();
});

async function openLoginPage(page) {
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
}

test('Simple login page test',async({page}) =>
{
     await openLoginPage(page);
     await page.waitForTimeout(3000); 
     //Assert the password field located by label Password is visible
     const passwordField = page.getByLabel('Password');
     await expect(passwordField).toBeVisible();
     //Assert the page URL contains /login
     await expect(page).toHaveURL(/.*\/login/);
     //Assert the heading Sign in to EventHub is visible
     const heading = page.getByRole('button', { name: 'Sign In' });
     await expect(heading).toBeVisible();
});
