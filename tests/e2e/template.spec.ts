import { test, expect } from '@playwright/test';

/**
 * Template for creating new Playwright tests
 * 
 * Copy this file and rename it to match your feature (e.g., products.spec.ts)
 * Replace the describe block name and add your tests
 */

test.describe('Feature Name', () => {
  
  // Optional: Run before each test in this describe block
  test.beforeEach(async ({ page }) => {
    // Navigate to your starting page
    await page.goto('/');
    
    // Add any common setup needed for all tests
    await page.waitForLoadState('networkidle');
  });

  // Optional: Run after each test
  test.afterEach(async ({ page }) => {
    // Cleanup code if needed
  });

  test('should do something specific', async ({ page }) => {
    // Arrange: Set up test data or navigate to specific state
    
    // Act: Perform the action you want to test
    const button = page.getByRole('button', { name: 'Click Me' });
    await button.click();
    
    // Assert: Verify the expected outcome
    const result = page.getByText('Expected Result');
    await expect(result).toBeVisible();
    
    // Optional: Take a screenshot
    await page.screenshot({ 
      path: 'tests/e2e/screenshots/feature-name.png' 
    });
  });

  test('should handle user input correctly', async ({ page }) => {
    // Example: Testing form input
    const input = page.getByLabel('Username');
    await input.fill('testuser');
    
    await expect(input).toHaveValue('testuser');
  });

  test('should display validation errors', async ({ page }) => {
    // Example: Testing validation
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await submitButton.click();
    
    // Check for error message
    const error = page.getByText(/required field/i);
    await expect(error).toBeVisible({ timeout: 2000 });
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Test mobile-specific behavior
    const mobileMenu = page.getByRole('button', { name: /menu/i });
    await expect(mobileMenu).toBeVisible();
  });
});

/**
 * Common Playwright Locators:
 * 
 * page.getByRole('button', { name: 'Submit' })
 * page.getByText('Welcome')
 * page.getByLabel('Email')
 * page.getByPlaceholder('Enter email')
 * page.getByAltText('Logo')
 * page.getByTitle('Close')
 * page.getByTestId('submit-button')  // Requires data-testid attribute
 * page.locator('#id')
 * page.locator('.class')
 * page.locator('div.class')
 * 
 * Common Actions:
 * 
 * await element.click()
 * await element.fill('text')
 * await element.type('text')
 * await element.clear()
 * await element.selectOption('value')
 * await element.check()
 * await element.uncheck()
 * await page.keyboard.press('Enter')
 * await page.mouse.click(x, y)
 * 
 * Common Assertions:
 * 
 * await expect(element).toBeVisible()
 * await expect(element).toBeHidden()
 * await expect(element).toBeEnabled()
 * await expect(element).toBeDisabled()
 * await expect(element).toHaveText('text')
 * await expect(element).toContainText('partial')
 * await expect(element).toHaveValue('value')
 * await expect(element).toHaveAttribute('attr', 'value')
 * await expect(element).toHaveClass('class')
 * await expect(element).toBeInViewport()
 * await expect(page).toHaveURL('url')
 * await expect(page).toHaveTitle('title')
 * 
 * Waiting:
 * 
 * await page.waitForLoadState('networkidle')
 * await page.waitForSelector('#element')
 * await page.waitForTimeout(1000)
 * await page.waitForURL('url')
 * await expect(element).toBeVisible({ timeout: 5000 })
 */
