import { useState, useEffect } from 'react'
import Modal from '../../../shared/components/Modal'
import Input from '../../../shared/components/Input'
import Button from '../../../shared/components/Button'
import styles from './AutorModal.module.css'
import { MdSave, MdClose, MdPerson, MdDelete } from 'react-icons/md'

const AutorModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    nacionalidad: '',
    especialidad: '',
    biografia: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        nacionalidad: initialData.nacionalidad || '',
        especialidad: initialData.especialidad || '',
        biografia: initialData.biografia || ''
      })
    } else {
      setFormData({
        nombre: '',
        nacionalidad: '',
        especialidad: '',
        biografia: ''
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar Autor" : "Registrar Nuevo Autor"} size="md">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.headerIcon}>
          <MdPerson size={40} />
        </div>
        
        <Input
          label="Nombre Completo"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Ellen G. White"
          required
        />

        <div className={styles.row}>
          <Input
            label="Nacionalidad"
            name="nacionalidad"
            value={formData.nacionalidad}
            onChange={handleChange}
            placeholder="Ej: Estadounidense"
          />
          <Input
            label="Especialidad"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            placeholder="Ej: Teología"
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Breve Biografía</label>
          <textarea
            name="biografia"
            value={formData.biografia}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Información relevante del autor..."
            rows="4"
          ></textarea>
        </div>

        <div className={styles.footer}>
          <Button type="button" variant="secondary" onClick={onClose} icon={<MdClose />}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" icon={<MdSave />}>
            Guardar Autor
          </Button>
        </div>
      </form>
    </Modal>
  )
}

AutorModal.DeleteConfirm = ({ isOpen, onClose, onConfirm, nombre }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Eliminación" size="sm">
    <div className={styles.deleteContent}>
      <div className={styles.warningIcon}><MdDelete size={48} /></div>
      <p>¿Estás seguro de eliminar permanentemente al autor <strong>{nombre}</strong>?</p>
      <p className={styles.deleteSubtitle}>Esta acción no se puede deshacer.</p>
      <div className={styles.deleteFooter}>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={onConfirm} style={{ background: '#ef4444' }}>Eliminar Ahora</Button>
      </div>
    </div>
  </Modal>
)

export default AutorModal
