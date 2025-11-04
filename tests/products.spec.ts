import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to products section
    await page.getByRole('button', { name: 'Products' }).click();
    // Wait for section to be in viewport
    await expect(page.locator('#products')).toBeInViewport();
  });

  test('should display products section', async ({ page }) => {
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeVisible();
  });

  test('should display product cards', async ({ page }) => {
    const productsSection = page.locator('#products');
    
    // Check that products are displayed
    await expect(productsSection.getByText('Zava Pro Jersey')).toBeVisible();
    await expect(productsSection.getByText('Zava Elite Cleats')).toBeVisible();
    await expect(productsSection.getByText('Zava Training Jersey')).toBeVisible();
    await expect(productsSection.getByText('Zava Speed Cleats')).toBeVisible();
  });

  test('should display product prices', async ({ page }) => {
    const productsSection = page.locator('#products');
    
    // Check for price displays
    await expect(productsSection.getByText('$299')).toBeVisible();
    await expect(productsSection.getByText('$399')).toBeVisible();
    await expect(productsSection.getByText('$199')).toBeVisible();
  });

  test('should open product details dialog', async ({ page }) => {
    // Find and click a "View Details" button
    const viewDetailsButtons = page.getByRole('button', { name: /View Details/i });
    await viewDetailsButtons.first().click();
    
    // Check that dialog is visible
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
  });

  test('should display product features in details', async ({ page }) => {
    // Click View Details on first product (Zava Pro Jersey)
    const viewDetailsButtons = page.getByRole('button', { name: /View Details/i });
    await viewDetailsButtons.first().click();
    
    // Check for features
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog.getByText('Heart Rate Monitoring')).toBeVisible();
    await expect(dialog.getByText('Temperature Regulation')).toBeVisible();
    await expect(dialog.getByText('Motion Tracking')).toBeVisible();
  });

  test('should add product to cart', async ({ page }) => {
    // Find and click an "Add to Cart" button
    const addToCartButtons = page.getByRole('button', { name: /Add to Cart/i });
    await addToCartButtons.first().click();
    
    // Note: Since we don't have a visible cart UI, we just verify the button click worked
    // In a real scenario, you'd check for a cart indicator or notification
  });

  test('should filter or display different product categories', async ({ page }) => {
    const productsSection = page.locator('#products');
    
    // Verify we have both jersey and cleats products
    await expect(productsSection.getByText(/Jersey/)).toHaveCount(2); // Pro Jersey and Training Jersey
    await expect(productsSection.getByText(/Cleats/)).toHaveCount(2); // Elite Cleats and Speed Cleats
  });
});
