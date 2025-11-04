# Testing Documentation

This document provides an overview of the testing infrastructure and best practices for the Zava Smart Sportswear project.

## Testing Stack

- **Test Runner**: Vitest 4.0.7
- **Testing Library**: @testing-library/react
- **DOM Utilities**: @testing-library/dom, @testing-library/user-event
- **Test Environment**: jsdom
- **Assertion Library**: @testing-library/jest-dom

## Running Tests

```bash
# Run tests in watch mode (for development)
npm test

# Run tests once
npm test:run

# Run tests with UI
npm test:ui

# Run tests with coverage
npm test:coverage
```

## Test Structure

Tests are located alongside their source files with the `.test.ts` or `.test.tsx` extension:

```
src/
├── lib/
│   ├── utils.ts
│   └── utils.test.ts
├── hooks/
│   ├── use-mobile.ts
│   └── use-mobile.test.ts
├── components/
│   ├── Hero.tsx
│   ├── Hero.test.tsx
│   ├── Products.tsx
│   ├── Products.test.tsx
│   ├── Contact.tsx
│   └── Contact.test.tsx
└── test/
    ├── setup.ts        # Test setup and configuration
    └── test-utils.tsx  # Custom test utilities
```

## Test Coverage

### Utilities (`src/lib/utils.test.ts`)
- ✅ Class name merging with `cn` utility
- ✅ Conditional class handling
- ✅ Tailwind conflict resolution
- ✅ Edge cases (empty, undefined, null values)

### Hooks (`src/hooks/use-mobile.test.ts`)
- ✅ Mobile/desktop width detection
- ✅ Breakpoint threshold (768px)
- ✅ Window resize responsiveness
- ✅ Media query listener setup/cleanup

### Components

#### Hero Component (`src/components/Hero.test.tsx`)
- ✅ Content rendering
- ✅ Button interactions
- ✅ Callback functions
- ✅ CSS classes and styling

#### Products Component (`src/components/Products.test.tsx`)
- ✅ Product listing (jerseys and cleats)
- ✅ Product details display
- ✅ Category filtering
- ✅ Add to cart functionality
- ✅ View details dialog

#### Contact Component (`src/components/Contact.test.tsx`)
- ✅ Form field rendering
- ✅ Contact information display
- ✅ Form structure
- ✅ Company stats section

## Writing Tests

### Basic Test Example

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
```

### Testing User Interactions

```typescript
import userEvent from '@testing-library/user-event'

it('should handle click events', async () => {
  const user = userEvent.setup()
  const handleClick = vi.fn()
  
  render(<Button onClick={handleClick}>Click me</Button>)
  
  await user.click(screen.getByText('Click me'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Mocking Dependencies

```typescript
import { vi } from 'vitest'

// Mock a module
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

// Mock a hook
vi.mock('@github/spark/hooks', () => ({
  useKV: () => [[], vi.fn()],
}))
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Async Testing**: Use `waitFor` for async operations
4. **Cleanup**: Tests automatically cleanup after each test via `afterEach` in setup
5. **Isolation**: Each test should be independent and not rely on others
6. **Descriptive Names**: Use clear, descriptive test names that explain the expected behavior

## Continuous Integration

Tests run automatically on every push and pull request via GitHub Actions. The CI pipeline:

1. Runs all tests
2. Runs the linter
3. Builds the project
4. Deploys to GitHub Pages (on main branch)

See `.github/workflows/deploy.yml` for the full CI configuration.

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "Cannot find module" errors
- **Solution**: Make sure all dependencies are installed with `npm install --legacy-peer-deps`

**Issue**: Tests timeout
- **Solution**: Increase timeout in test configuration or check for missing `await` on async operations

**Issue**: Component tests fail with rendering errors
- **Solution**: Check that all required mocks are in place (useKV, toast, etc.)

## Future Improvements

- [ ] Add test coverage reporting
- [ ] Add E2E tests with Playwright
- [ ] Add visual regression testing
- [ ] Increase coverage to 80%+
- [ ] Add performance testing
