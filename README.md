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
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run test:e2e:ui` - Run Playwright tests in interactive UI mode
- `npm run test:e2e:headed` - Run Playwright tests in headed mode (visible browser)
- `npm run test:e2e:report` - Show the latest Playwright test report

## 🧪 Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end testing to ensure the reliability of core user flows.

### Running Tests Locally

1. Install Playwright browsers (first time only):
```bash
npx playwright install --with-deps chromium
```

2. Run all tests:
```bash
npm run test:e2e
```

3. Run tests with UI mode for debugging:
```bash
npm run test:e2e:ui
```

4. Run tests in headed mode (watch the browser):
```bash
npm run test:e2e:headed
```

5. View the test report:
```bash
npm run test:e2e:report
```

### Test Coverage

The Playwright test suite covers the following critical user journeys:

- **Homepage Navigation**: Verifying navigation menu, section scrolling, and footer content
- **Product Showcase**: Testing product display, detail dialogs, and cart interactions
- **Contact Form**: Validating form fields, submission, and error handling

### Testing on Different Viewports

Tests are configured to run on multiple viewports:
- Desktop Chrome (1280x720)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

### CI/CD Integration

Playwright tests run automatically on every pull request and push to the main branch via GitHub Actions. Test reports are uploaded as artifacts and retained for 30 days.

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
