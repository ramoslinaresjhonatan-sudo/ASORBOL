import { useState, useEffect } from 'react'
import Card from '../../../shared/components/Card'
import Table from '../../../shared/components/Table'
import Button from '../../../shared/components/Button'
import Modal from '../../../shared/components/Modal'
import styles from '../../_shared/ModulePage.module.css'
import { MdAdd, MdEdit, MdDelete, MdCheckCircle, MdBlock } from 'react-icons/md'
import * as cronogramasService from '../services/cronogramasService'

const CronogramaDirigidoPage = () => {
  const [dirigidos, setDirigidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentDirigido, setCurrentDirigido] = useState({ nombre: '', descripcion: '', activo: true })

  useEffect(() => {
    fetchDirigidos()
  }, [])

  const fetchDirigidos = async () => {
    setLoading(true)
    try {
      const data = await cronogramasService.getDirigidos()
      setDirigidos(data)
    } catch (error) {
      console.error("Error fetching dirigidos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (dirigido = null) => {
    if (dirigido) {
      setEditMode(true)
      setCurrentDirigido(dirigido)
    } else {
      setEditMode(false)
      setCurrentDirigido({ nombre: '', descripcion: '', activo: true })
    }
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    try {
      if (editMode) {
        await cronogramasService.updateDirigido(currentDirigido.id, currentDirigido)
      } else {
        await cronogramasService.createDirigido(currentDirigido)
      }
      setIsModalOpen(false)
      fetchDirigidos()
    } catch (error) {
      alert("Error al guardar el público dirigido")
    }
  }

  const handleDelete = async (id, activo) => {
    if (activo) {
      alert("No se puede eliminar un registro activo. Desactívelo primero.")
      return
    }
    if (window.confirm("¿Está seguro de eliminar este registro?")) {
      try {
        await cronogramasService.deleteDirigido(id)
        fetchDirigidos()
      } catch (error) {
        alert("Error al eliminar el registro")
      }
    }
  }

  const toggleEstado = async (dirigido) => {
    try {
      await cronogramasService.updateDirigido(dirigido.id, { activo: !dirigido.activo })
      fetchDirigidos()
    } catch (error) {
      alert("Error al cambiar el estado")
    }
  }

  const columns = [
    { key: 'id', label: '#' },
    { key: 'nombre', label: 'Público Dirigido', render: (v) => <strong style={{ color: 'var(--color-primary)' }}>{v}</strong> },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'activo', label: 'Estado', render: (v) => (
      <span className={`pill ${v ? 'pill-success' : 'pill-primary'}`}>
        {v ? 'Activo' : 'Inactivo'}
      </span>
    )},
    { key: 'acciones', label: 'Acciones', render: (_, row) => (
      <div className="table-actions">
        <button className="btn-action btn-edit" onClick={() => handleOpenModal(row)}>
          <MdEdit size={18} />
        </button>
        <button 
          className="btn-action"
          onClick={() => toggleEstado(row)}
          style={{ 
            background: row.activo ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', 
            color: row.activo ? '#ef4444' : '#10b981'
          }}
          title={row.activo ? "Desactivar" : "Activar"}
        >
          {row.activo ? <MdBlock size={18} /> : <MdCheckCircle size={18} />}
        </button>
        <button 
          className="btn-action btn-delete" 
          onClick={() => handleDelete(row.id, row.activo)}
          style={{ opacity: row.activo ? 0.3 : 1, cursor: row.activo ? 'not-allowed' : 'pointer' }}
          title={row.activo ? "Debe desactivar para eliminar" : "Eliminar"}
        >
          <MdDelete size={18} />
        </button>
      </div>
    )},
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Público Dirigido</h1>
          <p className={styles.subtitle}>Definición de audiencias para eventos</p>
        </div>
        <Button icon={<MdAdd />} onClick={() => handleOpenModal()}>Nuevo Público</Button>
      </div>

      {loading ? (
        <div className="loading">Cargando registros...</div>
      ) : (
        <Table columns={columns} data={dirigidos} />
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editMode ? "Editar Público" : "Nuevo Público"}
      >
        <div className={styles.formGroup}>
          <label>Nombre</label>
          <input 
            className={styles.input}
            value={currentDirigido.nombre}
            onChange={(e) => setCurrentDirigido({...currentDirigido, nombre: e.target.value})}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Descripción</label>
          <textarea 
            className={styles.input}
            rows={3}
            value={currentDirigido.descripcion}
            onChange={(e) => setCurrentDirigido({...currentDirigido, descripcion: e.target.value})}
          />
        </div>
        <div className={styles.modalActions}>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave}>{editMode ? "Guardar" : "Crear"}</Button>
        </div>
      </Modal>

    </div>
  )
}

export default CronogramaDirigidoPage
