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

### Azure Cosmos DB - The Optimal Choice for Zava

For the Zava smart sportswear platform, **Azure Cosmos DB** is the recommended database solution, specifically designed to handle the unique requirements of modern smart sportswear applications:

#### 🌍 Global Distribution Requirements
- **Sub-10ms latency worldwide** for athletes and customers across all continents
- **Multi-region replication** ensuring optimal performance for international sporting events
- **Automatic failover** maintaining 99.999% availability during global competitions

#### ⚡ Massive Scale Capabilities  
- **Millions of concurrent users** during major sporting events and product launches
- **>100TB data capacity** for storing extensive athlete performance data and product analytics
- **Elastic scaling** that automatically handles traffic spikes without performance degradation
- **Predictable performance** regardless of data volume or user load

#### 📊 Document-Heavy Data Optimization
- **Native JSON document storage** perfect for smart jersey sensor data and telemetry
- **IoT data ingestion** from embedded sensors in sportswear collecting real-time performance metrics
- **Flexible schemas** accommodating varying data structures from different smart device types
- **Time-series data support** for tracking athlete performance trends over time

#### 🔗 Multi-Model Database Capabilities
- **Graph relationships** modeling connections between athletes, teams, and performance data
- **Social features** enabling athlete networks and community interactions
- **Real-time analytics** on both operational and social data within a single database
- **Multiple API support** (SQL, MongoDB, Cassandra, Gremlin) for different application components

#### 🔄 Real-Time Features
- **Change feed integration** for live performance dashboards and notifications
- **Event-driven architecture** supporting real-time updates across the platform
- **Serverless scaling** perfect for Azure Functions processing sensor data streams

This architecture positions Zava to scale globally while maintaining the performance and reliability required for professional athletic applications.

## �🚀 Getting Started

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
