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
    // Find and click the submit button
    const submitButton = page.locator('button[type="submit"], button:has-text("Send Message"), button:has-text("Submit")').first();
    await submitButton.click();
    
    // Wait for validation message or toast
    await page.waitForTimeout(500);
    
    // Check for error messages or validation (could be toast notifications)
    const hasValidationMessage = await page.locator('text=/please enter|required|field/i').count() > 0;
    expect(hasValidationMessage).toBeTruthy();
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
    await page.waitForTimeout(500);
    
    // Check for email validation error
    const hasEmailError = await page.locator('text=/valid email|email.*invalid|invalid.*email/i').count() > 0;
    expect(hasEmailError).toBeTruthy();
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    // Fill all required fields
    await page.locator('input[name="name"], input[placeholder*="name" i]').first().fill('John Doe');
    await page.locator('input[type="email"], input[placeholder*="email" i]').first().fill('john.doe@example.com');
    await page.locator('input[placeholder*="subject" i], input[name="subject"]').first().fill('Product Inquiry');
    await page.locator('textarea').first().fill('I would like to know more about your smart jerseys.');
    
    // Select inquiry type if available
    const selectTrigger = page.locator('[role="combobox"], select, button:has-text("Select")').first();
    if (await selectTrigger.count() > 0) {
      await selectTrigger.click();
      await page.waitForTimeout(300);
      // Try to select an option
      const firstOption = page.locator('[role="option"], option').first();
      if (await firstOption.count() > 0) {
        await firstOption.click();
      }
    }
    
    // Take screenshot before submission
    await page.screenshot({ path: 'tests/screenshots/contact-form-filled.png' });
    
    // Submit form
    const submitButton = page.locator('button[type="submit"], button:has-text("Send Message"), button:has-text("Submit")').first();
    await submitButton.click();
    
    // Wait for success message
    await page.waitForTimeout(1000);
    
    // Check for success indicators (could be toast, modal, or text)
    const hasSuccessMessage = await page.locator('text=/success|sent|thank you|submitted/i').count() > 0;
    expect(hasSuccessMessage).toBeTruthy();
    
    // Take screenshot after submission
    await page.screenshot({ path: 'tests/screenshots/contact-form-submitted.png' });
  });

  test('should take screenshot of contact section', async ({ page }) => {
    await page.screenshot({ path: 'tests/screenshots/contact-section.png', fullPage: false });
  });
});
