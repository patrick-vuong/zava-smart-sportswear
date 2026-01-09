import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should have a visible navigation bar', async ({ page }) => {
    await page.goto('/');
    
    // Check for desktop navigation or mobile menu button
    const desktopNav = page.getByRole('button', { name: 'Home' });
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu"), button svg'); // Mobile menu icon
    
    // At least one should be visible
    const isDesktopVisible = await desktopNav.isVisible().catch(() => false);
    const isMobileVisible = await mobileMenuButton.first().isVisible().catch(() => false);
    
    expect(isDesktopVisible || isMobileVisible).toBeTruthy();
  });

  test('should scroll to sections when navigation items are clicked', async ({ page }) => {
    await page.goto('/');
    
    const sections = [
      { name: 'Products', id: '#products' },
      { name: 'Technology', id: '#technology' },
      { name: 'Athletes', id: '#athletes' },
      { name: 'About', id: '#about' },
      { name: 'Contact', id: '#contact' },
    ];
    
    for (const section of sections) {
      // Click navigation item
      await page.getByRole('button', { name: section.name }).click();
      
      // Wait for smooth scroll
      await page.waitForTimeout(500);
      
      // Check if section is visible in viewport
      const sectionElement = page.locator(section.id);
      await expect(sectionElement).toBeVisible();
    }
  });

  test('should highlight active navigation item', async ({ page }) => {
    await page.goto('/');
    
    // Click on Products
    const productsButton = page.getByRole('button', { name: 'Products' });
    await productsButton.click();
    
    // Wait for state update
    await page.waitForTimeout(300);
    
    // Check if the Products button has active styling (text-accent class)
    const buttonClass = await productsButton.getAttribute('class');
    expect(buttonClass).toContain('text-accent');
  });
});
