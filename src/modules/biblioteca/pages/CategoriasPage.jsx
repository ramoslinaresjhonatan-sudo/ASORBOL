import { useState, useEffect } from 'react'
import Card from '../../../shared/components/Card'
import Table from '../../../shared/components/Table'
import Button from '../../../shared/components/Button'
import styles from '../../_shared/ModulePage.module.css'
import { MdAdd, MdEdit, MdBlock, MdCheckCircle, MdDelete } from 'react-icons/md'
import CategoriaModal from '../components/CategoriaModal'
import * as bibliotecaService from '../services/bibliotecaService'

const CategoriasPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCategoria, setSelectedCategoria] = useState(null)
  const [categoriaToDelete, setCategoriaToDelete] = useState(null)
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategorias()
  }, [])

  const fetchCategorias = async () => {
    setLoading(true)
    try {
      const data = await bibliotecaService.getCategorias()
      setCategorias(data)
    } catch (error) {
      console.error("Error fetching categorias:", error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { key: 'id', label: '#' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'activo', label: 'Estado', render: (v) => (
      <span className={v ? styles.badgeActive : styles.badgeInactive}>{v ? 'Activa' : 'Inactiva'}</span>
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
            background: row.activo ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', 
            color: row.activo ? '#ef4444' : '#10b981'
          }}
          title={row.activo ? "Desactivar" : "Activar"}
        >
          {row.activo ? <MdBlock size={18} /> : <MdCheckCircle size={18} />}
        </button>
        <button 
          className="btn-action btn-delete"
          onClick={() => { setCategoriaToDelete(row); setIsDeleteModalOpen(true); }} 
          style={{ opacity: row.activo ? 0.3 : 1, cursor: row.activo ? 'not-allowed' : 'pointer' }}
          title={row.activo ? "Debe desactivar para eliminar" : "Eliminar"}
          disabled={row.activo}
        >
          <MdDelete size={18} />
        </button>
      </div>
    )},
  ]

  const handleToggleStatus = async (categoria) => {
    try {
      await bibliotecaService.updateCategoria(categoria.id, { activo: !categoria.activo })
      fetchCategorias()
    } catch (error) {
      alert("Error al cambiar el estado")
    }
  }

  const confirmDelete = async () => {
    if (categoriaToDelete) {
      try {
        await bibliotecaService.deleteCategoria(categoriaToDelete.id)
        setIsDeleteModalOpen(false)
        setCategoriaToDelete(null)
        fetchCategorias()
      } catch (error) {
        alert("Error al eliminar la categoría. Asegúrese de que no tenga libros asociados.")
      }
    }
  }

  const handleEdit = (categoria) => {
    setSelectedCategoria(categoria)
    setIsModalOpen(true)
  }

  const handleSave = async (formData) => {
    try {
      if (selectedCategoria) {
        await bibliotecaService.updateCategoria(selectedCategoria.id, formData)
      } else {
        await bibliotecaService.createCategoria(formData)
      }
      setIsModalOpen(false)
      setSelectedCategoria(null)
      fetchCategorias()
    } catch (error) {
      alert("Error al guardar la categoría")
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Categorías</h1>
          <p className={styles.subtitle}>Gestión de categorías de libros</p>
        </div>
        <Button icon={<MdAdd />} onClick={() => { setSelectedCategoria(null); setIsModalOpen(true); }}>
          Nueva Categoría
        </Button>
      </div>
      
      <Card>
        {loading ? (
          <div className="loading">Cargando categorías...</div>
        ) : (
          <Table columns={columns} data={categorias} />
        )}
      </Card>

      <CategoriaModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedCategoria(null); }} 
        onSave={handleSave}
        initialData={selectedCategoria}
      />

      <CategoriaModal.DeleteConfirm 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        nombre={categoriaToDelete?.nombre}
      />
    </div>
  )
}

export default CategoriasPage
