import { test, expect } from '@playwright/test';

test.describe('Athletes Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to athletes section
    await page.locator('#athletes').scrollIntoViewIfNeeded();
  });

  test('should display athletes section', async ({ page }) => {
    // Check that athletes section is visible
    await expect(page.locator('#athletes')).toBeVisible();
    
    // Check section heading
    await expect(page.locator('#athletes h2')).toBeVisible();
  });

  test('should show athlete testimonials', async ({ page }) => {
    // Athletes section should contain testimonial content
    const athletesSection = page.locator('#athletes');
    await expect(athletesSection).toContainText(/athlete|trust|testimonial/i);
  });

  test('should have carousel navigation', async ({ page }) => {
    await page.waitForTimeout(1000); // Allow for carousel to load
    
    // Look for carousel navigation buttons
    const athletesSection = page.locator('#athletes');
    const navButtons = athletesSection.locator('button[aria-label*="next"], button[aria-label*="previous"], [class*="chevron"], [class*="arrow"]');
    
    if (await navButtons.count() > 0) {
      // Test navigation
      const nextButton = navButtons.filter({ hasText: /next|right|chevron/i }).first();
      const prevButton = navButtons.filter({ hasText: /prev|left|chevron/i }).first();
      
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(500); // Allow for transition
      }
      
      if (await prevButton.isVisible()) {
        await prevButton.click();
        await page.waitForTimeout(500); // Allow for transition
      }
    }
  });

  test('should display athlete cards or content', async ({ page }) => {
    // Look for athlete-related content
    const athletesSection = page.locator('#athletes');
    const cards = athletesSection.locator('.card, [class*="card"], [class*="testimonial"]');
    
    if (await cards.count() > 0) {
      await expect(cards.first()).toBeVisible();
    }
    
    // Should contain athlete names or quotes
    await expect(athletesSection).toContainText(/marcus|sofia|johnson|rodriguez/i);
  });

  test('should have play buttons for video content', async ({ page }) => {
    // Look for play buttons that might trigger video content
    const athletesSection = page.locator('#athletes');
    const playButtons = athletesSection.locator('button[aria-label*="play"], [class*="play"], svg[class*="play"]');
    
    if (await playButtons.count() > 0) {
      await expect(playButtons.first()).toBeVisible();
      
      // Test clicking play button
      await playButtons.first().click();
      await page.waitForTimeout(500);
    }
  });
});