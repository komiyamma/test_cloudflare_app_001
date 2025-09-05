import { useEffect } from 'react'

interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
}

export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Only run in development or when explicitly enabled
    if (!import.meta.env.DEV) return

    const metrics: PerformanceMetrics = {}

    // Observe FCP and LCP
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime
            }
            break
          case 'largest-contentful-paint':
            metrics.lcp = entry.startTime
            break
          case 'first-input':
            metrics.fid = (entry as any).processingStart - entry.startTime
            break
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              metrics.cls = (metrics.cls || 0) + (entry as any).value
            }
            break
        }
      }
    })

    // Observe different entry types
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      console.warn('Performance monitoring not fully supported:', e)
    }

    // Log metrics after page load
    const logMetrics = () => {
      setTimeout(() => {
        console.group('🚀 Performance Metrics')
        console.log('First Contentful Paint (FCP):', metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'Not measured')
        console.log('Largest Contentful Paint (LCP):', metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'Not measured')
        console.log('First Input Delay (FID):', metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'Not measured')
        console.log('Cumulative Layout Shift (CLS):', metrics.cls ? metrics.cls.toFixed(4) : 'Not measured')
        
        // Performance recommendations
        if (metrics.lcp && metrics.lcp > 2500) {
          console.warn('⚠️ LCP is above 2.5s - consider optimizing images and critical resources')
        }
        if (metrics.fid && metrics.fid > 100) {
          console.warn('⚠️ FID is above 100ms - consider reducing JavaScript execution time')
        }
        if (metrics.cls && metrics.cls > 0.1) {
          console.warn('⚠️ CLS is above 0.1 - consider adding size attributes to images and avoiding layout shifts')
        }
        
        console.groupEnd()
      }, 3000)
    }

    if (document.readyState === 'complete') {
      logMetrics()
    } else {
      window.addEventListener('load', logMetrics)
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('load', logMetrics)
    }
  }, [])
}