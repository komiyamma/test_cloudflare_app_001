import { useState } from 'react'
import styles from './ErrorTest.module.css'

// This component is for testing the Error Boundary
// It should only be used in development
const ErrorTest = () => {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error('テスト用エラー: Error Boundaryの動作確認')
  }

  // Only show in development
  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <div className={styles.errorTest}>
      <button 
        className={styles.errorButton}
        onClick={() => setShouldThrow(true)}
        title="Error Boundaryをテストする"
      >
        🐛 エラーテスト
      </button>
    </div>
  )
}

export { ErrorTest }