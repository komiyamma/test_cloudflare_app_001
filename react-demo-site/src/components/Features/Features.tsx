import { useState, useEffect, useRef, useMemo } from 'react'
import type { FeatureCard } from '../../types'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { VisuallyHidden } from '../VisuallyHidden'
import styles from './Features.module.css'

const features: FeatureCard[] = [
  {
    id: 'react19',
    title: 'React v19',
    description: '最新のReact機能を活用した高性能なコンポーネント開発',
    icon: '⚛️'
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: '型安全な開発環境でバグを減らし、保守性を向上',
    icon: '📝'
  },
  {
    id: 'responsive',
    title: 'レスポンシブ',
    description: 'あらゆるデバイスに対応したモバイルファーストデザイン',
    icon: '📱'
  },
  {
    id: 'performance',
    title: 'パフォーマンス',
    description: '最適化されたバンドルサイズと高速なレンダリング',
    icon: '⚡'
  },
  {
    id: 'accessibility',
    title: 'アクセシビリティ',
    description: 'すべてのユーザーが利用しやすいインクルーシブデザイン',
    icon: '♿'
  },
  {
    id: 'modern',
    title: 'モダン開発',
    description: 'CSS Modules、Vite、ESLintを活用した開発環境',
    icon: '🛠️'
  }
]

export const Features = () => {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [focusedCard, setFocusedCard] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Use intersection observer hook for better performance
  const { elementRef: sectionElementRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  })

  // Memoize features to prevent unnecessary re-renders
  const memoizedFeatures = useMemo(() => features, [])

  // Individual card observers
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Intersection Observer for individual cards
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id')
            if (cardId) {
              setVisibleCards(prev => new Set([...prev, cardId]))
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const cardRef = (element: HTMLDivElement | null, cardId: string) => {
    if (element && observerRef.current) {
      element.setAttribute('data-card-id', cardId)
      observerRef.current.observe(element)
    }
  }

  // Combine refs for section
  const combinedSectionRef = (element: HTMLElement | null) => {
    sectionRef.current = element
    sectionElementRef.current = element
  }

  return (
    <section 
      id="features" 
      className={styles.features}
      ref={combinedSectionRef}
      aria-labelledby="features-title"
    >
      <div className="container">
        <div className={styles.featuresHeader}>
          <h2 id="features-title" className={styles.featuresTitle}>機能紹介</h2>
          <p className={styles.featuresSubtitle}>
            このデモサイトで使用されている技術とアプローチをご紹介します
          </p>
        </div>
        
        <div 
          className={styles.featuresGrid}
          role="list"
          aria-label="機能一覧"
        >
          {memoizedFeatures.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => cardRef(el, feature.id)}
              className={`${styles.featureCard} ${
                visibleCards.has(feature.id) ? styles.featureCardVisible : ''
              } ${(hoveredCard === feature.id || focusedCard === feature.id) ? styles.featureCardHovered : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onFocus={() => {
                setFocusedCard(feature.id)
                setHoveredCard(feature.id)
              }}
              onBlur={() => {
                setFocusedCard(null)
                setHoveredCard(null)
              }}
              tabIndex={0}
              role="listitem"
              aria-labelledby={`feature-title-${feature.id}`}
              aria-describedby={`feature-desc-${feature.id}`}
            >
              <div className={styles.featureIcon} aria-hidden="true">
                <span role="img">
                  {feature.icon}
                </span>
              </div>
              
              <div className={styles.featureContent}>
                <h3 
                  id={`feature-title-${feature.id}`}
                  className={styles.featureTitle}
                >
                  {feature.title}
                </h3>
                <p 
                  id={`feature-desc-${feature.id}`}
                  className={styles.featureDescription}
                >
                  {feature.description}
                </p>
              </div>
              
              <div className={styles.featureHover} aria-hidden="true">
                <span className={styles.learnMore}>詳しく見る</span>
              </div>
              
              <VisuallyHidden>
                {feature.title}の詳細情報。{feature.description}
              </VisuallyHidden>
            </div>
          ))}
        </div>
        
        <div className={styles.featuresFooter}>
          <p className={styles.footerText}>
            これらの技術を組み合わせることで、高品質なWebアプリケーションを構築しています。
          </p>
        </div>
      </div>
    </section>
  )
}