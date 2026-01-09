import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock the useIsMobile hook
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false, // Default to desktop
}))

// Mock the useKV hook from @github/spark/hooks
vi.mock('@github/spark/hooks', () => ({
  useKV: () => [[], vi.fn()],
}))

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
  Toaster: () => null,
}))

describe('App Component', () => {
  it('should render the navigation bar with logo', () => {
    render(<App />)
    const logos = screen.getAllByText('ZAVA')
    expect(logos.length).toBeGreaterThan(0)
  })

  it('should render all navigation items on desktop', () => {
    render(<App />)
    
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Products' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Technology' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Athletes' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Contact' })).toBeInTheDocument()
  })

  it('should render all main sections', () => {
    const { container } = render(<App />)
    
    expect(container.querySelector('#home')).toBeInTheDocument()
    expect(container.querySelector('#products')).toBeInTheDocument()
    expect(container.querySelector('#technology')).toBeInTheDocument()
    expect(container.querySelector('#athletes')).toBeInTheDocument()
    expect(container.querySelector('#about')).toBeInTheDocument()
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  it('should render the footer', () => {
    render(<App />)
    
    expect(screen.getByText(/Unleashing athletic potential/i)).toBeInTheDocument()
    expect(screen.getByText(/© 2024 Zava. All rights reserved./i)).toBeInTheDocument()
  })

  it('should render footer sections', () => {
    render(<App />)
    
    // Footer has support heading
    expect(screen.getByText('Support')).toBeInTheDocument()
    expect(screen.getByText('Documentation')).toBeInTheDocument()
    expect(screen.getByText('Community')).toBeInTheDocument()
  })

  it('should have navigation clickable elements', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const homeButton = screen.getByRole('button', { name: 'Home' })
    expect(homeButton).toBeInTheDocument()
    
    await user.click(homeButton)
    // Navigation button should still be in the document after click
    expect(homeButton).toBeInTheDocument()
  })

  it('should have proper navigation structure', () => {
    const { container } = render(<App />)
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('fixed', 'top-0', 'w-full', 'z-50')
  })
})
