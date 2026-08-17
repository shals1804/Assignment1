import { test, expect } from '@playwright/test';
import { openLoginPage } from './get-started.spec.js'; 

test.only('Login to event hub', async ({ page }) => {
    // 1. Authentication & Navigation
    await openLoginPage(page);
    await page.goto('/login');
    
    const emailField = page.getByPlaceholder('you@email.com');
    await emailField.fill('singhshalini1804@gmail.com');
    const passwordField = page.getByLabel('Password');
    await passwordField.fill('Password@1234');
    
    const heading = page.getByRole('button', { name: 'Sign In' });
    await heading.click();
    
    const EventsNav = page.getByRole('link', { name: 'Events', exact: true }).or(page.getByText('Events', { exact: true }));
    await EventsNav.click();
    
    const Upcomingevents = page.getByRole('heading', { name: 'Upcoming Events' });
    await expect(Upcomingevents).toBeVisible();

    // 2. Apply Filters
    const searchField = page.getByPlaceholder('Search events, venues…');
    await searchField.fill('World');
    
    // Select dropdowns by locator role without filtering by temporary text
    const categoryDropdown = page.getByRole('combobox').first();
    await categoryDropdown.selectOption('Conference');
    
    const cityDropdown = page.getByRole('combobox').last();
    await cityDropdown.selectOption('Hyderabad');
    
    // 3. Verify Specific Card Details
    const card = page.getByRole('img', { name: 'World Tech Summit' });
    await expect(card).toBeVisible();
    await expect(card).toHaveCount(1);
    
    const initialEventTitleText = await page.getByRole('heading', { name: 'World Tech Summit' }).textContent();
    expect(initialEventTitleText?.trim()).toBe('World Tech Summit');

    const price = await page.locator('p:has-text("$")').first().textContent();
    expect(price).toContain('$');

    const seats = await page.locator('span:has-text("seats left!")').first().textContent();
    const seatCount = parseInt(seats?.replace(/\D/g, '') || '0', 10);
    expect(seatCount).toBeGreaterThan(0);

    // 4. Navigate to details page
    await page.locator('a').filter({ hasText: 'Book Now' }).first().click();
    await expect(page).toHaveURL(/\/events/);
    
    const mainheading = page.getByRole('heading', { name: 'World Tech Summit' });
    await expect(mainheading).toHaveText(initialEventTitleText || '');
    
    await page.screenshot({ path: 'price-debug.png' });
    const price1 = page.locator('span.text-2xl.font-bold.text-indigo-700').first();
    await price1.waitFor({ state: 'visible', timeout: 5000 });
    await expect(price1).toHaveText('$1,500');
      // FIX 1: Navigate back to the main events list page
    await page.goto('/events'); 
    

    // FIX 4: Clear the search field text
    await searchField.fill('');

    // FIX 3: Reset dropdown filters using clean locators
    if (await categoryDropdown.isVisible()) {
        await categoryDropdown.selectOption({ label: 'All Categories' });
    }
    if (await cityDropdown.isVisible()) {
        await cityDropdown.selectOption({ label: 'All Cities' });
    }

    // FIX 2: Define a clean locator tracking all visible event card components
    // Adjust '.event-card' or 'h3' to match your application's exact HTML selectors
    const actionButtons = page.locator('a:has-text("Book Now")');
    await actionButtons.first().waitFor({ state: 'visible', timeout: 5000 });
    const cardCount = await actionButtons.count();
    expect(cardCount).toBeGreaterThanOrEqual(3);

    const allCardTitles = page.locator('.card-body h3,.card-body h5, h3, .card-title');

    // Capture the titles of the first, second, and last cards safely
    const firstTitle = (await allCardTitles.first().textContent())?.trim();
    const secondTitle = (await allCardTitles.nth(1).textContent())?.trim();
    const lastTitle = (await allCardTitles.last().textContent())?.trim();

    // Assertions: all verified titles must be non-empty strings
    expect(firstTitle).not.toBe('');
    expect(secondTitle).not.toBe('');
    expect(lastTitle).not.toBe('');

    expect(firstTitle).toBeDefined();
    expect(secondTitle).toBeDefined();
    expect(lastTitle).toBeDefined();

    // Assertion: first and last titles must differ from each other
    expect(firstTitle).not.toEqual(lastTitle);
    console.log(`Titles Found: "${firstTitle}", "${secondTitle}", "${lastTitle}"`);

});