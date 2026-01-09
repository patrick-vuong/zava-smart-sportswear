import { test, expect } from '@playwright/test';

test.describe('Products Section', () => {
  test('should display products section', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to products section
    await page.getByRole('button', { name: 'Products' }).click();
    await page.waitForTimeout(500);
    
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeVisible();
  });

  test('should display product cards', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to products
    await page.getByRole('button', { name: 'Products' }).click();
    await page.waitForTimeout(500);
    
    // Check for product-related content within the products section
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeVisible();
    
    // Products section should contain some content
    const content = await productsSection.textContent();
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);
  });

  test('should have interactive elements in products section', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to products
    await page.getByRole('button', { name: 'Products' }).click();
    await page.waitForTimeout(500);
    
    // Look for buttons within the products section
    const productsSection = page.locator('#products');
    const buttons = productsSection.locator('button');
    
    // Should have at least some interactive elements
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });
});
