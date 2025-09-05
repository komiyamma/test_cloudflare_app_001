import { useState, useCallback } from 'react'
import type { ContactForm, FormErrors } from '../../types'
import styles from './Contact.module.css'

const initialFormData: ContactForm = {
  name: '',
  email: '',
  message: ''
}

const initialErrors: FormErrors = {}

export const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>(initialErrors)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // バリデーション関数
  const validateField = useCallback((name: keyof ContactForm, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'お名前を入力してください'
        if (value.trim().length < 2) return 'お名前は2文字以上で入力してください'
        return undefined

      case 'email': {
        if (!value.trim()) return 'メールアドレスを入力してください'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return '有効なメールアドレスを入力してください'
        return undefined
      }

      case 'message':
        if (!value.trim()) return 'メッセージを入力してください'
        if (value.trim().length < 10) return 'メッセージは10文字以上で入力してください'
        if (value.trim().length > 1000) return 'メッセージは1000文字以内で入力してください'
        return undefined

      default:
        return undefined
    }
  }, [])

  // フォーム全体のバリデーション
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {}
    
    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof ContactForm
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        newErrors[fieldName] = error
      }
    })

    return newErrors
  }, [formData, validateField])

  // 入力値の変更処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const fieldName = name as keyof ContactForm

    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))

    // リアルタイムバリデーション
    const error = validateField(fieldName, value)
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }))

    // 送信状態をリセット
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
    }
  }

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // 実際のAPI呼び出しの代わりにシミュレーション
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 成功時の処理
      setSubmitStatus('success')
      setFormData(initialFormData)
      setErrors(initialErrors)
      
      console.log('フォーム送信データ:', formData)
    } catch (error) {
      console.error('送信エラー:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.contactHeader}>
          <h2 id="contact-title" className={styles.contactTitle}>お問い合わせ</h2>
          <p className={styles.contactSubtitle}>
            ご質問やご相談がございましたら、お気軽にお問い合わせください。
          </p>
        </div>

        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <h3>お問い合わせについて</h3>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📧</span>
              <div>
                <h4>メールでのお問い合わせ</h4>
                <p>通常1-2営業日以内にご返信いたします</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>⏰</span>
              <div>
                <h4>対応時間</h4>
                <p>平日 9:00 - 18:00</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🔒</span>
              <div>
                <h4>プライバシー</h4>
                <p>お預かりした情報は適切に管理いたします</p>
              </div>
            </div>
          </div>

          <form 
            className={styles.contactForm} 
            onSubmit={handleSubmit} 
            noValidate
            aria-label="お問い合わせフォーム"
          >
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                お名前 <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${styles.formInput} ${errors.name ? styles.formInputError : ''}`}
                placeholder="山田太郎"
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <span id="name-error" className={styles.errorMessage} role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                メールアドレス <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${styles.formInput} ${errors.email ? styles.formInputError : ''}`}
                placeholder="example@email.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <span id="email-error" className={styles.errorMessage} role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                メッセージ <span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`${styles.formTextarea} ${errors.message ? styles.formInputError : ''}`}
                placeholder="お問い合わせ内容をご記入ください"
                rows={6}
                aria-describedby={errors.message ? 'message-error' : undefined}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <span id="message-error" className={styles.errorMessage} role="alert">
                  {errors.message}
                </span>
              )}
              <div className={styles.characterCount}>
                {formData.message.length} / 1000文字
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              aria-describedby="submit-status"
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>

            {submitStatus === 'success' && (
              <div id="submit-status" className={styles.successMessage} role="alert">
                ✅ メッセージを送信しました。ありがとうございます！
              </div>
            )}

            {submitStatus === 'error' && (
              <div id="submit-status" className={styles.errorMessage} role="alert">
                ❌ 送信に失敗しました。しばらく時間をおいて再度お試しください。
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}