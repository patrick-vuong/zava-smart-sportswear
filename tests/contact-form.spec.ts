import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Navigate to contact section
    await page.click('text=Contact');
    
    // Wait for the contact form to be visible
    await page.waitForSelector('form', { state: 'visible' });
  });

  test('should display contact form', async ({ page }) => {
    // Take a screenshot of the contact form
    await page.screenshot({ path: 'tests/screenshots/contact-form.png', fullPage: true });

    // Verify form elements are present
    await expect(page.locator('input#name')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('#inquiry-type')).toBeVisible();
    await expect(page.locator('input#subject')).toBeVisible();
    await expect(page.locator('textarea#message')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should display all contact information', async ({ page }) => {
    // Verify contact information cards are visible using more specific selectors
    await expect(page.getByRole('heading', { name: 'Headquarters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Phone' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Support Hours' })).toBeVisible();
    
    // Verify specific contact details
    await expect(page.locator('text=1 Hacker Way')).toBeVisible();
    await expect(page.locator('text=+1 (555) 123-ZAVA')).toBeVisible();
    await expect(page.locator('text=hello@zava.com')).toBeVisible();
    
    // Take screenshot of contact information
    await page.screenshot({ path: 'tests/screenshots/contact-info.png', fullPage: true });
  });

  test('should allow filling out the contact form', async ({ page }) => {
    // Fill in all required fields
    await page.fill('input#name', 'John Doe');
    await page.fill('input#email', 'john.doe@example.com');
    await page.fill('input#subject', 'Question about Smart Jerseys');
    await page.fill('textarea#message', 'I would like to know more about the smart jersey features and pricing.');
    
    // Select inquiry type using Radix UI Select component
    await page.click('#inquiry-type');
    // Wait for dropdown to be visible
    await page.waitForSelector('[role="option"]', { state: 'visible' });
    await page.getByRole('option', { name: 'Product Questions' }).click();
    
    // Take screenshot of filled form
    await page.screenshot({ path: 'tests/screenshots/contact-form-filled.png', fullPage: true });
    
    // Verify fields are filled
    await expect(page.locator('input#name')).toHaveValue('John Doe');
    await expect(page.locator('input#email')).toHaveValue('john.doe@example.com');
    await expect(page.locator('input#subject')).toHaveValue('Question about Smart Jerseys');
    await expect(page.locator('textarea#message')).toContainText('I would like to know more');
  });
});
