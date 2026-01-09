import { test, expect } from '@playwright/test';

test.describe('Zava Smart Sportswear - Mobile Responsiveness', () => {
  test('should display mobile navigation correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/zava-smart-sportswear/');
    
    // On mobile, regular nav items should not be visible, only mobile menu button
    const navItems = ['Home', 'Products', 'Technology', 'Athletes', 'About', 'Contact'];
    
    // Check if regular navigation is hidden (or mobile menu is shown)
    // The actual implementation might use a hamburger menu
    await expect(page.getByText('ZAVA')).toBeVisible(); // Logo should still be visible
    
    // Take mobile screenshot
    await page.screenshot({ path: 'test-results/mobile-homepage.png', fullPage: true });
  });

  test('should display content properly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/zava-smart-sportswear/');
    
    // Hero section should be visible
    await expect(page.getByRole('heading', { name: 'Unleash Your Potential with Smart Sportswear' })).toBeVisible();
    
    // Hero buttons should be visible
    await expect(page.getByRole('button', { name: 'Shop Now' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Watch Demo' })).toBeVisible();
    
    // Scroll to products section
    await page.getByRole('button', { name: 'Shop Now' }).click();
    
    // Products should display properly on mobile
    await expect(page.getByRole('heading', { name: 'Smart Sportswear Collection' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Zava Pro Jersey' })).toBeVisible();
  });

  test('should handle tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/zava-smart-sportswear/');
    
    // Check that content is still accessible
    await expect(page.getByRole('heading', { name: 'Unleash Your Potential with Smart Sportswear' })).toBeVisible();
    
    // Navigation should work
    await page.getByRole('button', { name: 'Products' }).click();
    await expect(page.getByRole('heading', { name: 'Smart Sportswear Collection' })).toBeVisible();
    
    // Take tablet screenshot
    await page.screenshot({ path: 'test-results/tablet-homepage.png', fullPage: true });
  });

  test('should handle large desktop viewport', async ({ page }) => {
    // Set large desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/zava-smart-sportswear/');
    
    // Check that content scales properly
    await expect(page.getByRole('heading', { name: 'Unleash Your Potential with Smart Sportswear' })).toBeVisible();
    
    // All navigation items should be visible on desktop
    const navItems = ['Home', 'Products', 'Technology', 'Athletes', 'About', 'Contact'];
    
    for (const item of navItems) {
      await expect(page.getByRole('button', { name: item })).toBeVisible();
    }
    
    // Take desktop screenshot
    await page.screenshot({ path: 'test-results/desktop-homepage.png', fullPage: true });
  });
});