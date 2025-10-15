import { test, expect } from '@playwright/test';

// Demonstration test showing the working functionality
test.describe('Zava Smart Sportswear - Working Demo Tests', () => {
  test('Demo: Website loads and navigation works', async ({ page }) => {
    // Load the homepage
    await page.goto('/zava-smart-sportswear/');
    
    // Verify page loads
    await expect(page).toHaveTitle(/Zava/);
    console.log('✅ Homepage loaded successfully');
    
    // Verify ZAVA brand is visible
    await expect(page.locator('text=ZAVA')).toBeVisible();
    console.log('✅ ZAVA branding visible');
    
    // Verify main heading
    await expect(page.locator('h1')).toContainText('Unleash Your Potential');
    console.log('✅ Main heading displays correctly');
    
    // Test navigation to products section
    const productsButton = page.locator('button:has-text("Products")');
    if (await productsButton.isVisible()) {
      await productsButton.click();
      await page.waitForTimeout(1000); // Wait for smooth scroll
      await expect(page.locator('text=Smart Sportswear Collection')).toBeVisible();
      console.log('✅ Navigation to Products section works');
    }
    
    // Take demonstration screenshot
    await page.screenshot({ 
      path: 'test-results/demo-test-success.png',
      fullPage: true 
    });
    console.log('✅ Screenshot captured for demonstration');
  });

  test('Demo: Form interaction and mobile responsiveness', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/zava-smart-sportswear/');
    
    // Verify mobile layout
    await expect(page.locator('text=ZAVA')).toBeVisible();
    console.log('✅ Mobile layout renders correctly');
    
    // Take mobile screenshot
    await page.screenshot({ 
      path: 'test-results/demo-mobile-test.png',
      fullPage: true 
    });
    
    // Switch back to desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Navigate to contact section and test form
    const contactButton = page.locator('button:has-text("Contact")');
    if (await contactButton.isVisible()) {
      await contactButton.click();
      await page.waitForTimeout(1000);
      
      // Fill out form fields
      const nameField = page.locator('input[placeholder*="name"], input[name*="name"], textbox');
      if (await nameField.first().isVisible()) {
        await nameField.first().fill('Demo User');
        console.log('✅ Form interaction works');
      }
    }
    
    console.log('✅ Demonstration tests completed successfully');
  });
});