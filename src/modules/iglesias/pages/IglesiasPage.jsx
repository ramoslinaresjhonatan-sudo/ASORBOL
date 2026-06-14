import { useState, useEffect } from 'react'
import Card from '../../../shared/components/Card'
import Table from '../../../shared/components/Table'
import Button from '../../../shared/components/Button'
import styles from '../../_shared/ModulePage.module.css'
import { MdAdd, MdEdit, MdBlock, MdCheckCircle, MdDelete } from 'react-icons/md'
import IglesiaModal from '../components/IglesiaModal'
import * as iglesiasService from '../services/iglesiasService'
import Loader from '../../../shared/components/Loader'

const IglesiasPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedIglesia, setSelectedIglesia] = useState(null)
  const [iglesiaToDelete, setIglesiaToDelete] = useState(null)
  const [iglesias, setIglesias] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await iglesiasService.getIglesias()
      setIglesias(data)
    } catch (error) {
      console.error("Error fetching iglesias:", error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    // ... (columnas)
    { key: 'id', label: '#' },
    { key: 'foto', label: 'Foto', render: (_, row) => row.foto_detalle ? (
      <div style={{ width: '45px', height: '45px' }}>
        <img src={row.foto_detalle.url} alt="Iglesia" className="table-img" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
      </div>
    ) : (
      <div className="table-img" style={{ width: '45px', height: '45px', background: 'var(--bg-active)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: '700' }}>N/A</div>
    )},
    { key: 'nombre', label: 'Nombre' },
    { key: 'departamento_nombre', label: 'Departamento' },
    { key: 'estado', label: 'Estado', render: (v) => (
      <span className={`pill ${v ? 'pill-success' : 'pill-primary'}`}>
        {v ? 'Activa' : 'Inactiva'}
      </span>
    )},
    { key: 'acciones', label: 'Acciones', render: (_, row) => (
      <div className="table-actions">
        <button 
          className="btn-action btn-edit"
          onClick={() => handleEdit(row)} 
          title="Editar"
        >
          <MdEdit size={18} />
        </button>
        <button 
          className="btn-action"
          onClick={() => handleToggleStatus(row)} 
          style={{ 
            color: row.estado ? '#ef4444' : '#10b981', 
            background: row.estado ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)' 
          }}
          title={row.estado ? "Desactivar" : "Activar"}
        >
          {row.estado ? <MdBlock size={18} /> : <MdCheckCircle size={18} />}
        </button>
        {!row.estado && (
          <button 
            className="btn-action btn-delete"
            onClick={() => { setIglesiaToDelete(row); setIsDeleteModalOpen(true); }} 
            title="Eliminar permanentemente"
          >
            <MdDelete size={18} />
          </button>
        )}
      </div>
    )},
  ]

  const handleToggleStatus = async (row) => {
    try {
      await iglesiasService.toggleIglesiaStatus(row.id, row.estado)
      fetchData()
    } catch (error) {
      alert("Error al cambiar estado")
    }
  }

  const confirmDelete = async () => {
    if (iglesiaToDelete) {
      try {
        await iglesiasService.deleteIglesia(iglesiaToDelete.id)
        fetchData()
        setIsDeleteModalOpen(false)
        setIglesiaToDelete(null)
      } catch (error) {
        alert("Error al eliminar")
      }
    }
  }

  const handleEdit = (iglesia) => {
    setSelectedIglesia(iglesia)
    setIsModalOpen(true)
  }

  const handleSave = async (formData) => {
    try {
      if (selectedIglesia) {
        await iglesiasService.updateIglesia(selectedIglesia.id, formData)
      } else {
        await iglesiasService.createIglesia(formData)
      }
      fetchData()
      setIsModalOpen(false)
      setSelectedIglesia(null)
    } catch (error) {
      alert("Error al guardar")
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Iglesias</h1>
          <p className={styles.subtitle}>Gestiona las sedes e iglesias registradas</p>
        </div>
        <Button icon={<MdAdd />} onClick={() => { setSelectedIglesia(null); setIsModalOpen(true); }}>
          Nueva iglesia
        </Button>
      </div>
      
      {loading ? (
        <Card>
          <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center' }}>
            <Loader />
          </div>
        </Card>
      ) : (
        <Table columns={columns} data={iglesias} />
      )}

      <IglesiaModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedIglesia(null); }} 
        onSave={handleSave}
        initialData={selectedIglesia}
      />

      {/* Modal de Confirmación de Eliminación */}
      <IglesiaModal.DeleteConfirm 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        nombre={iglesiaToDelete?.nombre}
      />
    </div>
  )
}

export default IglesiasPage
