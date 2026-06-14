import { useState, useEffect } from 'react'
import Table from '../../../shared/components/Table'
import Button from '../../../shared/components/Button'
import styles from '../../_shared/ModulePage.module.css'
import { MdAdd, MdEdit, MdBlock, MdCheckCircle, MdDelete } from 'react-icons/md'
import AutorModal from '../components/AutorModal'
import * as bibliotecaService from '../services/bibliotecaService'

const AutoresPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedAutor, setSelectedAutor] = useState(null)
  const [autorToDelete, setAutorToDelete] = useState(null)
  const [autores, setAutores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAutores()
  }, [])

  const fetchAutores = async () => {
    setLoading(true)
    try {
      const data = await bibliotecaService.getAutores()
      setAutores(data)
    } catch (error) {
      console.error("Error fetching autores:", error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { key: 'id', label: '#' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'nacionalidad', label: 'Nacionalidad' },
    { key: 'activo', label: 'Estado', render: (v) => (
      <span className={`pill ${v ? 'pill-success' : 'pill-primary'}`}>
        {v ? 'Activo' : 'Inactivo'}
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
            color: row.activo ? '#ef4444' : '#10b981', 
            background: row.activo ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)' 
          }}
          title={row.activo ? "Deshabilitar" : "Habilitar"}
        >
          {row.activo ? <MdBlock size={18} /> : <MdCheckCircle size={18} />}
        </button>
        <button 
          className="btn-action btn-delete"
          onClick={() => { setAutorToDelete(row); setIsDeleteModalOpen(true); }} 
          style={{ opacity: row.activo ? 0.3 : 1, cursor: row.activo ? 'not-allowed' : 'pointer' }}
          title={row.activo ? "Debe desactivar para eliminar" : "Eliminar"}
          disabled={row.activo}
        >
          <MdDelete size={18} />
        </button>
      </div>
    )},
  ]

  const handleToggleStatus = async (autor) => {
    try {
      await bibliotecaService.updateAutor(autor.id, { activo: !autor.activo })
      fetchAutores()
    } catch (error) {
      alert("Error al cambiar el estado")
    }
  }

  const confirmDelete = async () => {
    if (autorToDelete) {
      try {
        await bibliotecaService.deleteAutor(autorToDelete.id)
        setIsDeleteModalOpen(false)
        setAutorToDelete(null)
        fetchAutores()
      } catch (error) {
        alert("Error al eliminar el autor. Asegúrese de que no tenga libros asociados.")
      }
    }
  }

  const handleEdit = (autor) => {
    setSelectedAutor(autor)
    setIsModalOpen(true)
  }

  const handleSave = async (formData) => {
    try {
      if (selectedAutor) {
        await bibliotecaService.updateAutor(selectedAutor.id, formData)
      } else {
        await bibliotecaService.createAutor(formData)
      }
      setIsModalOpen(false)
      setSelectedAutor(null)
      fetchAutores()
    } catch (error) {
      alert("Error al guardar el autor")
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Autores</h1>
          <p className={styles.subtitle}>Gestión de autores de la biblioteca</p>
        </div>
        <Button icon={<MdAdd />} onClick={() => { setSelectedAutor(null); setIsModalOpen(true); }}>
          Nuevo Autor
        </Button>
      </div>
      
      {loading ? (
        <div className="loading">Cargando autores...</div>
      ) : (
        <Table columns={columns} data={autores} />
      )}

      {/* Modal de Registro/Edición */}
      <AutorModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedAutor(null); }} 
        onSave={handleSave}
        initialData={selectedAutor}
      />

      {/* Modal de Confirmación de Eliminación */}
      <AutorModal.DeleteConfirm 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        nombre={autorToDelete?.nombre}
      />
    </div>
  )
}

export default AutoresPage
