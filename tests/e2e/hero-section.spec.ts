import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test('should display the hero section with correct content', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if hero heading is visible
    const heroHeading = page.getByRole('heading', { name: /Unleash Your Potential/i });
    await expect(heroHeading).toBeVisible();
    
    // Check if the accent text is present
    const accentText = page.getByText(/with Smart Sportswear/i);
    await expect(accentText).toBeVisible();
    
    // Check if the description text is visible
    const description = page.getByText(/Experience the future of athletic performance/i);
    await expect(description).toBeVisible();
  });

  test('should display call-to-action buttons', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if "Shop Now" button is visible
    const shopNowButton = page.getByRole('button', { name: /Shop Now/i });
    await expect(shopNowButton).toBeVisible();
    
    // Check if "Watch Demo" button is visible
    const watchDemoButton = page.getByRole('button', { name: /Watch Demo/i });
    await expect(watchDemoButton).toBeVisible();
  });

  test('should navigate to products section when clicking "Shop Now"', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Click on "Shop Now" button
    const shopNowButton = page.getByRole('button', { name: /Shop Now/i });
    await shopNowButton.click();
    
    // Wait for scroll animation
    await page.waitForTimeout(1000);
    
    // Verify the Products section is in view
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
    
    // Take screenshot showing products section
    await page.screenshot({ 
      path: 'tests/e2e/screenshots/products-section.png' 
    });
  });

  test('should display hero section with gradient background', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if hero section exists
    const heroSection = page.locator('#home');
    await expect(heroSection).toBeVisible();
    
    // Take full screenshot of hero section
    await page.screenshot({ 
      path: 'tests/e2e/screenshots/hero-section.png',
      fullPage: false 
    });
  });

  test('should have responsive layout on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Hero content should still be visible
    const heroHeading = page.getByRole('heading', { name: /Unleash Your Potential/i });
    await expect(heroHeading).toBeVisible();
    
    // Buttons should be visible
    const shopNowButton = page.getByRole('button', { name: /Shop Now/i });
    await expect(shopNowButton).toBeVisible();
    
    // Take mobile screenshot
    await page.screenshot({ 
      path: 'tests/e2e/screenshots/hero-mobile.png',
      fullPage: false 
    });
  });

  test('should display hero section animations', async ({ page }) => {
    await page.goto('/');
    
    // Wait for initial load
    await page.waitForLoadState('domcontentloaded');
    
    // Hero heading should become visible (animated)
    const heroHeading = page.getByRole('heading', { name: /Unleash Your Potential/i });
    await expect(heroHeading).toBeVisible({ timeout: 3000 });
    
    // Buttons should also become visible
    const shopNowButton = page.getByRole('button', { name: /Shop Now/i });
    await expect(shopNowButton).toBeVisible({ timeout: 3000 });
  });

  test('should have correct text content and branding', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for ZAVA branding in nav
    const logo = page.getByText('ZAVA').first();
    await expect(logo).toBeVisible();
    
    // Check for key marketing text
    const revolutionaryText = page.getByText(/smart jerseys and cleats designed for elite athletes/i);
    await expect(revolutionaryText).toBeVisible();
  });
});
