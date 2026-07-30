import { test, expect } from '@playwright/test';
import { openLoginPage } from './get-started.spec.js'; 

test('Smoke test : Verify Login page configuration and elements', async ({page}) =>
{
 // 1. Navigate to /login and assert the 'Sign in to EventHub' heading is visible
 // This verifies the baseURL config works perfectly
 await openLoginPage(page);
 await expect(page).toHaveTitle(/EventHub/i);
 const emailField = page.getByPlaceholder('you@email.com');
 await expect (emailField).toBeVisible();
 const signInButton =page.getByRole('textbox', { name: 'Password' });
 await expect(signInButton).toBeVisible();
});

test('Another Check',async ({page}) =>
{
    //Open the login page using the built-in page fixture
    await page.goto('/login');
    const emailField = page.getByPlaceholder('you@email.com');
    await emailField.fill('beginner@sample.com');
    // Confirm the email field still shows/retains that exact value
    await expect(emailField).toHaveValue('beginner@sample.com');
});

    test('Verify fresh context initialization and empty initial state', async ({ browser}) => {

        // Create a fresh, completely isolated browser context
        const context = await browser.newContext();
        // Create a new page within that isolated context
        const newPage = await context.newPage();
        await newPage.goto('https://eventhub.rahulshettyacademy.com/login');
        // Confirm the 'Sign in to EventHub' heading is visible
        const heading = newPage.getByRole('heading', { name: 'Sign in to EventHub' });
        await expect(heading).toBeVisible();
        //Confirm the email field starts empty
        const email = newPage.getByPlaceholder('you@email.com');
        await expect (email).toBeEmpty();
        await context.close();
});

/**
 * TEST CONTEXT NOTE:
 * 
 * 1. The default 'page' fixture provides a single, ready-to-use page out of the box,
 *    managed automatically by Playwright for standard tests.
 * 
 * 2. A 'browser context' acts as a separate, isolated session container (similar to 
 *    an incognito browser window) that can house multiple pages.
 * 
 * 3. Creating a 'fresh context' manually ensures a completely pristine environment with 
 *    an isolated state—meaning zero shared cookies, local storage, or session cache.
 */

