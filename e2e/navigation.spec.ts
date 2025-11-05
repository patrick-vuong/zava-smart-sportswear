import { test, expect } from '@playwright/test';

/**
 * Navigation and Homepage Tests
 * 
 * This test suite verifies the core navigation functionality and homepage elements
 * of the Zava Smart Sportswear application.
 */

test.describe('Homepage and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/Zava Smart Sportswear|spark-template/);
    
    // Take a screenshot of the homepage
    await page.screenshot({ path: 'e2e/screenshots/homepage.png', fullPage: true });
  });

  test('should display navigation menu items', async ({ page }) => {
    // Check if navigation items are visible
    const navItems = ['Home', 'Products', 'Technology', 'Athletes', 'About', 'Contact'];
    
    for (const item of navItems) {
      const navButton = page.getByRole('button', { name: item });
      await expect(navButton).toBeVisible();
    }
  });

  test('should navigate to Products section', async ({ page }) => {
    // Click on Products navigation
    await page.getByRole('button', { name: 'Products' }).click();
    
    // Wait for smooth scroll animation
    await page.waitForTimeout(1000);
    
    // Verify Products section is in view
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
    
    // Take screenshot of Products section
    await page.screenshot({ path: 'e2e/screenshots/products-section.png' });
  });

  test('should navigate to Technology section', async ({ page }) => {
    // Click on Technology navigation
    await page.getByRole('button', { name: 'Technology' }).click();
    
    // Wait for smooth scroll animation
    await page.waitForTimeout(1000);
    
    // Verify Technology section is in view
    const technologySection = page.locator('#technology');
    await expect(technologySection).toBeInViewport();
    
    // Take screenshot
    await page.screenshot({ path: 'e2e/screenshots/technology-section.png' });
  });

  test('should navigate to Contact section', async ({ page }) => {
    // Click on Contact navigation
    await page.getByRole('button', { name: 'Contact' }).click();
    
    // Wait for smooth scroll animation
    await page.waitForTimeout(1000);
    
    // Verify Contact section is in view
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
    
    // Take screenshot
    await page.screenshot({ path: 'e2e/screenshots/contact-section.png' });
  });

  test('should display hero section content', async ({ page }) => {
    // Check for hero section elements
    const heroSection = page.locator('#home');
    await expect(heroSection).toBeVisible();
    
    // Take screenshot of hero section
    await page.screenshot({ path: 'e2e/screenshots/hero-section.png' });
  });

  test('should handle mobile menu on small screens', async ({ page, isMobile }) => {
    if (isMobile) {
      // Look for mobile menu trigger (hamburger icon)
      const menuButton = page.getByRole('button').first();
      await menuButton.click();
      
      // Wait for menu to open
      await page.waitForTimeout(500);
      
      // Take screenshot of mobile menu
      await page.screenshot({ path: 'e2e/screenshots/mobile-menu.png' });
    }
  });
});
