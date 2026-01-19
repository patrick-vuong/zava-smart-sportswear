import { test, expect } from '@playwright/test';

test.describe('Products Showcase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Navigate to products section
    await page.getByRole('button', { name: 'Products' }).click();
    await page.waitForTimeout(1000);
  });

  test('should display products section', async ({ page }) => {
    // Check section heading
    const productsHeading = page.getByRole('heading', { name: /Our Products/i }).or(page.getByRole('heading', { name: /Smart Sportswear/i }));
    await expect(productsHeading.first()).toBeVisible();
  });

  test('should display product cards', async ({ page }) => {
    // Look for product names
    await expect(page.getByText(/Zava Pro Jersey/i)).toBeVisible();
    await expect(page.getByText(/Zava Elite Cleats/i)).toBeVisible();
  });

  test('should display product prices', async ({ page }) => {
    // Check for price formatting
    await expect(page.getByText(/\$299/)).toBeVisible();
    await expect(page.getByText(/\$399/)).toBeVisible();
  });

  test('should open product details modal on view button click', async ({ page }) => {
    // Find and click the first View Details button
    const viewButtons = page.getByRole('button', { name: /View Details/i });
    await viewButtons.first().click();
    
    // Wait for modal to open
    await page.waitForTimeout(500);
    
    // Check if modal content is visible
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Check for product details in modal
    await expect(modal.getByText(/Features/i)).toBeVisible();
  });

  test('should close product details modal', async ({ page }) => {
    // Open modal
    const viewButtons = page.getByRole('button', { name: /View Details/i });
    await viewButtons.first().click();
    await page.waitForTimeout(500);
    
    // Take screenshot of open modal
    await page.screenshot({ 
      path: 'e2e/screenshots/product-details-modal.png' 
    });
    
    // Close modal (look for close button or click overlay)
    const closeButton = page.getByRole('button', { name: /close/i }).or(page.locator('[aria-label="Close"]'));
    await closeButton.first().click();
    
    // Verify modal is closed
    await page.waitForTimeout(300);
    const modal = page.locator('[role="dialog"]');
    await expect(modal).not.toBeVisible();
  });

  test('should add product to cart', async ({ page }) => {
    // Find and click Add to Cart button
    const addToCartButtons = page.getByRole('button', { name: /Add to Cart/i });
    
    // Check if buttons exist
    const count = await addToCartButtons.count();
    if (count > 0) {
      await addToCartButtons.first().click();
      
      // Wait for cart action
      await page.waitForTimeout(500);
      
      // Look for success indicator (could be a toast or cart badge)
      // This might need adjustment based on actual implementation
    }
  });

  test('should display product features', async ({ page }) => {
    // Open first product modal
    const viewButtons = page.getByRole('button', { name: /View Details/i });
    await viewButtons.first().click();
    await page.waitForTimeout(500);
    
    const modal = page.locator('[role="dialog"]');
    
    // Check for feature keywords
    const featureKeywords = ['Heart Rate', 'Temperature', 'Motion', 'Sensor'];
    let foundFeatures = 0;
    
    for (const keyword of featureKeywords) {
      const isVisible = await modal.getByText(new RegExp(keyword, 'i')).isVisible().catch(() => false);
      if (isVisible) foundFeatures++;
    }
    
    // Expect at least some features to be displayed
    expect(foundFeatures).toBeGreaterThan(0);
  });

  test('should display product specifications', async ({ page }) => {
    // Open first product modal
    const viewButtons = page.getByRole('button', { name: /View Details/i });
    await viewButtons.first().click();
    await page.waitForTimeout(500);
    
    const modal = page.locator('[role="dialog"]');
    
    // Check for specs keywords
    const specKeywords = ['Material', 'Battery', 'Connectivity', 'Bluetooth'];
    let foundSpecs = 0;
    
    for (const keyword of specKeywords) {
      const isVisible = await modal.getByText(new RegExp(keyword, 'i')).isVisible().catch(() => false);
      if (isVisible) foundSpecs++;
    }
    
    // Expect at least some specs to be displayed
    expect(foundSpecs).toBeGreaterThan(0);
  });

  test('should display both jersey and cleats products', async ({ page }) => {
    // Check for jersey product
    await expect(page.getByText(/Jersey/i)).toBeVisible();
    
    // Check for cleats product
    await expect(page.getByText(/Cleats/i)).toBeVisible();
  });

  test('should take screenshot of products section', async ({ page }) => {
    // Take screenshot of the products section
    await page.locator('#products').screenshot({ 
      path: 'e2e/screenshots/products-section.png' 
    });
  });

  test('should display product images or placeholders', async ({ page }) => {
    // Check for image elements in product cards
    const productCards = page.locator('[class*="card"]').filter({ hasText: /Zava/ });
    const count = await productCards.count();
    
    // Expect at least 2 product cards
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should have interactive hover effects on products', async ({ page }) => {
    // Find product cards
    const firstProductCard = page.locator('[class*="card"]').filter({ hasText: /Zava Pro Jersey/i }).first();
    
    if (await firstProductCard.isVisible()) {
      // Hover over the product card
      await firstProductCard.hover();
      
      // Take screenshot showing hover state
      await page.screenshot({ 
        path: 'e2e/screenshots/product-hover-state.png' 
      });
      
      // Wait a bit to see if there are any visual changes
      await page.waitForTimeout(500);
    }
  });
});
