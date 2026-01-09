import { describe, it, expect } from 'vitest'

// Email validation helper (extracted from Contact component logic)
export function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email)
}

// Form field validation helpers
export function validateContactForm(data: {
  name: string
  email: string
  subject: string
  message: string
  inquiryType: string
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name.trim()) {
    errors.push('Please enter your name')
  }

  if (!data.email.trim() || !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address')
  }

  if (!data.subject.trim()) {
    errors.push('Please enter a subject')
  }

  if (!data.message.trim()) {
    errors.push('Please enter your message')
  }

  if (!data.inquiryType) {
    errors.push('Please select an inquiry type')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

describe('Form Validation Helpers', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
      expect(isValidEmail('user+tag@example.com')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false)
      expect(isValidEmail('invalid@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('invalid@domain')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })
  })

  describe('validateContactForm', () => {
    it('should pass validation for complete valid form', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
        inquiryType: 'general',
      })

      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should fail when name is missing', () => {
      const result = validateContactForm({
        name: '',
        email: 'john@example.com',
        subject: 'Test',
        message: 'Message',
        inquiryType: 'general',
      })

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Please enter your name')
    })

    it('should fail when email is invalid', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test',
        message: 'Message',
        inquiryType: 'general',
      })

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Please enter a valid email address')
    })

    it('should fail when subject is missing', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        subject: '',
        message: 'Message',
        inquiryType: 'general',
      })

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Please enter a subject')
    })

    it('should fail when message is missing', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test',
        message: '',
        inquiryType: 'general',
      })

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Please enter your message')
    })

    it('should fail when inquiry type is missing', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test',
        message: 'Message',
        inquiryType: '',
      })

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Please select an inquiry type')
    })

    it('should accumulate multiple errors', () => {
      const result = validateContactForm({
        name: '',
        email: 'invalid',
        subject: '',
        message: '',
        inquiryType: '',
      })

      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(1)
    })

    it('should trim whitespace from fields', () => {
      const result = validateContactForm({
        name: '   ',
        email: 'john@example.com',
        subject: '  ',
        message: '   ',
        inquiryType: 'general',
      })

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Please enter your name')
      expect(result.errors).toContain('Please enter a subject')
      expect(result.errors).toContain('Please enter your message')
    })
  })
})
