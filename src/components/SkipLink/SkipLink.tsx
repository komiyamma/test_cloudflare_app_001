import styles from './SkipLink.module.css'

interface SkipLinkProps {
  href: string
  children: React.ReactNode
}

export const SkipLink = ({ href, children }: SkipLinkProps) => {
  return (
    <a 
      href={href} 
      className={styles.skipLink}
      onClick={(e) => {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          (target as HTMLElement).focus()
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }}
    >
      {children}
    </a>
  )
}