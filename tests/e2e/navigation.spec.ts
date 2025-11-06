import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should display the main navigation menu', async ({ page }) => {
    await page.goto('/');
    
    // Check if the logo is visible
    const logo = page.getByText('ZAVA');
    await expect(logo).toBeVisible();
    
    // Check if navigation items are visible on desktop
    const homeButton = page.getByRole('button', { name: 'Home' });
    const productsButton = page.getByRole('button', { name: 'Products' });
    const technologyButton = page.getByRole('button', { name: 'Technology' });
    const athletesButton = page.getByRole('button', { name: 'Athletes' });
    const aboutButton = page.getByRole('button', { name: 'About' });
    const contactButton = page.getByRole('button', { name: 'Contact' });
    
    // Check visibility based on viewport
    if (page.viewportSize()!.width >= 768) {
      await expect(homeButton).toBeVisible();
      await expect(productsButton).toBeVisible();
      await expect(technologyButton).toBeVisible();
      await expect(athletesButton).toBeVisible();
      await expect(aboutButton).toBeVisible();
      await expect(contactButton).toBeVisible();
    }
  });

  test('should navigate to different sections when clicking navigation buttons', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Click on Products and verify navigation
    const productsButton = page.getByRole('button', { name: 'Products' });
    await productsButton.click();
    
    // Wait for scroll animation to complete
    await page.waitForTimeout(1000);
    
    // Verify the Products section is in view
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
    
    // Click on Contact and verify navigation
    const contactButton = page.getByRole('button', { name: 'Contact' });
    await contactButton.click();
    
    // Wait for scroll animation to complete
    await page.waitForTimeout(1000);
    
    // Verify the Contact section is in view
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('should display mobile menu on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Mobile menu button should be visible
    const menuButton = page.getByRole('button').filter({ has: page.locator('svg') }).first();
    await expect(menuButton).toBeVisible();
    
    // Navigation items should not be visible initially on mobile
    const productsButton = page.getByRole('button', { name: 'Products' });
    await expect(productsButton).not.toBeVisible();
    
    // Click menu button to open sheet
    await menuButton.click();
    
    // Now navigation items should be visible
    await expect(productsButton).toBeVisible();
  });

  test('should take screenshot of homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take a full page screenshot
    await page.screenshot({ 
      path: 'tests/e2e/screenshots/homepage.png', 
      fullPage: true 
    });
    
    // The screenshot method will throw an error if it fails,
    // so if we reach this point, the screenshot was successful
    expect(true).toBeTruthy();
  });
});
