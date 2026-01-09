import { test, expect } from '@playwright/test';

test.describe('Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to contact section
    await page.locator('button:has-text("Contact")').click();
    await page.waitForTimeout(500);
  });

  test('should display contact section', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    await expect(contactSection).toBeInViewport();
  });

  test('should display contact form', async ({ page }) => {
    const contactSection = page.locator('#contact');
    
    // Look for form element
    const form = contactSection.locator('form');
    await expect(form).toBeVisible();
  });

  test('should have required form fields', async ({ page }) => {
    const contactSection = page.locator('#contact');
    
    // Check for common form inputs
    const inputs = contactSection.locator('input, textarea');
    const count = await inputs.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('should have form labels', async ({ page }) => {
    const contactSection = page.locator('#contact');
    
    // Look for form labels
    const labels = contactSection.locator('label, text=/name|email|message|subject/i');
    const count = await labels.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('should have submit button', async ({ page }) => {
    const contactSection = page.locator('#contact');
    
    // Look for submit button
    const submitButton = contactSection.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Send")');
    await expect(submitButton.first()).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    const contactSection = page.locator('#contact');
    
    // Look for contact details
    const contactInfo = contactSection.locator('text=/email|phone|address|location/i');
    
    // Should have at least some contact information
    const count = await contactInfo.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should validate empty form submission', async ({ page }) => {
    const contactSection = page.locator('#contact');
    
    // Try to submit empty form
    const submitButton = contactSection.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Send")').first();
    
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // Should show some form of validation
      // Either native HTML5 validation or custom validation messages
      await page.waitForTimeout(500);
      
      // Form should still be visible (not submitted)
      await expect(contactSection.locator('form')).toBeVisible();
    }
  });
});
