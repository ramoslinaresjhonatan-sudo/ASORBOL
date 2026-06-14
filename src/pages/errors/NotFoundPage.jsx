import { useNavigate } from 'react-router-dom'
import styles from './ErrorPage.module.css'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Página no encontrada</h1>
      <p className={styles.msg}>La ruta que buscas no existe o fue eliminada.</p>
      <button className={styles.btn} onClick={() => navigate('/dashboard')}>Volver al inicio</button>
    </div>
  )
}

export default NotFoundPage
