import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/Zava/);
    
    // Check that the navigation bar is visible
    await expect(page.locator('nav')).toBeVisible();
    
    // Check that the logo is visible
    await expect(page.getByText('ZAVA')).toBeVisible();
  });

  test('should display the hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check that the hero section exists
    const heroSection = page.locator('#home');
    await expect(heroSection).toBeVisible();
  });

  test('should navigate between sections when clicking nav links', async ({ page }) => {
    await page.goto('/');
    
    // Click on Products in navigation
    await page.getByRole('button', { name: 'Products' }).click();
    
    // Check that the products section is in viewport (Playwright auto-waits for smooth scroll)
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
  });

  test('should navigate to Technology section', async ({ page }) => {
    await page.goto('/');
    
    // Click on Technology in navigation
    await page.getByRole('button', { name: 'Technology' }).click();
    
    // Check that the technology section is in viewport
    const technologySection = page.locator('#technology');
    await expect(technologySection).toBeInViewport();
  });

  test('should navigate to Contact section', async ({ page }) => {
    await page.goto('/');
    
    // Click on Contact in navigation
    await page.getByRole('button', { name: 'Contact' }).click();
    
    // Check that the contact section is in viewport
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('should display footer with company information', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check that footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check for ZAVA branding in footer
    await expect(footer.getByText('ZAVA')).toBeVisible();
  });
});
