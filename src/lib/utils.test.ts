import { describe, it, expect } from 'vitest'
import { cn } from '../lib/utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })

  it('should handle conditional classes', () => {
    expect(cn('base', true && 'conditional')).toBe('base conditional')
    expect(cn('base', false && 'conditional')).toBe('base')
  })

  it('should handle undefined and null values', () => {
    expect(cn('base', undefined, null)).toBe('base')
  })

  it('should merge conflicting Tailwind classes correctly', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('should handle empty input', () => {
    expect(cn()).toBe('')
  })

  it('should handle arrays of classes', () => {
    expect(cn(['px-2', 'py-1'], 'text-center')).toBe('px-2 py-1 text-center')
  })
})