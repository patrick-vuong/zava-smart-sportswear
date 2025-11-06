# Playwright Testing Documentation

## Overview

This project uses [Playwright](https://playwright.dev/) for end-to-end (E2E) testing. Playwright provides reliable, fast, and modern testing capabilities across all major browsers.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

The Playwright dependencies are already included in `package.json`. If you need to install them manually:

```bash
npm install --legacy-peer-deps
```

### Installing Browsers

Playwright requires browser binaries to run tests. Install them with:

```bash
npx playwright install
```

Or install specific browsers:

```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

## Running Tests

### Run All Tests

```bash
npm run test:e2e
```

This command runs all tests in headless mode across all configured browsers.

### Run Tests with UI Mode

UI mode provides a visual interface to explore, run, and debug tests:

```bash
npm run test:e2e:ui
```

### Run Tests in Headed Mode

See the browser while tests are running:

```bash
npm run test:e2e:headed
```

### Debug Tests

Run tests with Playwright Inspector for step-by-step debugging:

```bash
npm run test:e2e:debug
```

### View Test Report

After running tests, view the HTML report:

```bash
npm run test:e2e:report
```

## Test Structure

Tests are organized in the `tests/e2e/` directory:

```
tests/
└── e2e/
    ├── navigation.spec.ts       # Navigation and menu tests
    ├── contact-form.spec.ts     # Contact form validation and submission tests
    ├── hero-section.spec.ts     # Hero section content and interaction tests
    └── screenshots/             # Test screenshots directory
```

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    
    // Your test code here
    const element = page.getByRole('button', { name: 'Click me' });
    await expect(element).toBeVisible();
  });
});
```

### Using beforeEach Hook

```typescript
test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Common setup for all tests in this describe block
  });

  test('test 1', async ({ page }) => {
    // Test code
  });
});
```

### Taking Screenshots

Screenshots can be captured during tests:

```typescript
test('should take a screenshot', async ({ page }) => {
  await page.goto('/');
  
  // Take a full page screenshot
  await page.screenshot({ 
    path: 'tests/e2e/screenshots/my-screenshot.png',
    fullPage: true 
  });
});
```

Screenshots are automatically taken on test failures (configured in `playwright.config.ts`).

## Test Configuration

The Playwright configuration is defined in `playwright.config.ts`:

- **Test Directory**: `tests/e2e/`
- **Base URL**: `http://localhost:5000/zava-smart-sportswear` (development server)
- **Browsers**: Chromium (configurable for Firefox, WebKit, mobile viewports)
- **Screenshots**: Taken on failure
- **Traces**: Collected on retry
- **Web Server**: Automatically starts dev server before tests

### Modifying Configuration

Edit `playwright.config.ts` to customize:

- Timeout settings
- Browser configurations
- Viewport sizes
- Screenshot and video settings
- Reporter options

## Best Practices

### 1. Use Semantic Locators

Prefer user-facing locators:

```typescript
// Good
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Email')
page.getByText('Welcome')

// Avoid when possible
page.locator('#submit-btn')
page.locator('.form-input')
```

### 2. Wait for Network and Animations

```typescript
// Wait for page to fully load
await page.waitForLoadState('networkidle');

// Wait for animations to complete
await page.waitForTimeout(1000);
```

### 3. Handle Dynamic Content

```typescript
// Use auto-waiting assertions
await expect(element).toBeVisible({ timeout: 5000 });

// Wait for specific conditions
await page.waitForSelector('#dynamic-content');
```

### 4. Test Responsiveness

```typescript
test('mobile view', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  // Mobile-specific tests
});
```

### 5. Isolate Tests

Each test should be independent and not rely on the state from other tests.

## Existing Test Coverage

### Navigation Tests (`navigation.spec.ts`)
- ✅ Main navigation menu display
- ✅ Section navigation functionality
- ✅ Mobile menu functionality
- ✅ Homepage screenshot capture

### Contact Form Tests (`contact-form.spec.ts`)
- ✅ Form field visibility
- ✅ Validation error messages
- ✅ Email format validation
- ✅ Successful form submission
- ✅ Form reset after submission
- ✅ Loading state during submission
- ✅ Contact information display

### Hero Section Tests (`hero-section.spec.ts`)
- ✅ Hero content display
- ✅ Call-to-action buttons
- ✅ Navigation to products section
- ✅ Responsive layout on mobile
- ✅ Animation visibility
- ✅ Branding and text content

## Continuous Integration

Tests can be integrated into your CI/CD pipeline. Example GitHub Actions workflow:

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci --legacy-peer-deps
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Troubleshooting

### Browser Installation Issues

If browsers fail to install:

```bash
# Install with system dependencies
npx playwright install --with-deps

# Or install specific browser
npx playwright install chromium --with-deps
```

### Port Already in Use

If port 5000 is already in use:

```bash
# Kill the process using the port
npm run kill

# Or check what's using the port
lsof -ti:5000

# Or use a different port by modifying vite.config.ts
```

### Tests Timing Out

Increase timeout in `playwright.config.ts`:

```typescript
use: {
  actionTimeout: 10000,
  navigationTimeout: 30000,
}
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)

## Contributing

When adding new tests:

1. Create test files in `tests/e2e/` with the `.spec.ts` extension
2. Follow existing test patterns and structure
3. Add descriptive test names that explain what is being tested
4. Include comments for complex test logic
5. Take screenshots for visual verification when appropriate
6. Ensure tests are isolated and can run independently
7. Update this documentation if adding new test categories

## Support

For questions or issues with tests:
- Check the [Playwright documentation](https://playwright.dev/)
- Review existing test files for examples
- Open an issue in the project repository
