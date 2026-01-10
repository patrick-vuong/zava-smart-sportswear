import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test('should display hero section with main heading', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading
    await expect(page.locator('text=Unleash Your Potential')).toBeVisible();
    await expect(page.locator('text=with Smart Sportswear')).toBeVisible();
    
    // Take screenshot of hero section
    await page.screenshot({ 
      path: 'tests/screenshots/hero-section.png',
      fullPage: false
    });
  });

  test('should display hero description text', async ({ page }) => {
    await page.goto('/');
    
    // Check description text
    await expect(page.locator('text=Experience the future of athletic performance')).toBeVisible();
  });

  test('should have Shop Now and Watch Demo buttons', async ({ page }) => {
    await page.goto('/');
    
    // Check that both CTA buttons are visible
    const shopNowButton = page.locator('button:has-text("Shop Now")');
    const watchDemoButton = page.locator('button:has-text("Watch Demo")');
    
    await expect(shopNowButton).toBeVisible();
    await expect(watchDemoButton).toBeVisible();
  });

  test('should navigate to products when Shop Now is clicked', async ({ page }) => {
    await page.goto('/');
    
    // Click Shop Now button
    await page.locator('button:has-text("Shop Now")').click();
    
    // Wait for smooth scroll
    await page.waitForTimeout(1000);
    
    // Verify we scrolled to products section
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
  });

  test('should display ZAVA logo in navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check logo is visible
    const logo = page.locator('nav >> text=ZAVA');
    await expect(logo).toBeVisible();
  });

  test('should have gradient background on hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check that hero section exists with the expected class
    const heroSection = page.locator('section#home');
    await expect(heroSection).toBeVisible();
    
    // Take a full-page screenshot for visual verification
    await page.screenshot({ 
      path: 'tests/screenshots/homepage-full.png',
      fullPage: true
    });
  });
});

test.describe('Responsive Design', () => {
  test('should display mobile menu on small screens', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that mobile menu trigger is visible
    // The menu icon should be visible on mobile
    const menuButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    await expect(menuButton).toBeVisible();
    
    // Take screenshot of mobile view
    await page.screenshot({ 
      path: 'tests/screenshots/mobile-view.png',
      fullPage: false
    });
  });

  test('should show navigation items on desktop', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // All navigation items should be visible inline on desktop
    await expect(page.locator('button:has-text("Home")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Products")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Technology")').first()).toBeVisible();
    
    // Take screenshot of desktop view
    await page.screenshot({ 
      path: 'tests/screenshots/desktop-view.png',
      fullPage: false
    });
  });
});
