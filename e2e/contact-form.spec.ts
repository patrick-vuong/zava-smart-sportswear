import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact section
    await page.getByRole('button', { name: 'Contact' }).click();
    await page.waitForTimeout(1000);
  });

  test('should display the contact form', async ({ page }) => {
    // Check if contact section is visible
    await expect(page.getByText('Get in Touch')).toBeVisible();
    await expect(page.getByText('Send us a Message')).toBeVisible();
    
    // Check form fields
    await expect(page.getByLabel('Full Name *')).toBeVisible();
    await expect(page.getByLabel('Email Address *')).toBeVisible();
    await expect(page.getByLabel('Inquiry Type *')).toBeVisible();
    await expect(page.getByLabel('Subject *')).toBeVisible();
    await expect(page.getByLabel('Message *')).toBeVisible();
  });

  test('should display contact information cards', async ({ page }) => {
    // Check contact info sections
    await expect(page.getByText('Headquarters')).toBeVisible();
    await expect(page.getByText('1 Hacker Way')).toBeVisible();
    
    await expect(page.getByText('Phone')).toBeVisible();
    await expect(page.getByText('+1 (555) 123-ZAVA')).toBeVisible();
    
    await expect(page.getByText('Email').first()).toBeVisible();
    await expect(page.getByText('hello@zava.com')).toBeVisible();
  });

  test('should show validation error for empty form submission', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: /Send Message/i }).click();
    
    // Wait for validation message (toast)
    await page.waitForTimeout(500);
    
    // Check if error toast appears
    await expect(page.getByText(/Please enter your name/i)).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    // Fill name
    await page.getByLabel('Full Name *').fill('John Doe');
    
    // Fill invalid email
    await page.getByLabel('Email Address *').fill('invalid-email');
    
    // Try to submit
    await page.getByRole('button', { name: /Send Message/i }).click();
    
    // Wait for validation
    await page.waitForTimeout(500);
    
    // Check for email validation error
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test('should successfully submit contact form with valid data', async ({ page }) => {
    // Fill out the form
    await page.getByLabel('Full Name *').fill('Jane Smith');
    await page.getByLabel('Email Address *').fill('jane.smith@example.com');
    
    // Select inquiry type
    await page.getByLabel('Inquiry Type *').click();
    await page.getByRole('option', { name: 'General Information' }).click();
    
    await page.getByLabel('Subject *').fill('Product Inquiry');
    await page.getByLabel('Message *').fill('I would like to learn more about your smart jerseys.');
    
    // Take a screenshot before submission
    await page.screenshot({ 
      path: 'e2e/screenshots/contact-form-filled.png' 
    });
    
    // Submit the form
    await page.getByRole('button', { name: /Send Message/i }).click();
    
    // Wait for submission
    await page.waitForTimeout(2000);
    
    // Check for success message
    await expect(page.getByText(/Thank you!/i)).toBeVisible();
    await expect(page.getByText(/message has been sent successfully/i)).toBeVisible();
    
    // Take a screenshot after successful submission
    await page.screenshot({ 
      path: 'e2e/screenshots/contact-form-success.png' 
    });
    
    // Verify form is cleared
    await expect(page.getByLabel('Full Name *')).toHaveValue('');
    await expect(page.getByLabel('Email Address *')).toHaveValue('');
  });

  test('should display loading state during form submission', async ({ page }) => {
    // Fill out the form
    await page.getByLabel('Full Name *').fill('Test User');
    await page.getByLabel('Email Address *').fill('test@example.com');
    
    await page.getByLabel('Inquiry Type *').click();
    await page.getByRole('option', { name: 'Product Questions' }).click();
    
    await page.getByLabel('Subject *').fill('Test Subject');
    await page.getByLabel('Message *').fill('Test message content');
    
    // Submit the form
    await page.getByRole('button', { name: /Send Message/i }).click();
    
    // Check for loading state
    await expect(page.getByText(/Sending.../i)).toBeVisible();
  });

  test('should test all inquiry type options', async ({ page }) => {
    const inquiryTypes = [
      'General Information',
      'Product Questions',
      'Partnership Opportunities',
      'Technical Support',
      'Press & Media',
      'Careers'
    ];
    
    for (const type of inquiryTypes) {
      await page.getByLabel('Inquiry Type *').click();
      await page.getByRole('option', { name: type }).click();
      
      // Verify selection
      await expect(page.getByLabel('Inquiry Type *')).toContainText(type);
    }
  });

  test('should take screenshot of contact section', async ({ page }) => {
    // Take screenshot of the contact section
    await page.locator('#contact').screenshot({ 
      path: 'e2e/screenshots/contact-section.png' 
    });
  });
});
