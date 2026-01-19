import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should display the homepage with hero section', async ({ page }) => {
    // Verify the hero section is visible
    await expect(page.locator('text=Unleash Your Potential')).toBeVisible();
    await expect(page.locator('text=with Smart Sportswear')).toBeVisible();
    
    // Verify hero buttons are present
    await expect(page.locator('button:has-text("Shop Now")')).toBeVisible();
    await expect(page.locator('button:has-text("Watch Demo")')).toBeVisible();
    
    // Take screenshot of hero section
    await page.screenshot({ path: 'tests/screenshots/homepage-hero.png', fullPage: true });
  });

  test('should navigate through all sections', async ({ page }) => {
    const sections = [
      { name: 'Home', heading: 'Unleash Your Potential' },
      { name: 'Products', heading: 'Smart Sportswear' },
      { name: 'Technology', heading: 'Cutting-Edge Technology' },
      { name: 'Athletes', heading: 'Athlete Stories' },
      { name: 'About', heading: 'About Zava' },
      { name: 'Contact', heading: 'Get in Touch' },
    ];

    for (const section of sections) {
      // Click navigation link
      await page.click(`text=${section.name}`);
      
      // Wait for smooth scroll to complete
      await page.waitForTimeout(1000);
      
      // Verify section is visible
      await expect(page.locator(`text=${section.heading}`).first()).toBeVisible();
      
      // Take screenshot of each section
      await page.screenshot({ 
        path: `tests/screenshots/navigation-${section.name.toLowerCase()}.png`,
        fullPage: false 
      });
    }
  });

  test('should display and use mobile navigation menu', async ({ page, viewport }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Reload the page to apply mobile view
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify mobile menu button is visible
    const menuButton = page.locator('button:has-text("Menu"), button[aria-label="Menu"]').or(
      page.locator('button').filter({ has: page.locator('svg') }).first()
    );
    
    // Take screenshot of mobile view
    await page.screenshot({ path: 'tests/screenshots/mobile-navigation-closed.png' });
    
    // Click the menu button to open mobile menu
    await menuButton.first().click();
    
    // Wait for menu to open
    await page.waitForTimeout(500);
    
    // Take screenshot of open mobile menu
    await page.screenshot({ path: 'tests/screenshots/mobile-navigation-open.png' });
    
    // Verify navigation items are visible in mobile menu
    await expect(page.locator('text=Home').last()).toBeVisible();
    await expect(page.locator('text=Products').last()).toBeVisible();
    await expect(page.locator('text=Contact').last()).toBeVisible();
    
    // Click a navigation item
    await page.locator('text=Products').last().click();
    
    // Wait for navigation
    await page.waitForTimeout(1000);
    
    // Verify Products section is visible
    await expect(page.locator('text=Smart Sportswear').first()).toBeVisible();
  });

  test('should display logo and brand name', async ({ page }) => {
    // Verify logo and brand name are visible
    await expect(page.locator('text=ZAVA').first()).toBeVisible();
    
    // Verify logo SVG is present
    const logo = page.locator('nav').first().locator('svg').first();
    await expect(logo).toBeVisible();
  });

  test('should have working call-to-action buttons in hero', async ({ page }) => {
    // Click "Shop Now" button
    await page.click('button:has-text("Shop Now")');
    
    // Wait for smooth scroll
    await page.waitForTimeout(1000);
    
    // Verify we're in the products section
    await expect(page.locator('text=Smart Sportswear').first()).toBeVisible();
    
    // Take screenshot after navigation
    await page.screenshot({ path: 'tests/screenshots/shop-now-clicked.png' });
  });

  test('should display footer with company information', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Wait for scroll to complete
    await page.waitForTimeout(500);
    
    // Verify footer content
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer >> text=ZAVA')).toBeVisible();
    await expect(page.locator('footer >> text=Unleashing athletic potential')).toBeVisible();
    
    // Verify footer sections
    await expect(page.locator('footer >> text=Products')).toBeVisible();
    await expect(page.locator('footer >> text=Technology')).toBeVisible();
    await expect(page.locator('footer >> text=Support')).toBeVisible();
    
    // Take screenshot of footer
    await page.screenshot({ path: 'tests/screenshots/footer.png' });
  });
});
