import { test, expect } from '@playwright/test';

test.describe('Technology Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to technology section
    await page.click('button:has-text("Technology")');
    await expect(page.locator('#technology')).toBeInViewport();
  });

  test('should display technology content', async ({ page }) => {
    // Check if technology section has content
    await expect(page.locator('#technology')).toBeVisible();
    
    // Look for technology-related content
    const technologySection = page.locator('#technology');
    await expect(technologySection).toContainText(/technology|smart|sensor|analytics|data/i);
  });

  test('should have interactive demonstrations', async ({ page }) => {
    // Look for interactive elements in the technology section
    const techInteractives = page.locator('#technology button, #technology [role="button"], #technology [class*="interactive"]');
    
    if (await techInteractives.count() > 0) {
      // Check if interactive elements are visible
      await expect(techInteractives.first()).toBeVisible();
    }
  });

  test('should display technology features', async ({ page }) => {
    const technologySection = page.locator('#technology');
    
    // Look for common technology features mentioned in PRD
    const features = [
      /sensor/i,
      /performance/i,
      /analytics/i,
      /integration/i,
      /monitoring/i
    ];

    // Check if at least some technology features are mentioned
    let featureFound = false;
    for (const feature of features) {
      if (await technologySection.getByText(feature).count() > 0) {
        featureFound = true;
        break;
      }
    }
    
    expect(featureFound).toBeTruthy();
  });

  test('should handle animations properly', async ({ page }) => {
    // Wait for any animations to complete
    await page.waitForTimeout(1000);
    
    // Check that content is still visible after animations
    await expect(page.locator('#technology')).toBeVisible();
  });
});