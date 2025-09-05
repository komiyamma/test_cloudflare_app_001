import { useState, useRef } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './LazyImage.module.css'

interface LazyImageProps {
  src: string
  alt: string
  placeholder?: string
  className?: string
  width?: number
  height?: number
}

export const LazyImage = ({ 
  src, 
  alt, 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  className = '',
  width,
  height
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  })

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  // Combine refs
  const combinedRef = (element: HTMLImageElement | null) => {
    imgRef.current = element
    elementRef.current = element
  }

  return (
    <div className={`${styles.lazyImageContainer} ${className}`}>
      <img
        ref={combinedRef}
        src={isIntersecting ? src : placeholder}
        alt={alt}
        className={`${styles.lazyImage} ${isLoaded ? styles.loaded : ''} ${hasError ? styles.error : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      {!isLoaded && !hasError && (
        <div className={styles.placeholder} aria-hidden="true">
          読み込み中...
        </div>
      )}
      {hasError && (
        <div className={styles.errorState} role="img" aria-label="画像の読み込みに失敗しました">
          画像を読み込めませんでした
        </div>
      )}
    </div>
  )
}