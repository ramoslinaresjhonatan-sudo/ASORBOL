import styles from './Input.module.css'

const Input = ({ label, name, type = 'text', placeholder, register, error, ...props }) => {
  return (
    <div className={styles.group}>
      {label && <label className={styles.label} htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  )
}

export default Input
