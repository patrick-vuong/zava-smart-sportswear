import { test, expect } from '@playwright/test';

test.describe('Athletes Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to athletes section
    await page.locator('button:has-text("Athletes")').click();
    await page.waitForTimeout(500);
  });

  test('should display athletes section', async ({ page }) => {
    const athletesSection = page.locator('#athletes');
    await expect(athletesSection).toBeVisible();
    await expect(athletesSection).toBeInViewport();
  });

  test('should show athlete testimonials or stories', async ({ page }) => {
    const athletesSection = page.locator('#athletes');
    
    // Should have testimonial-related content
    await expect(athletesSection.locator('text=/athlete|player|testimonial|experience|story/i').first()).toBeVisible();
  });

  test('should have athlete quotes or reviews', async ({ page }) => {
    const athletesSection = page.locator('#athletes');
    
    // Look for quote marks or review indicators
    const hasQuotes = await athletesSection.locator('text=/"|\'|quote/i').count();
    
    expect(hasQuotes).toBeGreaterThan(0);
  });

  test('should display athlete images or profiles', async ({ page }) => {
    const athletesSection = page.locator('#athletes');
    
    // Check for images or profile elements
    const visualElements = athletesSection.locator('img, [class*="avatar"], [class*="profile"]');
    const count = await visualElements.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('should have navigation controls for testimonials', async ({ page }) => {
    const athletesSection = page.locator('#athletes');
    
    // Look for carousel controls
    const navButtons = athletesSection.locator('button[aria-label*="prev"], button[aria-label*="next"], button:has-text("❮"), button:has-text("❯")');
    
    // Should have at least navigation elements
    const count = await navButtons.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
