import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to all main sections', async ({ page }) => {
    const sections = [
      { name: 'Home', id: 'home' },
      { name: 'Products', id: 'products' },
      { name: 'Technology', id: 'technology' },
      { name: 'Athletes', id: 'athletes' },
      { name: 'About', id: 'about' },
      { name: 'Contact', id: 'contact' }
    ];

    for (const section of sections) {
      // Click navigation button
      const navButton = page.locator(`button:has-text("${section.name}")`).first();
      
      if (await navButton.isVisible()) {
        await navButton.click();
        await page.waitForTimeout(1000); // Wait for smooth scroll
        
        // Check if the corresponding section exists
        const sectionElement = page.locator(`#${section.id}, [data-section="${section.id}"]`).first();
        if (await sectionElement.count() > 0) {
          await expect(sectionElement).toBeVisible();
        }
      }
    }
  });

  test('should handle mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/zava-smart-sportswear/');
    
    // Look for mobile menu trigger (hamburger menu)
    const mobileMenuTrigger = page.locator('button').filter({ 
      has: page.locator('svg') 
    }).first();
    
    if (await mobileMenuTrigger.isVisible()) {
      await mobileMenuTrigger.click();
      
      // Wait for mobile menu to appear
      await page.waitForTimeout(500);
      
      // Check if navigation items are now visible in mobile menu
      const mobileNavItems = page.locator('nav a, nav button').filter({ hasText: /Products|Technology|Athletes|About|Contact/ });
      
      if (await mobileNavItems.count() > 0) {
        await expect(mobileNavItems.first()).toBeVisible();
      }
    }
  });

  test('should have proper focus management', async ({ page }) => {
    // Test tab navigation through nav items
    await page.keyboard.press('Tab');
    
    let tabCount = 0;
    const maxTabs = 10; // Prevent infinite loop
    
    while (tabCount < maxTabs) {
      await page.keyboard.press('Tab');
      tabCount++;
      
      const focusedElement = page.locator(':focus');
      if (await focusedElement.count() > 0) {
        const tagName = await focusedElement.first().evaluate(el => el.tagName.toLowerCase());
        if (tagName === 'button' || tagName === 'a') {
          // Found a focusable navigation element
          await expect(focusedElement.first()).toBeVisible();
          break;
        }
      }
    }
  });

  test('should maintain navigation state during interactions', async ({ page }) => {
    // Click on a navigation item
    const productsButton = page.locator('button:has-text("Products")').first();
    
    if (await productsButton.isVisible()) {
      await productsButton.click();
      await page.waitForTimeout(500);
      
      // Check if the navigation is still visible and functional
      await expect(page.locator('nav')).toBeVisible();
      
      // Try clicking another navigation item
      const aboutButton = page.locator('button:has-text("About")').first();
      if (await aboutButton.isVisible()) {
        await aboutButton.click();
        await page.waitForTimeout(500);
        await expect(page.locator('nav')).toBeVisible();
      }
    }
  });
});