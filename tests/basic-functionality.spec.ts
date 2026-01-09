import { test, expect } from '@playwright/test';

test.describe('Zava Smart Sportswear - Basic Functionality', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    
    // Check page title
    await expect(page).toHaveTitle('Zava - Smart Sportswear Technology');
    
    // Check main heading is visible
    await expect(page.getByRole('heading', { name: 'Unleash Your Potential with Smart Sportswear' })).toBeVisible();
    
    // Check navigation logo
    await expect(page.getByText('ZAVA')).toBeVisible();
    
    // Take a screenshot for visual verification
    await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });
  });

  test('should have working navigation menu', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    
    // Check all navigation items are present
    const navItems = ['Home', 'Products', 'Technology', 'Athletes', 'About', 'Contact'];
    
    for (const item of navItems) {
      await expect(page.getByRole('button', { name: item })).toBeVisible();
    }
  });

  test('should navigate to different sections', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    
    // Click on Products navigation
    await page.getByRole('button', { name: 'Products' }).click();
    
    // Wait for scroll and check if products section is visible
    await expect(page.getByRole('heading', { name: 'Smart Sportswear Collection' })).toBeVisible();
    
    // Click on Technology navigation
    await page.getByRole('button', { name: 'Technology' }).click();
    
    // Check if technology section is visible
    await expect(page.getByRole('heading', { name: 'Revolutionary Smart Technology' })).toBeVisible();
    
    // Click on Contact navigation
    await page.getByRole('button', { name: 'Contact' }).click();
    
    // Check if contact section is visible
    await expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();
  });

  test('should display product cards correctly', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    
    // Navigate to products section
    await page.getByRole('button', { name: 'Products' }).click();
    
    // Check product cards are visible
    await expect(page.getByRole('heading', { name: 'Zava Pro Jersey' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Zava Elite Cleats' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Zava Training Jersey' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Zava Speed Cleats' })).toBeVisible();
    
    // Check price displays
    await expect(page.getByText('$299')).toBeVisible();
    await expect(page.getByText('$399')).toBeVisible();
    await expect(page.getByText('$199')).toBeVisible();
    
    // Check action buttons
    await expect(page.getByRole('button', { name: 'View Details' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to Cart' }).first()).toBeVisible();
  });

  test('should display hero section call-to-action buttons', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    
    // Check hero section buttons
    await expect(page.getByRole('button', { name: 'Shop Now' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Watch Demo' })).toBeVisible();
    
    // Click Shop Now button should navigate to products
    await page.getByRole('button', { name: 'Shop Now' }).click();
    
    // Should see products section
    await expect(page.getByRole('heading', { name: 'Smart Sportswear Collection' })).toBeVisible();
  });
});