import Card from '../../../shared/components/Card'
import Table from '../../../shared/components/Table'
import Button from '../../../shared/components/Button'
import { mockPagos } from '../../../shared/data/mockData'
import styles from '../../_shared/ModulePage.module.css'
import { MdAdd } from 'react-icons/md'

const estadoBadge = (v) => {
  if (v === 'APROBADO') return <span className={styles.badgeActive}>{v}</span>
  if (v === 'RECHAZADO') return <span className={styles.badgeInactive}>{v}</span>
  return <span className={styles.badgeWarning}>{v}</span>
}

const columns = [
  { key: 'id', label: '#' },
  { key: 'usuario', label: 'Usuario' },
  { key: 'monto', label: 'Monto', render: (v) => `$${v.toFixed(2)}` },
  { key: 'banco', label: 'Banco' },
  { key: 'fecha_pago', label: 'Fecha' },
  { key: 'estado', label: 'Estado', render: estadoBadge },
]

const PagosPage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Pagos</h1>
        <p className={styles.subtitle}>Control de pagos y transacciones</p>
      </div>
      <Button icon={<MdAdd />}>Registrar pago</Button>
    </div>
    <Card>
      <Table columns={columns} data={mockPagos} />
    </Card>
  </div>
)

export default PagosPage
