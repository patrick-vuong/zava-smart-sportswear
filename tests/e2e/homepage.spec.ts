import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page title is correct
    await expect(page).toHaveTitle(/Zava/i);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check for hero content - looking for main heading
    const heroSection = page.locator('#home');
    await expect(heroSection).toBeVisible();
  });

  test('should have all navigation items', async ({ page }) => {
    await page.goto('/');
    
    // Check for navigation items
    const navItems = ['Home', 'Products', 'Technology', 'Athletes', 'About', 'Contact'];
    
    for (const item of navItems) {
      const navButton = page.getByRole('button', { name: item });
      await expect(navButton).toBeVisible();
    }
  });

  test('should navigate to different sections', async ({ page }) => {
    await page.goto('/');
    
    // Click on Products navigation
    await page.getByRole('button', { name: 'Products' }).click();
    
    // Wait for smooth scroll to complete
    await page.waitForTimeout(1000);
    
    // Check if products section is visible
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeVisible();
  });
});
