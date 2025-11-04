# Playwright Testing Guide

This document provides comprehensive information about the Playwright end-to-end testing setup for the Zava Smart Sportswear website.

## Overview

The testing suite covers all major user flows and functionality of the website:

- Homepage navigation and responsiveness
- Product showcase interactions
- Technology demonstration features
- Athletes testimonial carousel
- Contact form validation
- Accessibility compliance
- Performance verification

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Install project dependencies**:
```bash
npm install
```

2. **Install Playwright browsers** (one-time setup):
```bash
npx playwright install
```

If you encounter browser download issues, you can install system dependencies first:
```bash
npx playwright install-deps chromium
```

## Running Tests

### Basic Commands

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests in headless mode |
| `npm run test:ui` | Run tests with interactive UI |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:debug` | Debug specific tests |

### Advanced Usage

**Run specific test file**:
```bash
npx playwright test homepage.spec.ts
```

**Run tests in specific browser**:
```bash
npx playwright test --project=chromium
```

**Run tests with specific tag**:
```bash
npx playwright test --grep="responsive"
```

**Generate test report**:
```bash
npx playwright show-report
```

## Test Structure

### Test Files

```
tests/
├── homepage.spec.ts         # Homepage and navigation
├── products.spec.ts         # Products section functionality
├── technology.spec.ts       # Technology demonstrations
├── athletes.spec.ts         # Athletes carousel
├── contact.spec.ts          # Contact form validation
├── accessibility.spec.ts    # Accessibility & performance
└── setup-verification.spec.ts # Basic setup check
```

### Test Categories

#### 1. Homepage Tests (`homepage.spec.ts`)
- Page loading and title verification
- Navigation menu functionality
- Footer content display
- Mobile responsiveness
- Logo and branding elements

#### 2. Products Tests (`products.spec.ts`)
- Product card displays
- Interactive elements
- Responsive behavior across devices
- Product specifications

#### 3. Technology Tests (`technology.spec.ts`)
- Technology content display
- Interactive demonstrations
- Feature explanations
- Animation handling

#### 4. Athletes Tests (`athletes.spec.ts`)
- Testimonial carousel functionality
- Navigation controls (prev/next)
- Athlete information display
- Video play button interactions
- Performance statistics

#### 5. Contact Tests (`contact.spec.ts`)
- Contact form presence
- Form field validation
- Company contact information
- Mobile form usability

#### 6. Accessibility Tests (`accessibility.spec.ts`)
- Semantic HTML structure
- Keyboard navigation
- Color contrast verification
- Page load performance
- Cross-device responsiveness
- Error handling

## Configuration

### Browser Support

The test suite runs on multiple browsers and devices:

- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: Chrome on Pixel 5, Safari on iPhone 12

### Test Configuration (`playwright.config.ts`)

Key settings:
- Base URL: `http://localhost:5000/zava-smart-sportswear/`
- Parallel execution enabled
- Retry policy: 2 retries on CI
- Trace collection on test failure
- HTML reporter for results

### CI/CD Integration

Tests automatically run via GitHub Actions on:
- Pull requests to main/master
- Pushes to main/master branches

The workflow:
1. Sets up Node.js environment
2. Installs dependencies
3. Installs Playwright browsers
4. Runs test suite
5. Uploads test reports as artifacts

## Best Practices

### Writing Tests

1. **Use descriptive test names**:
```typescript
test('should navigate to products section when Products link is clicked', async ({ page }) => {
  // Test implementation
});
```

2. **Use proper selectors**:
```typescript
// Prefer data attributes or semantic selectors
await page.click('[data-testid="products-link"]');
await page.click('button:has-text("Products")');
```

3. **Wait for elements properly**:
```typescript
await expect(page.locator('#products')).toBeInViewport();
```

4. **Test responsive behavior**:
```typescript
await page.setViewportSize({ width: 375, height: 667 });
```

### Debugging Tests

1. **Use headed mode to see what's happening**:
```bash
npm run test:headed
```

2. **Add debugging breakpoints**:
```typescript
await page.pause(); // Pauses test execution
```

3. **Use the Playwright inspector**:
```bash
npm run test:debug
```

4. **Capture screenshots on failure**:
```typescript
await page.screenshot({ path: 'debug-screenshot.png' });
```

## Troubleshooting

### Common Issues

#### Browser Installation Fails
```bash
# Try installing system dependencies first
npx playwright install-deps chromium
# Then install the browser
npx playwright install chromium
```

#### Tests Timeout
- Increase timeout in `playwright.config.ts`
- Check if development server is running
- Verify network connectivity

#### Element Not Found
- Use `page.locator()` with proper selectors
- Wait for elements with `expect().toBeVisible()`
- Check for dynamic content loading

#### Flaky Tests
- Add proper wait conditions
- Use stable selectors
- Avoid hardcoded delays

### Environment Issues

#### Development Server Not Running
```bash
# Start the dev server in another terminal
npm run dev
```

#### Port Conflicts
- Update `baseURL` in `playwright.config.ts`
- Change dev server port in `vite.config.ts`

## Maintenance

### Updating Tests

1. **Add new tests** for new features
2. **Update selectors** when UI changes
3. **Review test results** regularly
4. **Keep Playwright updated**:
```bash
npm update @playwright/test
npx playwright install
```

### Performance Monitoring

Monitor test execution times and consider:
- Parallel test execution
- Test sharding for large suites
- Selective test running for PRs

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test Runner](https://playwright.dev/docs/test-cli)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [CI/CD Integration](https://playwright.dev/docs/ci)