import { test, expect } from '@playwright/test';

test.describe('Products Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to products section
    await page.locator('#products').scrollIntoViewIfNeeded();
  });

  test('should display products section', async ({ page }) => {
    // Check that products section is visible
    await expect(page.locator('#products')).toBeVisible();
    
    // Check section heading
    await expect(page.locator('#products h2')).toContainText(/products|smart/i);
  });

  test('should display product cards', async ({ page }) => {
    // Look for product cards - they should contain jersey and cleat products
    const productCards = page.locator('#products .card, #products [class*="card"]').first();
    await expect(productCards).toBeVisible();
    
    // Check for product-related text
    await expect(page.locator('#products')).toContainText(/jersey|cleat/i);
  });

  test('should have interactive product elements', async ({ page }) => {
    await page.waitForTimeout(1000); // Allow for animations
    
    // Look for interactive elements like buttons or links in products section
    const productSection = page.locator('#products');
    const buttons = productSection.locator('button, a[href], [role="button"]');
    
    if (await buttons.count() > 0) {
      // Test hover on first interactive element
      await buttons.first().hover();
      await page.waitForTimeout(500); // Allow for hover effects
      
      // Verify the element is still visible after hover
      await expect(buttons.first()).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that products section is still visible and functional on mobile
    await expect(page.locator('#products')).toBeVisible();
    
    // Products should stack or arrange appropriately on mobile
    const productSection = page.locator('#products');
    await expect(productSection).toBeVisible();
  });
});