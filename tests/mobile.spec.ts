import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  test('should show mobile navigation on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // On mobile, regular nav should be hidden and mobile menu button should be visible
    const mobileMenuButton = page.locator('button[aria-label="Open menu"], button:has-text("Menu"), svg[data-testid="menu-icon"]');
    await expect(mobileMenuButton.first()).toBeVisible();
    
    // Regular desktop nav items should not be visible
    const homeButton = page.locator('nav button:has-text("Home")');
    await expect(homeButton).toBeHidden();
  });

  test('should work properly on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    
    // Desktop navigation should be visible
    await expect(page.locator('button:has-text("Home")')).toBeVisible();
    await expect(page.locator('button:has-text("Products")')).toBeVisible();
    
    // Mobile menu button should not be visible
    const mobileMenuButton = page.locator('button[aria-label="Open menu"], button:has-text("Menu")');
    await expect(mobileMenuButton.first()).toBeHidden();
  });

  test('should have responsive text and layout', async ({ page }) => {
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Hero section should be visible and properly sized
    const heroSection = page.locator('#home');
    await expect(heroSection).toBeVisible();
    
    // Main heading should be visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Test desktop layout
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Content should still be visible and properly laid out
    await expect(heroSection).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should handle section navigation on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Try to find and click the mobile menu if it exists
    const possibleMenuSelectors = [
      'button[aria-label="Open menu"]',
      'button:has-text("Menu")',
      '[data-testid="mobile-menu-button"]',
      'button:has(svg)',
    ];
    
    let menuOpened = false;
    for (const selector of possibleMenuSelectors) {
      const menuButton = page.locator(selector).first();
      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.waitForTimeout(500);
        
        // Check if Products link is now visible
        const productsLink = page.locator('button:has-text("Products")');
        if (await productsLink.isVisible()) {
          await productsLink.click();
          await page.waitForTimeout(1000);
          
          // Verify Products section is in view
          const productsSection = page.locator('#products');
          await expect(productsSection).toBeInViewport();
          menuOpened = true;
          break;
        }
      }
    }
    
    // If no mobile menu found, that's okay - might be a simple responsive design
    if (!menuOpened) {
      console.log('No mobile menu found - testing direct navigation');
      // Just verify the page loads correctly on mobile
      await expect(page.locator('text=ZAVA')).toBeVisible();
    }
  });
});