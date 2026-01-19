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
- `npm run test` - Run Playwright tests in headless mode
- `npm run test:headed` - Run Playwright tests with browser UI visible
- `npm run test:ui` - Run Playwright tests in interactive UI mode
- `npm run test:debug` - Run Playwright tests in debug mode
- `npm run test:report` - Show the last test report

## 🧪 Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end testing. The test suite covers critical user flows and ensures the application works correctly across different browsers.

### Running Tests

1. **Run all tests** (headless mode):
   ```bash
   npm run test
   ```

2. **Run tests with visible browser**:
   ```bash
   npm run test:headed
   ```

3. **Run tests in interactive UI mode**:
   ```bash
   npm run test:ui
   ```
   This opens Playwright's test UI where you can run tests individually, see traces, and debug.

4. **Debug a specific test**:
   ```bash
   npm run test:debug
   ```
   This opens the Playwright Inspector for step-by-step debugging.

5. **View test results**:
   ```bash
   npm run test:report
   ```
   Opens an HTML report with detailed test results and screenshots.

### Test Coverage

The test suite includes:

- **Contact Form Tests** (`tests/contact-form.spec.ts`)
  - Form validation (required fields, email format)
  - Successful form submission
  - Form reset after submission
  - Contact information display

- **Navigation Tests** (`tests/navigation.spec.ts`)
  - Homepage hero section
  - Navigation through all sections
  - Mobile navigation menu
  - Call-to-action buttons
  - Footer content

### Test Screenshots

Tests automatically capture screenshots at key moments:
- Form states (empty, filled, validation errors, success)
- Navigation between sections
- Mobile view interactions
- Error states

Screenshots are saved in `tests/screenshots/` directory.

### Writing New Tests

To add new tests:

1. Create a new `.spec.ts` file in the `tests/` directory
2. Import test utilities:
   ```typescript
   import { test, expect } from '@playwright/test';
   ```
3. Write your test cases following the existing patterns
4. Use descriptive test names and include comments
5. Capture screenshots for visual verification

Example test structure:
```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Your test code here
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

### CI/CD Integration

The Playwright configuration is optimized for CI environments:
- Automatic retry on failure in CI
- HTML reporter for test results
- Screenshot capture on failure
- Trace recording for debugging


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
