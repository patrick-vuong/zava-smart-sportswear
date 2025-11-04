import { test, expect } from '@playwright/test';

test.describe('Zava Smart Sportswear - Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    // Navigate to contact section
    await page.getByRole('button', { name: 'Contact' }).click();
    await expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();
  });

  test('should display contact form elements', async ({ page }) => {
    // Check form fields are present
    await expect(page.getByRole('textbox', { name: 'Full Name *' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email Address *' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Inquiry Type *' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Subject *' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Message *' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible();
  });

  test('should allow filling out contact form', async ({ page }) => {
    // Fill out the form
    await page.getByRole('textbox', { name: 'Full Name *' }).fill('John Doe');
    await page.getByRole('textbox', { name: 'Email Address *' }).fill('john.doe@example.com');
    await page.getByRole('textbox', { name: 'Subject *' }).fill('Test Inquiry');
    await page.getByRole('textbox', { name: 'Message *' }).fill('This is a test message for Playwright testing.');
    
    // Check that values were entered
    await expect(page.getByRole('textbox', { name: 'Full Name *' })).toHaveValue('John Doe');
    await expect(page.getByRole('textbox', { name: 'Email Address *' })).toHaveValue('john.doe@example.com');
    await expect(page.getByRole('textbox', { name: 'Subject *' })).toHaveValue('Test Inquiry');
    await expect(page.getByRole('textbox', { name: 'Message *' })).toHaveValue('This is a test message for Playwright testing.');
  });

  test('should display contact information', async ({ page }) => {
    // Check contact information sections
    await expect(page.getByRole('heading', { name: 'Headquarters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Phone' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Support Hours' })).toBeVisible();
    
    // Check specific contact details
    await expect(page.getByText('1 Hacker Way')).toBeVisible();
    await expect(page.getByText('Palo Alto, CA 94301')).toBeVisible();
    await expect(page.getByText('+1 (555) 123-ZAVA')).toBeVisible();
    await expect(page.getByText('hello@zava.com')).toBeVisible();
    await expect(page.getByText('support@zava.com')).toBeVisible();
  });

  test('should display trust indicators', async ({ page }) => {
    // Check "Why Choose Zava?" section
    await expect(page.getByRole('heading', { name: 'Why Choose Zava?' })).toBeVisible();
    
    // Check trust indicators
    await expect(page.getByText('Trusted by 500+ professional athletes')).toBeVisible();
    await expect(page.getByText('24/7 technical support')).toBeVisible();
    await expect(page.getByText('30-day money-back guarantee')).toBeVisible();
    await expect(page.getByText('Worldwide shipping available')).toBeVisible();
  });
});