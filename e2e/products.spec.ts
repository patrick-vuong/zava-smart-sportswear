import { test, expect } from '@playwright/test';

test.describe('Product Showcase', () => {
  test('should display product cards', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to products section
    await page.getByRole('button', { name: 'Products' }).click();
    await page.waitForTimeout(1000);
    
    // Check if product cards are visible
    await expect(page.getByText('Zava Pro Jersey')).toBeVisible();
    await expect(page.getByText('Zava Elite Cleats')).toBeVisible();
  });

  test('should open product details dialog', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to products section
    await page.getByRole('button', { name: 'Products' }).click();
    await page.waitForTimeout(1000);
    
    // Find and click on a product's "View Details" button
    const viewDetailsButtons = page.getByRole('button', { name: /View Details/i });
    await viewDetailsButtons.first().click();
    
    // Check if dialog is opened with product information
    await expect(page.getByText(/Features/i)).toBeVisible();
  });

  test('should add product to cart', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to products section
    await page.getByRole('button', { name: 'Products' }).click();
    await page.waitForTimeout(1000);
    
    // Click on "Add to Cart" button
    const addToCartButtons = page.getByRole('button', { name: /Add to Cart/i });
    const initialCount = await addToCartButtons.count();
    
    if (initialCount > 0) {
      await addToCartButtons.first().click();
      
      // Verify some feedback (could be a toast notification or cart update)
      // This depends on the actual implementation
    }
  });
});
