import { test, expect } from '@playwright/test';

test.describe('Homepage Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main navigation', async ({ page }) => {
    // Check if the logo is visible in the navigation
    await expect(page.getByRole('navigation').getByText('ZAVA')).toBeVisible();
    
    // Check if navigation items are present (desktop view)
    const navigation = ['Home', 'Products', 'Technology', 'Athletes', 'About', 'Contact'];
    
    // For mobile, we might need to open the menu first
    const isMobile = await page.locator('[class*="sheet"]').isVisible().catch(() => false);
    
    if (isMobile) {
      // Click mobile menu button
      await page.getByRole('button', { name: /menu/i }).click();
    }
    
    // Check each navigation item
    for (const item of navigation) {
      await expect(page.getByRole('button', { name: item })).toBeVisible();
    }
  });

  test('should display hero section with title and CTA', async ({ page }) => {
    // Check hero title
    await expect(page.getByText(/Unleash Your Potential/i)).toBeVisible();
    await expect(page.getByText(/with Smart Sportswear/i)).toBeVisible();
    
    // Check CTA button
    await expect(page.getByRole('button', { name: /Explore Products/i })).toBeVisible();
  });

  test('should navigate to products section when clicking Explore Products', async ({ page }) => {
    // Click on the Explore Products button
    await page.getByRole('button', { name: /Explore Products/i }).click();
    
    // Wait for smooth scroll to complete
    await page.waitForTimeout(1000);
    
    // Check if products section is visible
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
  });

  test('should navigate between sections using nav buttons', async ({ page }) => {
    // Click on Products navigation
    await page.getByRole('button', { name: 'Products' }).click();
    await page.waitForTimeout(500);
    
    // Verify we're at the products section
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
    
    // Click on Contact navigation
    await page.getByRole('button', { name: 'Contact' }).click();
    await page.waitForTimeout(500);
    
    // Verify we're at the contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('should take a screenshot of the homepage', async ({ page }) => {
    // Take a full page screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/homepage.png', 
      fullPage: true 
    });
  });

  test('should display footer with all sections', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check footer content
    await expect(page.getByText(/Unleashing athletic potential/i)).toBeVisible();
    await expect(page.getByText(/Products/i).last()).toBeVisible();
    await expect(page.getByText(/Technology/i).last()).toBeVisible();
    await expect(page.getByText(/Support/i)).toBeVisible();
    
    // Check copyright
    await expect(page.getByText(/© 2024 Zava/i)).toBeVisible();
  });
});
