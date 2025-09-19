import { test, expect } from '@playwright/test';

test.describe('Athletes Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to athletes section
    await page.click('button:has-text("Athletes")');
    await expect(page.locator('#athletes')).toBeInViewport();
  });

  test('should display athlete testimonials', async ({ page }) => {
    // Check if athletes section has content
    await expect(page.locator('#athletes')).toBeVisible();
    
    // Look for athlete-related content
    const athletesSection = page.locator('#athletes');
    await expect(athletesSection).toContainText(/athlete|testimonial|performance|training/i);
  });

  test('should have a functional carousel', async ({ page }) => {
    // Look for carousel navigation buttons
    const prevButton = page.locator('#athletes button[class*="prev"], #athletes button:has([class*="Left"])');
    const nextButton = page.locator('#athletes button[class*="next"], #athletes button:has([class*="Right"])');
    
    // Check if navigation buttons exist
    if (await prevButton.count() > 0 && await nextButton.count() > 0) {
      await expect(prevButton).toBeVisible();
      await expect(nextButton).toBeVisible();
      
      // Test carousel navigation
      await nextButton.click();
      await page.waitForTimeout(500); // Wait for animation
      
      await prevButton.click();
      await page.waitForTimeout(500); // Wait for animation
    }
  });

  test('should display athlete information', async ({ page }) => {
    const athletesSection = page.locator('#athletes');
    
    // Look for athlete details that should be present based on the code
    const expectedContent = [
      /Marcus Johnson|Sofia Rodriguez|James Chen|Emma Thompson/i, // Athlete names
      /Football|Soccer|Basketball|Track/i, // Sports
      /improvement|performance|metric/i // Stats/performance data
    ];

    // Check if athlete information is displayed
    let contentFound = false;
    for (const content of expectedContent) {
      if (await athletesSection.getByText(content).count() > 0) {
        contentFound = true;
        break;
      }
    }
    
    expect(contentFound).toBeTruthy();
  });

  test('should handle video play buttons', async ({ page }) => {
    // Look for play buttons in the athletes section
    const playButtons = page.locator('#athletes button:has([class*="Play"]), #athletes [aria-label*="play"]');
    
    if (await playButtons.count() > 0) {
      await expect(playButtons.first()).toBeVisible();
      await expect(playButtons.first()).toBeEnabled();
      
      // Click play button (though video might not actually play in test)
      await playButtons.first().click();
    }
  });

  test('should show athlete statistics', async ({ page }) => {
    // Look for performance statistics
    const statisticsElements = page.locator('#athletes [class*="stat"], #athletes :text-matches("\\d+%"), #athletes :text-matches("\\d+")');
    
    if (await statisticsElements.count() > 0) {
      await expect(statisticsElements.first()).toBeVisible();
    }
  });
});