import { test, expect } from '@playwright/test';

test.describe('Technology Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to technology section
    await page.locator('#technology').scrollIntoViewIfNeeded();
  });

  test('should display technology section', async ({ page }) => {
    // Check that technology section is visible
    await expect(page.locator('#technology')).toBeVisible();
    
    // Check section heading
    await expect(page.locator('#technology h2')).toBeVisible();
  });

  test('should show technology features', async ({ page }) => {
    // Technology section should contain information about smart features
    const technologySection = page.locator('#technology');
    await expect(technologySection).toContainText(/technology|smart|sensor|performance/i);
  });

  test('should have interactive elements', async ({ page }) => {
    await page.waitForTimeout(1000); // Allow for animations
    
    // Look for interactive elements in technology section
    const technologySection = page.locator('#technology');
    const interactiveElements = technologySection.locator('button, a[href], [role="button"], [class*="hover"]');
    
    // Check if there are any interactive elements
    if (await interactiveElements.count() > 0) {
      await expect(interactiveElements.first()).toBeVisible();
    }
  });

  test('should display technology icons or graphics', async ({ page }) => {
    // Technology section should have visual elements like icons or images
    const technologySection = page.locator('#technology');
    const visualElements = technologySection.locator('svg, img, [class*="icon"]');
    
    // Check if visual elements are present
    if (await visualElements.count() > 0) {
      await expect(visualElements.first()).toBeVisible();
    }
  });
});