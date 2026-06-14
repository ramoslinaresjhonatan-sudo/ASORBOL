import styles from './Loader.module.css'

const Loader = ({ fullscreen = false }) => {
  return (
    <div className={fullscreen ? styles.fullscreen : styles.inline}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Loader
