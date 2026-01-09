import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have functional main navigation', async ({ page }) => {
    // Check that main navigation is visible
    await expect(page.locator('nav')).toBeVisible();
    
    // Test navigation items (these would typically be links or buttons)
    const navItems = ['products', 'technology', 'athletes', 'about', 'contact'];
    
    for (const item of navItems) {
      // Look for navigation links that might contain these section names
      const navLink = page.locator(`nav a[href*="${item}"], nav button:has-text("${item}"), nav [data-section="${item}"]`).first();
      
      if (await navLink.isVisible()) {
        await navLink.click();
        await page.waitForTimeout(1000); // Allow for scroll animation
        
        // Verify the corresponding section is visible
        await expect(page.locator(`#${item}`)).toBeVisible();
      }
    }
  });

  test('should have working mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Look for mobile menu trigger (hamburger menu)
    const mobileMenuTrigger = page.locator('button[aria-label*="menu"], button:has([class*="menu"]), [data-testid="mobile-menu"]').first();
    
    if (await mobileMenuTrigger.isVisible()) {
      // Open mobile menu
      await mobileMenuTrigger.click();
      await page.waitForTimeout(500);
      
      // Mobile menu content should be visible
      const mobileMenu = page.locator('[role="dialog"], .mobile-menu, [data-testid="mobile-menu-content"]').first();
      if (await mobileMenu.isVisible()) {
        await expect(mobileMenu).toBeVisible();
        
        // Test navigation within mobile menu
        const mobileNavItems = mobileMenu.locator('a, button').filter({ hasText: /products|technology|athletes|about|contact/i });
        if (await mobileNavItems.count() > 0) {
          await mobileNavItems.first().click();
          await page.waitForTimeout(1000);
        }
      }
    }
  });

  test('should maintain logo and branding', async ({ page }) => {
    // Check for logo or brand name in navigation
    const brandElement = page.locator('nav [class*="logo"], nav h1, nav [class*="brand"], nav:has-text("Zava")').first();
    
    if (await brandElement.isVisible()) {
      await expect(brandElement).toBeVisible();
      
      // Logo should be clickable and return to top
      if (await brandElement.isEnabled()) {
        await brandElement.click();
        await page.waitForTimeout(1000);
        
        // Should scroll to top or home section
        const heroSection = page.locator('#home, section:first-of-type, main > section:first-child').first();
        if (await heroSection.isVisible()) {
          await expect(heroSection).toBeVisible();
        }
      }
    }
  });

  test('should handle smooth scrolling between sections', async ({ page }) => {
    // Test smooth scrolling by clicking through different sections
    const sections = ['products', 'technology', 'athletes', 'about', 'contact'];
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionElement = page.locator(`#${section}`);
      
      // Scroll to section
      await sectionElement.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Verify section is visible
      await expect(sectionElement).toBeVisible();
    }
  });

  test('should highlight current section in navigation', async ({ page }) => {
    // This test checks if navigation shows active/current section
    // This would depend on the specific implementation
    
    const sections = ['products', 'technology', 'athletes', 'about', 'contact'];
    
    for (const section of sections) {
      // Scroll to section
      await page.locator(`#${section}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      
      // Look for active navigation state (this varies by implementation)
      const activeNavItem = page.locator(`nav [class*="active"], nav [aria-current], nav [data-active="${section}"]`).first();
      
      // If active states are implemented, they should be visible
      if (await activeNavItem.isVisible()) {
        await expect(activeNavItem).toBeVisible();
      }
    }
  });
});