import { useNavigate } from 'react-router-dom'
import styles from './ErrorPage.module.css'

const ForbiddenPage = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <div className={styles.code} style={{ color: '#f59e0b' }}>403</div>
      <h1 className={styles.title}>Acceso denegado</h1>
      <p className={styles.msg}>No tienes permisos para ver esta página.</p>
      <button className={styles.btn} onClick={() => navigate('/dashboard')}>Volver al inicio</button>
    </div>
  )
}

export default ForbiddenPage
