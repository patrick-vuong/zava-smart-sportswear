import { test, expect } from '@playwright/test';

test.describe('Basic Setup Verification', () => {
  test('should be able to connect to development server', async ({ page }) => {
    // This test verifies that our configuration and server setup works
    // It will fail gracefully if browsers aren't installed
    try {
      await page.goto('/', { timeout: 10000 });
      
      // If we get here, the server is running and playwright can connect
      console.log('✅ Playwright successfully connected to development server');
      
      // Basic page load verification
      await expect(page).toHaveURL(/zava-smart-sportswear/);
      
    } catch (error) {
      console.log('Note: Browser not available or server not running');
      console.log('This is expected if browsers haven\'t been installed yet');
      throw error;
    }
  });
});