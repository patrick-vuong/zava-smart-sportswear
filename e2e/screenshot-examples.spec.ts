import { test, expect } from '@playwright/test';

/**
 * Screenshot Examples Test
 * 
 * This test demonstrates various screenshot capabilities in Playwright.
 * Screenshots are saved to the e2e/screenshots directory.
 */

test.describe('Screenshot Examples', () => {
  test('should capture full page screenshot', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Capture full page screenshot including all scrollable content
    await page.screenshot({ 
      path: 'e2e/screenshots/example-full-page.png',
      fullPage: true 
    });
  });

  test('should capture viewport screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Capture only the visible viewport
    await page.screenshot({ 
      path: 'e2e/screenshots/example-viewport.png' 
    });
  });

  test('should capture element screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to products section
    await page.getByRole('button', { name: 'Products' }).click();
    await page.waitForTimeout(1000);
    
    // Capture screenshot of just the products section
    const productsSection = page.locator('#products');
    if (await productsSection.isVisible()) {
      await productsSection.screenshot({ 
        path: 'e2e/screenshots/example-products-section.png' 
      });
    }
  });

  test('should capture screenshots at different viewport sizes', async ({ page }) => {
    // Desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ 
      path: 'e2e/screenshots/example-desktop-1920x1080.png' 
    });
    
    // Tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ 
      path: 'e2e/screenshots/example-tablet-768x1024.png' 
    });
    
    // Mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ 
      path: 'e2e/screenshots/example-mobile-375x667.png' 
    });
  });

  test('should capture screenshot before and after interaction', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Before interaction
    await page.screenshot({ 
      path: 'e2e/screenshots/example-before-navigation.png' 
    });
    
    // Perform interaction
    await page.getByRole('button', { name: 'Contact' }).click();
    await page.waitForTimeout(1000);
    
    // After interaction
    await page.screenshot({ 
      path: 'e2e/screenshots/example-after-navigation.png' 
    });
  });

  test('should capture screenshot with mask (hiding dynamic content)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Screenshot with certain elements masked (useful for hiding dynamic content)
    await page.screenshot({ 
      path: 'e2e/screenshots/example-masked.png',
      // Mask elements that might change (like timestamps or dynamic IDs)
      mask: [page.locator('[id*="timestamp"]'), page.locator('.dynamic-content')],
    });
  });
});
