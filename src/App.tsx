import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Toaster } from '@/components/ui/sonner'
import { Menu, Play, Zap, Shield, Smartphone } from '@phosphor-icons/react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Hero } from '@/components/Hero'
import { Products } from '@/components/Products'
import { Technology } from '@/components/Technology'
import { Athletes } from '@/components/Athletes'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const isMobile = useIsMobile()

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'Technology', id: 'technology' },
    { name: 'Athletes', id: 'athletes' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const NavItems = () => (
    <>
      {navigation.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`text-sm font-medium transition-colors hover:text-accent ${
            activeSection === item.id ? 'text-accent' : 'text-foreground'
          }`}
        >
          {item.name}
        </button>
      ))}
    </>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" weight="bold" />
            </div>
            <span className="text-xl font-bold text-primary">ZAVA</span>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-8">
              <NavItems />
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-6 mt-6">
                  <NavItems />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero id="home" onExploreClick={() => scrollToSection('products')} />
        <Products id="products" />
        <Technology id="technology" />
        <Athletes id="athletes" />
        <About id="about" />
        <Contact id="contact" />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
                  <Zap className="w-4 h-4 text-accent-foreground" weight="bold" />
                </div>
                <span className="text-lg font-bold">ZAVA</span>
              </div>
              <p className="text-sm text-primary-foreground/80">
                Unleashing athletic potential through smart sportswear technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Products</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Smart Jerseys</li>
                <li>Smart Cleats</li>
                <li>Accessories</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Technology</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Sensor Integration</li>
                <li>Performance Analytics</li>
                <li>Mobile App</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            <p>&copy; 2024 Zava. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  )
}

export default App