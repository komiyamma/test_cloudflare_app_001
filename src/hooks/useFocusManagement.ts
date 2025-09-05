import { useRef, useCallback } from 'react'

export const useFocusManagement = () => {
  const focusableElementsSelector = 
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

  const trapFocus = useCallback((containerRef: React.RefObject<HTMLElement>) => {
    const container = containerRef.current
    if (!container) return

    const focusableElements = container.querySelectorAll(focusableElementsSelector)
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    return () => container.removeEventListener('keydown', handleTabKey)
  }, [focusableElementsSelector])

  const focusFirstElement = useCallback((containerRef: React.RefObject<HTMLElement>) => {
    const container = containerRef.current
    if (!container) return

    const firstFocusable = container.querySelector(focusableElementsSelector) as HTMLElement
    firstFocusable?.focus()
  }, [focusableElementsSelector])

  const restoreFocus = useCallback(() => {
    const lastFocusedElement = useRef<HTMLElement | null>(null)
    
    return {
      save: () => {
        lastFocusedElement.current = document.activeElement as HTMLElement
      },
      restore: () => {
        lastFocusedElement.current?.focus()
      }
    }
  }, [])

  return {
    trapFocus,
    focusFirstElement,
    restoreFocus
  }
}