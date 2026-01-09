import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/');

    // Check that the page loads
    await expect(page).toHaveTitle(/Zava Smart Sportswear/);

    // Check hero section elements
    await expect(page.locator('h1')).toContainText('Unleash Your Potential');
    
    // Check that navigation exists
    await expect(page.locator('nav')).toBeVisible();
    
    // Check main action buttons in hero
    await expect(page.locator('text=Shop Now')).toBeVisible();
    await expect(page.locator('text=Watch Demo')).toBeVisible();
  });

  test('should have responsive navigation', async ({ page }) => {
    await page.goto('/');
    
    // On desktop, navigation should be visible
    await expect(page.locator('nav')).toBeVisible();
    
    // Test mobile navigation by resizing viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Mobile menu button should be visible on small screens
    await expect(page.locator('[role="button"]').filter({ hasText: /menu/i }).first()).toBeVisible();
  });

  test('should navigate between sections', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to different sections
    const sections = ['products', 'technology', 'athletes', 'about', 'contact'];
    
    for (const section of sections) {
      // Check if section exists on page
      const sectionElement = page.locator(`#${section}`);
      await expect(sectionElement).toBeVisible();
    }
  });

  test('should have working scroll navigation', async ({ page }) => {
    await page.goto('/');
    
    // Click on "Shop Now" button and verify it scrolls to products
    await page.locator('text=Shop Now').click();
    
    // Wait for scroll animation to complete
    await page.waitForTimeout(1000);
    
    // Verify we're at or near the products section
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeVisible();
  });
});