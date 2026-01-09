# Zava Smart Sportswear

A visually stunning, interactive web application that highlights Zava's cutting-edge smart sportswear technology. This prototype showcases next-generation smart jerseys and cleats through engaging use[...]  

## 🏃‍♂️ About

Zava Smart Sportswear represents the future of athletic performance technology. Our interactive web application demonstrates how smart technology integrates seamlessly into sportswear to enhance athle[...]  

**Experience Qualities:**  
- **High-Tech & Athletic** - Bold, energetic interface reflecting cutting-edge sports technology  
- **Professional & Trustworthy** - Clean, polished design that builds confidence in the brand  
- **Dynamic & Interactive** - Engaging animations and micro-interactions showcasing innovation  

## ✨ Key Features

### 🏠 Navigation & Homepage  
Interactive hero section with smooth animations showcasing smart sportswear technology and clear user journey guidance.

### 🛍️ Products Showcase  
Interactive product cards for smart jerseys and cleats with detailed specifications, hover interactions, and comparison capabilities.

### 🔬 Technology Demonstration  
Interactive infographic explaining proprietary smart tech features with animated breakdowns and integration demonstrations.

### 👥 Athlete Stories  
Testimonial carousel with integrated video content featuring real athlete experiences and social proof.

### 📧 Contact & Engagement  
Responsive contact forms with validation, company information, and seamless user inquiry handling.

## 🎨 Design System

### Color Palette  
- **Primary**: Navy Blue (oklch(0.25 0.1 240)) - Professional, trust, technology  
- **Secondary**: White (oklch(1 0 0)) - Clean contrast  
- **Accent**: Electric Blue (oklch(0.6 0.2 240)) - CTAs and interactive elements  
- **Supporting**: Black (oklch(0.15 0 0)) - Premium accents

### Typography  
- **Font Family**: Inter (Google Fonts)  
- **Hierarchy**: Bold/SemiBold/Medium/Regular weights  
- **Accessibility**: WCAG AA compliant color contrast ratios

### Animations  
Purposeful motion that communicates innovation and energy while guiding user attention through key product features and technology demonstrations.

## 🛠️ Technology Stack

- **Framework**: React 19 with TypeScript  
- **Build Tool**: Vite 6.3.5  
- **Styling**: Tailwind CSS 4.1.11  
- **UI Components**: Radix UI primitives  
- **Animations**: Framer Motion 12.6.2  
- **Icons**: Phosphor Icons  
- **State Management**: TanStack React Query  
- **Form Handling**: React Hook Form with Zod validation
- **E2E Testing**: Playwright 1.49.0

## �️ Database Architecture Recommendation
✅ Product catalog pick a database with vector search
✅ Product catalog (structured data)
✅ Contact form submissions (relational)
✅ Athlete testimonials (structured content)
✅ Real-time change feeds needed
✅ multi-region distribution required
✅ massive concurrent user load
✅ multi-model data requirements

### Prerequisites  
- Node.js (v18 or higher)  
- npm or yarn package manager

### Installation

1. Clone the repository:  
```bash  
git clone https://github.com/patrick-vuong/zava-smart-sportswea.git  
cd zava-smart-sportswea  
```

2. Install dependencies:  
```bash  
npm install  
```

3. Start the development server:  
```bash  
npm run dev  
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server  
- `npm run build` - Build for production  
- `npm run preview` - Preview production build  
- `npm run lint` - Run ESLint  
- `npm run optimize` - Optimize dependencies
- `npm run test` - Run Playwright tests
- `npm run test:ui` - Run Playwright tests with UI mode
- `npm run test:headed` - Run Playwright tests in headed mode  
- `npm run test:debug` - Debug Playwright tests
- `npm run test:report` - Show Playwright test report

## 🧪 Testing

This project includes comprehensive end-to-end tests using [Playwright](https://playwright.dev/).

### Running Tests

**Prerequisites:**
- Node.js (v18 or higher)
- All dependencies installed (`npm install`)

**Basic test execution:**
```bash
npm run test                    # Run all tests headless
npm run test:headed            # Run tests with browser UI
npm run test:ui                # Run tests with Playwright UI mode
npm run test:debug             # Debug tests step by step
```

**View test results:**
```bash
npm run test:report            # Open HTML test report
```

### Test Coverage

Our Playwright test suite covers all major user flows and website features:

#### 🏠 Homepage Tests (`homepage.spec.ts`)
- Page loads with correct title and hero section
- Navigation menu functionality (desktop & mobile)
- Section navigation and smooth scrolling
- "Shop Now" button redirects to products section

#### 🛍️ Products Tests (`products.spec.ts`)
- Products section displays correctly
- Product cards show jersey and cleat information
- Interactive elements respond to user actions
- Mobile responsive design

#### 🔬 Technology Tests (`technology.spec.ts`)
- Technology section content validation
- Interactive technology demonstrations
- Technical specifications display
- Visual elements (icons, graphics) verification

#### 👥 Athletes Tests (`athletes.spec.ts`)
- Athlete testimonials carousel functionality
- Navigation between athlete stories
- Play buttons for video content
- Athletes cards with proper information

#### 📧 Contact Tests (`contact.spec.ts`)
- Contact form functionality with validation
- Form submission and success feedback
- Contact information display (address, phone, email)
- Company information and support hours
- Mobile responsive contact form

#### 🧭 Navigation Tests (`navigation.spec.ts`)
- Main navigation menu functionality
- Mobile hamburger menu
- Section linking and smooth scrolling
- Logo/brand element interactions
- Active section highlighting

#### 📱 Responsive Tests (`responsive.spec.ts`)
- Multi-viewport testing (Mobile, Tablet, Desktop, Large Desktop)
- Touch-friendly interactive elements
- Content readability across screen sizes
- Orientation change handling

### Test Configuration

Tests are configured to run across multiple browsers and devices:
- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12)

The test configuration automatically starts a development server before running tests and includes:
- Automatic screenshots on failure
- Video recording on retry
- Trace collection for debugging
- HTML reporting

### CI/CD Integration

Tests automatically run in GitHub Actions on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

The CI pipeline:
1. Sets up Node.js environment
2. Installs dependencies
3. Installs Playwright browsers
4. Builds the application
5. Runs all tests
6. Uploads test reports as artifacts

### Writing New Tests

To add new tests:
1. Create a new `.spec.ts` file in the `tests/` directory
2. Follow the existing test patterns for consistency
3. Use descriptive test names and organize with `test.describe()`
4. Include proper assertions and error handling
5. Test both positive and negative scenarios

Example test structure:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Setup code
  });

  test('should do something specific', async ({ page }) => {
    // Test implementation
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

### Debugging Tests

**Local debugging:**
```bash
npm run test:debug              # Step through tests
npm run test:headed            # See browser interactions
```

**CI debugging:**
- Check GitHub Actions logs
- Download test artifacts from failed runs
- Review screenshots and videos

For more information, see the [Playwright documentation](https://playwright.dev/docs).

## 🌐 Live Demo

Experience Zava Smart Sportswear in action!  
[View the Live Demo](https://patrick-vuong.github.io/zava-smart-sportswear/)

## 📱 Responsive Design

The application follows a mobile-first approach with:  
- Collapsible navigation for mobile devices  
- Touch-optimized interaction targets  
- Responsive product grids  
- Adaptive typography and spacing  
- Progressive enhancement for larger screens

## ♿ Accessibility

Built with accessibility in mind:  
- Keyboard navigation support  
- Screen reader compatibility  
- WCAG AA color contrast compliance  
- Semantic HTML structure  
- Focus management for interactive elements

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
