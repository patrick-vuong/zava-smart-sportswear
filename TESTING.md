# Playwright Testing Guide

This document provides comprehensive information about running and maintaining the Playwright tests for the Zava Smart Sportswear project.

## Overview

The test suite includes end-to-end tests that verify key user flows and functionality across different browsers and devices. Tests are written using the Playwright testing framework.

## Test Structure

```
tests/
├── homepage.spec.ts      # Homepage functionality tests
├── navigation.spec.ts    # Navigation and routing tests
├── products.spec.ts      # Product showcase tests
└── contact.spec.ts       # Contact form tests
```

## Running Tests

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm run test
   ```

### Test Commands

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests with browser UI visible |
| `npm run test:ui` | Open Playwright's interactive test runner |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:report` | Open the HTML test report |

### Running Specific Tests

```bash
# Run specific test file
npm run test tests/homepage.spec.ts

# Run specific test with specific browser
npm run test tests/homepage.spec.ts --project=chromium

# Run tests matching a pattern
npm run test --grep "navigation"
```

## Test Configuration

The tests are configured in `playwright.config.ts` with the following settings:

- **Base URL:** `http://localhost:5001`
- **Browsers:** Chrome, Firefox, Mobile Chrome
- **Retries:** 2 retries on CI, 0 locally
- **Timeout:** 30 seconds per test
- **Screenshots:** Only on failure
- **Traces:** On first retry

## CI/CD Integration

Tests run automatically on GitHub Actions for:
- Pull requests to main/develop branches
- Pushes to main/develop branches

The CI workflow:
1. Sets up Node.js environment
2. Installs dependencies
3. Installs Playwright browsers
4. Runs the full test suite
5. Uploads test reports as artifacts

## Writing New Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zava-smart-sportswear/');
    await page.waitForLoadState('networkidle');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

### Best Practices

1. **Use specific selectors:** Prefer `data-testid`, `role`, or specific class names
2. **Wait for content:** Use `waitForLoadState('networkidle')` or specific elements
3. **Be defensive:** Check if elements exist before interacting with them
4. **Mobile testing:** Test responsive behavior with different viewport sizes
5. **Accessibility:** Include keyboard navigation and screen reader compatibility tests

### Common Patterns

```typescript
// Check if element exists before testing
if (await element.count() > 0) {
  await expect(element).toBeVisible();
}

// Handle multiple similar elements
const firstElement = page.locator('selector').first();

// Mobile testing
await page.setViewportSize({ width: 375, height: 667 });

// Wait for animations
await page.waitForTimeout(500);
```

## Debugging Tests

1. **Use headed mode:**
   ```bash
   npm run test:headed
   ```

2. **Use debug mode:**
   ```bash
   npm run test:debug
   ```

3. **View traces:**
   ```bash
   npx playwright show-trace test-results/trace.zip
   ```

4. **Screenshots and videos:**
   Check `test-results/` directory for failure artifacts

## Maintaining Tests

### When Tests Fail

1. Check if the application behavior changed
2. Update selectors if UI elements changed
3. Verify test expectations are still valid
4. Run tests locally to reproduce issues

### Updating Tests

1. Keep tests aligned with feature changes
2. Update test data when content changes
3. Add new tests for new features
4. Remove obsolete tests for removed features

## Troubleshooting

### Common Issues

1. **Browser installation fails:**
   ```bash
   npx playwright install --with-deps
   ```

2. **Port conflicts:**
   - Check if development server is running on correct port
   - Update `baseURL` in playwright.config.ts if needed

3. **Flaky tests:**
   - Add appropriate waits
   - Check for timing issues
   - Verify element selectors are stable

4. **CI failures:**
   - Check GitHub Actions logs
   - Verify dependencies are correctly installed
   - Ensure tests work in headless mode

### Getting Help

- Playwright Documentation: https://playwright.dev/
- GitHub Issues: Report bugs in the project repository
- Team Support: Contact the development team for assistance