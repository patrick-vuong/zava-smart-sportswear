import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should display the homepage with all navigation items', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page title/logo is visible
    await expect(page.locator('text=ZAVA').first()).toBeVisible();
    
    // Check that navigation items are present
    const navItems = ['Home', 'Products', 'Technology', 'Athletes', 'About', 'Contact'];
    for (const item of navItems) {
      await expect(page.locator(`button:has-text("${item}")`).first()).toBeVisible();
    }
  });

  test('should navigate to Products section when clicked', async ({ page }) => {
    await page.goto('/');
    
    // Click on Products navigation item
    await page.locator('button:has-text("Products")').first().click();
    
    // Wait for smooth scroll to complete
    await page.waitForTimeout(1000);
    
    // Check that we're at the products section
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
  });

  test('should navigate to Contact section when clicked', async ({ page }) => {
    await page.goto('/');
    
    // Click on Contact navigation item
    await page.locator('button:has-text("Contact")').first().click();
    
    // Wait for smooth scroll to complete
    await page.waitForTimeout(1000);
    
    // Check that we're at the contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('should have working Shop Now button in hero section', async ({ page }) => {
    await page.goto('/');
    
    // Find and click the Shop Now button
    await page.locator('button:has-text("Shop Now")').click();
    
    // Wait for smooth scroll to complete
    await page.waitForTimeout(1000);
    
    // Check that we're at the products section
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
  });

  test('should display footer with company information', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check footer content
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer >> text=ZAVA').first()).toBeVisible();
    await expect(page.locator('footer >> text=Unleashing athletic potential')).toBeVisible();
  });
});
