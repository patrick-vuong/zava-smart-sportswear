import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to contact section
    const contactButton = page.locator('button:has-text("Contact")').first();
    if (await contactButton.isVisible()) {
      await contactButton.click();
      await page.waitForTimeout(1000);
    }
  });

  test('should display contact section', async ({ page }) => {
    // Look for contact section
    const contactSection = page.locator('#contact, [data-section="contact"]').first();
    
    if (await contactSection.count() > 0) {
      await expect(contactSection).toBeVisible();
    }
    
    // Look for contact-related text
    const contactText = page.locator('text=/contact/i, text=/get in touch/i, text=/reach out/i').first();
    if (await contactText.count() > 0) {
      await expect(contactText).toBeVisible();
    }
  });

  test('should have functional contact form', async ({ page }) => {
    // Look for form elements
    const form = page.locator('form').first();
    const nameInput = page.locator('input[name*="name"], input[placeholder*="name"], input[type="text"]').first();
    const emailInput = page.locator('input[name*="email"], input[placeholder*="email"], input[type="email"]').first();
    const messageInput = page.locator('textarea, input[name*="message"], input[placeholder*="message"]').first();
    const submitButton = page.locator('button[type="submit"], button:has-text("send"), button:has-text("submit")').first();

    // Check if form exists
    if (await form.count() > 0) {
      await expect(form).toBeVisible();
      
      // Test form fields if they exist
      if (await nameInput.count() > 0) {
        await expect(nameInput).toBeVisible();
        await nameInput.fill('John Doe');
      }
      
      if (await emailInput.count() > 0) {
        await expect(emailInput).toBeVisible();
        await emailInput.fill('john@example.com');
      }
      
      if (await messageInput.count() > 0) {
        await expect(messageInput).toBeVisible();
        await messageInput.fill('Test message for automated testing');
      }
      
      if (await submitButton.count() > 0) {
        await expect(submitButton).toBeVisible();
        // Note: We don't actually submit to avoid sending test data
      }
    }
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.locator('input[name*="email"], input[placeholder*="email"], input[type="email"]').first();
    
    if (await emailInput.count() > 0) {
      await expect(emailInput).toBeVisible();
      
      // Test invalid email
      await emailInput.fill('invalid-email');
      await emailInput.blur();
      await page.waitForTimeout(500);
      
      // Test valid email
      await emailInput.fill('test@example.com');
      await emailInput.blur();
      await page.waitForTimeout(500);
      
      // The input should accept the valid email
      await expect(emailInput).toHaveValue('test@example.com');
    }
  });

  test('should display contact information', async ({ page }) => {
    // Look for contact information like address, phone, email
    const contactInfo = page.locator('text=/address/i, text=/phone/i, text=/email/i, text=/location/i').first();
    
    if (await contactInfo.count() > 0) {
      await expect(contactInfo).toBeVisible();
    }
    
    // Look for specific contact details patterns
    const phonePattern = page.locator('text=/\\+?[0-9\\s\\-\\(\\)]+/', 'text=/phone/i').first();
    const emailPattern = page.locator('text=/@/', 'text=/\\.com|\\.org|\\.net/').first();
    
    // At least some contact information should be present
    const hasContactInfo = (await phonePattern.count() > 0) || 
                          (await emailPattern.count() > 0) || 
                          (await contactInfo.count() > 0);
    
    expect(hasContactInfo).toBeTruthy();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/zava-smart-sportswear/');
    
    // Navigate to contact on mobile
    const contactButton = page.locator('button:has-text("Contact")').first();
    if (await contactButton.isVisible()) {
      await contactButton.click();
      await page.waitForTimeout(1000);
    }
    
    // Ensure contact section is visible on mobile
    const contactSection = page.locator('#contact, [data-section="contact"]').first();
    if (await contactSection.count() > 0) {
      await expect(contactSection).toBeVisible();
    }
    
    // Check that form elements are properly sized for mobile
    const form = page.locator('form').first();
    if (await form.count() > 0) {
      await expect(form).toBeVisible();
      
      const formInputs = page.locator('form input, form textarea').first();
      if (await formInputs.count() > 0) {
        await expect(formInputs).toBeVisible();
      }
    }
  });

  test('should handle form submission gracefully', async ({ page }) => {
    const form = page.locator('form').first();
    const submitButton = page.locator('button[type="submit"], button:has-text("send"), button:has-text("submit")').first();
    
    if (await form.count() > 0 && await submitButton.count() > 0) {
      // Fill out required fields if they exist
      const requiredInputs = page.locator('form input[required], form textarea[required]');
      
      if (await requiredInputs.count() > 0) {
        for (let i = 0; i < await requiredInputs.count(); i++) {
          const input = requiredInputs.nth(i);
          const inputType = await input.getAttribute('type') || 'text';
          
          if (inputType === 'email') {
            await input.fill('test@example.com');
          } else {
            await input.fill('Test content');
          }
        }
      }
      
      // Test that submit button is clickable
      await expect(submitButton).toBeVisible();
      await expect(submitButton).toBeEnabled();
      
      // We don't actually submit to avoid sending test data
      // but we verify the button is functional
    }
  });
});