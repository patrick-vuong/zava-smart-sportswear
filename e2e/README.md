# Playwright Testing Documentation

This directory contains end-to-end tests for the Zava Smart Sportswear application using Playwright.

## Test Structure

```
e2e/
├── homepage.spec.ts    # Homepage navigation and layout tests
├── products.spec.ts    # Product showcase interaction tests
└── contact.spec.ts     # Contact form validation and submission tests
```

## Test Coverage

### Homepage (`homepage.spec.ts`)
- **Navigation Display**: Verifies that the logo and all navigation items (Home, Products, Technology, Athletes, About, Contact) are visible
- **Section Navigation**: Tests that clicking navigation buttons properly scrolls to the corresponding sections
- **Footer Content**: Ensures footer displays company information and copyright notice

### Product Showcase (`products.spec.ts`)
- **Product Cards**: Verifies that product cards for smart jerseys and cleats are displayed
- **Product Details**: Tests opening product detail dialogs with features and specifications
- **Cart Interaction**: Validates add-to-cart functionality

### Contact Form (`contact.spec.ts`)
- **Form Fields**: Ensures all required fields (name, email, subject, message) are present
- **Validation**: Tests that empty form submission shows appropriate error messages
- **Successful Submission**: Validates form submission with complete, valid data

## Running Tests

### Prerequisites

Install Playwright browsers (one-time setup):
```bash
npx playwright install --with-deps chromium
```

### Running All Tests
```bash
npm run test:e2e
```

### Running in UI Mode (Recommended for Development)
```bash
npm run test:e2e:ui
```

This opens an interactive UI where you can:
- See all test files and their status
- Run individual tests or suites
- See live browser interaction
- Debug failed tests with time travel

### Running in Headed Mode
```bash
npm run test:e2e:headed
```

This runs tests in a visible browser window, useful for debugging.

### Viewing Test Reports
```bash
npm run test:e2e:report
```

Opens the HTML report from the last test run.

## Test Configuration

The Playwright configuration (`playwright.config.ts`) includes:

### Viewport Testing
Tests run on multiple viewport sizes:
- **Desktop Chrome**: 1280x720 viewport
- **Mobile Chrome**: Pixel 5 emulation (393x851)
- **Mobile Safari**: iPhone 12 emulation (390x844)

This ensures the application works correctly on both desktop and mobile devices.

### Development Server
Playwright automatically starts the development server (`npm run dev`) before running tests and shuts it down after completion. The server is available at `http://localhost:5000/zava-smart-sportswear/`.

### CI Configuration
- Tests fail if `test.only` is accidentally left in the code
- Retries failed tests up to 2 times
- Runs tests sequentially to avoid resource contention
- Captures traces on first retry for debugging
- Takes screenshots on failure

## Writing New Tests

Follow the existing test structure:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something specific', async ({ page }) => {
    await page.goto('/');
    
    // Your test code here
    await expect(page.getByText('Expected Text')).toBeVisible();
  });
});
```

### Best Practices

1. **Use Descriptive Test Names**: Test names should clearly describe what is being tested
2. **Isolate Tests**: Each test should be independent and not rely on state from other tests
3. **Use Locators Wisely**: Prefer role-based locators (`getByRole`) over CSS selectors when possible
4. **Wait for Elements**: Use Playwright's auto-waiting features instead of manual timeouts when possible
5. **Test User Journeys**: Focus on testing complete user flows rather than individual components

## CI Integration

Tests run automatically in GitHub Actions on every pull request and push to main. The workflow:

1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Installs Playwright browsers
5. Runs all tests
6. Uploads test reports as artifacts (retained for 30 days)
7. Continues with the build if tests pass

View test results in the GitHub Actions tab of the repository.

## Debugging Failed Tests

### Local Debugging

1. Run tests in UI mode:
   ```bash
   npm run test:e2e:ui
   ```

2. Use the Playwright Inspector:
   ```bash
   PWDEBUG=1 npm run test:e2e
   ```

### CI Debugging

When tests fail in CI:

1. Download the `playwright-report` artifact from the GitHub Actions run
2. Extract it locally
3. View the report:
   ```bash
   npx playwright show-report path/to/extracted/report
   ```

The report includes:
- Screenshots of failures
- Traces (for retried tests)
- Console logs
- Network activity

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Writing Tests](https://playwright.dev/docs/writing-tests)
- [Test Assertions](https://playwright.dev/docs/test-assertions)
