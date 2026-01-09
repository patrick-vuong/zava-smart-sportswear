# Playwright Testing Documentation

This document provides comprehensive guidance on running and contributing to the end-to-end test suite for Zava Smart Sportswear.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing New Tests](#writing-new-tests)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

This project uses [Playwright](https://playwright.dev/) for end-to-end testing. Playwright provides reliable cross-browser testing with:

- **Multiple Browser Support**: Tests run on Chromium, Firefox, and WebKit
- **Mobile Testing**: Includes mobile viewport configurations
- **Screenshot Capabilities**: Automatic screenshots on failure and manual screenshots
- **Auto-waiting**: Playwright waits for elements to be ready before performing actions
- **Detailed Reporting**: HTML reports with traces and screenshots

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Install project dependencies (if not already done):

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

This will download the necessary browser binaries for Chromium, Firefox, and WebKit.

### First-Time Setup

After installation, verify everything is working:

```bash
npm run test
```

This will run all tests in headless mode.

## Running Tests

### Available Test Commands

The following npm scripts are available for running tests:

#### Run All Tests (Headless)
```bash
npm run test
```
Runs all tests in headless mode across all configured browsers.

#### Run Tests with UI
```bash
npm run test:ui
```
Opens the Playwright UI mode, allowing you to:
- View and run individual tests
- See test execution in real-time
- Debug test failures
- Inspect DOM snapshots

#### Run Tests in Headed Mode
```bash
npm run test:headed
```
Runs tests with visible browser windows (useful for debugging).

#### Debug Tests
```bash
npm run test:debug
```
Runs tests in debug mode with the Playwright Inspector, allowing you to:
- Step through tests line by line
- Pause on failures
- Inspect locators
- View console logs

#### View Test Report
```bash
npm run test:report
```
Opens the HTML test report from the last test run.

### Running Specific Tests

#### Run a Single Test File
```bash
npx playwright test e2e/navigation.spec.ts
```

#### Run Tests by Name Pattern
```bash
npx playwright test -g "contact form"
```

#### Run Tests on Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

#### Run Tests on Mobile
```bash
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

## Test Structure

### Test Organization

Tests are organized in the `/e2e` directory:

```
e2e/
├── navigation.spec.ts      # Homepage and navigation tests
├── contact-form.spec.ts    # Contact form validation and submission
├── products.spec.ts        # Product showcase interactions
└── screenshots/            # Test screenshots (gitignored)
```

### Test Files

Each test file follows this structure:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
    await expect(page).toHaveTitle(/Expected Title/);
  });
});
```

## Writing New Tests

### Best Practices for Test Creation

1. **Use Descriptive Test Names**
   ```typescript
   test('should display validation error for empty email field', async ({ page }) => {
     // ...
   });
   ```

2. **Use Role-based Locators**
   ```typescript
   // Good
   await page.getByRole('button', { name: 'Submit' }).click();
   
   // Avoid
   await page.locator('.submit-btn').click();
   ```

3. **Add Screenshots for Key Steps**
   ```typescript
   // Take screenshot of important states
   await page.screenshot({ path: 'e2e/screenshots/form-submitted.png' });
   
   // Full page screenshot
   await page.screenshot({ 
     path: 'e2e/screenshots/full-page.png', 
     fullPage: true 
   });
   ```

4. **Wait for Animations**
   ```typescript
   // Wait for smooth scroll animations
   await page.waitForTimeout(1000);
   ```

5. **Use Appropriate Assertions**
   ```typescript
   // Visibility
   await expect(element).toBeVisible();
   
   // Text content
   await expect(element).toHaveText('Expected text');
   
   // In viewport
   await expect(element).toBeInViewport();
   
   // Form values
   await expect(input).toHaveValue('expected value');
   ```

### Example: Adding a New Test

Here's how to add a test for a new feature:

```typescript
import { test, expect } from '@playwright/test';

test.describe('New Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to the feature
    await page.getByRole('button', { name: 'Feature' }).click();
    await page.waitForTimeout(1000);
  });

  test('should display feature correctly', async ({ page }) => {
    // Verify feature is visible
    const feature = page.locator('#feature');
    await expect(feature).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'e2e/screenshots/feature-display.png' });
  });

  test('should interact with feature', async ({ page }) => {
    // Perform interaction
    await page.getByRole('button', { name: 'Action' }).click();
    
    // Verify result
    await expect(page.locator('#result')).toBeVisible();
    
    // Take screenshot of result
    await page.screenshot({ path: 'e2e/screenshots/feature-result.png' });
  });
});
```

## Test Coverage

### Current Test Coverage

The test suite currently covers:

✅ **Navigation & Homepage**
- Page loading
- Navigation menu functionality
- Section scrolling
- Mobile menu interactions

✅ **Contact Form**
- Form field validation
- Email format validation
- Required field checks
- Successful submission
- Form reset after submission
- Special character handling

✅ **Products Showcase**
- Product display
- Interactive elements
- Responsive layouts
- Hover interactions

### Areas for Future Testing

Consider adding tests for:
- Technology section interactions
- Athletes/testimonials carousel
- About section content
- Performance and load times
- Accessibility features
- Cross-browser compatibility edge cases

## Best Practices

### Writing Maintainable Tests

1. **Keep Tests Independent**: Each test should be able to run independently
2. **Use Page Object Model**: For complex pages, consider using page objects
3. **Avoid Hard-coded Waits**: Prefer `waitForSelector` over `waitForTimeout` when possible
4. **Clean Up**: Reset state in `afterEach` if needed
5. **Test One Thing**: Each test should verify one specific behavior

### Debugging Failed Tests

When tests fail:

1. **Check the HTML Report**:
   ```bash
   npm run test:report
   ```
   This shows screenshots, traces, and error details.

2. **Run in Debug Mode**:
   ```bash
   npm run test:debug
   ```
   Step through the test to see where it fails.

3. **Run in Headed Mode**:
   ```bash
   npm run test:headed
   ```
   Watch the browser to see what's happening.

4. **Check Screenshots**: Failed tests automatically generate screenshots in `test-results/`

## Configuration

### Playwright Configuration

The Playwright configuration is in `playwright.config.ts`:

- **Test Directory**: `./e2e`
- **Base URL**: `http://localhost:5000/zava-smart-sportswear/`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Screenshots**: Taken on failure
- **Traces**: Collected on first retry
- **Web Server**: Automatically starts `npm run dev` before tests (runs on port 5000)

**Note**: The Vite dev server runs on port 5000 with base path `/zava-smart-sportswear/` as configured in `vite.config.ts`.

### Customizing Configuration

To modify test behavior, edit `playwright.config.ts`:

```typescript
export default defineConfig({
  // Increase timeout for slower environments
  timeout: 30000,
  
  // Enable video recording
  use: {
    video: 'on-first-retry',
  },
  
  // Add more browsers
  projects: [
    { name: 'edge', use: { ...devices['Desktop Edge'] } },
  ],
});
```

## Continuous Integration

### Running Tests in CI

The test suite is designed to work in CI environments:

```bash
# CI mode runs tests in parallel and with retries
npm run test
```

Key CI features:
- **Retries**: Tests retry twice on failure in CI
- **Parallel Execution**: Tests run in parallel for speed
- **Automatic Server Start**: Dev server starts automatically
- **HTML Reports**: Generated for build artifacts

### GitHub Actions Example

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
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npm run test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Troubleshooting

### Common Issues

**Issue**: Browsers not installed
```
Error: browserType.launch: Executable doesn't exist
```
**Solution**: Run `npx playwright install`

---

**Issue**: Port already in use
```
Error: Port 5173 is already in use
```
**Solution**: Kill the process using port 5173 or configure a different port

---

**Issue**: Tests timeout
```
Error: Test timeout of 30000ms exceeded
```
**Solution**: Increase timeout in test or config, or optimize the application

---

**Issue**: Element not found
```
Error: locator.click: Target closed
```
**Solution**: Add appropriate waits or check selector

### Getting Help

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Discord](https://discord.com/invite/playwright-807756831384403968)
- [GitHub Issues](https://github.com/microsoft/playwright/issues)

## Contributing

When contributing new tests:

1. Follow the existing test structure
2. Add descriptive test names and comments
3. Include screenshots for visual verification
4. Test across multiple browsers if applicable
5. Update this documentation if adding new test categories

## Resources

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Locator Strategies](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

---

**Happy Testing! 🎭**
