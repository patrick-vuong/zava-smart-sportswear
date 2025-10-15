import { test, expect } from '@playwright/test';

test.describe('Homepage Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the hero section with correct heading', async ({ page }) => {
    // Wait for the hero section to be visible
    const heroSection = page.locator('section#home');
    await expect(heroSection).toBeVisible();

    // Check for the main heading
    const heading = page.getByRole('heading', { name: /unleash your potential/i });
    await expect(heading).toBeVisible();
    
    // Check for the "with Smart Sportswear" text with accent color
    const accentText = page.locator('text=with Smart Sportswear');
    await expect(accentText).toBeVisible();
  });

  test('should display hero description text', async ({ page }) => {
    // Check for description paragraph
    const description = page.locator('text=Experience the future of athletic performance');
    await expect(description).toBeVisible();
  });

  test('should have Explore Products button that scrolls to products', async ({ page }) => {
    // Find the "Explore Products" button
    const exploreButton = page.getByRole('button', { name: /explore products/i });
    await expect(exploreButton).toBeVisible();
    
    // Click the button
    await exploreButton.click();
    
    // Wait for scroll animation
    await page.waitForTimeout(1000);
    
    // Check if products section is visible
    const productsSection = page.locator('section#products');
    await expect(productsSection).toBeInViewport();
  });

  test('should display the ZAVA logo in navigation', async ({ page }) => {
    // Check for the logo
    const logo = page.locator('nav').getByText('ZAVA');
    await expect(logo).toBeVisible();
  });
});
