import { test, expect } from '@playwright/test';

test.describe('Homepage and Hero Section', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads
    await expect(page).toHaveTitle(/Zava/i);
    
    // Verify hero section is visible
    await expect(page.locator('text=/smart sportswear/i').first()).toBeVisible();
  });

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/');
    
    // Check for navigation items
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=Products')).toBeVisible();
    await expect(page.locator('text=Technology')).toBeVisible();
    await expect(page.locator('text=Athletes')).toBeVisible();
    await expect(page.locator('text=About')).toBeVisible();
    await expect(page.locator('text=Contact')).toBeVisible();
  });

  test('should navigate to sections when clicking nav links', async ({ page }) => {
    await page.goto('/');
    
    // Click on Products navigation
    await page.locator('button:has-text("Products")').click();
    
    // Wait for smooth scroll
    await page.waitForTimeout(1000);
    
    // Verify we're at the products section
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
  });

  test('should display hero CTA button', async ({ page }) => {
    await page.goto('/');
    
    // Look for CTA buttons in the hero section
    const ctaButton = page.locator('button, a').filter({ hasText: /explore|shop|learn|discover/i }).first();
    await expect(ctaButton).toBeVisible();
  });
});
