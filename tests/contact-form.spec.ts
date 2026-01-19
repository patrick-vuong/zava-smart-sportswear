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
    await page.screenshot({ path: 'tests/screenshots/contact-form.png' });

    // Verify form elements are present
    await expect(page.locator('input#name')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('#inquiry-type')).toBeVisible();
    await expect(page.locator('input#subject')).toBeVisible();
    await expect(page.locator('textarea#message')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Wait for error toast
    await page.waitForSelector('text=Please enter your name', { timeout: 5000 });
    
    // Take screenshot of validation error
    await page.screenshot({ path: 'tests/screenshots/contact-form-validation-error.png' });
    
    // Verify error message appears
    await expect(page.locator('text=Please enter your name')).toBeVisible();
  });

  test('should show email validation error for invalid email', async ({ page }) => {
    // Fill in name but use invalid email
    await page.fill('input#name', 'John Doe');
    await page.fill('input#email', 'invalid-email');
    
    // Try to submit
    await page.click('button[type="submit"]');
    
    // Wait for error toast
    await page.waitForSelector('text=Please enter a valid email address', { timeout: 5000 });
    
    // Verify error message
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
  });

  test('should successfully submit contact form with valid data', async ({ page }) => {
    // Fill in all required fields
    await page.fill('input#name', 'John Doe');
    await page.fill('input#email', 'john.doe@example.com');
    
    // Select inquiry type
    await page.click('#inquiry-type');
    await page.click('text=Product Questions');
    
    await page.fill('input#subject', 'Question about Smart Jerseys');
    await page.fill('textarea#message', 'I would like to know more about the smart jersey features and pricing.');
    
    // Take screenshot before submission
    await page.screenshot({ path: 'tests/screenshots/contact-form-filled.png' });
    
    // Submit the form
    await page.click('button[type="submit"]');
    
    // Wait for success message
    await page.waitForSelector('text=Thank you! Your message has been sent successfully.', { timeout: 5000 });
    
    // Take screenshot of success message
    await page.screenshot({ path: 'tests/screenshots/contact-form-success.png' });
    
    // Verify success message
    await expect(page.locator('text=Thank you! Your message has been sent successfully.')).toBeVisible();
    
    // Verify form is reset
    await expect(page.locator('input#name')).toHaveValue('');
    await expect(page.locator('input#email')).toHaveValue('');
    await expect(page.locator('input#subject')).toHaveValue('');
    await expect(page.locator('textarea#message')).toHaveValue('');
  });

  test('should display all contact information', async ({ page }) => {
    // Verify contact information cards are visible
    await expect(page.locator('text=Headquarters')).toBeVisible();
    await expect(page.locator('text=Phone')).toBeVisible();
    await expect(page.locator('text=Email')).toBeVisible();
    await expect(page.locator('text=Support Hours')).toBeVisible();
    
    // Verify specific contact details
    await expect(page.locator('text=1 Hacker Way')).toBeVisible();
    await expect(page.locator('text=+1 (555) 123-ZAVA')).toBeVisible();
    await expect(page.locator('text=hello@zava.com')).toBeVisible();
    
    // Take screenshot of contact information
    await page.screenshot({ path: 'tests/screenshots/contact-info.png' });
  });
});
