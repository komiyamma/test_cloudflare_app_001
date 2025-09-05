import { useState, useEffect } from 'react'
import styles from './Hero.module.css'

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // コンポーネントマウント時にアニメーションを開始
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleCTAClick = () => {
    const featuresSection = document.querySelector('#features')
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section id="home" className={styles.hero}>
      <div className="container">
        <div className={`${styles.heroContent} ${isVisible ? styles.heroContentVisible : ''}`}>
          <h1 className={styles.heroTitle}>
            React v19 デモサイト
          </h1>
          <p className={styles.heroSubtitle}>
            最新のReact機能を活用したモダンなWebアプリケーション
          </p>
          <p className={styles.heroDescription}>
            TypeScriptとCSS Modulesを使用して、レスポンシブで高性能なユーザーインターフェースを構築しています。
          </p>
          <div className={styles.heroActions}>
            <button 
              className={styles.ctaButton}
              onClick={handleCTAClick}
              type="button"
            >
              機能を見る
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={() => window.open('https://react.dev', '_blank')}
              type="button"
            >
              React v19について
            </button>
          </div>
        </div>
        
        <div className={`${styles.heroVisual} ${isVisible ? styles.heroVisualVisible : ''}`}>
          <div className={styles.visualElement}>
            <span className={styles.reactIcon}>⚛️</span>
            <div className={styles.codeSnippet}>
              <div className={styles.codeLine}>
                <span className={styles.codeKeyword}>const</span>
                <span className={styles.codeVariable}> App</span>
                <span className={styles.codeOperator}> = </span>
                <span className={styles.codeFunction}>() =&gt;</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeReturn}>  return</span>
                <span className={styles.codeTag}> &lt;div&gt;</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeString}>    Hello React v19!</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeTag}>  &lt;/div&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}