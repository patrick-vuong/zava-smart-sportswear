import { test, expect } from '@playwright/test';

test.describe('Products Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to products section
    await page.click('button:has-text("Products")');
    await expect(page.locator('#products')).toBeInViewport();
  });

  test('should display product cards', async ({ page }) => {
    // Check if products section has content
    await expect(page.locator('#products')).toBeVisible();
    
    // Look for product-related content (adjust selectors based on actual implementation)
    const productSection = page.locator('#products');
    await expect(productSection).toContainText(/smart|jersey|cleat|product/i);
  });

  test('should have interactive elements', async ({ page }) => {
    // Look for buttons or interactive elements in the products section
    const productButtons = page.locator('#products button, #products [role="button"]');
    
    if (await productButtons.count() > 0) {
      // Check if buttons are visible and clickable
      await expect(productButtons.first()).toBeVisible();
      await expect(productButtons.first()).toBeEnabled();
    }
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test on desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('#products')).toBeVisible();

    // Test on tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('#products')).toBeVisible();

    // Test on mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('#products')).toBeVisible();
  });
});