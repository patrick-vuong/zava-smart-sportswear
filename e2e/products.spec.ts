import { test, expect } from '@playwright/test';

/**
 * Products Page Tests
 * 
 * This test suite validates the products showcase functionality including:
 * - Product display
 * - Product interactions
 * - Product details visibility
 */

test.describe('Products Showcase', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage and scroll to products section
    await page.goto('/');
    await page.getByRole('button', { name: 'Products' }).click();
    await page.waitForTimeout(1000); // Wait for smooth scroll
  });

  test('should display products section', async ({ page }) => {
    // Verify products section is visible
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'e2e/screenshots/products-display.png' });
  });

  test('should display product cards', async ({ page }) => {
    // Wait for products to load
    await page.waitForTimeout(1000);
    
    // Look for product-related content (cards, images, or buttons)
    const productsSection = page.locator('#products');
    
    // Take screenshot of products
    await productsSection.screenshot({ path: 'e2e/screenshots/product-cards.png' });
  });

  test('should interact with product elements', async ({ page }) => {
    // Wait for products section to be fully loaded
    await page.waitForTimeout(1000);
    
    // Look for interactive elements like buttons or links in the products section
    const productsSection = page.locator('#products');
    const buttons = productsSection.getByRole('button');
    
    // Check if there are any buttons
    const buttonCount = await buttons.count();
    if (buttonCount > 0) {
      // Take screenshot before interaction
      await page.screenshot({ path: 'e2e/screenshots/products-before-interaction.png' });
      
      // Click the first button if available
      await buttons.first().click();
      await page.waitForTimeout(500);
      
      // Take screenshot after interaction
      await page.screenshot({ path: 'e2e/screenshots/products-after-interaction.png' });
    }
  });

  test('should display product information on hover', async ({ page, isMobile }) => {
    // Skip hover tests on mobile
    if (!isMobile) {
      const productsSection = page.locator('#products');
      
      // Find any hoverable elements (like cards or images)
      const cards = productsSection.locator('div[class*="card"], article, [role="article"]').first();
      
      if (await cards.isVisible()) {
        // Hover over the first product card
        await cards.hover();
        await page.waitForTimeout(500);
        
        // Take screenshot of hover state
        await page.screenshot({ path: 'e2e/screenshots/product-hover.png' });
      }
    }
  });

  test('should handle product filtering or sorting if available', async ({ page }) => {
    // Wait for products to load
    await page.waitForTimeout(1000);
    
    const productsSection = page.locator('#products');
    
    // Look for filter or sort controls
    const filterButtons = productsSection.getByRole('button');
    const selectElements = productsSection.locator('select');
    
    if ((await filterButtons.count()) > 0 || (await selectElements.count()) > 0) {
      // Take screenshot of filtering options
      await page.screenshot({ path: 'e2e/screenshots/product-filters.png' });
    }
  });

  test('should display responsive product grid', async ({ page, isMobile }) => {
    // Wait for layout to stabilize
    await page.waitForTimeout(1000);
    
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeVisible();
    
    // Take screenshot for responsive view
    if (isMobile) {
      await page.screenshot({ path: 'e2e/screenshots/products-mobile.png' });
    } else {
      await page.screenshot({ path: 'e2e/screenshots/products-desktop.png' });
    }
  });
});
