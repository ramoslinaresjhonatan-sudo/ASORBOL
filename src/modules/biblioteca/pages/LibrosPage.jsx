import { useState, useEffect } from 'react'
import Card from '../../../shared/components/Card'
import Table from '../../../shared/components/Table'
import Button from '../../../shared/components/Button'
import * as bibliotecaService from '../services/bibliotecaService'
import styles from '../../_shared/ModulePage.module.css'
import { MdAdd, MdEdit, MdBlock, MdCheckCircle, MdDelete, MdBook } from 'react-icons/md'
import LibroModal from '../components/LibroModal'

const LibrosPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedLibro, setSelectedLibro] = useState(null)
  const [libroToDelete, setLibroToDelete] = useState(null)
  
  const [libros, setLibros] = useState([])
  const [autores, setAutores] = useState([])
  const [categorias, setCategorias] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [lData, aData, cData] = await Promise.all([
        bibliotecaService.getLibros(),
        bibliotecaService.getAutores(),
        bibliotecaService.getCategorias()
      ])
      setLibros(lData)
      setAutores(aData)
      setCategorias(cData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const columns = [
    { key: 'portada_url', label: 'Portada', render: (v) => v ? (
      <div style={{ width: '40px', height: '60px' }}>
        <img src={v} alt="Portada" style={{ width: '40px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
      </div>
    ) : 'Sin foto' },
    { key: 'titulo', label: 'Título' },
    { key: 'autores', label: 'Autores', render: (v) => v && v.length > 0 ? v.map(id => autores.find(a => a.id === id)?.nombre).filter(Boolean).join(', ') : 'N/A' },
    { key: 'categorias', label: 'Categorías', render: (v) => v && v.length > 0 ? v.map(id => categorias.find(c => c.id === id)?.nombre).filter(Boolean).join(', ') : 'N/A' },
    { key: 'estado', label: 'Estado', render: (v) => (
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
            onClick={() => { setLibroToDelete(row); setIsDeleteModalOpen(true); }} 
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
      await bibliotecaService.updateLibro(row.id, { estado: !row.estado })
      fetchData()
    } catch (error) {
      console.error("Error toggling status:", error)
    }
  }

  const confirmDelete = async () => {
    if (libroToDelete) {
      try {
        await bibliotecaService.deleteLibro(libroToDelete.id)
        setIsDeleteModalOpen(false)
        setLibroToDelete(null)
        fetchData()
      } catch (error) {
        console.error("Error deleting:", error)
      }
    }
  }

  const handleEdit = (libro) => {
    setSelectedLibro(libro)
    setIsModalOpen(true)
  }

  const handleSave = async (formData) => {
    try {
      if (selectedLibro) {
        await bibliotecaService.updateLibro(selectedLibro.id, formData)
      } else {
        await bibliotecaService.createLibro(formData)
      }
      setIsModalOpen(false)
      setSelectedLibro(null)
      fetchData()
    } catch (error) {
      console.error("Error saving:", error)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Libros</h1>
          <p className={styles.subtitle}>Gestión del catálogo de libros</p>
        </div>
        <Button icon={<MdAdd />} onClick={() => { setSelectedLibro(null); setIsModalOpen(true); }}>
          Nuevo Libro
        </Button>
      </div>
      
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <Table columns={columns} data={libros} />
      )}

      <LibroModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedLibro(null); }} 
        onSave={handleSave}
        initialData={selectedLibro}
      />

      <LibroModal.DeleteConfirm 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        titulo={libroToDelete?.titulo}
      />
    </div>
  )
}

export default LibrosPage
