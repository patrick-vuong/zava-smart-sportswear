import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact section
    const contactButton = page.getByRole('button', { name: 'Contact' });
    await contactButton.click();
    
    // Wait for scroll animation
    await page.waitForTimeout(1000);
  });

  test('should display the contact form with all required fields', async ({ page }) => {
    // Check if form elements are visible
    const nameInput = page.locator('#name');
    const emailInput = page.locator('#email');
    const subjectInput = page.locator('#subject');
    const messageTextarea = page.locator('#message');
    const inquiryTypeSelect = page.locator('#inquiry-type');
    const submitButton = page.getByRole('button', { name: /Send Message/i });
    
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(subjectInput).toBeVisible();
    await expect(messageTextarea).toBeVisible();
    await expect(inquiryTypeSelect).toBeVisible();
    await expect(submitButton).toBeVisible();
  });

  test('should show validation errors when submitting empty form', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /Send Message/i });
    await submitButton.click();
    
    // Wait for toast notification
    await page.waitForTimeout(500);
    
    // Check if error toast appears (sonner toast library)
    const errorToast = page.getByText(/Please enter your name/i);
    await expect(errorToast).toBeVisible({ timeout: 2000 });
  });

  test('should show email validation error for invalid email', async ({ page }) => {
    // Fill in name
    await page.locator('#name').fill('John Doe');
    
    // Fill in invalid email
    await page.locator('#email').fill('invalid-email');
    
    // Fill other required fields
    await page.locator('#subject').fill('Test Subject');
    await page.locator('#message').fill('Test message');
    
    // Select inquiry type
    await page.locator('#inquiry-type').click();
    await page.getByRole('option', { name: 'General Information' }).click();
    
    // Submit form
    const submitButton = page.getByRole('button', { name: /Send Message/i });
    await submitButton.click();
    
    // Wait for toast notification
    await page.waitForTimeout(500);
    
    // Check if email validation error appears
    const errorToast = page.getByText(/Please enter a valid email address/i);
    await expect(errorToast).toBeVisible({ timeout: 2000 });
  });

  test('should successfully submit the contact form with valid data', async ({ page }) => {
    // Fill in all required fields with valid data
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john.doe@example.com');
    await page.locator('#subject').fill('Product Inquiry');
    await page.locator('#message').fill('I would like to learn more about your smart sportswear products.');
    
    // Select inquiry type
    await page.locator('#inquiry-type').click();
    await page.getByRole('option', { name: 'Product Questions' }).click();
    
    // Take screenshot before submission
    await page.screenshot({ 
      path: 'tests/e2e/screenshots/contact-form-filled.png' 
    });
    
    // Submit form
    const submitButton = page.getByRole('button', { name: /Send Message/i });
    await submitButton.click();
    
    // Wait for submission
    await page.waitForTimeout(1500);
    
    // Check if success toast appears
    const successToast = page.getByText(/Thank you! Your message has been sent successfully/i);
    await expect(successToast).toBeVisible({ timeout: 3000 });
    
    // Take screenshot after successful submission
    await page.screenshot({ 
      path: 'tests/e2e/screenshots/contact-form-success.png' 
    });
    
    // Verify form is cleared after successful submission
    const nameInput = page.locator('#name');
    await expect(nameInput).toHaveValue('');
  });

  test('should display contact information cards', async ({ page }) => {
    // Check if contact information cards are visible
    const headquartersCard = page.getByText('Headquarters');
    const phoneCard = page.getByText('Phone').first();
    const emailCard = page.getByText('Email').first();
    const supportHoursCard = page.getByText('Support Hours');
    
    await expect(headquartersCard).toBeVisible();
    await expect(phoneCard).toBeVisible();
    await expect(emailCard).toBeVisible();
    await expect(supportHoursCard).toBeVisible();
    
    // Take screenshot of contact section
    await page.screenshot({ 
      path: 'tests/e2e/screenshots/contact-section.png',
      fullPage: false 
    });
  });

  test('should handle form submission with loading state', async ({ page }) => {
    // Fill in valid data
    await page.locator('#name').fill('Jane Smith');
    await page.locator('#email').fill('jane.smith@example.com');
    await page.locator('#subject').fill('Support Request');
    await page.locator('#message').fill('I need help with my order.');
    
    // Select inquiry type
    await page.locator('#inquiry-type').click();
    await page.getByRole('option', { name: 'Technical Support' }).click();
    
    // Submit form
    const submitButton = page.getByRole('button', { name: /Send Message/i });
    await submitButton.click();
    
    // Check if loading state is shown
    const loadingButton = page.getByRole('button', { name: /Sending/i });
    await expect(loadingButton).toBeVisible({ timeout: 500 });
    
    // Button should be disabled during submission
    await expect(loadingButton).toBeDisabled();
  });
});
