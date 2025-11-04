import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Contact } from './Contact'

// Mock the toast library
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

// Mock the useKV hook from @github/spark/hooks
vi.mock('@github/spark/hooks', () => ({
  useKV: () => [[], vi.fn()],
}))

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the contact form', () => {
    render(<Contact id="contact" />)

    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByText('Send us a Message')).toBeInTheDocument()
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
  })

  it('should render contact information cards', () => {
    render(<Contact id="contact" />)

    expect(screen.getByText('Headquarters')).toBeInTheDocument()
    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Support Hours')).toBeInTheDocument()
  })

  it('should render all form fields', () => {
    render(<Contact id="contact" />)

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Inquiry Type/i)).toBeInTheDocument()
  })

  it('should render submit button', () => {
    render(<Contact id="contact" />)

    const submitButton = screen.getByRole('button', { name: /Send Message/i })
    expect(submitButton).toBeInTheDocument()
  })

  it('should render company stats section', () => {
    render(<Contact id="contact" />)

    expect(screen.getByText('Why Choose Zava?')).toBeInTheDocument()
    expect(screen.getByText(/Trusted by 500\+ professional athletes/i)).toBeInTheDocument()
    expect(screen.getByText(/24\/7 technical support/i)).toBeInTheDocument()
    expect(screen.getByText(/30-day money-back guarantee/i)).toBeInTheDocument()
    expect(screen.getByText(/Worldwide shipping available/i)).toBeInTheDocument()
  })

  it('should have correct section id', () => {
    const { container } = render(<Contact id="contact-section" />)
    const section = container.querySelector('#contact-section')
    expect(section).toBeInTheDocument()
  })

  it('should render contact details correctly', () => {
    render(<Contact id="contact" />)

    expect(screen.getByText('1 Hacker Way')).toBeInTheDocument()
    expect(screen.getByText('Palo Alto, CA 94301')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 123-ZAVA')).toBeInTheDocument()
    expect(screen.getByText('hello@zava.com')).toBeInTheDocument()
    expect(screen.getByText('support@zava.com')).toBeInTheDocument()
  })

  it('should have proper form structure', () => {
    const { container } = render(<Contact id="contact" />)
    const form = container.querySelector('form')
    expect(form).toBeInTheDocument()
  })
})
