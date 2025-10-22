import { test, expect } from '@playwright/test';

test.describe('Technology Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to technology section
    await page.locator('button:has-text("Technology")').click();
    await page.waitForTimeout(500);
  });

  test('should display technology section', async ({ page }) => {
    const technologySection = page.locator('#technology');
    await expect(technologySection).toBeVisible();
    await expect(technologySection).toBeInViewport();
  });

  test('should explain smart technology features', async ({ page }) => {
    const technologySection = page.locator('#technology');
    
    // Should mention technology keywords
    await expect(technologySection.locator('text=/sensor|data|performance|tracking|monitor/i').first()).toBeVisible();
  });

  test('should display technology benefits', async ({ page }) => {
    const technologySection = page.locator('#technology');
    
    // Look for benefit-related content
    await expect(technologySection.locator('text=/improve|enhance|optimize|better|track/i').first()).toBeVisible();
  });

  test('should have visual elements for tech demo', async ({ page }) => {
    const technologySection = page.locator('#technology');
    
    // Check for any visual content (images, icons, or graphics)
    const visualElements = technologySection.locator('img, svg, [class*="icon"]');
    const count = await visualElements.count();
    
    expect(count).toBeGreaterThan(0);
  });
});
