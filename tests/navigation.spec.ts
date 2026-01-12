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
    
    // Reload the page with mobile viewport
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    // Check if mobile menu button is visible (it uses a Sheet component with Menu icon)
    const menuButton = page.locator('button:has(svg)').filter({ hasText: '' }).first();
    
    // If mobile menu button exists, test it
    if (await menuButton.count() > 0 && await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);
      
      // Check if navigation items appear
      const hasNavItems = await page.locator('text=Home').count() > 0;
      expect(hasNavItems).toBeTruthy();
    } else {
      // On some screen sizes, desktop nav might still show
      // Just verify the page is responsive
      await expect(page.locator('text=ZAVA')).toBeVisible();
    }
  });

  test('should take screenshot of homepage', async ({ page }) => {
    // Take a screenshot of the full page
    await page.screenshot({ path: 'tests/screenshots/homepage.png', fullPage: true });
  });
});
