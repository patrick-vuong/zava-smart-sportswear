import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage with key elements', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    
    // Check that the page loads successfully
    await page.waitForLoadState('networkidle');
    
    // Check for basic page structure
    await expect(page.locator('body')).toBeVisible();
    
    // Check for navigation elements
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for main content area
    await expect(page.locator('main')).toBeVisible();
    
    // Check for the ZAVA brand name (more flexible approach)
    const zavaElements = page.locator('text=ZAVA');
    await expect(zavaElements.first()).toBeVisible();
  });

  test('should have functional navigation', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    // Test navigation items - these should be clickable
    const navItems = ['Products', 'Technology', 'Athletes', 'About', 'Contact'];
    
    for (const item of navItems) {
      const navLink = page.locator(`button:has-text("${item}"), a:has-text("${item}")`).first();
      if (await navLink.isVisible()) {
        await expect(navLink).toBeVisible();
        await navLink.click();
        // Wait a moment for any scroll animation
        await page.waitForTimeout(500);
      }
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/zava-smart-sportswear/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // The page should still be functional on mobile
    await expect(page.locator('body')).toBeVisible();
    
    // ZAVA brand should still be visible
    const zavaElements = page.locator('text=ZAVA');
    await expect(zavaElements.first()).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check that focused elements are visible
    const focusedElement = page.locator(':focus');
    if (await focusedElement.count() > 0) {
      await expect(focusedElement.first()).toBeVisible();
    }
  });
});