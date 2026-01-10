import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to contact section
    await page.locator('button:has-text("Contact")').first().click();
    await page.waitForTimeout(1000);
  });

  test('should display contact form with all required fields', async ({ page }) => {
    // Check that all form fields are visible
    await expect(page.locator('input#name')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('input#subject')).toBeVisible();
    await expect(page.locator('textarea#message')).toBeVisible();
    await expect(page.locator('#inquiry-type')).toBeVisible();
    
    // Check submit button is visible
    await expect(page.locator('button:has-text("Send Message")')).toBeVisible();
  });

  test('should show validation error when submitting empty form', async ({ page }) => {
    // Click submit without filling form
    await page.locator('button:has-text("Send Message")').click();
    
    // Wait for validation message
    await page.waitForTimeout(500);
    
    // Check that error toast appears (sonner toast)
    await expect(page.locator('text=Please enter your name')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    // Fill in name
    await page.locator('input#name').fill('John Doe');
    
    // Fill invalid email
    await page.locator('input#email').fill('invalid-email');
    
    // Fill other required fields
    await page.locator('input#subject').fill('Test Subject');
    await page.locator('textarea#message').fill('Test message');
    
    // Select inquiry type
    await page.locator('#inquiry-type').click();
    await page.locator('text=General Information').click();
    
    // Submit form
    await page.locator('button:has-text("Send Message")').click();
    
    // Wait for validation message
    await page.waitForTimeout(500);
    
    // Check that email validation error appears
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
  });

  test('should successfully submit contact form with valid data', async ({ page }) => {
    // Fill in all required fields with valid data
    await page.locator('input#name').fill('John Doe');
    await page.locator('input#email').fill('john.doe@example.com');
    await page.locator('input#subject').fill('Partnership Inquiry');
    await page.locator('textarea#message').fill('I am interested in partnering with Zava for our sports team.');
    
    // Select inquiry type
    await page.locator('#inquiry-type').click();
    await page.locator('text=Partnership Opportunities').click();
    
    // Take screenshot before submission
    await page.screenshot({ path: 'tests/screenshots/contact-form-filled.png' });
    
    // Submit form
    await page.locator('button:has-text("Send Message")').click();
    
    // Wait for submission to complete
    await page.waitForTimeout(2000);
    
    // Check for success message
    await expect(page.locator('text=Thank you! Your message has been sent successfully.')).toBeVisible();
    
    // Take screenshot after successful submission
    await page.screenshot({ path: 'tests/screenshots/contact-form-success.png' });
    
    // Verify form is reset
    await expect(page.locator('input#name')).toHaveValue('');
    await expect(page.locator('input#email')).toHaveValue('');
    await expect(page.locator('input#subject')).toHaveValue('');
    await expect(page.locator('textarea#message')).toHaveValue('');
  });

  test('should display contact information cards', async ({ page }) => {
    // Check that contact information cards are visible
    await expect(page.locator('text=Headquarters')).toBeVisible();
    await expect(page.locator('text=Phone')).toBeVisible();
    await expect(page.locator('text=Email')).toBeVisible();
    await expect(page.locator('text=Support Hours')).toBeVisible();
    
    // Check specific contact details
    await expect(page.locator('text=hello@zava.com')).toBeVisible();
    await expect(page.locator('text=+1 (555) 123-ZAVA')).toBeVisible();
  });

  test('should require all fields before submission', async ({ page }) => {
    // Fill only name
    await page.locator('input#name').fill('John Doe');
    await page.locator('button:has-text("Send Message")').click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
    
    // Now also fill email
    await page.locator('input#email').fill('john@example.com');
    await page.locator('button:has-text("Send Message")').click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=Please enter a subject')).toBeVisible();
    
    // Now also fill subject
    await page.locator('input#subject').fill('Test');
    await page.locator('button:has-text("Send Message")').click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=Please enter your message')).toBeVisible();
    
    // Now also fill message
    await page.locator('textarea#message').fill('Test message');
    await page.locator('button:has-text("Send Message")').click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=Please select an inquiry type')).toBeVisible();
  });
});
