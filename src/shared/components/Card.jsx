import styles from './Card.module.css'

const Card = ({ children, title, subtitle, actions, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {(title || actions) && (
        <div className={styles.header}>
          <div>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export default Card
