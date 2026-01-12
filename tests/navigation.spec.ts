import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage', async ({ page }) => {
    // Wait for the page to load and check for key elements
    await expect(page.locator('text=Unleash Your Potential')).toBeVisible();
    await expect(page.locator('text=with Smart Sportswear')).toBeVisible();
  });

  test('should navigate to all main sections', async ({ page }) => {
    // Test navigation to Products section
    await page.click('text=Products');
    await expect(page.locator('#products')).toBeInViewport();
    
    // Test navigation to Technology section
    await page.click('text=Technology');
    await expect(page.locator('#technology')).toBeInViewport();
    
    // Test navigation to Athletes section
    await page.click('text=Athletes');
    await expect(page.locator('#athletes')).toBeInViewport();
    
    // Test navigation to About section
    await page.click('text=About');
    await expect(page.locator('#about')).toBeInViewport();
    
    // Test navigation to Contact section
    await page.click('text=Contact');
    await expect(page.locator('#contact')).toBeInViewport();
    
    // Test navigation back to Home
    await page.click('text=Home');
    await expect(page.locator('#home')).toBeInViewport();
  });

  test('should have working mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if mobile menu button is visible
    const menuButton = page.locator('button[aria-label="Menu"], button:has-text("Menu"), svg[data-icon="menu"]').first();
    await expect(menuButton).toBeVisible();
    
    // Click menu button
    await menuButton.click();
    
    // Wait a bit for menu to open
    await page.waitForTimeout(300);
    
    // Check if navigation items are visible in mobile menu
    const navItems = ['Home', 'Products', 'Technology', 'Athletes', 'About', 'Contact'];
    for (const item of navItems) {
      await expect(page.locator(`text=${item}`).first()).toBeVisible();
    }
  });

  test('should take screenshot of homepage', async ({ page }) => {
    // Take a screenshot of the full page
    await page.screenshot({ path: 'tests/screenshots/homepage.png', fullPage: true });
  });
});
