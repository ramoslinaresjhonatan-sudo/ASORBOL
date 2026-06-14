import { useState, useEffect } from 'react'
import Card from '../../../shared/components/Card'
import Table from '../../../shared/components/Table'
import Button from '../../../shared/components/Button'
import Modal from '../../../shared/components/Modal'
import styles from '../../_shared/ModulePage.module.css'
import { MdAdd, MdEdit, MdDelete, MdCheckCircle, MdBlock } from 'react-icons/md'
import * as cronogramasService from '../services/cronogramasService'

const CronogramaCategoriasPage = () => {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentCategoria, setCurrentCategoria] = useState({ nombre: '', descripcion: '', color: '#3498db', activo: true })

  useEffect(() => {
    fetchCategorias()
  }, [])

  const fetchCategorias = async () => {
    setLoading(true)
    try {
      const data = await cronogramasService.getCategorias()
      setCategorias(data)
    } catch (error) {
      console.error("Error fetching categorias:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (categoria = null) => {
    if (categoria) {
      setEditMode(true)
      setCurrentCategoria(categoria)
    } else {
      setEditMode(false)
      setCurrentCategoria({ nombre: '', descripcion: '', color: '#3498db', activo: true })
    }
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    try {
      if (editMode) {
        await cronogramasService.updateCategoria(currentCategoria.id, currentCategoria)
      } else {
        await cronogramasService.createCategoria(currentCategoria)
      }
      setIsModalOpen(false)
      fetchCategorias()
    } catch (error) {
      alert("Error al guardar la categoría")
    }
  }

  const handleDelete = async (id, activo) => {
    if (activo) {
      alert("No se puede eliminar una categoría activa. Desactívela primero.")
      return
    }
    if (window.confirm("¿Está seguro de eliminar esta categoría?")) {
      try {
        await cronogramasService.deleteCategoria(id)
        fetchCategorias()
      } catch (error) {
        alert("Error al eliminar la categoría")
      }
    }
  }

  const toggleEstado = async (categoria) => {
    try {
      await cronogramasService.updateCategoria(categoria.id, { activo: !categoria.activo })
      fetchCategorias()
    } catch (error) {
      alert("Error al cambiar el estado")
    }
  }

  const columns = [
    { key: 'id', label: '#' },
    { key: 'nombre', label: 'Categoría', render: (v) => <strong style={{ color: 'var(--color-primary)' }}>{v}</strong> },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'activo', label: 'Estado', render: (v) => (
      <span className={`pill ${v ? 'pill-success' : 'pill-primary'}`}>
        {v ? 'Activa' : 'Inactiva'}
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
          <h1 className={styles.title}>Categorías de Eventos</h1>
          <p className={styles.subtitle}>Clasificación para el cronograma institucional</p>
        </div>
        <Button icon={<MdAdd />} onClick={() => handleOpenModal()}>Nueva Categoría</Button>
      </div>
      
      {loading ? (
        <div className="loading">Cargando categorías...</div>
      ) : (
        <Table columns={columns} data={categorias} />
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editMode ? "Editar Categoría" : "Nueva Categoría"}
      >
        <div className={styles.formGroup}>
          <label>Nombre</label>
          <input 
            className={styles.input}
            value={currentCategoria.nombre}
            onChange={(e) => setCurrentCategoria({...currentCategoria, nombre: e.target.value})}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Descripción</label>
          <textarea 
            className={styles.input}
            rows={3}
            value={currentCategoria.descripcion}
            onChange={(e) => setCurrentCategoria({...currentCategoria, descripcion: e.target.value})}
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

export default CronogramaCategoriasPage
