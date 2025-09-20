import { test, expect } from '@playwright/test';

test.describe('Zava Smart Sportswear - Athletes & Technology Sections', () => {
  test('should display athlete testimonials', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    
    // Navigate to athletes section
    await page.getByRole('button', { name: 'Athletes' }).click();
    await expect(page.getByRole('heading', { name: 'Athletes Trust Zava' })).toBeVisible();
    
    // Check athlete testimonials
    await expect(page.getByText('Marcus Johnson')).toBeVisible();
    await expect(page.getByText('Football')).toBeVisible();
    
    // Check testimonial content
    await expect(page.getByText('Zava\'s smart jersey helped me optimize my training and prevent injuries. The real-time feedback is incredible.')).toBeVisible();
    
    // Check athlete navigation buttons if they exist
    const athleteButtons = page.getByRole('button').filter({ hasText: 'Marcus Johnson' });
    if (await athleteButtons.count() > 0) {
      await expect(athleteButtons.first()).toBeVisible();
    }
  });

  test('should display technology features', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    
    // Navigate to technology section
    await page.getByRole('button', { name: 'Technology' }).click();
    await expect(page.getByRole('heading', { name: 'Revolutionary Smart Technology' })).toBeVisible();
    
    // Check technology features
    await expect(page.getByRole('heading', { name: 'Connectivity' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Battery Life' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mobile App' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data Storage' })).toBeVisible();
    
    // Check specific technology details
    await expect(page.getByText('Bluetooth 5.0 + WiFi')).toBeVisible();
    await expect(page.getByText('Up to 72 hours')).toBeVisible();
    await expect(page.getByText('iOS & Android')).toBeVisible();
    await expect(page.getByText('Cloud Sync')).toBeVisible();
  });

  test('should display smart jersey technology details', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    await page.getByRole('button', { name: 'Technology' }).click();
    
    // Check smart jersey features
    await expect(page.getByRole('heading', { name: 'Smart Jersey Technology' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Biometric Monitoring' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Temperature Control' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Motion Analysis' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Performance Analytics' })).toBeVisible();
    
    // Check detailed descriptions
    await expect(page.getByText('Continuous heart rate, breathing rate, and stress level tracking')).toBeVisible();
    await expect(page.getByText('Smart fabric technology that regulates body temperature')).toBeVisible();
  });

  test('should display smart cleats technology details', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    await page.getByRole('button', { name: 'Technology' }).click();
    
    // Check smart cleats features
    await expect(page.getByRole('heading', { name: 'Smart Cleats Technology' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pressure Mapping' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Gait Analysis' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Balance Optimization' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Speed Metrics' })).toBeVisible();
    
    // Check detailed descriptions
    await expect(page.getByText('Detailed foot pressure analysis to optimize stride')).toBeVisible();
    await expect(page.getByText('Comprehensive running form analysis with personalized improvement suggestions')).toBeVisible();
  });

  test('should display about section content', async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    
    // Navigate to about section
    await page.getByRole('button', { name: 'About' }).click();
    await expect(page.getByRole('heading', { name: 'About Zava' })).toBeVisible();
    
    // Check mission statement
    await expect(page.getByRole('heading', { name: 'Our Mission' })).toBeVisible();
    await expect(page.getByText('To democratize elite-level athletic performance insights')).toBeVisible();
    
    // Check values section
    await expect(page.getByRole('heading', { name: 'Our Values' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Performance Excellence' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Innovation First' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Athlete-Centric' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Proven Results' })).toBeVisible();
    
    // Check journey timeline
    await expect(page.getByRole('heading', { name: 'Our Journey' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Company Founded' })).toBeVisible();
    await expect(page.getByText('2019')).toBeVisible();
    
    // Check leadership team
    await expect(page.getByRole('heading', { name: 'Leadership Team' })).toBeVisible();
    await expect(page.getByText('Dr. Sarah Chen')).toBeVisible();
    await expect(page.getByText('CEO & Co-Founder')).toBeVisible();
  });
});