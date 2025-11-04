# Playwright Testing Guide

This document provides guidance on writing and running Playwright tests for the Zava Smart Sportswear application.

## Overview

Playwright is a modern end-to-end testing framework that allows you to test your web application across multiple browsers (Chromium, Firefox, WebKit) and devices (desktop and mobile).

## Test Structure

Tests are organized in the `/tests` directory with the following structure:

```
tests/
├── homepage.spec.ts      # Tests for homepage and navigation
├── products.spec.ts      # Tests for products page
├── contact.spec.ts       # Tests for contact form
└── README.md            # This file
```

## Running Tests

### Prerequisites

First, install Playwright browsers (only needed once):

```bash
npx playwright install
```

### Basic Commands

```bash
# Run all tests in headless mode
npm test

# Run tests with UI (interactive mode)
npm run test:ui

# Run tests in headed mode (see the browser)
npm run test:headed

# Debug a specific test
npm run test:debug

# Show test report
npm run test:report
```

### Running Specific Tests

```bash
# Run a specific test file
npx playwright test tests/homepage.spec.ts

# Run tests matching a title
npx playwright test -g "should load the homepage"

# Run tests in a specific browser
npx playwright test --project=chromium
```

## Writing Tests

### Basic Test Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    // Navigate to the page
    await page.goto('/');
    
    // Interact with elements
    await page.getByRole('button', { name: 'Click Me' }).click();
    
    // Make assertions
    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

### Common Patterns

#### Navigating to a Section

```typescript
test('should navigate to products', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Products' }).click();
  
  // Wait for section to be in viewport (better than waitForTimeout)
  const productsSection = page.locator('#products');
  await expect(productsSection).toBeInViewport();
});
```

#### Filling Forms

```typescript
test('should submit form', async ({ page }) => {
  await page.goto('/');
  
  // Fill form fields
  await page.getByLabel('Name').fill('John Doe');
  await page.getByLabel('Email').fill('john@example.com');
  
  // Select from dropdown
  await page.locator('#dropdown').click();
  await page.getByRole('option', { name: 'Option 1' }).click();
  
  // Submit
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Verify success
  await expect(page.getByText('Success')).toBeVisible();
});
```

#### Testing Dialogs/Modals

```typescript
test('should open dialog', async ({ page }) => {
  await page.goto('/');
  
  // Click button to open dialog
  await page.getByRole('button', { name: 'View Details' }).click();
  
  // Verify dialog is visible
  const dialog = page.locator('[role="dialog"]');
  await expect(dialog).toBeVisible();
  
  // Interact with dialog content
  await expect(dialog.getByText('Details')).toBeVisible();
});
```

### Best Practices

1. **Use Descriptive Test Names**: Test names should clearly describe what is being tested
   ```typescript
   test('should display error when submitting empty contact form', async ({ page }) => {
     // ...
   });
   ```

2. **Use `test.describe` for Grouping**: Group related tests together
   ```typescript
   test.describe('Contact Form', () => {
     test('should validate email', async ({ page }) => { /* ... */ });
     test('should submit successfully', async ({ page }) => { /* ... */ });
   });
   ```

3. **Use `beforeEach` for Setup**: Reduce code duplication with setup hooks
   ```typescript
   test.describe('Products', () => {
     test.beforeEach(async ({ page }) => {
       await page.goto('/');
       await page.getByRole('button', { name: 'Products' }).click();
     });
     
     test('should display products', async ({ page }) => {
       // Already on products section from beforeEach
     });
   });
   ```

4. **Prefer User-Facing Selectors**: Use roles, labels, and text over CSS selectors
   ```typescript
   // Good
   await page.getByRole('button', { name: 'Submit' }).click();
   await page.getByLabel('Email').fill('test@example.com');
   
   // Avoid when possible
   await page.locator('.btn-submit').click();
   await page.locator('#email-input').fill('test@example.com');
   ```

5. **Wait for Elements**: Use Playwright's auto-waiting, but add explicit waits when needed
   ```typescript
   // Auto-waiting (preferred) - Playwright waits automatically
   await expect(page.getByText('Success')).toBeVisible();
   
   // Wait for specific state
   await page.waitForLoadState('networkidle');
   
   // Wait for selector (when auto-waiting isn't enough)
   await page.waitForSelector('.animation-complete');
   
   // Note: Avoid waitForTimeout() as it makes tests flaky
   // Use state-based waiting instead
   ```

6. **Test Mobile Viewports**: Use the configured mobile projects
   ```bash
   npx playwright test --project="Mobile Chrome"
   ```

## Debugging Tests

### Using the Inspector

```bash
npm run test:debug
```

This opens the Playwright Inspector where you can:
- Step through test execution
- Pause and resume tests
- Inspect the page state
- View console logs

### Using `page.pause()`

Add `await page.pause()` in your test to pause execution:

```typescript
test('debug test', async ({ page }) => {
  await page.goto('/');
  await page.pause(); // Execution will pause here
  await page.click('button');
});
```

### Viewing Traces

Traces are automatically recorded on first retry. View them with:

```bash
npx playwright show-trace trace.zip
```

## CI/CD Integration

Tests automatically run in GitHub Actions on:
- Pull requests to `main` and `develop` branches
- Pushes to `main` and `develop` branches
- Before deployment to GitHub Pages

Test reports are uploaded as artifacts and retained for 30 days.

## Useful Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Selectors Guide](https://playwright.dev/docs/selectors)
- [Assertions](https://playwright.dev/docs/test-assertions)

## Troubleshooting

### Tests fail with "page.goto: net::ERR_CONNECTION_REFUSED"

Make sure the development server is running. The Playwright config automatically starts it, but you can also run it manually:

```bash
npm run dev
```

### Browser installation issues

If you have trouble installing browsers:

```bash
# Install with system dependencies
npx playwright install --with-deps

# Or install specific browsers
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### Tests are flaky

- Use state-based waiting instead of `waitForTimeout()`
- Use `expect().toBeVisible()` for element visibility
- Use `waitForLoadState()` for page loads
- Use `waitForSelector()` for dynamic content

## Contributing

When adding new features:
1. Write tests that cover the new functionality
2. Ensure tests pass locally before committing
3. Update this guide if introducing new testing patterns
