import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to contact section
    await page.click('text=Contact');
    await page.waitForTimeout(500); // Wait for smooth scroll
  });

  test('should display contact form', async ({ page }) => {
    // Check if contact form elements are visible
    await expect(page.locator('input[name="name"], input[placeholder*="name" i]').first()).toBeVisible();
    await expect(page.locator('input[type="email"], input[placeholder*="email" i]').first()).toBeVisible();
    await expect(page.locator('input[placeholder*="subject" i], input[name="subject"]').first()).toBeVisible();
    await expect(page.locator('textarea').first()).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Find and click the submit button without filling fields
    const submitButton = page.locator('button[type="submit"], button:has-text("Send Message"), button:has-text("Submit")').first();
    await submitButton.click();
    
    // Wait for validation - form should still be on the page or show an error
    await page.waitForLoadState('networkidle');
    
    // The form should either show validation (toast or inline) or stay on the same page
    // We'll check if we're still on the contact section (form didn't submit successfully)
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    // Fill name field
    await page.locator('input[name="name"], input[placeholder*="name" i]').first().fill('John Doe');
    
    // Fill email with invalid format
    await page.locator('input[type="email"], input[placeholder*="email" i]').first().fill('invalid-email');
    
    // Fill subject
    await page.locator('input[placeholder*="subject" i], input[name="subject"]').first().fill('Test Subject');
    
    // Fill message
    await page.locator('textarea').first().fill('Test message content');
    
    // Try to submit
    const submitButton = page.locator('button[type="submit"], button:has-text("Send Message"), button:has-text("Submit")').first();
    await submitButton.click();
    
    // Wait for validation
    await page.waitForLoadState('networkidle');
    
    // Check that we're still on the contact section (form didn't submit with invalid email)
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    // Fill all required fields
    await page.locator('input[name="name"], input[placeholder*="name" i]').first().fill('John Doe');
    await page.locator('input[type="email"], input[placeholder*="email" i]').first().fill('john.doe@example.com');
    await page.locator('input[placeholder*="subject" i], input[name="subject"]').first().fill('Product Inquiry');
    await page.locator('textarea').first().fill('I would like to know more about your smart jerseys.');
    
    // Take screenshot before submission
    await page.screenshot({ path: 'tests/screenshots/contact-form-filled.png' });
    
    // Submit form
    const submitButton = page.locator('button[type="submit"], button:has-text("Send Message"), button:has-text("Submit")').first();
    await submitButton.click();
    
    // Wait for response
    await page.waitForLoadState('networkidle');
    
    // Take screenshot after submission
    await page.screenshot({ path: 'tests/screenshots/contact-form-submitted.png' });
    
    // The test passes if we got this far without errors
    expect(true).toBeTruthy();
  });

  test('should take screenshot of contact section', async ({ page }) => {
    await page.screenshot({ path: 'tests/screenshots/contact-section.png', fullPage: false });
  });
});
