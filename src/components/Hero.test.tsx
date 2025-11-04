import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Hero } from './Hero'

describe('Hero Component', () => {
  it('should render hero content', () => {
    const mockOnExploreClick = vi.fn()
    render(<Hero id="home" onExploreClick={mockOnExploreClick} />)

    expect(screen.getByText('Unleash Your Potential')).toBeInTheDocument()
    expect(screen.getByText(/with Smart Sportswear/i)).toBeInTheDocument()
    expect(screen.getByText(/Experience the future of athletic performance/i)).toBeInTheDocument()
  })

  it('should render action buttons', () => {
    const mockOnExploreClick = vi.fn()
    render(<Hero id="home" onExploreClick={mockOnExploreClick} />)

    expect(screen.getByText('Shop Now')).toBeInTheDocument()
    expect(screen.getByText('Watch Demo')).toBeInTheDocument()
  })

  it('should call onExploreClick when Shop Now button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnExploreClick = vi.fn()
    render(<Hero id="home" onExploreClick={mockOnExploreClick} />)

    const shopButton = screen.getByText('Shop Now')
    await user.click(shopButton)

    expect(mockOnExploreClick).toHaveBeenCalledTimes(1)
  })

  it('should render with correct section id', () => {
    const mockOnExploreClick = vi.fn()
    const { container } = render(<Hero id="hero-section" onExploreClick={mockOnExploreClick} />)

    const section = container.querySelector('#hero-section')
    expect(section).toBeInTheDocument()
  })

  it('should have the correct styling classes', () => {
    const mockOnExploreClick = vi.fn()
    const { container } = render(<Hero id="home" onExploreClick={mockOnExploreClick} />)

    const section = container.querySelector('section')
    expect(section).toHaveClass('relative', 'min-h-screen')
  })
})
