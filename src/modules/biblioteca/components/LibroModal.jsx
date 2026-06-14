import { useState, useEffect } from 'react'
import Modal from '../../../shared/components/Modal'
import Input from '../../../shared/components/Input'
import Button from '../../../shared/components/Button'
import ChipSelect from '../../../shared/components/ChipSelect'
import { normalizeIds } from '../../../shared/utils/helpers'
import styles from './LibroModal.module.css'
import { MdSave, MdClose, MdCloudUpload, MdDelete, MdWarning } from 'react-icons/md'
import * as bibliotecaService from '../services/bibliotecaService'

/* ─── Estado vacío del formulario — constante fuera del componente ─────────── */
const EMPTY_FORM = {
  titulo: '',
  autores: [],
  categorias: [],
  descripcion: '',
  anio_publicacion: '',
  portada: null
}

/* ─── Modal principal ─────────────────────────────────────────────────────── */
const LibroModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [autores,      setAutores]      = useState([])
  const [categorias,   setCategorias]   = useState([])
  const [uploading,    setUploading]    = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview,      setPreview]      = useState(null)
  const [formData,     setFormData]     = useState(EMPTY_FORM)

  useEffect(() => {
    Promise.all([bibliotecaService.getAutores(), bibliotecaService.getCategorias()])
      .then(([aData, cData]) => { setAutores(aData); setCategorias(cData) })
      .catch(err => console.error('Error fetching data:', err))
  }, [])

  useEffect(() => {
    if (initialData) {
      setFormData({
        titulo:           initialData.titulo || '',
        autores:          normalizeIds(initialData.autores),
        categorias:       normalizeIds(initialData.categorias),
        descripcion:      initialData.descripcion || '',
        anio_publicacion: initialData.anio_publicacion || '',
        portada:          initialData.portada || null
      })
      setPreview(initialData.portada_url || initialData.portada?.url || null)
    } else {
      setFormData(EMPTY_FORM)
      setPreview(null)
      setSelectedFile(null)
    }
  }, [initialData, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.autores.length === 0) { alert('Selecciona al menos un autor.'); return }
    if (formData.categorias.length === 0) { alert('Selecciona al menos una categoría.'); return }

    setUploading(true)
    try {
      let portadaId = formData.portada?.id || null
      if (selectedFile) {
        const uploaded = await bibliotecaService.uploadImage(selectedFile)
        portadaId = uploaded.id
      }
      await onSave({ ...formData, portada: portadaId })
      onClose()
    } catch {
      alert('Error al guardar el libro o subir la imagen.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Editar Libro' : 'Registrar Nuevo Libro'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>

          {/* ── Portada ── */}
          <div className={styles.columnLeft}>
            <div className={styles.photoSection}>
              {preview ? (
                <div className={styles.previewContainer}>
                  <img src={preview} alt="Portada" className={styles.preview} />
                  <button
                    type="button"
                    className={styles.removePhoto}
                    onClick={() => { setPreview(null); setSelectedFile(null); setFormData(p => ({ ...p, portada: null })) }}
                    title="Eliminar portada"
                  >
                    <MdDelete size={16} />
                  </button>
                </div>
              ) : (
                <label className={styles.uploadPlaceholder}>
                  <MdCloudUpload size={44} />
                  <span className={styles.uploadTitle}>Subir Portada</span>
                  <span className={styles.uploadHint}>JPG, PNG o WEBP</span>
                  <input type="file" accept="image/*" onChange={handleFileSelect} hidden />
                </label>
              )}
            </div>
          </div>

          {/* ── Campos ── */}
          <div className={styles.columnRight}>
            <Input label="Título del Libro" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Ej: El Camino a Cristo" required />

            <ChipSelect
              label="Autores"
              options={autores}
              value={formData.autores}
              onChange={(val) => setFormData(p => ({ ...p, autores: val }))}
              multiple
              required
            />

            <ChipSelect
              label="Categorías"
              options={categorias}
              value={formData.categorias}
              onChange={(val) => setFormData(p => ({ ...p, categorias: val }))}
              multiple
              required
            />

            <Input label="Año de Publicación" name="anio_publicacion" type="number" value={formData.anio_publicacion} onChange={handleChange} placeholder="Ej: 2023" />

            <div className={styles.group}>
              <label className={styles.label}>Descripción</label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} className={styles.textarea} placeholder="Breve descripción del libro..." rows={3} />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button type="button" variant="secondary" onClick={onClose} icon={<MdClose />}>Cancelar</Button>
          <Button type="submit" variant="primary" icon={<MdSave />} disabled={uploading}>
            {uploading ? 'Guardando…' : initialData ? 'Actualizar' : 'Guardar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

/* ─── Modal de confirmación de eliminación ────────────────────────────────── */
LibroModal.DeleteConfirm = ({ isOpen, onClose, onConfirm, titulo }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Eliminar Libro" size="sm">
    <div className={styles.deleteContent}>
      <div className={styles.warningIcon}><MdWarning size={40} /></div>
      <div className={styles.deleteText}>
        <p className={styles.deleteTitle}>¿Eliminar permanentemente?</p>
        <p className={styles.deleteBook}>"<strong>{titulo}</strong>"</p>
        <p className={styles.deleteSubtitle}>Este libro se eliminará de forma definitiva y no se podrá recuperar.</p>
      </div>
      <div className={styles.deleteFooter}>
        <Button variant="secondary" onClick={onClose} icon={<MdClose />}>Cancelar</Button>
        <Button variant="primary" onClick={onConfirm} icon={<MdDelete />} style={{ background: '#ef4444', boxShadow: '0 2px 8px rgba(239,68,68,0.35)' }}>
          Sí, eliminar
        </Button>
      </div>
    </div>
  </Modal>
)

export default LibroModal
