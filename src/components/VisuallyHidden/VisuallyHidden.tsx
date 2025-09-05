import styles from './VisuallyHidden.module.css'

interface VisuallyHiddenProps {
  children: React.ReactNode
  as?: keyof React.JSX.IntrinsicElements
}

export const VisuallyHidden = ({ children, as = 'span' }: VisuallyHiddenProps) => {
  const Component = as as keyof React.JSX.IntrinsicElements
  
  return (
    <Component className={styles.visuallyHidden}>
      {children}
    </Component>
  )
}