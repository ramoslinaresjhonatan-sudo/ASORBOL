import Card from '../../../shared/components/Card'
import styles from '../../_shared/ModulePage.module.css'

const NotificacionesPage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Notificaciones</h1>
        <p className={styles.subtitle}>Centro de notificaciones del sistema</p>
      </div>
    </div>
    <Card><p style={{color:'rgba(255,255,255,0.5)'}}>No hay notificaciones nuevas.</p></Card>
  </div>
)

export default NotificacionesPage
