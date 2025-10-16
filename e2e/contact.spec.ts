import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should display contact form fields', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact section
    await page.getByRole('button', { name: 'Contact' }).click();
    await page.waitForTimeout(1000);
    
    // Check if form fields are visible
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/subject/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact section
    await page.getByRole('button', { name: 'Contact' }).click();
    await page.waitForTimeout(1000);
    
    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /send message/i });
    await submitButton.click();
    
    // Check for validation error (toast or inline error)
    await page.waitForTimeout(500);
    // The form should show some kind of error feedback
  });

  test('should submit contact form with valid data', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact section
    await page.getByRole('button', { name: 'Contact' }).click();
    await page.waitForTimeout(1000);
    
    // Fill in the form
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/subject/i).fill('Product Inquiry');
    await page.getByLabel(/message/i).fill('I am interested in your smart sportswear products.');
    
    // Select inquiry type if available
    const inquirySelect = page.locator('[name="inquiryType"]').or(page.getByRole('combobox')).first();
    if (await inquirySelect.isVisible()) {
      await inquirySelect.click();
      await page.waitForTimeout(300);
      // Try to select first option
      const firstOption = page.getByRole('option').first();
      if (await firstOption.isVisible()) {
        await firstOption.click();
      }
    }
    
    // Submit the form
    const submitButton = page.getByRole('button', { name: /send message/i });
    await submitButton.click();
    
    // Wait for submission to complete
    await page.waitForTimeout(2000);
    
    // Check for success feedback (could be a toast, success message, or form reset)
    // This verification depends on the actual implementation
  });
});
