import { useState, useEffect } from 'react'
import Modal from '../../../shared/components/Modal'
import Input from '../../../shared/components/Input'
import Button from '../../../shared/components/Button'
import styles from './CategoriaModal.module.css'
import { MdSave, MdClose, MdCategory, MdDelete } from 'react-icons/md'

const CategoriaModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        descripcion: initialData.descripcion || ''
      })
    } else {
      setFormData({
        nombre: '',
        descripcion: ''
      })
    }
  }, [initialData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar Categoría" : "Nueva Categoría"} size="md">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.headerIcon}>
          <MdCategory size={40} />
        </div>
        
        <Input
          label="Nombre de la Categoría"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Teología, Historia, etc."
          required
        />

        <div className={styles.group}>
          <label className={styles.label}>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="¿De qué trata esta categoría?"
            rows="3"
          ></textarea>
        </div>

        <div className={styles.footer}>
          <Button type="button" variant="secondary" onClick={onClose} icon={<MdClose />}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" icon={<MdSave />}>
            Guardar Categoría
          </Button>
        </div>
      </form>
    </Modal>
  )
}

CategoriaModal.DeleteConfirm = ({ isOpen, onClose, onConfirm, nombre }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Eliminación" size="sm">
    <div className={styles.deleteContent}>
      <div className={styles.warningIcon}><MdDelete size={48} /></div>
      <p>¿Estás seguro de eliminar permanentemente la categoría <strong>{nombre}</strong>?</p>
      <p className={styles.deleteSubtitle}>Esta acción no se puede deshacer.</p>
      <div className={styles.deleteFooter}>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={onConfirm} style={{ background: '#ef4444' }}>Eliminar Ahora</Button>
      </div>
    </div>
  </Modal>
)

export default CategoriaModal
