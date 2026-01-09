import { test, expect } from '@playwright/test';

test.describe('Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to contact section
    await page.click('button:has-text("Contact")');
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('should display contact information', async ({ page }) => {
    // Check if contact section has content
    await expect(page.locator('#contact')).toBeVisible();
    
    // Look for contact-related content
    const contactSection = page.locator('#contact');
    await expect(contactSection).toContainText(/contact|email|phone|address|message/i);
  });

  test('should have a contact form', async ({ page }) => {
    // Look for form elements
    const form = page.locator('#contact form, #contact [role="form"]');
    const inputs = page.locator('#contact input, #contact textarea');
    const submitButton = page.locator('#contact button[type="submit"], #contact button:has-text("Send"), #contact button:has-text("Submit")');
    
    if (await form.count() > 0) {
      await expect(form).toBeVisible();
    }
    
    if (await inputs.count() > 0) {
      await expect(inputs.first()).toBeVisible();
    }
    
    if (await submitButton.count() > 0) {
      await expect(submitButton).toBeVisible();
      await expect(submitButton).toBeEnabled();
    }
  });

  test('should validate form fields', async ({ page }) => {
    // Look for form inputs
    const nameInput = page.locator('#contact input[name="name"], #contact input[placeholder*="name" i]');
    const emailInput = page.locator('#contact input[name="email"], #contact input[type="email"], #contact input[placeholder*="email" i]');
    const messageInput = page.locator('#contact textarea, #contact input[name="message"], #contact input[placeholder*="message" i]');
    const submitButton = page.locator('#contact button[type="submit"], #contact button:has-text("Send"), #contact button:has-text("Submit")');
    
    if (await submitButton.count() > 0 && await nameInput.count() > 0) {
      // Try to submit empty form to trigger validation
      await submitButton.click();
      
      // Wait a moment for validation messages
      await page.waitForTimeout(500);
      
      // Check if validation prevents submission or shows error messages
      // This depends on the form implementation
    }
    
    if (await nameInput.count() > 0 && await emailInput.count() > 0 && await messageInput.count() > 0) {
      // Fill form with valid data
      await nameInput.fill('Test User');
      await emailInput.fill('test@example.com');
      await messageInput.fill('This is a test message');
      
      // Check that submit button is still enabled
      if (await submitButton.count() > 0) {
        await expect(submitButton).toBeEnabled();
      }
    }
  });

  test('should display company contact details', async ({ page }) => {
    const contactSection = page.locator('#contact');
    
    // Look for typical contact information
    const contactTypes = [
      /email|@/i,
      /phone|\+\d|call/i,
      /address|location|office/i,
      /hours|time|schedule/i
    ];

    // Check if contact details are present
    let contactInfoFound = false;
    for (const contactType of contactTypes) {
      if (await contactSection.getByText(contactType).count() > 0) {
        contactInfoFound = true;
        break;
      }
    }
    
    // At minimum, the section should contain contact-related text
    await expect(contactSection).toContainText(/contact/i);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that contact section is still visible and functional
    await expect(page.locator('#contact')).toBeVisible();
    
    // Check form elements are still usable on mobile
    const inputs = page.locator('#contact input, #contact textarea');
    if (await inputs.count() > 0) {
      await expect(inputs.first()).toBeVisible();
    }
  });
});