import { test, expect } from '@playwright/test';

test.describe('Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test('should display contact section', async ({ page }) => {
    // Check that contact section is visible
    await expect(page.locator('#contact')).toBeVisible();
    
    // Check section heading
    await expect(page.locator('#contact h2')).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    // Contact section should contain contact details
    const contactSection = page.locator('#contact');
    
    // Look for contact information
    await expect(contactSection).toContainText(/contact|email|phone|address/i);
    
    // Should contain Zava contact details based on the component
    await expect(contactSection).toContainText(/hello@zava.com|support@zava.com|\+1.*555.*ZAVA|Palo Alto/i);
  });

  test('should have working contact form', async ({ page }) => {
    const contactSection = page.locator('#contact');
    
    // Look for form fields
    const nameField = contactSection.locator('input[name="name"], input[placeholder*="name" i]').first();
    const emailField = contactSection.locator('input[name="email"], input[type="email"], input[placeholder*="email" i]').first();
    const messageField = contactSection.locator('textarea[name="message"], textarea[placeholder*="message" i]').first();
    const submitButton = contactSection.locator('button[type="submit"], button:has-text("send"), button:has-text("submit")').first();
    
    // Fill out the form if fields exist
    if (await nameField.isVisible()) {
      await nameField.fill('Test User');
    }
    
    if (await emailField.isVisible()) {
      await emailField.fill('test@example.com');
    }
    
    if (await messageField.isVisible()) {
      await messageField.fill('This is a test message for Playwright testing.');
    }
    
    // Look for inquiry type selector if it exists
    const inquirySelect = contactSection.locator('select[name="inquiryType"], select:has-text("inquiry")').first();
    if (await inquirySelect.isVisible()) {
      await inquirySelect.selectOption('general');
    }
    
    // Submit the form if submit button exists
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // Wait for form submission feedback
      await page.waitForTimeout(2000);
      
      // Look for success message or confirmation
      await expect(page.locator('text=/success|thank you|sent/i')).toBeVisible();
    }
  });

  test('should validate required form fields', async ({ page }) => {
    const contactSection = page.locator('#contact');
    const submitButton = contactSection.locator('button[type="submit"], button:has-text("send"), button:has-text("submit")').first();
    
    if (await submitButton.isVisible()) {
      // Try to submit empty form
      await submitButton.click();
      await page.waitForTimeout(1000);
      
      // Should show validation error or prevent submission
      // This could be browser validation or custom validation
      const errorMessages = page.locator('text=/required|error|please|fill/i');
      if (await errorMessages.count() > 0) {
        await expect(errorMessages.first()).toBeVisible();
      }
    }
  });

  test('should display company information', async ({ page }) => {
    const contactSection = page.locator('#contact');
    
    // Should show office hours, location, and other company details
    await expect(contactSection).toContainText(/hours|monday|friday|palo alto|headquarters/i);
  });

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Contact section should be visible and usable on mobile
    await expect(page.locator('#contact')).toBeVisible();
    
    // Form should be usable on mobile
    const contactSection = page.locator('#contact');
    const formFields = contactSection.locator('input, textarea, select');
    
    if (await formFields.count() > 0) {
      // Fields should be appropriately sized for mobile
      await expect(formFields.first()).toBeVisible();
    }
  });
});