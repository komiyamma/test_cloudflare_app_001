import styles from './Footer.module.css'

const footerLinks = [
  { label: 'ホーム', href: '#home' },
  { label: '機能', href: '#features' },
  { label: 'お問い合わせ', href: '#contact' }
]

const socialLinks = [
  { label: 'GitHub', href: '#', icon: '🐙' },
  { label: 'Twitter', href: '#', icon: '🐦' },
  { label: 'LinkedIn', href: '#', icon: '💼' }
]

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      // 内部リンクの場合はスムーススクロール
      const targetElement = document.querySelector(href)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          {/* サイト情報セクション */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>React Demo Site</h3>
            <p className={styles.footerDescription}>
              React v19とTypeScriptを使用したモダンなデモサイトです。
              最新のWeb技術を活用して構築されています。
            </p>
          </div>

          {/* ナビゲーションリンク */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>ナビゲーション</h4>
            <ul className={styles.linkList}>
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <button
                    className={styles.footerLink}
                    onClick={() => handleLinkClick(link.href)}
                    type="button"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ソーシャルリンク */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>フォローする</h4>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                  <span className={styles.socialLabel}>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>&copy; {currentYear} React Demo Site. All rights reserved.</p>
          </div>
          <div className={styles.footerMeta}>
            <span>Made with React v19 & TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  )
}