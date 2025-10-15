import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to contact section
    await page.getByRole('button', { name: 'Contact' }).click();
    // Wait for section to be in viewport
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('should display the contact form', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    
    // Check form fields are present
    await expect(page.getByLabel('Full Name *')).toBeVisible();
    await expect(page.getByLabel('Email Address *')).toBeVisible();
    await expect(page.getByLabel('Subject *')).toBeVisible();
    await expect(page.getByLabel('Message *')).toBeVisible();
  });

  test('should show error toast when submitting empty form', async ({ page }) => {
    // Click submit button without filling the form
    await page.getByRole('button', { name: 'Send Message' }).click();
    
    // Check for error toast message
    await expect(page.getByText('Please enter your name')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    // Fill name
    await page.getByLabel('Full Name *').fill('John Doe');
    
    // Fill invalid email
    await page.getByLabel('Email Address *').fill('invalid-email');
    
    // Try to submit
    await page.getByRole('button', { name: 'Send Message' }).click();
    
    // Check for validation error
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  });

  test('should successfully submit contact form with valid data', async ({ page }) => {
    // Fill all required fields
    await page.getByLabel('Full Name *').fill('John Doe');
    await page.getByLabel('Email Address *').fill('john.doe@example.com');
    
    // Select inquiry type
    await page.locator('#inquiry-type').click();
    await page.getByRole('option', { name: 'General Information' }).click();
    
    await page.getByLabel('Subject *').fill('Test Inquiry');
    await page.getByLabel('Message *').fill('This is a test message to verify the contact form works correctly.');
    
    // Submit the form
    await page.getByRole('button', { name: 'Send Message' }).click();
    
    // Check for success message
    await expect(page.getByText('Thank you! Your message has been sent successfully.')).toBeVisible();
    
    // Verify form is reset
    await expect(page.getByLabel('Full Name *')).toHaveValue('');
    await expect(page.getByLabel('Email Address *')).toHaveValue('');
    await expect(page.getByLabel('Subject *')).toHaveValue('');
    await expect(page.getByLabel('Message *')).toHaveValue('');
  });

  test('should display contact information', async ({ page }) => {
    const contactSection = page.locator('#contact');
    
    // Check for contact information cards
    await expect(contactSection.getByText('Headquarters')).toBeVisible();
    await expect(contactSection.getByText('Phone')).toBeVisible();
    await expect(contactSection.getByText('Email')).toBeVisible();
    await expect(contactSection.getByText('Support Hours')).toBeVisible();
    
    // Check specific details
    await expect(contactSection.getByText('1 Hacker Way')).toBeVisible();
    await expect(contactSection.getByText('+1 (555) 123-ZAVA')).toBeVisible();
    await expect(contactSection.getByText('hello@zava.com')).toBeVisible();
  });

  test('should show all inquiry type options', async ({ page }) => {
    // Click the inquiry type dropdown
    await page.locator('#inquiry-type').click();
    
    // Check all options are available
    await expect(page.getByRole('option', { name: 'General Information' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Product Questions' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Partnership Opportunities' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Technical Support' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Press & Media' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Careers' })).toBeVisible();
  });
});
