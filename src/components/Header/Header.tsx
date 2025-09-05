import { useState, useEffect, useRef } from 'react'
import type { NavigationItem } from '../../types'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import { useFocusManagement } from '../../hooks/useFocusManagement'
import { VisuallyHidden } from '../VisuallyHidden'
import styles from './Header.module.css'

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'ホーム', href: '#home' },
  { id: 'features', label: '機能', href: '#features' },
  { id: 'contact', label: 'お問い合わせ', href: '#contact' }
]

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentFocusIndex, setCurrentFocusIndex] = useState(-1)
  const navRef = useRef<HTMLDivElement>(null)
  const { trapFocus } = useFocusManagement()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setCurrentFocusIndex(-1)
  }

  // Keyboard navigation for mobile menu
  useKeyboardNavigation({
    onEscape: closeMobileMenu,
    onArrowDown: () => {
      if (isMobileMenuOpen) {
        setCurrentFocusIndex(prev => 
          prev < navigationItems.length - 1 ? prev + 1 : 0
        )
      }
    },
    onArrowUp: () => {
      if (isMobileMenuOpen) {
        setCurrentFocusIndex(prev => 
          prev > 0 ? prev - 1 : navigationItems.length - 1
        )
      }
    },
    enabled: isMobileMenuOpen
  })

  // Focus management for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && navRef.current) {
      const cleanup = trapFocus({ current: navRef.current as HTMLElement })
      return cleanup
    }
  }, [isMobileMenuOpen, trapFocus])

  // Focus current item when index changes
  useEffect(() => {
    if (isMobileMenuOpen && currentFocusIndex >= 0 && navRef.current) {
      const buttons = navRef.current.querySelectorAll('[data-nav-item]')
      const targetButton = buttons[currentFocusIndex] as HTMLElement
      targetButton?.focus()
    }
  }, [currentFocusIndex, isMobileMenuOpen])

  const handleNavClick = (href: string) => {
    // スムーススクロール機能
    const targetElement = document.querySelector(href)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    // モバイルメニューを閉じる
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={styles.header} role="banner">
      <div className="container">
        <nav 
          id="navigation"
          className={styles.nav} 
          ref={navRef}
          role="navigation"
          aria-label="メインナビゲーション"
        >
          <div className={styles.logo}>
            <h2>
              <a href="#home" onClick={(e) => {
                e.preventDefault()
                handleNavClick('#home')
              }}>
                React Demo Site
              </a>
            </h2>
          </div>
          
          <div 
            className={`${styles.navLinks} ${isMobileMenuOpen ? styles.navLinksOpen : ''}`}
            role={isMobileMenuOpen ? 'menu' : undefined}
            aria-hidden={!isMobileMenuOpen}
          >
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                data-nav-item
                className={styles.navLink}
                onClick={() => handleNavClick(item.href)}
                onFocus={() => setCurrentFocusIndex(index)}
                type="button"
                role={isMobileMenuOpen ? 'menuitem' : undefined}
                tabIndex={isMobileMenuOpen ? 0 : undefined}
                aria-current={item.id === 'home' ? 'page' : undefined}
              >
                {item.label}
                {item.id === 'home' && (
                  <VisuallyHidden>（現在のページ）</VisuallyHidden>
                )}
              </button>
            ))}
          </div>
          
          <button 
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="menu"
          >
            <VisuallyHidden>
              {isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            </VisuallyHidden>
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerActive : ''}`} aria-hidden="true"></span>
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerActive : ''}`} aria-hidden="true"></span>
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerActive : ''}`} aria-hidden="true"></span>
          </button>
        </nav>
      </div>
    </header>
  )
}