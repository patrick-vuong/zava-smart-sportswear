import { test, expect } from '@playwright/test';

test.describe('Homepage Navigation', () => {
  test('should load homepage and display navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check if the logo is visible
    await expect(page.getByText('ZAVA')).toBeVisible();
    
    // Check if main navigation items are present
    await expect(page.getByRole('button', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Technology' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Athletes' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Contact' })).toBeVisible();
  });

  test('should navigate to different sections', async ({ page }) => {
    await page.goto('/');
    
    // Click on Products navigation
    await page.getByRole('button', { name: 'Products' }).click();
    
    // Wait for smooth scroll to complete
    await page.waitForTimeout(1000);
    
    // Check if we're at the products section
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
  });

  test('should display footer with company information', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check footer content
    await expect(page.getByText('Unleashing athletic potential through smart sportswear technology.')).toBeVisible();
    await expect(page.getByText('© 2024 Zava. All rights reserved.')).toBeVisible();
  });
});
