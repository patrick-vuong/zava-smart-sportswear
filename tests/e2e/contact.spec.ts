import { test, expect } from '@playwright/test';

test.describe('Contact Section', () => {
  test('should display contact section', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact section
    await page.getByRole('button', { name: 'Contact' }).click();
    await page.waitForTimeout(500);
    
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
  });

  test('should have contact form elements', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact
    await page.getByRole('button', { name: 'Contact' }).click();
    await page.waitForTimeout(500);
    
    const contactSection = page.locator('#contact');
    
    // Check for form inputs within contact section
    const inputs = contactSection.locator('input, textarea');
    const inputCount = await inputs.count();
    
    // Should have some form inputs
    expect(inputCount).toBeGreaterThan(0);
  });

  test('should display contact information', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact
    await page.getByRole('button', { name: 'Contact' }).click();
    await page.waitForTimeout(500);
    
    const contactSection = page.locator('#contact');
    const content = await contactSection.textContent();
    
    // Contact section should have content
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);
  });
});
