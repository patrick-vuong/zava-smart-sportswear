# Playwright Testing Guide

## Overview

This project uses [Playwright](https://playwright.dev/) for end-to-end (E2E) testing. Playwright is a modern testing framework that allows us to test our application across different browsers with a single API.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- All project dependencies installed (`npm install`)

### First Time Setup

1. Install dependencies (includes Playwright):
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Running Tests

### Run All Tests

Run all tests in headless mode:
```bash
npm run test
```

### Interactive UI Mode

Best for test development and debugging:
```bash
npm run test:ui
```

Features:
- Visual test runner
- Step-by-step debugging
- Time travel through test execution
- Watch mode for test files

### Headed Mode

Run tests with visible browser windows:
```bash
npm run test:headed
```

Useful for:
- Seeing visual interactions
- Debugging UI issues
- Demonstrating test flows

### Running Specific Tests

Run a single test file:
```bash
npx playwright test e2e/homepage.spec.ts
```

Run tests matching a pattern:
```bash
npx playwright test --grep "contact form"
```

Run tests in a specific browser:
```bash
npx playwright test --project=chromium
```

## Test Structure

### Current Test Suites

#### 1. Homepage Tests (`e2e/homepage.spec.ts`)

Tests the main landing page functionality:
- ✅ Navigation menu display and interaction
- ✅ Hero section content
- ✅ Section scrolling behavior
- ✅ Footer information
- ✅ Mobile navigation

**Key User Flow**: Landing → Navigation → Section Browsing

#### 2. Contact Form Tests (`e2e/contact-form.spec.ts`)

Tests the contact form submission flow:
- ✅ Form field validation
- ✅ Email format validation
- ✅ Required field checks
- ✅ Inquiry type selection
- ✅ Successful submission
- ✅ Error handling
- ✅ Form reset after submission

**Key User Flow**: Navigate to Contact → Fill Form → Submit → Success

#### 3. Products Tests (`e2e/products.spec.ts`)

Tests the product showcase and interaction:
- ✅ Product card display
- ✅ Product details modal
- ✅ Product features and specifications
- ✅ Add to cart functionality
- ✅ Product pricing display
- ✅ Hover interactions

**Key User Flow**: Browse Products → View Details → Add to Cart

## Screenshots

### Automatic Screenshots

Tests capture screenshots in the following scenarios:
1. **On Failure**: Automatic screenshot when a test fails
2. **Explicit Captures**: Screenshots taken at key points in tests
3. **Full Page**: Some tests capture full-page screenshots

### Screenshot Locations

Screenshots are saved to:
```
e2e/screenshots/
├── homepage.png
├── contact-form-filled.png
├── contact-form-success.png
├── contact-section.png
├── products-section.png
├── product-details-modal.png
└── product-hover-state.png
```

**Note**: Screenshots are gitignored and not committed to the repository.

### Viewing Screenshots

Screenshots can be viewed:
1. Directly in the file system at `e2e/screenshots/`
2. In the HTML test report (see below)
3. In the Playwright UI mode

## Test Reports

### HTML Report

After running tests, an HTML report is automatically generated.

View the report:
```bash
npm run test:report
```

The report includes:
- Test execution timeline
- Pass/fail status for each test
- Screenshots and videos (on failure)
- Error messages and stack traces
- Performance metrics

### CI/CD Integration

The Playwright configuration is optimized for CI environments:
- Automatic retries on failure (2 retries on CI)
- Single worker on CI for stability
- HTML reporter for artifact storage
- Screenshots and traces on failure

## Configuration

### Playwright Config (`playwright.config.ts`)

Key configurations:
- **Test Directory**: `./e2e`
- **Base URL**: `http://localhost:5000/zava-smart-sportswear`
- **Browsers**: Chromium (default), Firefox and WebKit available
- **Retries**: 2 on CI, 0 locally
- **Screenshots**: On failure
- **Trace**: On first retry
- **Web Server**: Automatically starts dev server

### Customizing Configuration

To test additional browsers, uncomment in `playwright.config.ts`:

```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },  // Uncomment
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },    // Uncomment
]
```

## Writing New Tests

### Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/');
  });

  test('should perform an action', async ({ page }) => {
    // Arrange
    const button = page.getByRole('button', { name: 'Click Me' });
    
    // Act
    await button.click();
    
    // Assert
    await expect(page.getByText('Success')).toBeVisible();
    
    // Optional: Take screenshot
    await page.screenshot({ path: 'e2e/screenshots/feature.png' });
  });
});
```

### Best Practices

1. **Use Semantic Selectors**: Prefer `getByRole`, `getByLabel`, `getByText` over CSS selectors
2. **Wait for Elements**: Use `await expect(...).toBeVisible()` instead of `waitForTimeout` when possible
3. **Isolate Tests**: Each test should be independent and not rely on others
4. **Descriptive Names**: Use clear, descriptive test names that explain what is being tested
5. **Take Screenshots**: Capture key states for visual verification and debugging
6. **Handle Animations**: Add appropriate waits for smooth scrolling or animations

### Common Patterns

#### Navigating to a Section
```typescript
await page.getByRole('button', { name: 'Contact' }).click();
await page.waitForTimeout(1000); // Wait for smooth scroll
```

#### Filling Forms
```typescript
await page.getByLabel('Email').fill('user@example.com');
await page.getByRole('button', { name: 'Submit' }).click();
```

#### Working with Modals
```typescript
await page.getByRole('button', { name: 'Open' }).click();
const modal = page.locator('[role="dialog"]');
await expect(modal).toBeVisible();
```

#### Taking Screenshots
```typescript
// Full page
await page.screenshot({ path: 'screenshot.png', fullPage: true });

// Specific element
await page.locator('#section').screenshot({ path: 'section.png' });
```

## Debugging

### Debug Mode

Run a single test in debug mode:
```bash
npx playwright test e2e/homepage.spec.ts --debug
```

This opens the Playwright Inspector where you can:
- Step through test execution
- See browser interactions live
- Inspect the DOM
- View console logs

### VS Code Extension

Install the [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension for:
- Running tests from the editor
- Setting breakpoints
- Viewing test results inline
- Generating test code

### Common Issues

**Issue**: Tests timing out
- **Solution**: Increase timeout or check if dev server is running properly

**Issue**: Element not found
- **Solution**: Use Playwright Inspector to verify selectors

**Issue**: Flaky tests
- **Solution**: Add proper waits, avoid `waitForTimeout`, use `expect` with auto-retry

## Continuous Integration

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
        run: npx playwright install --with-deps chromium
      - name: Run Playwright tests
        run: npm run test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Test Generator](https://playwright.dev/docs/codegen) - Generate tests by recording browser interactions

## Contributing

When adding new tests:

1. Follow existing test structure and naming conventions
2. Add meaningful test descriptions
3. Include appropriate assertions
4. Take screenshots for visual verification
5. Update this documentation if adding new test suites
6. Ensure all tests pass before submitting PR

## Support

For issues or questions:
- Check the [Playwright documentation](https://playwright.dev/)
- Review existing test examples in the `e2e` directory
- Open an issue on the project repository
