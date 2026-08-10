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

export async function openLoginPage(page) 
{
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    const heading = await page.getByRole('heading', { name: 'Sign in to EventHub' });
    await expect (heading).toBeVisible(); 
}

async function getEmailfield(page)
{
  const emailtextbox = page.getByPlaceholder('you@email.com');
  return emailtextbox;
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


test('Validate playwright config structure', ({}, testInfo) => {
  // Read the baseURL that Playwright merged into the active running project
  const projectBaseURL = testInfo.project.use?.baseURL;

  // 1. Assert that use.baseURL exists and is defined
  expect(projectBaseURL).toBeDefined();
  expect(typeof projectBaseURL).toBe('string');

  // 2. Assert that your projects array exists in the global config
  expect(testInfo.config.projects).toBeDefined();
});