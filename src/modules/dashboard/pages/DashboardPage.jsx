import useAuthStore from '../../../app/store/useAuthStore'
import Card from '../../../shared/components/Card'
import styles from './DashboardPage.module.css'
import { MdPeople, MdMenuBook, MdPayments, MdChurch } from 'react-icons/md'

const stats = [
  { label: 'Usuarios activos', value: '24', icon: <MdPeople />, color: '#1B4F8A' },
  { label: 'Libros en stock', value: '132', icon: <MdMenuBook />, color: '#22c55e' },
  { label: 'Pagos pendientes', value: '8', icon: <MdPayments />, color: '#f59e0b' },
  { label: 'Iglesias registradas', value: '12', icon: <MdChurch />, color: '#ec4899' },
]

const DashboardPage = () => {
  const { user } = useAuthStore()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>¡Bienvenido, {user?.nombres || 'Usuario'}!</h1>
          <p className={styles.subtitle}>Aquí tienes un resumen del sistema SORBOL</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <div>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.recent}>
        <Card title="Actividad Reciente" subtitle="Últimas acciones en el sistema">
          <div className={styles.activityList}>
            {[
              { text: 'Nuevo usuario registrado: Carlos López', time: 'hace 5 min' },
              { text: 'Pago aprobado por $150.000', time: 'hace 20 min' },
              { text: 'Libro "La Biblia de Estudio" actualizado', time: 'hace 1h' },
            ].map((item, i) => (
              <div key={i} className={styles.activityItem}>
                <div className={styles.activityDot} />
                <div className={styles.activityContent}>
                  <span className={styles.activityText}>{item.text}</span>
                  <span className={styles.activityTime}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
