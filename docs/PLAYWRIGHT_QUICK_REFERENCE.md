# Playwright Quick Reference

A quick reference guide for common Playwright commands and patterns.

## Running Tests

```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode (recommended)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test e2e/tests/homepage.spec.ts

# Run tests matching a pattern
npx playwright test --grep "navigation"

# Run tests in a specific browser
npx playwright test --project=chromium

# Run tests in debug mode
npx playwright test --debug

# Generate test code
npx playwright codegen http://localhost:5000/zava-smart-sportswear
```

## Locators

### By Role (Recommended)
```typescript
page.getByRole('button', { name: 'Submit' })
page.getByRole('link', { name: /login/i })
page.getByRole('textbox', { name: 'Email' })
page.getByRole('heading', { name: 'Welcome' })
```

### By Label
```typescript
page.getByLabel('Email')
page.getByLabel(/password/i)
```

### By Text
```typescript
page.getByText('Welcome')
page.getByText(/welcome/i)
```

### By Test ID
```typescript
page.getByTestId('submit-button')
// Add to HTML: <button data-testid="submit-button">
```

### By CSS/XPath (Use sparingly)
```typescript
page.locator('css=.my-class')
page.locator('xpath=//button')
```

## Common Actions

```typescript
// Click
await page.getByRole('button', { name: 'Submit' }).click()

// Fill input
await page.getByLabel('Email').fill('user@example.com')

// Select option
await page.getByRole('combobox').selectOption('option-value')

// Check/uncheck
await page.getByRole('checkbox').check()
await page.getByRole('checkbox').uncheck()

// Upload file
await page.getByLabel('Upload').setInputFiles('path/to/file.pdf')

// Clear input
await page.getByLabel('Search').clear()

// Press key
await page.keyboard.press('Enter')
await page.getByLabel('Search').press('Enter')

// Hover
await page.getByRole('button', { name: 'Menu' }).hover()

// Focus
await page.getByLabel('Email').focus()

// Scroll into view
await page.locator('section#contact').scrollIntoViewIfNeeded()
```

## Assertions

```typescript
// Visibility
await expect(element).toBeVisible()
await expect(element).toBeHidden()

// Text content
await expect(element).toHaveText('Expected text')
await expect(element).toContainText('partial text')

// Attribute
await expect(element).toHaveAttribute('href', '/login')
await expect(element).toHaveClass('active')

// Value
await expect(input).toHaveValue('test@example.com')

// URL
await expect(page).toHaveURL(/login/)
await expect(page).toHaveURL('http://localhost:5000/login')

// Title
await expect(page).toHaveTitle(/Welcome/)

// Count
await expect(page.getByRole('listitem')).toHaveCount(5)

// Focus
await expect(element).toBeFocused()

// In viewport
await expect(element).toBeInViewport()
```

## Waiting

```typescript
// Wait for element
await page.waitForSelector('css=.my-class')

// Wait for load state
await page.waitForLoadState('networkidle')
await page.waitForLoadState('domcontentloaded')

// Wait for navigation
await page.waitForURL('/dashboard')

// Wait for timeout (use sparingly)
await page.waitForTimeout(1000)

// Wait for function
await page.waitForFunction(() => window.innerWidth < 768)

// Wait for event
await page.waitForEvent('dialog')
```

## Navigation

```typescript
// Go to URL
await page.goto('/')
await page.goto('/products')

// Go back
await page.goBack()

// Go forward
await page.goForward()

// Reload
await page.reload()
```

## Screenshots & Videos

```typescript
// Page screenshot
await page.screenshot({ path: 'screenshot.png' })
await page.screenshot({ path: 'screenshot.png', fullPage: true })

// Element screenshot
await page.locator('nav').screenshot({ path: 'nav.png' })

// Video recording (configured in playwright.config.ts)
use: {
  video: 'retain-on-failure',
}
```

## Mobile Testing

```typescript
// Set viewport
await page.setViewportSize({ width: 375, height: 667 })

// Use device descriptors
import { devices } from '@playwright/test';

test.use({ ...devices['iPhone 12'] })
```

## Multiple Pages/Tabs

```typescript
// Open new page
const newPage = await context.newPage()

// Wait for popup
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.getByRole('link', { name: 'Open' }).click()
])
```

## Dialogs

```typescript
// Handle alert/confirm/prompt
page.on('dialog', async dialog => {
  console.log(dialog.message())
  await dialog.accept() // or dialog.dismiss()
})
```

## Network

```typescript
// Wait for response
const response = await page.waitForResponse('**/api/data')

// Mock response
await page.route('**/api/data', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ data: 'mocked' })
  })
})

// Abort requests
await page.route('**/*.{png,jpg,jpeg}', route => route.abort())
```

## Form Handling

```typescript
// Complete form example
await page.getByLabel('Name').fill('John Doe')
await page.getByLabel('Email').fill('john@example.com')
await page.getByRole('combobox', { name: 'Country' }).selectOption('US')
await page.getByRole('checkbox', { name: 'Terms' }).check()
await page.getByRole('button', { name: 'Submit' }).click()

// Wait for form submission
await expect(page).toHaveURL('/success')
```

## Debugging

```typescript
// Pause execution
await page.pause()

// Step through with debugger
test.only('debug this test', async ({ page }) => {
  await page.goto('/')
  // Test code
})

// Console log
console.log(await page.title())
console.log(await element.textContent())
```

## Test Hooks

```typescript
test.beforeAll(async ({ browser }) => {
  // Runs once before all tests
})

test.beforeEach(async ({ page }) => {
  // Runs before each test
  await page.goto('/')
})

test.afterEach(async ({ page }) => {
  // Runs after each test
})

test.afterAll(async ({ browser }) => {
  // Runs once after all tests
})
```

## Test Modifiers

```typescript
test.skip('skip this test', async ({ page }) => {})
test.only('run only this test', async ({ page }) => {})
test.slow() // Triples timeout
test.fixme('known failing test', async ({ page }) => {})
test.fail('expected to fail', async ({ page }) => {})
```

## Configuration Snippets

```typescript
// Custom timeout for specific test
test('slow operation', async ({ page }) => {
  test.setTimeout(60000) // 60 seconds
})

// Retry specific test
test('flaky test', async ({ page }) => {
  test.info().retry = 3
})
```

## Useful Patterns

```typescript
// Get all text from multiple elements
const texts = await page.getByRole('listitem').allTextContents()

// Count elements
const count = await page.getByRole('button').count()

// Check if element exists
const exists = await page.getByText('Hello').count() > 0

// Get element attribute
const href = await page.getByRole('link').getAttribute('href')

// Evaluate JavaScript
const result = await page.evaluate(() => {
  return window.location.href
})

// Evaluate with arguments
const text = await page.locator('div').evaluate(
  (el, suffix) => el.textContent + suffix,
  ' - added text'
)
```

## Tips

1. **Prefer user-facing locators**: `getByRole`, `getByLabel`, `getByText`
2. **Use auto-waiting**: Playwright waits automatically for actionability
3. **Keep tests independent**: Each test should work in isolation
4. **Use `test.beforeEach`**: Set up clean state for each test
5. **Avoid hard-coded waits**: Use `waitForSelector` or `expect` instead of `waitForTimeout`
6. **Use trace viewer**: Great for debugging failed tests
7. **Run tests in parallel**: Playwright does this by default
8. **Use UI mode**: Best way to debug and write tests
9. **Keep selectors simple**: The simpler, the more maintainable
10. **Add data-testid**: For elements that are hard to select

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)
