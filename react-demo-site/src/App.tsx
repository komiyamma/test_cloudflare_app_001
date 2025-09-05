import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ErrorTest } from './components/ErrorTest'
import { SkipLink } from './components/SkipLink'
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor'
import styles from './App.module.css'

function App() {
  // Monitor performance metrics in development
  usePerformanceMonitor()

  return (
    <ErrorBoundary>
      <div className={styles.app}>
        {/* Skip Links for Accessibility */}
        <SkipLink href="#main-content">メインコンテンツへスキップ</SkipLink>
        <SkipLink href="#navigation">ナビゲーションへスキップ</SkipLink>
        
        <Header />

        {/* Main Content */}
        <main id="main-content" className={styles.main} tabIndex={-1}>
          <Hero />
          <Features />
          <Contact />
        </main>

        <Footer />
        
        {/* Error test component (development only) */}
        <ErrorTest />
      </div>
    </ErrorBoundary>
  )
}

export default App
