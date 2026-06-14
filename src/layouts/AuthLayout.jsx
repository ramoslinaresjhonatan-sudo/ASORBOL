import styles from './AuthLayout.module.css'

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.background}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>
      <div className={styles.box}>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
