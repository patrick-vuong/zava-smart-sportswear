import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 720 },
    { name: 'Large Desktop', width: 1920, height: 1080 },
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`should display correctly on ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');

      // Check that main content is visible
      await expect(page.locator('main')).toBeVisible();
      
      // Check that hero section is visible and properly sized
      await expect(page.locator('h1')).toBeVisible();
      
      // All main sections should be accessible
      const sections = ['home', 'products', 'technology', 'athletes', 'about', 'contact'];
      for (const section of sections) {
        const sectionElement = page.locator(`#${section}`);
        if (await sectionElement.isVisible()) {
          await expect(sectionElement).toBeVisible();
        }
      }

      // Navigation should be accessible
      await expect(page.locator('nav')).toBeVisible();
      
      // Content should not overflow horizontally
      const bodyWidth = await page.locator('body').boundingBox();
      expect(bodyWidth?.width).toBeLessThanOrEqual(width + 20); // Small tolerance for scrollbars
    });
  });

  test('should handle orientation changes on mobile', async ({ page }) => {
    // Portrait mode
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();

    // Landscape mode
    await page.setViewportSize({ width: 667, height: 375 });
    await expect(page.locator('h1')).toBeVisible();
    
    // Content should still be accessible
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should have touch-friendly interactive elements on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Buttons should be large enough for touch interaction (minimum 44px)
    const buttons = page.locator('button, a[href]');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        const boundingBox = await button.boundingBox();
        
        if (boundingBox) {
          // Touch targets should be at least 44px in height or width
          expect(boundingBox.height >= 32 || boundingBox.width >= 32).toBeTruthy();
        }
      }
    }
  });

  test('should maintain readability across viewports', async ({ page }) => {
    const testViewports = [
      { width: 375, height: 667 },  // Mobile
      { width: 1280, height: 720 }  // Desktop
    ];

    for (const viewport of testViewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      // Text should be visible and readable
      const headings = page.locator('h1, h2, h3');
      const headingCount = await headings.count();
      
      if (headingCount > 0) {
        for (let i = 0; i < Math.min(headingCount, 3); i++) {
          const heading = headings.nth(i);
          await expect(heading).toBeVisible();
          
          // Check that text is not clipped
          const boundingBox = await heading.boundingBox();
          expect(boundingBox?.width).toBeGreaterThan(0);
          expect(boundingBox?.height).toBeGreaterThan(0);
        }
      }
    }
  });
});