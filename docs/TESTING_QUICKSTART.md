# Quick Start Guide: Playwright Testing

## Prerequisites

Before running tests, ensure you have:
- Node.js 18 or higher installed
- npm or yarn package manager

## Installation

1. **Install project dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```
   
   Or install specific browsers:
   ```bash
   npx playwright install chromium
   ```

## Running Tests

### Quick Commands

```bash
# Run all tests (headless mode)
npm run test:e2e

# Run tests with visual UI
npm run test:e2e:ui

# Run tests and see the browser
npm run test:e2e:headed

# Debug tests step by step
npm run test:e2e:debug

# View last test report
npm run test:e2e:report
```

### Running Specific Tests

```bash
# Run a specific test file
npx playwright test tests/e2e/navigation.spec.ts

# Run tests matching a pattern
npx playwright test --grep "contact form"

# Run a specific project (browser)
npx playwright test --project=chromium
```

## What's Been Tested

✅ **Navigation Tests** (`tests/e2e/navigation.spec.ts`)
- Main navigation menu visibility
- Section navigation functionality
- Mobile menu behavior
- Screenshot capture

✅ **Contact Form Tests** (`tests/e2e/contact-form.spec.ts`)
- Form field validation
- Email format validation
- Successful form submission
- Loading states
- Form reset after submission
- Contact information display

✅ **Hero Section Tests** (`tests/e2e/hero-section.spec.ts`)
- Hero content display
- CTA button functionality
- Responsive layouts
- Animation behavior
- Branding verification

## Viewing Test Results

After running tests, you can:

1. **View HTML Report:**
   ```bash
   npm run test:e2e:report
   ```
   This opens an interactive HTML report in your browser.

2. **Check Screenshots:**
   Look in `tests/e2e/screenshots/` for screenshots captured during tests.

3. **View Test Results in Terminal:**
   Test results are displayed in the terminal after each run.

## Troubleshooting

### Tests won't start
- Make sure the dev server isn't already running on port 5000
- Kill any existing processes: `npm run kill`
- Try `npx playwright install --with-deps` if browsers aren't installed

### Timeout errors
- Increase timeout in `playwright.config.ts`
- Check if the dev server is starting correctly

### Browser launch errors
- Reinstall browsers: `npx playwright install chromium --with-deps`
- Check system dependencies: `npx playwright install-deps`

## Next Steps

- Read the full documentation: [docs/TESTING.md](docs/TESTING.md)
- Add new tests for additional features
- Integrate tests into your CI/CD pipeline using `.github/workflows/playwright.yml`

## Need Help?

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- Check existing tests for examples
