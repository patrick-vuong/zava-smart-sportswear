import { test, expect } from '@playwright/test';

test.describe('Products Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to products section
    await page.locator('button:has-text("Products")').click();
    await page.waitForTimeout(500);
  });

  test('should display products section', async ({ page }) => {
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeVisible();
  });

  test('should display product cards', async ({ page }) => {
    // Look for product-related keywords
    const productContent = page.locator('#products');
    
    // Should show smart jersey or smart cleats
    await expect(productContent.locator('text=/jersey|cleat/i').first()).toBeVisible();
  });

  test('should show product features', async ({ page }) => {
    const productsSection = page.locator('#products');
    
    // Products should mention technology or features
    await expect(productsSection.locator('text=/sensor|smart|performance|technology/i').first()).toBeVisible();
  });

  test('should have interactive product elements', async ({ page }) => {
    // Check for interactive elements in products section
    const productsSection = page.locator('#products');
    const buttons = productsSection.locator('button, a');
    
    // Should have at least one interactive element
    await expect(buttons.first()).toBeVisible();
  });

  test('should display product prices or purchase options', async ({ page }) => {
    const productsSection = page.locator('#products');
    
    // Look for purchase-related elements
    const purchaseElements = productsSection.locator('text=/shop|buy|order|price|cart/i');
    
    // Count should be at least 1
    const count = await purchaseElements.count();
    expect(count).toBeGreaterThan(0);
  });
});
