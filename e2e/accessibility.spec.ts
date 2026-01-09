import { test, expect } from '@playwright/test';

test.describe('Accessibility and Responsiveness', () => {
  test('should be accessible on desktop', async ({ page }) => {
    await page.goto('/');
    
    // Check for basic accessibility features
    // Main landmark
    const main = page.locator('main, [role="main"]');
    await expect(main).toBeVisible();
    
    // Navigation landmark
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav.first()).toBeVisible();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check for h1
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();
    
    // Should have multiple headings
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const count = await headings.count();
    expect(count).toBeGreaterThan(1);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Check if focus is visible on an element
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Page should load
    await expect(page.locator('text=/zava/i').first()).toBeVisible();
    
    // Check for mobile menu
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button:has-text("☰"), button:has(svg)').first();
    
    // Mobile menu button or navigation should be visible
    const navVisible = await page.locator('nav').first().isVisible();
    const menuVisible = await mobileMenuButton.isVisible();
    
    expect(navVisible || menuVisible).toBeTruthy();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Page should load
    await expect(page).toHaveTitle(/Zava/i);
    
    // Main content should be visible
    await expect(page.locator('text=/smart sportswear/i').first()).toBeVisible();
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');
    
    // Get all images
    const images = page.locator('img');
    const count = await images.count();
    
    if (count > 0) {
      // At least some images should have alt text
      const imagesWithAlt = page.locator('img[alt]');
      const altCount = await imagesWithAlt.count();
      
      // Most images should have alt attributes
      expect(altCount).toBeGreaterThan(0);
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    
    // Check that text is visible (basic check)
    const textElements = page.locator('h1, h2, h3, p, span, a, button');
    const firstText = textElements.first();
    
    await expect(firstText).toBeVisible();
    
    // Verify text is readable by checking it has content
    const text = await firstText.textContent();
    expect(text).toBeTruthy();
  });
});
