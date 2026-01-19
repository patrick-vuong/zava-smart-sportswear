# Testing Guide

This document provides detailed information about the end-to-end testing framework implemented with Playwright.

## Overview

The project uses [Playwright](https://playwright.dev/) for end-to-end testing. Playwright is a powerful testing framework that allows testing across multiple browsers (Chromium, Firefox, and WebKit) with a single API.

## Test Structure

Tests are organized in the `tests/` directory:

```
tests/
├── contact-form.spec.ts    # Contact form functionality tests
├── navigation.spec.ts      # Navigation and UI tests
└── screenshots/            # Test screenshots (auto-generated)
```

## Running Tests

### Quick Start

```bash
# Run all tests in headless mode
npm test

# Run tests with browser UI visible
npm run test:headed

# Run tests in interactive UI mode (recommended for development)
npm run test:ui

# Debug a specific test
npm run test:debug

# View last test report
npm run test:report
```

### Running Specific Tests

```bash
# Run only contact form tests
npx playwright test contact-form

# Run only navigation tests
npx playwright test navigation

# Run a specific test by name
npx playwright test -g "should display contact form"

# Run tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Coverage

### Contact Form Tests (`tests/contact-form.spec.ts`)

1. **Display Test** - Verifies all form fields are present and visible
2. **Contact Information Display** - Checks that company contact details are shown
3. **Form Filling** - Tests that users can fill out the form fields correctly

**Key Features Tested:**
- Form field visibility and accessibility
- Radix UI Select component interaction
- Form field validation
- Contact information cards display

### Navigation Tests (`tests/navigation.spec.ts`)

1. **Homepage Display** - Verifies hero section and call-to-action buttons
2. **Section Navigation** - Tests smooth scrolling through all page sections
3. **Mobile Navigation** - Validates mobile menu functionality
4. **Logo and Branding** - Checks logo and brand name display
5. **CTA Functionality** - Tests "Shop Now" button navigation
6. **Footer Display** - Verifies footer content and structure

**Key Features Tested:**
- Responsive navigation menu
- Smooth scroll behavior
- Mobile menu toggle
- Section visibility
- Footer structure

## Screenshots

Tests automatically capture screenshots during execution:

| Screenshot | Description |
|------------|-------------|
| `contact-form.png` | Contact form initial state |
| `contact-form-filled.png` | Form with data filled in |
| `contact-info.png` | Contact information display |
| `homepage-hero.png` | Homepage hero section |
| `navigation-*.png` | Each section after navigation |
| `mobile-navigation-*.png` | Mobile menu states |
| `footer.png` | Footer content |
| `shop-now-clicked.png` | Products section after CTA click |

## Configuration

The Playwright configuration is defined in `playwright.config.ts`:

- **Base URL**: `http://localhost:5000/zava-smart-sportswear`
- **Timeout**: 30 seconds per test
- **Retries**: 2 retries in CI, 0 locally
- **Browsers**: Chromium, Firefox, WebKit
- **Web Server**: Automatically starts Vite dev server before tests

## Writing New Tests

### Test Structure Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should do something specific', async ({ page }) => {
    // Arrange
    await page.click('text=Navigation Item');
    
    // Act
    await page.click('button:has-text("Submit")');
    
    // Assert
    await expect(page.locator('text=Success')).toBeVisible();
    
    // Screenshot
    await page.screenshot({ path: 'tests/screenshots/feature-name.png' });
  });
});
```

### Best Practices

1. **Use Descriptive Test Names**: Test names should clearly describe what is being tested
2. **Wait for Elements**: Use `waitForSelector` or `waitForLoadState` when needed
3. **Take Screenshots**: Capture screenshots for visual validation
4. **Use Specific Selectors**: Prefer `getByRole`, `getByLabel`, or IDs over generic selectors
5. **Test User Flows**: Focus on complete user journeys, not isolated functions
6. **Keep Tests Independent**: Each test should be able to run independently
7. **Use Page Object Pattern**: For larger test suites, consider implementing page objects

### Common Selectors

```typescript
// By ID
page.locator('#element-id')

// By text
page.locator('text=Button Text')

// By role (recommended for accessibility)
page.getByRole('button', { name: 'Submit' })
page.getByRole('heading', { name: 'Title' })

// By placeholder
page.getByPlaceholder('Enter your email')

// By label
page.getByLabel('Email Address')

// Complex selectors
page.locator('button:has-text("Submit")')
page.locator('nav >> text=Home')
```

## Debugging Tests

### Visual Debugging

```bash
# Run tests in headed mode
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode with inspector
npm run test:debug
```

### Viewing Test Results

```bash
# Open HTML report
npm run test:report

# View trace for failed tests
npx playwright show-trace test-results/[test-name]/trace.zip
```

### Common Issues

1. **Element Not Found**: Increase timeout or wait for element visibility
2. **Flaky Tests**: Add explicit waits or use more specific selectors
3. **Server Not Starting**: Check if port 5000 is available or adjust config

## CI/CD Integration

The test configuration is optimized for CI environments:

- Tests run in headless mode in CI
- Automatic retries on failure (2 retries)
- HTML reporter for test results
- Screenshots and traces saved for failed tests

### GitHub Actions Example

```yaml
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps chromium

- name: Run Playwright tests
  run: npm test

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Debugging Guide](https://playwright.dev/docs/debug)

## Troubleshooting

### Port Already in Use

If port 5000 is already in use:
```bash
# Kill the process using port 5000
npm run kill
```

### Browser Not Installed

If you get an error about browsers not being installed:
```bash
npx playwright install --with-deps chromium
```

### Test Timeout

If tests are timing out, you can increase the timeout in `playwright.config.ts`:
```typescript
use: {
  timeout: 60000, // Increase to 60 seconds
}
```

## Contributing Tests

When adding new features to the application:

1. Write corresponding tests that cover the new functionality
2. Ensure tests pass locally before committing
3. Update this documentation if adding new test patterns
4. Add screenshots for visual features
5. Run the full test suite to ensure no regressions

## Support

For questions or issues with tests:
- Check the [Playwright Documentation](https://playwright.dev/)
- Review existing tests for examples
- Open an issue in the repository
