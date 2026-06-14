import styles from './Button.module.css'

const Button = ({ children, variant = 'primary', size = 'md', onClick, type = 'button', disabled = false, icon }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${disabled ? styles.disabled : ''}`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  )
}

export default Button
