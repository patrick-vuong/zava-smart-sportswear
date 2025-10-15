import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to contact section
    await page.locator('section#contact').scrollIntoViewIfNeeded();
  });

  test('should display contact section with form', async ({ page }) => {
    const contactSection = page.locator('section#contact');
    await expect(contactSection).toBeVisible();

    // Check for form elements
    const nameInput = page.getByLabel(/name/i);
    await expect(nameInput).toBeVisible();

    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeVisible();

    const subjectInput = page.getByLabel(/subject/i);
    await expect(subjectInput).toBeVisible();

    const messageInput = page.getByLabel(/message/i);
    await expect(messageInput).toBeVisible();
  });

  test('should show validation error for empty name', async ({ page }) => {
    await page.locator('section#contact').scrollIntoViewIfNeeded();
    
    // Try to submit without filling name
    const submitButton = page.getByRole('button', { name: /send message/i });
    await submitButton.click();

    // Wait for error toast
    await page.waitForTimeout(500);
    
    // Check for error message
    const errorToast = page.getByText(/please enter your name/i);
    await expect(errorToast).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.locator('section#contact').scrollIntoViewIfNeeded();
    
    // Fill name
    const nameInput = page.getByLabel(/name/i);
    await nameInput.fill('John Doe');

    // Fill invalid email
    const emailInput = page.getByLabel(/email/i);
    await emailInput.fill('invalid-email');

    // Try to submit
    const submitButton = page.getByRole('button', { name: /send message/i });
    await submitButton.click();

    // Wait for error toast
    await page.waitForTimeout(500);
    
    // Check for error message
    const errorToast = page.getByText(/valid email address/i);
    await expect(errorToast).toBeVisible();
  });

  test('should successfully submit contact form with valid data', async ({ page }) => {
    await page.locator('section#contact').scrollIntoViewIfNeeded();
    
    // Fill out the form
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john.doe@example.com');
    await page.getByLabel(/subject/i).fill('Product Inquiry');
    await page.getByLabel(/message/i).fill('I would like to learn more about your smart jerseys.');
    
    // Select inquiry type
    await page.getByRole('combobox').click();
    await page.waitForTimeout(300);
    await page.getByRole('option', { name: /product inquiry/i }).click();

    // Submit the form
    const submitButton = page.getByRole('button', { name: /send message/i });
    await submitButton.click();

    // Wait for success message
    await page.waitForTimeout(1500);
    
    // Check for success toast
    const successToast = page.getByText(/thank you.*message has been sent/i);
    await expect(successToast).toBeVisible();
  });

  test('should clear form after successful submission', async ({ page }) => {
    await page.locator('section#contact').scrollIntoViewIfNeeded();
    
    // Fill out the form
    await page.getByLabel(/name/i).fill('Jane Smith');
    await page.getByLabel(/email/i).fill('jane.smith@example.com');
    await page.getByLabel(/subject/i).fill('General Question');
    await page.getByLabel(/message/i).fill('This is a test message.');
    
    // Select inquiry type
    await page.getByRole('combobox').click();
    await page.waitForTimeout(300);
    await page.getByRole('option').first().click();

    // Submit the form
    const submitButton = page.getByRole('button', { name: /send message/i });
    await submitButton.click();

    // Wait for form to clear
    await page.waitForTimeout(2000);
    
    // Check that form fields are empty
    const nameInput = page.getByLabel(/name/i);
    await expect(nameInput).toHaveValue('');
    
    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toHaveValue('');
  });

  test('should display contact information', async ({ page }) => {
    await page.locator('section#contact').scrollIntoViewIfNeeded();
    
    // Contact section should have company information
    const contactSection = page.locator('section#contact');
    await expect(contactSection).toBeVisible();
    
    // This verifies the section is present and interactive
    await expect(contactSection).toContainText(/contact/i);
  });
});
