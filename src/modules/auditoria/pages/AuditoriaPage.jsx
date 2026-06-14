import Card from '../../../shared/components/Card'
import styles from '../../_shared/ModulePage.module.css'

const AuditoriaPage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Auditoría</h1>
        <p className={styles.subtitle}>Registro de acciones del sistema</p>
      </div>
    </div>
    <Card><p style={{color:'rgba(255,255,255,0.5)'}}>Logs de auditoría próximamente...</p></Card>
  </div>
)

export default AuditoriaPage
