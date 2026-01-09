# Playwright Testing Documentation

This project uses [Playwright](https://playwright.dev/) for end-to-end testing. Playwright enables reliable testing across Chromium, Firefox, and WebKit browsers.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [Screenshots](#screenshots)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. Install project dependencies (if not already done):

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

If you're on Linux and encounter missing dependencies, install them with:

```bash
npx playwright install-deps
```

## Running Tests

### Run all tests

```bash
npm test
```

This will run tests in headless mode across all configured browsers (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari).

### Run tests in headed mode

To see the browser while tests are running:

```bash
npm run test:headed
```

### Run tests in UI mode

For an interactive testing experience with time-travel debugging:

```bash
npm run test:ui
```

### Run specific test file

```bash
npx playwright test tests/navigation.spec.ts
```

### Run tests in a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### View test report

After running tests, view the HTML report:

```bash
npm run test:report
```

## Test Structure

Tests are organized in the `tests/` directory:

```
tests/
├── contact-form.spec.ts    # Contact form submission and validation tests
├── hero.spec.ts            # Hero section and responsive design tests
├── navigation.spec.ts      # Navigation and routing tests
└── screenshots/            # Screenshots captured during tests (gitignored)
```

### Existing Test Files

#### `navigation.spec.ts`

Tests for page navigation and routing:
- Homepage display and navigation items
- Section navigation (Products, Contact, etc.)
- Shop Now button functionality
- Footer content display

#### `contact-form.spec.ts`

Tests for the contact form:
- Form field display and validation
- Email format validation
- Successful form submission
- Form reset after submission
- Contact information display

#### `hero.spec.ts`

Tests for hero section and responsive design:
- Hero section content display
- CTA button functionality
- Mobile and desktop responsive layouts
- Screenshot capture for visual verification

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something specific', async ({ page }) => {
    // Navigate to page
    await page.goto('/');
    
    // Interact with elements
    await page.locator('button:has-text("Click Me")').click();
    
    // Assert expectations
    await expect(page.locator('text=Success')).toBeVisible();
  });
});
```

### Common Actions

```typescript
// Navigation
await page.goto('/');

// Clicking elements
await page.locator('button:has-text("Submit")').click();

// Filling forms
await page.locator('input#email').fill('user@example.com');

// Waiting
await page.waitForTimeout(1000);
await page.waitForSelector('text=Loaded');

// Assertions
await expect(page.locator('h1')).toBeVisible();
await expect(page.locator('input')).toHaveValue('expected value');
```

### Taking Screenshots

Screenshots are useful for visual verification and debugging:

```typescript
// Screenshot of current viewport
await page.screenshot({ path: 'tests/screenshots/my-test.png' });

// Full page screenshot
await page.screenshot({ 
  path: 'tests/screenshots/full-page.png',
  fullPage: true 
});

// Screenshot of specific element
await page.locator('#my-element').screenshot({ 
  path: 'tests/screenshots/element.png' 
});
```

## Screenshots

Screenshots are automatically captured:
- On test failure (configured in `playwright.config.ts`)
- Explicitly in tests for visual verification
- Stored in `tests/screenshots/` directory (gitignored)

To view screenshots:
1. Check the `tests/screenshots/` folder after running tests
2. Open the HTML report with `npm run test:report` to see failure screenshots

## Best Practices

### 1. Use Descriptive Test Names

```typescript
// Good
test('should display validation error when email is invalid', async ({ page }) => {
  // ...
});

// Bad
test('test1', async ({ page }) => {
  // ...
});
```

### 2. Use beforeEach for Common Setup

```typescript
test.describe('My Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Common setup
  });

  test('should test feature A', async ({ page }) => {
    // Test specific to feature A
  });
});
```

### 3. Avoid Hard-Coded Waits

```typescript
// Bad
await page.waitForTimeout(3000);

// Good
await expect(page.locator('text=Loaded')).toBeVisible();
```

### 4. Use Specific Selectors

```typescript
// Better - using data-testid
await page.locator('[data-testid="submit-button"]').click();

// Good - using text content
await page.locator('button:has-text("Submit")').click();

// Avoid - too generic
await page.locator('button').first().click();
```

### 5. Test User Flows, Not Implementation

Focus on testing what users do and see, not internal implementation details.

## Configuration

The Playwright configuration is in `playwright.config.ts`. Key settings:

- **Base URL**: `http://localhost:5173` (development server)
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Retry**: 2 retries on CI, 0 locally
- **Screenshots**: Captured on failure
- **Trace**: Captured on first retry
- **Web Server**: Automatically starts dev server before tests

## Troubleshooting

### Tests fail with "page.goto: net::ERR_CONNECTION_REFUSED"

The dev server isn't running. The config should auto-start it, but you can start it manually:

```bash
npm run dev
```

Then run tests in another terminal.

### "Browser not found" error

Install browsers:

```bash
npx playwright install
```

### Tests timeout

Increase timeout in `playwright.config.ts`:

```typescript
export default defineConfig({
  timeout: 60000, // 60 seconds
  // ...
});
```

### Missing system dependencies (Linux)

```bash
npx playwright install-deps
```

## CI/CD Integration

To run tests in CI:

1. Install dependencies: `npm ci`
2. Install Playwright: `npx playwright install --with-deps`
3. Run tests: `npm test`

Example GitHub Actions workflow:

```yaml
- name: Install dependencies
  run: npm ci
  
- name: Install Playwright Browsers
  run: npx playwright install --with-deps
  
- name: Run Playwright tests
  run: npm test
```

## Contributing Tests

When adding new features:

1. Create a new test file in `tests/` following the naming convention: `feature-name.spec.ts`
2. Write tests that cover the main user flows
3. Ensure tests are independent and can run in any order
4. Run tests locally before committing: `npm test`
5. Include screenshots for visual features

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Tests](https://playwright.dev/docs/debug)
