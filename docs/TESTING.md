# Playwright E2E Testing Documentation

This document provides instructions for running and maintaining Playwright end-to-end tests for the Zava Smart Sportswear application.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Overview

Playwright is a modern end-to-end testing framework that enables reliable browser automation. The test suite covers:

- Homepage and Hero section
- Navigation functionality
- Products section
- Contact section

Tests run across multiple browsers (Chromium, Firefox, WebKit) and device viewports (Desktop and Mobile).

## Installation

### Prerequisites

- Node.js v18 or higher
- npm or yarn package manager

### Install Playwright

1. Install project dependencies (includes Playwright):
   ```bash
   npm install --legacy-peer-deps
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

   Or install specific browsers only:
   ```bash
   npx playwright install chromium
   npx playwright install firefox
   npx playwright install webkit
   ```

3. Install system dependencies (Linux only):
   ```bash
   npx playwright install-deps
   ```

## Running Tests

### Run All Tests

```bash
npm run test:e2e
```

This command runs all tests in headless mode across all configured browsers.

### Run Tests with UI Mode

```bash
npm run test:e2e:ui
```

UI mode provides an interactive interface to explore, run, and debug tests.

### Run Tests in Headed Mode

```bash
npm run test:e2e:headed
```

Shows the browser while tests are running.

### Debug Tests

```bash
npm run test:e2e:debug
```

Opens tests in debug mode with Playwright Inspector.

### Run Specific Test File

```bash
npx playwright test tests/e2e/homepage.spec.ts
```

### Run Tests in a Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests on Mobile Viewports

```bash
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

### View Test Report

After running tests, view the HTML report:

```bash
npm run test:e2e:report
```

## Writing Tests

### Test Structure

Tests are located in `tests/e2e/` directory. Each test file follows this pattern:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    
    // Your test code
    const element = page.locator('#some-id');
    await expect(element).toBeVisible();
  });
});
```

### Best Practices

1. **Use semantic locators**: Prefer role-based and text-based selectors
   ```typescript
   page.getByRole('button', { name: 'Submit' })
   page.getByText('Welcome')
   ```

2. **Wait for elements properly**: Use Playwright's auto-waiting
   ```typescript
   await expect(page.locator('#element')).toBeVisible();
   ```

3. **Keep tests independent**: Each test should work standalone
   ```typescript
   test.beforeEach(async ({ page }) => {
     await page.goto('/');
   });
   ```

4. **Use descriptive test names**: Clearly describe what is being tested
   ```typescript
   test('should display error message when form is invalid', async ({ page }) => {
     // ...
   });
   ```

### Existing Test Files

- `homepage.spec.ts` - Homepage and hero section tests
- `navigation.spec.ts` - Navigation functionality tests
- `products.spec.ts` - Products section tests
- `contact.spec.ts` - Contact section tests

## CI/CD Integration

### GitHub Actions

The Playwright tests are integrated into the GitHub Actions workflow. See `.github/workflows/deploy.yml` for the CI configuration.

### Running in CI

Tests run automatically on:
- Push to `main` branch
- Pull requests to `main` branch

The CI workflow:
1. Sets up Node.js
2. Installs dependencies
3. Installs Playwright browsers
4. Runs tests in headless mode
5. Uploads test results as artifacts

### Test Artifacts

When tests fail in CI, the following artifacts are uploaded:
- Test results
- Screenshots of failures
- Test traces for debugging

## Troubleshooting

### Common Issues

#### Browsers Not Installed

**Error**: `browserType.launch: Executable doesn't exist`

**Solution**:
```bash
npx playwright install
```

#### Port Already in Use

**Error**: `Port 5173 is already in use`

**Solution**:
```bash
npm run kill  # Kills process on port 5000
# Or manually kill the process using port 5173
```

#### Tests Timing Out

**Solution**: Increase timeout in `playwright.config.ts`:
```typescript
use: {
  timeout: 30000, // Increase from default
}
```

#### Element Not Found

**Solution**: Add explicit wait or check if selector is correct:
```typescript
await page.waitForSelector('#element');
// Or
await page.locator('#element').waitFor();
```

### Debug Mode

For investigating test failures:

```bash
npm run test:e2e:debug
```

This opens the Playwright Inspector where you can:
- Step through tests
- Inspect DOM
- View console logs
- Check network requests

### Trace Viewer

When tests fail, traces are automatically recorded. View them:

```bash
npx playwright show-trace trace.zip
```

## Configuration

Test configuration is in `playwright.config.ts`. Key settings:

- `testDir`: Location of test files (`./tests/e2e`)
- `baseURL`: Application URL (`http://localhost:5173`)
- `projects`: Browser configurations
- `webServer`: Development server configuration
- `use.trace`: Trace recording settings
- `use.screenshot`: Screenshot settings

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Debugging Guide](https://playwright.dev/docs/debug)

## Contributing

When adding new tests:

1. Create test file in `tests/e2e/` directory
2. Follow existing naming convention (`*.spec.ts`)
3. Write descriptive test names
4. Ensure tests are independent and can run in any order
5. Run tests locally before committing
6. Update this documentation if adding new features or patterns
