import { test, expect } from '@playwright/test';

test.describe('Zava Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads and contains the main brand
    await expect(page.locator('text=ZAVA')).toBeVisible();
    
    // Check for the main hero heading
    await expect(page.locator('h1')).toContainText('Unleash Your Potential');
    await expect(page.locator('text=with Smart Sportswear')).toBeVisible();
  });

  test('should have proper navigation elements', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation links are present
    await expect(page.locator('button:has-text("Home")')).toBeVisible();
    await expect(page.locator('button:has-text("Products")')).toBeVisible();
    await expect(page.locator('button:has-text("Technology")')).toBeVisible();
    await expect(page.locator('button:has-text("Athletes")')).toBeVisible();
    await expect(page.locator('button:has-text("About")')).toBeVisible();
    await expect(page.locator('button:has-text("Contact")')).toBeVisible();
  });

  test('should navigate to different sections when clicking nav links', async ({ page }) => {
    await page.goto('/');
    
    // Click on Products navigation
    await page.click('button:has-text("Products")');
    
    // Wait for scroll and check if Products section is in view
    await page.waitForTimeout(1000);
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
  });

  test('should have working explore products button', async ({ page }) => {
    await page.goto('/');
    
    // Click the Explore Products button in hero
    await page.click('button:has-text("Explore Products")');
    
    // Wait for scroll and check if Products section is in view
    await page.waitForTimeout(1000);
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
  });

  test('should have all main sections', async ({ page }) => {
    await page.goto('/');
    
    // Check that all main sections exist
    await expect(page.locator('#home')).toBeVisible();
    await expect(page.locator('#products')).toBeVisible();
    await expect(page.locator('#technology')).toBeVisible();
    await expect(page.locator('#athletes')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should have proper footer content', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    
    // Check footer content
    await expect(page.locator('text=Unleashing athletic potential')).toBeVisible();
    await expect(page.locator('text=© 2024 Zava. All rights reserved.')).toBeVisible();
  });
});