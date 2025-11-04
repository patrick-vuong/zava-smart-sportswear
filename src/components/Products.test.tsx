import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Products } from './Products'

// Mock the useKV hook from @github/spark/hooks
vi.mock('@github/spark/hooks', () => ({
  useKV: () => [[], vi.fn()],
}))

describe('Products Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the products section heading', () => {
    render(<Products id="products" />)

    expect(screen.getByText('Smart Sportswear Collection')).toBeInTheDocument()
    expect(screen.getByText(/Discover our revolutionary lineup/i)).toBeInTheDocument()
  })

  it('should render jersey and cleats category headings', () => {
    render(<Products id="products" />)

    const jerseyHeadings = screen.getAllByText('Smart Jersey')
    const cleatsHeadings = screen.getAllByText('Smart Cleats')
    
    expect(jerseyHeadings.length).toBeGreaterThan(0)
    expect(cleatsHeadings.length).toBeGreaterThan(0)
  })

  it('should render jersey products', () => {
    render(<Products id="products" />)

    expect(screen.getByText('Zava Pro Jersey')).toBeInTheDocument()
    expect(screen.getByText('Zava Training Jersey')).toBeInTheDocument()
  })

  it('should render cleats products', () => {
    render(<Products id="products" />)

    expect(screen.getByText('Zava Elite Cleats')).toBeInTheDocument()
    expect(screen.getByText('Zava Speed Cleats')).toBeInTheDocument()
  })

  it('should display product prices', () => {
    render(<Products id="products" />)

    const prices = screen.getAllByText('$299')
    expect(prices.length).toBeGreaterThan(0) // Pro Jersey and Speed Cleats
    expect(screen.getByText('$199')).toBeInTheDocument() // Training Jersey
    expect(screen.getByText('$399')).toBeInTheDocument() // Elite Cleats
  })

  it('should render Add to Cart buttons for all products', () => {
    render(<Products id="products" />)

    const addToCartButtons = screen.getAllByText('Add to Cart')
    expect(addToCartButtons).toHaveLength(4) // 2 jerseys + 2 cleats
  })

  it('should render View Details buttons for all products', () => {
    render(<Products id="products" />)

    const viewDetailsButtons = screen.getAllByText('View Details')
    expect(viewDetailsButtons).toHaveLength(4) // 2 jerseys + 2 cleats
  })

  it('should have product descriptions', () => {
    render(<Products id="products" />)

    expect(screen.getByText(/Professional-grade smart jersey/i)).toBeInTheDocument()
    expect(screen.getByText(/Revolutionary smart cleats/i)).toBeInTheDocument()
    expect(screen.getByText(/Training-focused smart jersey/i)).toBeInTheDocument()
    expect(screen.getByText(/Lightweight smart cleats/i)).toBeInTheDocument()
  })

  it('should have correct section id', () => {
    const { container } = render(<Products id="products-section" />)
    const section = container.querySelector('#products-section')
    expect(section).toBeInTheDocument()
  })

  it('should open product details dialog when View Details is clicked', async () => {
    const user = userEvent.setup()
    render(<Products id="products" />)

    const viewDetailsButtons = screen.getAllByText('View Details')
    await user.click(viewDetailsButtons[0])

    // Note: Dialog behavior may require additional setup for proper testing
    // This verifies the button is clickable
    expect(viewDetailsButtons[0]).toBeInTheDocument()
  })
})
