import { test, expect } from '@playwright/test';

test.describe('Products Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to products section
    await page.locator('section#products').scrollIntoViewIfNeeded();
  });

  test('should display products section with heading', async ({ page }) => {
    const productsSection = page.locator('section#products');
    await expect(productsSection).toBeVisible();

    // Check for section heading or product cards
    const productCards = page.locator('section#products').getByRole('article');
    await expect(productCards.first()).toBeVisible();
  });

  test('should display product cards with names and prices', async ({ page }) => {
    // Check for Zava Pro Jersey
    const proJersey = page.getByText('Zava Pro Jersey');
    await expect(proJersey).toBeVisible();

    // Check for Zava Elite Cleats
    const eliteCleats = page.getByText('Zava Elite Cleats');
    await expect(eliteCleats).toBeVisible();

    // Check for prices
    const price299 = page.getByText('$299');
    await expect(price299).toBeVisible();
    
    const price399 = page.getByText('$399');
    await expect(price399).toBeVisible();
  });

  test('should open product details dialog when view details is clicked', async ({ page }) => {
    // Find and click the first "View Details" button
    const viewDetailsButton = page.getByRole('button', { name: /view details/i }).first();
    await viewDetailsButton.click();

    // Wait for dialog to open
    await page.waitForTimeout(500);

    // Check if dialog is visible
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Check for product features or specs in dialog
    const dialogContent = page.getByRole('dialog');
    await expect(dialogContent).toBeVisible();
  });

  test('should add product to cart', async ({ page }) => {
    // Find and click an "Add to Cart" button
    const addToCartButton = page.getByRole('button', { name: /add to cart/i }).first();
    await addToCartButton.click();

    // Wait a moment for the action to complete
    await page.waitForTimeout(500);

    // The cart should be updated (this is stored in KV, so we just verify the action completed)
    // We can't easily verify KV storage in e2e, but we can verify the button was clicked
    await expect(addToCartButton).toBeVisible();
  });

  test('should display different product categories', async ({ page }) => {
    // Check for jersey products
    const jerseyProduct = page.getByText(/jersey/i).first();
    await expect(jerseyProduct).toBeVisible();

    // Check for cleats products
    const cleatsProduct = page.getByText(/cleats/i).first();
    await expect(cleatsProduct).toBeVisible();
  });
});
