import { test, expect } from '@playwright/test';

test.describe('Products Showcase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to products section
    await page.click('text=Products');
    await page.waitForTimeout(500); // Wait for smooth scroll
  });

  test('should display product cards', async ({ page }) => {
    // Check if products section is visible
    await expect(page.locator('#products')).toBeVisible();
    
    // Look for product-related content
    const hasProductContent = await page.locator('text=/smart jersey|smart cleat|product|feature/i').count() > 0;
    expect(hasProductContent).toBeTruthy();
  });

  test('should display product features', async ({ page }) => {
    // Wait for product cards to load
    await page.waitForTimeout(1000);
    
    // Check for common product features or specifications
    const hasFeatures = await page.locator('text=/performance|sensor|tracking|monitoring|technology|biometric/i').count() > 0;
    expect(hasFeatures).toBeTruthy();
  });

  test('should have interactive product elements', async ({ page }) => {
    // Wait for any animations to complete
    await page.waitForTimeout(1000);
    
    // Look for buttons or interactive elements in the products section
    const productButtons = page.locator('#products button, #products a[href], #products [role="button"]');
    const buttonCount = await productButtons.count();
    
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('should take screenshot of products section', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(1000);
    
    // Take screenshot of products section
    await page.screenshot({ path: 'tests/screenshots/products-section.png', fullPage: false });
  });

  test('should display products on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to products
    await page.goto('/');
    await page.click('text=Products');
    await page.waitForTimeout(500);
    
    // Check if products section is still visible on mobile
    await expect(page.locator('#products')).toBeVisible();
    
    // Take mobile screenshot
    await page.screenshot({ path: 'tests/screenshots/products-mobile.png', fullPage: false });
  });
});
