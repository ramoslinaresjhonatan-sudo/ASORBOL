import { useState, useEffect } from 'react'
import Modal from '../../../shared/components/Modal'
import Button from '../../../shared/components/Button'
import ChipSelect from '../../../shared/components/ChipSelect'
import { normalizeIds } from '../../../shared/utils/helpers'
import styles from './CronogramaEventoModal.module.css'
import {
  MdSave, MdClose, MdCloudUpload, MdDelete, MdWarning,
  MdLocationOn, MdEvent, MdDescription
} from 'react-icons/md'
import * as cronogramasService from '../services/cronogramasService'

/* ─── Estado vacío — definido fuera del componente para estabilidad de refs ── */
const EMPTY_FORM = {
  nombre:       '',
  categoria:    null,
  dirigido:     [],
  fecha_inicio: '',
  fecha_fin:    '',
  lugar:        '',
  encargado:    null,
  descripcion:  '',
  afiche:       null
}

/* ─── Modal principal ─────────────────────────────────────────────────────── */
const CronogramaEventoModal = ({
  isOpen, onClose, onSave, initialData,
  categorias = [], dirigidos = [], usuarios = []
}) => {
  const [formData,       setFormData]       = useState(EMPTY_FORM)
  const [afficheFile,    setAfficheFile]    = useState(null)
  const [affichePreview, setAffichePreview] = useState(null)
  const [uploading,      setUploading]      = useState(false)

  /* ── Cargar datos al editar ── */
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre:       initialData.nombre || initialData.evento || '',
        categoria:    initialData.categoria ?? initialData.categoriaId ?? null,
        dirigido:     normalizeIds(initialData.dirigido || initialData.dirigidoIds),
        fecha_inicio: initialData.fecha_inicio || '',
        fecha_fin:    initialData.fecha_fin || '',
        lugar:        initialData.lugar || '',
        encargado:    initialData.encargado ?? initialData.encargado_detalle?.id ?? null,
        descripcion:  initialData.descripcion || '',
        afiche:       initialData.afiche || null
      })
      setAffichePreview(initialData.afiche_detalle?.url || initialData.afiche_url || null)
      setAfficheFile(null)
    } else {
      setFormData(EMPTY_FORM)
      setAffichePreview(null)
      setAfficheFile(null)
    }
  }, [initialData, isOpen])

  const handleAfficheSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAfficheFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setAffichePreview(reader.result)
    reader.readAsDataURL(file)
  }

  const removeAfiche = () => {
    setAfficheFile(null)
    setAffichePreview(null)
    setFormData(prev => ({ ...prev, afiche: null }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  /* ── Guardar: sube imagen a ImgBB SOLO al confirmar, luego persiste evento ── */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.categoria) { alert('Selecciona una categoría.'); return }
    if (!formData.fecha_inicio || !formData.fecha_fin) { alert('Las fechas de inicio y fin son obligatorias.'); return }

    setUploading(true)
    try {
      let afficheId = formData.afiche
      if (afficheFile) {
        const uploaded = await cronogramasService.uploadImage(afficheFile)
        afficheId = uploaded.id
      }

      await onSave({
        nombre:       formData.nombre,
        categoria:    formData.categoria,
        dirigido:     formData.dirigido,
        fecha_inicio: formData.fecha_inicio,
        fecha_fin:    formData.fecha_fin,
        lugar:        formData.lugar,
        encargado:    formData.encargado,
        descripcion:  formData.descripcion,
        afiche:       afficheId
      })

      onClose()
    } catch {
      alert('Error al guardar el evento o subir el afiche.')
    } finally {
      setUploading(false)
    }
  }

  const isEdit = Boolean(initialData)

  // Usuarios de la BD → formato { id, nombre } para el ChipSelect
  const usuariosOptions = usuarios.map(u => ({
    id: u.id,
    nombre: `${u.nombres || ''} ${u.apellidos || ''}`.trim() || u.correo
  }))

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Editar Evento' : 'Nuevo Evento del Cronograma'} size="xl">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.layout}>

          {/* ── Afiche ── */}
          <div className={styles.afficheCol}>
            <p className={styles.fieldLabel}>Afiche / Póster</p>
            {affichePreview ? (
              <div className={styles.affichePreviewBox}>
                <img src={affichePreview} alt="Afiche" className={styles.afficheImg} />
                <button type="button" className={styles.removeBtn} onClick={removeAfiche} title="Quitar afiche">
                  <MdDelete size={15} />
                </button>
                {afficheFile && <div className={styles.pendingBadge}>⏳ Se subirá al guardar</div>}
              </div>
            ) : (
              <label className={styles.afficheUpload}>
                <MdCloudUpload size={36} />
                <span className={styles.uploadTitle}>Subir afiche</span>
                <span className={styles.uploadHint}>JPG · PNG · WEBP</span>
                <span className={styles.uploadNote}>Se sube al confirmar</span>
                <input type="file" accept="image/*" onChange={handleAfficheSelect} hidden />
              </label>
            )}
          </div>

          {/* ── Campos ── */}
          <div className={styles.fieldsCol}>

            <div className={styles.group}>
              <label className={styles.fieldLabel}><MdEvent size={14}/> Nombre del Evento <span className={styles.required}>*</span></label>
              <input className={styles.input} name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Retiro Espiritual 2026" required />
            </div>

            <ChipSelect label="Encargado" options={usuariosOptions} value={formData.encargado} onChange={(val) => setFormData(p => ({ ...p, encargado: val }))} />

            <ChipSelect label="Categoría" options={categorias} value={formData.categoria} onChange={(val) => setFormData(p => ({ ...p, categoria: val }))} required />

            <ChipSelect label="Dirigido a" options={dirigidos} value={formData.dirigido} onChange={(val) => setFormData(p => ({ ...p, dirigido: val }))} multiple />

            <div className={styles.row2}>
              <div className={styles.group}>
                <label className={styles.fieldLabel} style={{ color: '#10b981' }}>▶ Fecha de Inicio <span className={styles.required}>*</span></label>
                <input className={`${styles.input} ${styles.inputGreen}`} type="date" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} required />
              </div>
              <div className={styles.group}>
                <label className={styles.fieldLabel} style={{ color: '#ef4444' }}>◼ Fecha de Fin <span className={styles.required}>*</span></label>
                <input className={`${styles.input} ${styles.inputRed}`} type="date" name="fecha_fin" value={formData.fecha_fin} onChange={handleChange} required />
              </div>
            </div>

            <div className={styles.group}>
              <label className={styles.fieldLabel}><MdLocationOn size={14}/> Lugar / Dirección</label>
              <input className={styles.input} name="lugar" value={formData.lugar} onChange={handleChange} placeholder="Ej: Melgar, Tolima" />
            </div>

            <div className={styles.group}>
              <label className={styles.fieldLabel}><MdDescription size={14}/> Descripción</label>
              <textarea className={styles.textarea} name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Detalles del evento, requisitos, etc..." rows={3} />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button type="button" variant="secondary" onClick={onClose} icon={<MdClose />}>Cancelar</Button>
          <Button type="submit" variant="primary" icon={<MdSave />} disabled={uploading}>
            {uploading ? 'Guardando…' : isEdit ? 'Actualizar Evento' : 'Crear Evento'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

/* ─── Modal de confirmación de eliminación ────────────────────────────────── */
CronogramaEventoModal.DeleteConfirm = ({ isOpen, onClose, onConfirm, nombre }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Eliminar Evento" size="sm">
    <div className={styles.deleteContent}>
      <div className={styles.warningIcon}><MdWarning size={38} /></div>
      <div className={styles.deleteText}>
        <p className={styles.deleteTitle}>¿Eliminar permanentemente?</p>
        <p className={styles.deleteBook}>"{nombre}"</p>
        <p className={styles.deleteNote}>Esta acción no se puede deshacer. El evento debe estar cancelado para eliminarse.</p>
      </div>
      <div className={styles.deleteFooter}>
        <Button variant="secondary" onClick={onClose} icon={<MdClose />}>Cancelar</Button>
        <Button variant="primary" onClick={onConfirm} icon={<MdDelete />} style={{ background: '#ef4444', boxShadow: '0 2px 8px rgba(239,68,68,0.3)' }}>
          Sí, eliminar
        </Button>
      </div>
    </div>
  </Modal>
)

export default CronogramaEventoModal
