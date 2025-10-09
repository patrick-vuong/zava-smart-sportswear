import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIsMobile } from '../hooks/use-mobile'

// Mock window.innerWidth
const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
}

describe('useIsMobile hook', () => {
  beforeEach(() => {
    // Reset window.innerWidth and matchMedia
    mockInnerWidth(1024)
    vi.clearAllMocks()
  })

  it('should return true for mobile width', () => {
    mockInnerWidth(600)
    
    const mockMatchMedia = vi.fn().mockImplementation(query => ({
      matches: query.includes('max-width: 767px'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('should return false for desktop width', () => {
    mockInnerWidth(1024)
    
    const mockMatchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('should update when window size changes', () => {
    const listeners: Array<() => void> = []
    
    const mockMatchMedia = vi.fn().mockImplementation(query => ({
      matches: window.innerWidth < 768,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event, listener) => {
        if (event === 'change') {
          listeners.push(listener)
        }
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })

    mockInnerWidth(1024)
    const { result, rerender } = renderHook(() => useIsMobile())
    
    expect(result.current).toBe(false)

    // Simulate window resize to mobile
    mockInnerWidth(600)
    listeners.forEach(listener => listener())
    rerender()
    
    expect(result.current).toBe(true)
  })
})