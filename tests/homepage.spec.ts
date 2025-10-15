import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display the main elements', async ({ page }) => {
    await page.goto('/');

    // Check if the page loads successfully
    await expect(page).toHaveTitle(/Zava Smart Sportswear/);

    // Check for the main logo and branding
    await expect(page.locator('span:has-text("ZAVA")')).toBeVisible();
    
    // Check for the hero section
    await expect(page.locator('h1, h2').first()).toBeVisible();
    
    // Check for navigation elements
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');

    // Test navigation to Products section
    await page.click('button:has-text("Products")');
    await expect(page.locator('#products')).toBeInViewport();

    // Test navigation to Technology section
    await page.click('button:has-text("Technology")');
    await expect(page.locator('#technology')).toBeInViewport();

    // Test navigation to Athletes section
    await page.click('button:has-text("Athletes")');
    await expect(page.locator('#athletes')).toBeInViewport();

    // Test navigation to About section
    await page.click('button:has-text("About")');
    await expect(page.locator('#about')).toBeInViewport();

    // Test navigation to Contact section
    await page.click('button:has-text("Contact")');
    await expect(page.locator('#contact')).toBeInViewport();

    // Test navigation back to Home
    await page.click('button:has-text("Home")');
    await expect(page.locator('#home')).toBeInViewport();
  });

  test('should display footer content', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check footer sections
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer:has-text("Products")')).toBeVisible();
    await expect(page.locator('footer:has-text("Technology")')).toBeVisible();
    await expect(page.locator('footer:has-text("Support")')).toBeVisible();
    await expect(page.locator('footer:has-text("© 2024 Zava")')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check mobile navigation menu button is visible
    await expect(page.locator('button:has([class*="Menu"], [class*="menu"])')).toBeVisible();

    // Check that desktop navigation is hidden on mobile
    const navigationItems = page.locator('nav button:has-text("Home"), nav button:has-text("Products")');
    await expect(navigationItems.first()).not.toBeVisible();
  });
});