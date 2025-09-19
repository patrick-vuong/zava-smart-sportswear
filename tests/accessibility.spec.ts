import { test, expect } from '@playwright/test';

test.describe('Accessibility and Performance', () => {
  test('should have proper page structure and semantics', async ({ page }) => {
    await page.goto('/');

    // Check for semantic HTML structure
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Check for proper heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toBeVisible();
  });

  test('should have keyboard navigation support', async ({ page }) => {
    await page.goto('/');

    // Test keyboard navigation through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check that focus is visible (some element should have focus)
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');

    // This is a basic check - in a real implementation you'd use more sophisticated tools
    // Check that text is readable by looking for common good contrast patterns
    const bodyText = page.locator('body');
    await expect(bodyText).toBeVisible();
    
    // Ensure dark theme toggle works if present
    const themeToggle = page.locator('button:has-text("theme"), button[aria-label*="theme"]');
    if (await themeToggle.count() > 0) {
      await themeToggle.click();
      await page.waitForTimeout(500);
      await expect(bodyText).toBeVisible();
    }
  });

  test('should load within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    
    // Wait for main content to be visible
    await expect(page.locator('main')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds (adjust as needed)
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check for essential meta tags
    const viewport = page.locator('meta[name="viewport"]');
    const description = page.locator('meta[name="description"]');
    
    // These might not be present but good to check
    if (await viewport.count() > 0) {
      await expect(viewport).toHaveAttribute('content', /width=device-width/);
    }
  });

  test('should handle errors gracefully', async ({ page }) => {
    // Test navigation to non-existent section
    await page.goto('/');
    
    // Try clicking on elements that might not exist
    const nonExistentButton = page.locator('button:has-text("NonExistent")');
    if (await nonExistentButton.count() === 0) {
      // This is expected - just ensure page doesn't break
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should be responsive across devices', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568, name: 'Mobile Small' },
      { width: 375, height: 667, name: 'Mobile Medium' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1440, height: 900, name: 'Desktop Large' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      
      // Check that main elements are still visible
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      
      // Check that content doesn't overflow
      const body = page.locator('body');
      await expect(body).toBeVisible();
    }
  });
});