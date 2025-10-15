# Playwright Testing Guide

This document provides comprehensive information on how to run and maintain the Playwright end-to-end tests for the Zava Smart Sportswear web application.

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing New Tests](#writing-new-tests)
- [CI/CD Integration](#cicd-integration)
- [Debugging Tests](#debugging-tests)
- [Best Practices](#best-practices)

## Overview

This project uses [Playwright](https://playwright.dev/) for automated end-to-end testing. Playwright enables reliable end-to-end testing for modern web apps with cross-browser support.

### What's Tested

The current test suite covers the following critical user flows:

- **Homepage/Hero Section**: Verifies the main landing page elements and navigation
- **Navigation**: Tests desktop and mobile navigation between sections
- **Products Section**: Validates product display, details, and cart functionality
- **Contact Form**: Tests form validation and submission

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

3. (Optional) Install system dependencies for browsers:
   ```bash
   npx playwright install-deps
   ```

## Running Tests

### Basic Commands

Run all tests:
```bash
npm run test:e2e
```

Run tests in UI mode (recommended for development):
```bash
npm run test:e2e:ui
```

Run tests in headed mode (see browser):
```bash
npm run test:e2e:headed
```

View test report:
```bash
npm run test:e2e:report
```

### Advanced Options

Run specific test file:
```bash
npx playwright test e2e/tests/homepage.spec.ts
```

Run tests in a specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run tests in debug mode:
```bash
npx playwright test --debug
```

Run tests with specific grep pattern:
```bash
npx playwright test --grep "navigation"
```

## Test Structure

```
e2e/
├── tests/
│   ├── homepage.spec.ts       # Homepage and hero section tests
│   ├── navigation.spec.ts     # Navigation functionality tests
│   ├── products.spec.ts       # Products section tests
│   └── contact.spec.ts        # Contact form tests
playwright.config.ts            # Playwright configuration
```

### Configuration

The `playwright.config.ts` file contains:

- **Test directory**: `./e2e`
- **Base URL**: `http://localhost:5173` (auto-started dev server)
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Retry logic**: 2 retries on CI, 0 retries locally
- **Screenshots**: Only on failure
- **Traces**: On first retry

## Writing New Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Additional setup
  });

  test('should do something specific', async ({ page }) => {
    // Arrange
    const element = page.getByRole('button', { name: /click me/i });
    
    // Act
    await element.click();
    
    // Assert
    await expect(element).toBeVisible();
  });
});
```

### Locator Best Practices

Prefer accessible locators in this order:

1. **Role-based**: `page.getByRole('button', { name: 'Submit' })`
2. **Label**: `page.getByLabel('Email')`
3. **Text**: `page.getByText('Welcome')`
4. **Test ID**: `page.getByTestId('submit-btn')` (add `data-testid` attributes)
5. **CSS/XPath**: Use as last resort

### Common Patterns

**Waiting for navigation:**
```typescript
await page.goto('/');
await page.waitForLoadState('networkidle');
```

**Scrolling to element:**
```typescript
await page.locator('section#contact').scrollIntoViewIfNeeded();
```

**Handling dialogs:**
```typescript
const dialog = page.getByRole('dialog');
await expect(dialog).toBeVisible();
```

**Form interactions:**
```typescript
await page.getByLabel('Name').fill('John Doe');
await page.getByRole('combobox').click();
await page.getByRole('option', { name: 'Value' }).click();
```

**Mobile testing:**
```typescript
await page.setViewportSize({ width: 375, height: 667 });
```

## CI/CD Integration

### GitHub Actions

The Playwright tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

See `.github/workflows/playwright.yml` for the workflow configuration.

### Workflow Steps

1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Install Playwright browsers
5. Run tests
6. Upload test report (available for 30 days)

### Viewing CI Test Reports

When tests fail in CI:
1. Go to the Actions tab in GitHub
2. Click on the failed workflow run
3. Download the "playwright-report" artifact
4. Unzip and open `index.html` in a browser

## Debugging Tests

### UI Mode (Recommended)

```bash
npm run test:e2e:ui
```

UI mode provides:
- Visual test execution
- Time travel debugging
- Watch mode
- Test filtering

### Debug Mode

```bash
npx playwright test --debug
```

Features:
- Playwright Inspector
- Step-through debugging
- Element picker
- Console logging

### Traces

Traces are automatically captured on first retry. To always capture:

```bash
npx playwright test --trace on
```

View traces:
```bash
npx playwright show-trace trace.zip
```

### Screenshots and Videos

Configure in `playwright.config.ts`:
```typescript
use: {
  screenshot: 'on', // 'on', 'off', 'only-on-failure'
  video: 'retain-on-failure', // 'on', 'off', 'retain-on-failure'
}
```

## Best Practices

### 1. Test Isolation

Each test should be independent and not rely on state from other tests:
```typescript
test.beforeEach(async ({ page }) => {
  // Reset to clean state
  await page.goto('/');
});
```

### 2. Wait for Stability

Use explicit waits when needed:
```typescript
await expect(element).toBeVisible();
await page.waitForTimeout(500); // Use sparingly
await page.waitForLoadState('networkidle');
```

### 3. Descriptive Test Names

```typescript
// Good
test('should display error message when email is invalid', async ({ page }) => {

// Bad
test('test email', async ({ page }) => {
```

### 4. Use Page Object Pattern for Complex Pages

```typescript
class LoginPage {
  constructor(private page: Page) {}
  
  async login(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
```

### 5. Group Related Tests

```typescript
test.describe('User Authentication', () => {
  test.describe('Login', () => {
    // Login tests
  });
  
  test.describe('Registration', () => {
    // Registration tests
  });
});
```

### 6. Clean Up Resources

```typescript
test.afterEach(async ({ page }) => {
  // Clean up if needed
});
```

### 7. Test Data Management

Use fixtures or helper functions for test data:
```typescript
const testUser = {
  name: 'John Doe',
  email: 'john.doe@example.com'
};
```

### 8. Avoid Hard-Coded Waits

```typescript
// Bad
await page.waitForTimeout(5000);

// Good
await expect(element).toBeVisible();
await page.waitForLoadState('networkidle');
```

## Maintenance

### Regular Tasks

1. **Update Playwright**: Keep Playwright updated for latest features and fixes
   ```bash
   npm install -D @playwright/test@latest
   npx playwright install
   ```

2. **Review Test Reports**: Regularly check CI test reports for flaky tests

3. **Update Tests**: Keep tests in sync with application changes

4. **Performance**: Monitor test execution time and optimize slow tests

### Troubleshooting

**Tests timeout:**
- Increase timeout in config
- Check for network issues
- Verify selectors are correct

**Flaky tests:**
- Add proper waits
- Check for race conditions
- Review timing-sensitive operations

**Browser issues:**
- Reinstall browsers: `npx playwright install`
- Check browser versions
- Update system dependencies

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)

## Support

For questions or issues with tests:
1. Check this documentation
2. Review Playwright docs
3. Check test failures in CI
4. Create an issue in the repository
