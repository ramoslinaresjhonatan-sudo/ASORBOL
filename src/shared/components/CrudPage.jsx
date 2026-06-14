import { useState, useEffect } from 'react'
import Card from './Card'
import Table from './Table'
import Button from './Button'
import Loader from './Loader'
import styles from '../../modules/_shared/ModulePage.module.css'
import { MdAdd, MdRefresh } from 'react-icons/md'

const CrudPage = ({ 
  title, 
  subtitle, 
  columns, 
  fetchData, 
  onAdd, 
  addLabel = 'Nuevo',
  addIcon = <MdAdd />
}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchData()
      setData(result)
    } catch (err) {
      setError('Error al cargar los datos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="secondary" onClick={loadData} icon={<MdRefresh />}>
            Refrescar
          </Button>
          {onAdd && (
            <Button onClick={onAdd} icon={addIcon}>
              {addLabel}
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <Card>
          <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Loader />
          </div>
        </Card>
      ) : error ? (
        <Card>
          <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
            {error}
          </div>
        </Card>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </div>
  )
}

export default CrudPage
