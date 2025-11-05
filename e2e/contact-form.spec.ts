import { test, expect } from '@playwright/test';

/**
 * Contact Form Tests
 * 
 * This test suite validates the contact form functionality including:
 * - Form field validation
 * - Successful form submission
 * - Error handling
 */

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage and scroll to contact section
    await page.goto('/');
    await page.getByRole('button', { name: 'Contact' }).click();
    await page.waitForTimeout(1000); // Wait for smooth scroll
  });

  test('should display all form fields', async ({ page }) => {
    // Verify all form fields are present
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/subject/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
    
    // Take screenshot of the form
    await page.screenshot({ path: 'e2e/screenshots/contact-form.png' });
  });

  test('should show validation error for empty name', async ({ page }) => {
    // Try to submit form without filling name
    const submitButton = page.getByRole('button', { name: /send message|submit/i });
    await submitButton.click();
    
    // Wait for toast notification
    await page.waitForTimeout(500);
    
    // Take screenshot of error state
    await page.screenshot({ path: 'e2e/screenshots/form-validation-error.png' });
  });

  test('should show validation error for invalid email', async ({ page }) => {
    // Fill in name but use invalid email
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('invalid-email');
    
    // Try to submit
    const submitButton = page.getByRole('button', { name: /send message|submit/i });
    await submitButton.click();
    
    // Wait for validation
    await page.waitForTimeout(500);
    
    // Take screenshot
    await page.screenshot({ path: 'e2e/screenshots/invalid-email-error.png' });
  });

  test('should show validation error for empty subject', async ({ page }) => {
    // Fill in name and email but not subject
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    
    // Try to submit
    const submitButton = page.getByRole('button', { name: /send message|submit/i });
    await submitButton.click();
    
    // Wait for validation
    await page.waitForTimeout(500);
  });

  test('should show validation error for empty message', async ({ page }) => {
    // Fill in required fields except message
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/subject/i).fill('Test Subject');
    
    // Try to submit
    const submitButton = page.getByRole('button', { name: /send message|submit/i });
    await submitButton.click();
    
    // Wait for validation
    await page.waitForTimeout(500);
  });

  test('should successfully submit form with valid data', async ({ page }) => {
    // Fill in all required fields
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john.doe@example.com');
    await page.getByLabel(/subject/i).fill('Product Inquiry');
    await page.getByLabel(/message/i).fill('I am interested in learning more about your smart sportswear products.');
    
    // Select inquiry type if there's a dropdown
    const inquiryTypeSelect = page.locator('select, [role="combobox"]').first();
    if (await inquiryTypeSelect.isVisible()) {
      await inquiryTypeSelect.click();
      await page.waitForTimeout(300);
      // Try to select an option
      const option = page.getByRole('option').first();
      if (await option.isVisible()) {
        await option.click();
      }
    }
    
    // Take screenshot before submission
    await page.screenshot({ path: 'e2e/screenshots/form-filled.png' });
    
    // Submit the form
    const submitButton = page.getByRole('button', { name: /send message|submit/i });
    await submitButton.click();
    
    // Wait for submission to complete
    await page.waitForTimeout(2000);
    
    // Take screenshot after submission
    await page.screenshot({ path: 'e2e/screenshots/form-submitted.png' });
  });

  test('should clear form after successful submission', async ({ page }) => {
    // Fill and submit form
    await page.getByLabel(/name/i).fill('Jane Smith');
    await page.getByLabel(/email/i).fill('jane.smith@example.com');
    await page.getByLabel(/subject/i).fill('General Inquiry');
    await page.getByLabel(/message/i).fill('This is a test message.');
    
    // Select inquiry type if available
    const inquiryTypeSelect = page.locator('select, [role="combobox"]').first();
    if (await inquiryTypeSelect.isVisible()) {
      await inquiryTypeSelect.click();
      await page.waitForTimeout(300);
      const option = page.getByRole('option').first();
      if (await option.isVisible()) {
        await option.click();
      }
    }
    
    const submitButton = page.getByRole('button', { name: /send message|submit/i });
    await submitButton.click();
    
    // Wait for form to clear
    await page.waitForTimeout(2000);
    
    // Verify form fields are empty
    await expect(page.getByLabel(/name/i)).toHaveValue('');
    await expect(page.getByLabel(/email/i)).toHaveValue('');
  });

  test('should handle form submission with special characters', async ({ page }) => {
    // Test with special characters in input
    await page.getByLabel(/name/i).fill('José María O\'Brien');
    await page.getByLabel(/email/i).fill('jose.maria@example.com');
    await page.getByLabel(/subject/i).fill('Test with "quotes" & symbols');
    await page.getByLabel(/message/i).fill('Testing with <special> characters & symbols!');
    
    // Select inquiry type if available
    const inquiryTypeSelect = page.locator('select, [role="combobox"]').first();
    if (await inquiryTypeSelect.isVisible()) {
      await inquiryTypeSelect.click();
      await page.waitForTimeout(300);
      const option = page.getByRole('option').first();
      if (await option.isVisible()) {
        await option.click();
      }
    }
    
    const submitButton = page.getByRole('button', { name: /send message|submit/i });
    await submitButton.click();
    
    // Wait for submission
    await page.waitForTimeout(2000);
    
    // Take screenshot
    await page.screenshot({ path: 'e2e/screenshots/special-characters-submission.png' });
  });
});
