# Testing Documentation

This document describes the comprehensive testing setup for the Zava smart sportswear application.

## Overview

The project now includes both unit testing and end-to-end (E2E) testing:

- **Unit Tests**: Using Vitest + React Testing Library for component and function testing
- **E2E Tests**: Using Playwright for full application testing across multiple browsers

## Unit Testing

### Framework
- **Vitest**: Fast unit test runner with native ESM support
- **React Testing Library**: Testing utilities for React components
- **Jest DOM**: Custom matchers for DOM elements
- **jsdom**: DOM environment for testing

### Running Unit Tests

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm run test

# Run tests with UI interface
npm run test:ui
```

### Test Coverage

Current unit tests cover:

1. **Utility Functions** (`src/lib/utils.test.ts`)
   - `cn` function for className merging
   - Edge cases and Tailwind class conflicts

2. **Custom Hooks** (`src/hooks/use-mobile.test.ts`)
   - Mobile responsiveness detection
   - Window resize handling
   - Media query integration

3. **Components** (`src/components/Hero.test.tsx`, `src/App.test.tsx`)
   - Basic component structure
   - Props handling
   - Accessibility features

### Test Configuration

Tests are configured in `vite.config.ts`:
- jsdom environment for DOM testing
- Global test utilities
- Automatic mocking setup
- Playwright files excluded from unit tests

## End-to-End Testing

### Framework
- **Playwright**: Cross-browser testing framework
- Supports Chromium, Firefox, WebKit
- Mobile device testing included

### Running E2E Tests

```bash
# Install browsers (required first time)
npm run playwright:install

# Run E2E tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed
```

### Test Coverage

E2E tests cover:

1. **Homepage Functionality** (`tests/homepage.spec.ts`)
   - Page loading and basic content
   - Navigation between sections
   - Button interactions
   - Section scrolling behavior

2. **Mobile Responsiveness** (`tests/mobile.spec.ts`)
   - Mobile vs desktop layouts
   - Responsive navigation
   - Viewport-specific behaviors
   - Cross-device compatibility

### Browser Support

Tests run on:
- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: Chrome (Pixel 5), Safari (iPhone 12)

## File Structure

```
├── src/
│   ├── test/
│   │   └── setup.ts              # Test setup and mocks
│   ├── **/*.test.ts              # Unit tests co-located with code
│   └── **/*.test.tsx             # Component tests
├── tests/
│   ├── homepage.spec.ts          # E2E homepage tests
│   └── mobile.spec.ts            # E2E mobile tests
├── playwright.config.ts          # Playwright configuration
└── vite.config.ts               # Vitest configuration
```

## Development Workflow

### Before Committing
1. Run unit tests: `npm run test:run`
2. Build the application: `npm run build`
3. Run E2E tests: `npm run test:e2e`

### Adding New Tests

**Unit Tests:**
- Create `.test.ts` or `.test.tsx` files next to the code being tested
- Use React Testing Library for component testing
- Mock external dependencies appropriately

**E2E Tests:**
- Add new `.spec.ts` files in the `tests/` directory
- Use Playwright selectors and assertions
- Test user workflows and interactions

## Security

All testing dependencies have been security-checked:
- Vitest v2.1.9 (patched security vulnerabilities)
- React Testing Library latest compatible version
- Playwright latest stable version

## Continuous Integration

The testing setup is CI-ready:
- Parallel test execution
- Retry logic for flaky tests
- HTML reports for debugging
- Cross-browser testing matrix