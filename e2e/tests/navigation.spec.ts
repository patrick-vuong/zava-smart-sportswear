import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate between sections on desktop', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1280, height: 720 });

    // Test navigation to Products
    const productsLink = page.getByRole('button', { name: 'Products' });
    await productsLink.click();
    await page.waitForTimeout(1000);
    const productsSection = page.locator('section#products');
    await expect(productsSection).toBeInViewport();

    // Test navigation to Technology
    const technologyLink = page.getByRole('button', { name: 'Technology' });
    await technologyLink.click();
    await page.waitForTimeout(1000);
    const technologySection = page.locator('section#technology');
    await expect(technologySection).toBeInViewport();

    // Test navigation to Athletes
    const athletesLink = page.getByRole('button', { name: 'Athletes' });
    await athletesLink.click();
    await page.waitForTimeout(1000);
    const athletesSection = page.locator('section#athletes');
    await expect(athletesSection).toBeInViewport();

    // Test navigation to Contact
    const contactLink = page.getByRole('button', { name: 'Contact' });
    await contactLink.click();
    await page.waitForTimeout(1000);
    const contactSection = page.locator('section#contact');
    await expect(contactSection).toBeInViewport();

    // Test navigation back to Home
    const homeLink = page.getByRole('button', { name: 'Home' });
    await homeLink.click();
    await page.waitForTimeout(1000);
    const homeSection = page.locator('section#home');
    await expect(homeSection).toBeInViewport();
  });

  test('should open mobile menu and navigate on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that desktop navigation is not visible
    const desktopNav = page.locator('nav').getByRole('button', { name: 'Products' });
    await expect(desktopNav).not.toBeVisible();

    // Open mobile menu
    const menuButton = page.getByRole('button').filter({ has: page.locator('svg') }).first();
    await menuButton.click();

    // Wait for menu to open
    await page.waitForTimeout(500);

    // Click on Products in mobile menu
    const productsLink = page.getByRole('button', { name: 'Products' });
    await productsLink.click();
    
    await page.waitForTimeout(1000);
    const productsSection = page.locator('section#products');
    await expect(productsSection).toBeInViewport();
  });

  test('should highlight active navigation item', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Click on Technology link
    const technologyLink = page.getByRole('button', { name: 'Technology' });
    await technologyLink.click();
    
    // Check if the link has the active class (text-accent)
    await expect(technologyLink).toHaveClass(/text-accent/);
  });
});
